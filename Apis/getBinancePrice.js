const { last } = require('lodash')
const axios = require('axios')

;(function (baseAsset, quoteAsset) {
  return axios.get('https://api.binance.com/api/v1/trades', { params: {
    symbol: `${quoteAsset}${baseAsset}`
  }})
  .then(res =>
    last(res.data).price
  )
})('BTC', 'ADA').then(e => console.log(e))
