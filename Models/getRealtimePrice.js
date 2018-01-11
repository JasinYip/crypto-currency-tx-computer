const exchangesApis = {
  otcbtc: require('../Apis/getOtcbtcPrize')
}

module.exports = (exchange, quoteAsset, baseAsset) =>
  exchangesApis[exchange] && exchangesApis[exchange](quoteAsset, baseAsset)
