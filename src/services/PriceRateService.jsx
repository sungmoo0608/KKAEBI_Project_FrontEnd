import http from "./HttpCommon";

const getBasePriceList = (path = "/pricerate/baseprice", search = "") => {
  return http.get(path + search);
};

//번호에 맞는 내용 가져오기
const getFundPrice = (id) => {
  console.log(id);
  return http.get(`/pricerate/baseprice/${id}`);
};

//환율 상품 번호에 맞는 내용 가져오기
const getExchangeRate = (id) => {
  console.log(id);
  return http.get(`/pricerate/exchangerate/${id}`);
};

//주식 상품 번호에 맞는 내용 가져오기
const getStockprice = (id) => {
  console.log(id);
  return http.get(`/pricerate/stockprice/${id}`);
};

export default {
  getBasePriceList,
  getFundPrice,
  getExchangeRate,
  getStockprice,
};
