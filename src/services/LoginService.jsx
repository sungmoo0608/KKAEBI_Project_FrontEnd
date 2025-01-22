import http from "./HttpCommon";

const getUser = (path = "/loginInfo", search = "") => {
  return http.get(path + search);
};

export default {
  getUser,
};
