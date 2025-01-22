import http from "./HttpCommon";

const getList = (
  path = "/performancerest/performanceall_list",
  search = ""
) => {
  return http.get(path + search);
};

//번호에 맞는 내용 가져오기
const getPerformanceCustomerSummary = (id) => {
  console.log(id);
  return http.get(`/performancerest/customer?user_id=${id}`);
};

export default {
  getList,
  getPerformanceCustomerSummary,
};
