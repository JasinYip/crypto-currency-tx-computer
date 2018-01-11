const { Spider } = require('nodespider')

const getUrl = (fiatCurrency, coin) =>
  'https://otcbtc.com/sell_offers?' +
  `currency=${coin.toLowerCase()}&` +
  `fiat_currency=${fiatCurrency.toLowerCase()}&` +
  'payment_type=all'

const spider = new Spider()

spider.plan('getLowestPrize', (err, current, spider) => {
  const { $, info: { resolve, reject } } = current

  if (err) { return spider.retry(current, 3, reject) }

  resolve(parseFloat(
    $('.long-solution-list .list-content .price').first().text()
      .split('\n')
      .map(s => s.trim())
      .filter(s => s !== '')[1]
      .replace(',', '')
  ))
})

module.exports = (fiatCurrency, coin) => new Promise((resolve, reject) => {
  spider.queue('getLowestPrize', getUrl(fiatCurrency, coin), { resolve, reject })
})
