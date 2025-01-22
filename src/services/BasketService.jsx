import http from "./HttpCommon";

const getBasketList = (id) => {
  console.log(id);
  return http.get(`/basketlistrest/basketlist?user_id=${id}`);
};

const getBasketDetail = (user_id, goods_gubun) => {
  return http.get(
    `/basketlistrest/basketlistdetail?user_id=${user_id}&goods_gubun=${goods_gubun}`
  );
};

const getBasketDelete = (data) => {
  console.log(data);
  return http.put(
    `/basketlistrest/basketlistdelete?user_id=${data.user_id}&seq_no=${data.seq_no}`,
    data
  );
};

const getBasketInsert = (user_id, goods_code) => {
  return http.put(
    `/basketlistrest/basketlistinsert?user_id=${user_id}&goods_code=${goods_code}`
  );
};

const getGoodsPrice = (data) => {
  console.log(data);
  return http.get(
    `/basketlistrest/goodsprice_init?goods_gubun=${data.goods_gubun}&goods_code=${data.goods_code}`
  );
};

const updateGoodsPrice = (data) => {
  console.log(data);
  return http.get(
    `/basketlistrest/goodsprice?goods_gubun=${data.goods_gubun}&goods_code=${data.goods_code}&tr_price=${data.tr_price}&job_gubun=${data.job_gubun}`,
    data
  );
};

export default {
  getBasketList,
  getBasketDetail,
  getBasketDelete,
  getBasketInsert,
  getGoodsPrice,
  updateGoodsPrice,
};
