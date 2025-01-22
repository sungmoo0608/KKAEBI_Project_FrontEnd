import http from "./HttpCommon";

const getList = (path = "/goodsrest/Fundlist", search = "") => {
  return http.get(path + search);
};

//번호에 맞는 내용 가져오기
const get = (id) => {
  console.log(id);
  return http.get(`/goodsrest/Fundlist/${id}`);
};

const update = (data) => {
  console.log(data);
  return http.put(`/goodsrest/`, data);
};

export default {
  getList,
  get,
  update,
};
