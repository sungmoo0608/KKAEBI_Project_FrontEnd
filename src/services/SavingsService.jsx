import http from "./HttpCommon";

const getPagingList = (path = "/savingsrest/list", search = "") => {
  return http.get(path + search);
};

//번호에 맞는 내용 가져오기
const get = (id) => {
  console.log(id);
  return http.get(`/savingsrest/${id}`);
};

export default {
  getPagingList,
  get,
};
