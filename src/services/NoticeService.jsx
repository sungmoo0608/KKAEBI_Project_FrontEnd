import http from "./HttpCommon";

const getList = (path = "/noticerest/list", search = "") => {
  return http.get(path + search);
};

//번호에 맞는 내용 가져오기
const get = (id) => {
  console.log(id);
  return http.get(`/noticerest/${id}`);
};

const update = (data) => {
  console.log(data);
  return http.put(`/noticerest/`, data);
};

const write = (data) => {
  console.log(data);
  return http.post(`/noticerest/create`, data);
};

const blind = (data) => {
  console.log(data);
  // 상태 전환 요청을 보내는 API 호출, seq_no와 status 값을 요청 본문에 포함시킴
  return http.put(`/noticerest/${data.seq_no}/status`, { status: data.status });
};

const updateTarget = (seq_no, target) => {
  return http.put(`/noticerest/updateTarget/${seq_no}`, { target });
};

export default {
  getList,
  get,
  update,
  write,
  blind,
  updateTarget,
};
