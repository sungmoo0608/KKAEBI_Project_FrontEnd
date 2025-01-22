import http from "./HttpCommon";

const getList = (path = "/reviewr/list", search = "") => {
  const url = path + (search ? `?goods_code=${search}` : ""); // URL이 정확하게 만들어지는지 확인
  console.log("Requesting URL: ", url); // URL을 로그로 확인
  return http.get(url);
};

//번호에 맞는 내용 가져오기
const get = (id) => {
  console.log(id);
  return http.get(`/reviewr/${id}`);
};

const update = (data) => {
  console.log(data);
  return http.put(`/reviewr/modify`, data);
};

const write = (data) => {
  console.log(data);
  return http.post(`/reviewr/create`, data);
};

const blind = (data) => {
  console.log(data);
  // 상태 전환 요청을 보내는 API 호출, seq_no와 status 값을 요청 본문에 포함시킴
  return http.put(`/reviewr/${data.seq_no}/status`, { status: data.status });
};

export default {
  getList,
  get,
  update,
  write,
  blind,
};
