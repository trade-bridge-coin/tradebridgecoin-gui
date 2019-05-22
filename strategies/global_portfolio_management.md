
# How To Use TBC To Manage Global Portfolio Denominated In Any Major Fiat Currency
TBC is born as a trading system to bridge crypto assets and traditional financial ones, a major goal of which is to enable the management of global portfolio on TBC but against any fiat currency.  Imagine a portfolio of AAPL, GOOG, XSLV, EUR.USD, EOS.JPY, CSI 300 index and RB commodity on TBC is being managed denominated in the currency USD (or CNY or any other major fiat currencies).

TBC features the universal portfolio management by treating all kinds of assets on TBC on a basis of rate of return and offering a way to hedge TBC against any major fiat currency with a customizable leverage ratio. In this way, the rates of return of held positions translate into the rate of return of the invested TBC, which is able to be hedged against any desirable fiat currency, and as long as appropriate leverage ratio is chosen,*** the entire portfolio performs just as if it were in its original market and denominated in its original currency. Furthermore, if the portfolio goes global across markets and currencies, TBC is the only way in the market to offer handy solution to put all assets under one denominating currency.***

Consider the previous portfolio that comes with 3 major fiat currencies: USD for AAPL, GOOG,XSLV and EUR.USD; JPY for EOS.JPY and CNY for CSI 300 index and RB commodity. In the traditional literature, at least two, if not three, foreign exchange positions have to be opened to hedge against non-denominating currency positions, which is very capital-consuming and vulnerable to the fx volatility. In TBC literature, however, only one hedge position has to be opened in order to fully hedge the entire portfolio and the most importantly, as long as a appropriate leverage is chosen, it will appear that there will not be any capital consumed for the hedge at all.

Assume $100,000 is to be invested in the previous portfolio, let us see, step by step, how the universal portfolio management works in terms of USD.

> 1. trade the principal U.S. dollars for let's say 1,000 ethers at the presumed rate of 100 USD/ETH in any major crypto-currency exchange, e.g., Coinbase;
> 2. in the Trade Bridge Coin Client GUI, simply deposit the 1,000 eth for 1,000,000 TBC coins at the presumed rate of 1,000 TBC/ETH. And please be noted that at this point the capital is now 1,000,000 TBC or $100,000 with the rate of 10 TBC/USD
> 3. we now have to allocate our assets into two parts: investment and hedge. The hedge part is to be used to hedge TBC against USD by going short with TBC.USD.CRYPTO and we allocate 1/3 of the total assets since we expect the fluctuation will be smaller than 33.33%, hence a leverage ratio of 3x. And correspondingly the rest 2/3 of assets are allocated to investment with the leverage ratio of 1.5x, reverse of its allocation percentage.
> 4. we now place some orders and after the transactions, here is the portfolio (U.S. stock support is upcoming)
> 
| Symbol | Cost | Market Price | Leverage | RoR | TBC MV | TBC/USD | USD MV |
|----------------|----------|--------------|----------|-----|---------------|---------|-------------|
| AAPL.USEQ | 185 | 185 | 1.5 | 0 | 95238.095238 | 10 | 9523.81 |
| GOOG.USEQ | 1150 | 1150 | 1.5 | 0 | 95238.095238 | 10 | 9523.81 |
| XSLV.USEQ | 48.23 | 48.23 | 1.5 | 0 | 95238.095238 | 10 | 9523.81 |
| EUR.USD.FX | 114.2332 | 114.2332 | 1.5 | 0 | 95238.095238 | 10 | 9523.81 |
| EOS.JPY.CRYPTO | 581.33 | 581.33 | 1.5 | 0 | 95238.095238 | 10 | 9523.81 |
| 000300.SS | 3982.32 | 3982.32 | 1.5 | 0 | 95238.095238 | 10 | 9523.81 |
| RB.CNC | 3522 | 3522 | 1.5 | 0 | 95238.095238 | 10 | 9523.81 |
| TBC.USD.CRYPTO | 0.1 | 0.1 | 3 | 0 | 333333.333333 | 10 | 33333.33 |
| TOTAL |  |  |  |  | 1,000,000.00 |  | $100,000.00 |

> A period of time later, with the movement of the markets, the portfolio varies correspondently:
> 
| Symbol         | Cost     | Market Price | Leverage | RoR    | TBC MV           | TBC/USD | USD MV           |
|----------------|----------|--------------|----------|--------|------------------|---------|------------------|
| AAPL.USEQ      | 185      | 198.2        | 1.5      | 7.14%  | 105431.14543104  | 0.11    | 11597.4259974144 |
| GOOG.USEQ      | 1150     | 1250         | 1.5      | 8.70%  | 107660.455486435 | 0.11    | 11842.6501035078 |
| XSLV.USEQ      | 48.23    | 47.25        | 1.5      | -2.03% | 92335.3376182642 | 0.11    | 10156.8871380091 |
| EUR.USD.FX     | 114.2332 | 120.53       | 1.5      | 5.51%  | 103112.713625141 | 0.11    | 11342.3984987655 |
| EOS.JPY.CRYPTO | 581.33   | 620.11       | 1.5      | 6.67%  | 104767.966395509 | 0.11    | 11524.4763035059 |
| 000300.SS      | 3982.32  | 4100.23      | 1.5      | 2.96%  | 99467.8622367015 | 0.11    | 10941.4648460372 |
| RB.CNC         | 3522     | 3489         | 1.5      | -0.94% | 93899.570049391  | 0.11    | 10328.952705433  |
| TBC.USD.CRYPTO | 0.1      | 0.11         | 3        | -10.00% | 233333.3333331   | 0.11    | 25666.666666641  |
| TOTAL          |          |              |          |        | 940008.384175581 |         | $103,400.92      |

> We can see in the second table that TBC has appreciated 10% against USD, making our hedge position loss. But other assets appreciate and therefore the total rate of return in terms of USD is 103,400.92 / 100,000 = 3.4%.

> Now let's see what would happen if the portfolio were all denominated in USD in the traditional markets.
> 
| Symbol | Cost | Market Price | Leverage | RoR | MV before | MV after |
|----------------|----------|--------------|----------|--------|---------------|---------------|
| AAPL.USEQ | 185 | 198.2 | 1 | 7.14% | 142857.14 | 153050.19 |
| GOOG.USEQ | 1150 | 1250 | 1 | 8.70% | 142857.14 | 155279.50 |
| XSLV.USEQ | 48.23 | 47.25 | 1 | -2.03% | 142857.14 | 139954.39 |
| EUR.USD.FX | 114.2332 | 120.53 | 1 | 5.51% | 142857.14 | 150731.76 |
| EOS.JPY.CRYPTO | 581.33 | 620.11 | 1 | 6.67% | 142857.14 | 152387.01 |
| 000300.SS | 3982.32 | 4100.23 | 1 | 2.96% | 142857.14 | 147086.91 |
| RB.CNC | 3522 | 3489 | 1 | -0.94% | 142857.14 | 141518.62 |
| TOTAL |  |  |  |  | $1,000,000.00 | $1,040,008.38 |

> The rate of return is 1,040,008.38 / 1,000,000 = 4.00%, which is very close to the rate of return on TBC. The discrepancy comes from the practice of non-continuous hedge rebalancing. In order to hedge as accurately as possible, the hedge position has to be continuously rebalanced according to the total market value of the portfolio.

Please be noted that a potential risk associated with the hedge on TBC comes right from the leverage, which is inevitable in hedging. The reverse of the leverage ratio means how much percentage loss can be tolerated before being liquidated. For example. 3x leveraged long position means the price going south by more than 33.33% will trigger the forced liquidation. Therefore, whenever a forced liquidation occurs, the entire portfolio has to be rebalanced, otherwise the hedge could be going unexpectedly.

In addition to hedging the portfolio against fiat currency, the same maneuver could be done to hedge against any crypto-currencies. This is very helpful if a Bitcoin holder wants to have TBC exposure but without loosing the BTC appreciation.