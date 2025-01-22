import http from "./HttpCommon";

const getList = (path = "/goodsrest/Depositlist", search = "") => {
  return http.get(path + search);
};

//번호에 맞는 내용 가져오기
const get = (id) => {
  console.log(id);
  return http.get(`/goodsrest/Depositlist/${id}`);
};

const update = (data) => {
  console.log(data);
  return http.put(`/goodsrest/`, data);
};

const write = (data) => {
  console.log(data);
  return http.post(`/goodsrest/`, data);
};

export default {
  getList,
  get,
  update,
  write,
};
