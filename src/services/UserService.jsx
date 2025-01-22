import http from "./HttpCommon";

const getUserInfo = (id) => {
  console.log(id);
  return http.get(`/api/auth/info/${id}`);
};

const register = (data) => {
  console.log(data);
  return http.post(`/api/auth/register`, data);
};

// 회원 ID 중복 체크
const checkUserId = (user_id) => {
  return http.get(`/api/auth/check-id/${user_id}`);
};

// 회원 전화번호 중복 체크
const checkUserPhone = (telno) => {
  return http.get(`/api/auth/check-phone/${telno}`);
};

// 회원 이메일 중복 체크
const checkUserEmail = (email) => {
  return http.get(`/api/auth/check-email/${email}`);
};

// 회원 사업자번호 중복 체크
const checkUserBizno = (bizno) => {
  return http.get(`/api/auth/check-bizno/${bizno}`);
};

export default {
  getUserInfo,
  register,
  checkUserId,
  checkUserPhone,
  checkUserEmail,
  checkUserBizno,
};
