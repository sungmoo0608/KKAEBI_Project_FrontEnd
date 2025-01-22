import http from "./HttpCommon";

const getList = (path = "/goodsrest/Alllist", search = "") => {
  return http.get(path + search);
};

const updateStatus = (goods_code, status) => {
  return http.put(`/goodsrest/updateStatus/${goods_code}`, { status });
};

const getGoodsCode = (path = "/goodsrest/goodscodelist", search = "") => {
  return http.get(path + search);
};

const getProviderCode = (path = "/goodsrest/Providerlist", search = "") => {
  return http.get(path + search);
};

export default {
  getList,
  updateStatus,
  getGoodsCode,
  getProviderCode,
};
