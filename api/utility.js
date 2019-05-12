const http = require('http');
const https = require('https');
const moment = require('moment-timezone');
const sqlite = require('sqlite3');
const log = require('electron-log');

log.transports.file.level = 'info';
log.transports.file.maxSize = 5 * 1024 * 1024;
log.transports.file.file = `${process.env.HOME || process.env.HOMEPATH}/tbc_gui.log`;

Array.prototype.flatten = function() {
    let flat = [];
    if(Array.isArray(this))
        this.forEach(f => {
            if(Array.isArray(f))
                f.flatten().forEach(ff => flat.push(ff));
            else
                flat.push(f);
        });

    return flat;
};
Map.prototype.getOrElse = function(key, value) {
    return this.has(key) ? this.get(key) : value
};
String.prototype.hashCode = function(){
    var hash = 0;
    if (this.length === 0) return hash;
    for (let i = 0; i < this.length; i++) {
        let char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

sqlite.Database.prototype.select = function (sql) {
    let f;
    this.all(sql, (err, res) => {
        if(err){
            let reject = Promise.reject(err.toString());
            reject.catch(err => {});
            f(reject)
        }else
            f(res);
    });
    return new Promise(t => f = t)
};
sqlite.Database.prototype.exec = function (sql) {
    let f;
    this.run(sql, (err, res) => {
        if(err){
            let reject = Promise.reject(err.toString());
            reject.catch(err => {});
            f(reject)
        }else
            f(res);
    });
    return new Promise(t => f = t)
};

class Utility {

    static request(method, url) {
        let f;
        switch (method.toUpperCase()) {
            case 'GET':
                let req = url.toLowerCase().startsWith('https') ? https : (url.toLowerCase().startsWith('http') ? http : undefined);
                let interval = setInterval(() => {
                    req.get(url, (res) => {
                        const { statusCode } = res;
                        const contentType = res.headers['content-type'];

                        if (statusCode !== 200) {
                            try{
                                res.resume();
                                f(Promise.reject('error code:' + statusCode));
                            }catch (err){
                                return Promise.reject(err);
                            }
                        }

                        res.setEncoding('utf8');
                        let rawData = '';
                        res.on('data', (chunk) => {rawData += chunk; });
                        res.on('end', () => {
                            try {
                                clearInterval(interval);
                                f({body: rawData.toString('utf-8')});
                            } catch (e) {
                                return Promise.reject(e)
                            }
                        });
                    }).on('error', (e) => {
                        return e
                    });
                }, 1000);

                break;
        }
        return new Promise(t => f = t);
    }

    static generateAddressesFromSeed(seed) {
        let bip39 = require("bip39");
        let hdkey = require('ethereumjs-wallet/hdkey');
        let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(seed));
        let wallet_hdpath = "m/44'/60'/0'/0/";

        let accounts = [];
        for (let i = 0; i < 10; i++) {

            let wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
            let address = '0x' + wallet.getAddress().toString("hex");
            let privateKey = wallet.getPrivateKey().toString("hex");
            accounts.push({address: address, privateKey: privateKey});
        }

        return accounts;
    }

    static buildMap(obj) {
        let map = new Map();
        Object.keys(obj).forEach(key => {
            map.set(Number(key), obj[key]);
        });
        return map;
    }

    static buildMapStr(obj) {
        let map = new Map();
        Object.keys(obj).forEach(key => {
            map.set(key, obj[key]);
        });
        return map;
    }

    static getHistoricalRoR163(symbol) {
        let f;
        let ticker;
        let [t, e] = symbol.split('.');
        switch (e.toUpperCase()) {
            case 'SS':
                ticker = 0 + t;
                break;
            case 'SZ':
                ticker = 1 + t;
                break;
        }
        let apiUrl_163 = 'http://quotes.money.163.com/service/chddata.html?code=' + ticker;
        http.get(apiUrl_163, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('request A Share cumulated RoR failed with statusCode: ' + statusCode);
            }
            if (error) {
                console.error(error.message);
                res.resume();
                f([]);
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    f(rawData.toString('utf-8').split('\n').filter((l, i) => i > 0 && l !== '').map(m => {
                            let cols = m.split(',');
                            return [moment.tz(cols[0], 'Asia/Shanghai'), cols[9] / 100]
                        }).reverse());
                } catch (e) {
                    console.error(e.message);
                    f([]);
                }
            });
        }).on('error', (e) => {
            console.error(`Error: ${e.message}`);
            f([]);
        });
        return new Promise(t => f = t)
    }

    static getOHLCFromYahooV8(ticker, interval = "1d", includePrePost = true) {
        let apiUrl_yahoo = `https://query1.finance.yahoo.com/v8/finance/chart/ticker?symbol=${ticker}&period1=0&period2=9999999999&interval=${interval}&includePrePost=${includePrePost}`
        let f;
        https.get(apiUrl_yahoo, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('request A Share cumulated RoR failed with statusCode: ' + statusCode);
            }
            if (error) {
                console.error(error.message);
                res.resume();
                f([]);
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    let json = JSON.parse(rawData.toString('utf-8'));
                    if(json['chart']['error'])
                        f([]);
                    else {
                        let q = json['chart']['result'][0];
                        if(q['timestamp'].length === q['indicators']['adjclose'][0]['adjclose'].length){
                            let adj = q['indicators']['adjclose'][0]['adjclose'];
                            f(q['timestamp'].map((t, i) => {
                                return [moment(t * 1000).tz('Asia/Shanghai').startOf('day'), i === 0 ? adj[i] : adj[i]/adj[i - 1] - 1]
                            }))
                        }else
                            f([])
                    }
                    f(rawData.toString('utf-8').split('\n').filter((l, i) => i > 0 && l !== '').map(m => {
                        let cols = m.split(',');
                        return [moment.tz(cols[0], 'Asia/Shanghai'), cols[9] / 100]
                    }).reverse());
                } catch (e) {
                    console.error(e.message);
                    f([]);
                }
            });
        }).on('error', (e) => {
            console.error(`Error: ${e.message}`);
            f([]);
        });
        return new Promise(t => f = t)
    }
}

module.exports = {Utility, log};