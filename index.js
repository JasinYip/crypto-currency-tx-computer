const prices = {
  otcbtc: {
    'CNY/BTC': 109500,
    'CNY/ETH': 10216.8
  },
  binance: {
    'BTC/ADA': 0.00005000,
    'ETH/ADA': 0.00053580
  }
}

const tradingFees = { // rate
  otcbtc: {
    'CNY/BTC': 0,
    'CNY/ETH': 0
  },
  binance: {
    'ETH/ADA': 0.01
  }
}

const withdrawFees = {
  otcbtc: { // https://otcbtc.com/fee
    BTC: 0.001,
    ETH: 0.001
  },
  binance: {
    ADA: 1
  }
}

/**
 * Buy coin.
 * @param  {Number} coinPrice The target coin price on the exchange.
 * @param  {Number} tradingFee The trading fee rate of the target coin.
 * @param  {Number} money The amount of money wants to buy.
 * @return {Number} The amount of the target coin.
 */
const buyCoin =
  (coinPrice, tradingFee, money) => money / coinPrice * (1 - tradingFee)

const withdraw = (coinAmount, withdrawFee) => coinAmount - withdrawFee

function compute ({
  money,
  otcPrice,
  coinCoinPrice,
  otcTxFee = 0,
  otcWithdrawFee = 0,
  coinCoinTxFee = 0,
  withdrawToWalletFee = 0
}) {
  const equivalentCoinAmount = buyCoin(otcPrice, otcTxFee, money)
  const equivalentCoinAmountAfterTransToCoinCoinExchange =
    equivalentCoinAmount - otcWithdrawFee
  const targetCoinAmountInExchange = buyCoin(coinCoinPrice, coinCoinTxFee,
                  equivalentCoinAmountAfterTransToCoinCoinExchange)
  return withdraw(targetCoinAmountInExchange, withdrawToWalletFee)
}

const formatter = num => num.toFixed(8)

// example, buy ETH to buy ADA.
console.log('ETH:', formatter(
  compute({
    money: 20000,
    otcPrice: prices.otcbtc['CNY/ETH'],
    coinCoinPrice: prices.binance['ETH/ADA'],
    otcTxFee: tradingFees.otcbtc['CNY/ETH'],
    otcWithdrawFee: withdrawFees.otcbtc.ETH,
    coinCoinTxFee: tradingFees.binance['ETH/ADA'],
    withdrawToWalletFee: withdrawFees.binance.ADA,
  })
))

console.log('BTC:', formatter(
  compute({
    money: 20000,
    otcPrice: prices.otcbtc['CNY/BTC'],
    coinCoinPrice: prices.binance['BTC/ADA'],
    otcTxFee: tradingFees.otcbtc['CNY/BTC'],
    otcWithdrawFee: withdrawFees.otcbtc.BTC,
    coinCoinTxFee: tradingFees.binance['BTC/ADA'],
    withdrawToWalletFee: withdrawFees.binance.ADA,
  })
))
