import http from "./HttpCommon";

/* 외환 목록*/
const getExchangeAllList = (path = "/api/goods/exchangeall", search = "") => {
  return http.get(path + search);
};

/* USD 외환만 */
const getUSDKRW = (path = "/api/goods/usdkrw", search = "") => {
  return http.get(path + search);
};

/* 주식 거래량 상위 */
const getStockTradeRank = (path = "/api/goods/stocktrade", search = "") => {
  return http.get(path + search);
};

/* 주식 상승률 순위 */
const getStockUpRank = (path = "/api/goods/stockuprank", search = "") => {
  return http.get(path + search);
};

/* 주식 하락률 순위 */
const getStockDownRank = (path = "/api/goods/stockdownrank", search = "") => {
  return http.get(path + search);
};

export default {
  getExchangeAllList,
  getUSDKRW,
  getStockTradeRank,
  getStockUpRank,
  getStockDownRank,
};
