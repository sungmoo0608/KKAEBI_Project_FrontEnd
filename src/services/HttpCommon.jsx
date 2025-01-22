import axios from "axios";

// Axios 인스턴스 설정
export default axios.create({
  baseURL: "http://192.168.0.6:8282",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true, // 쿠키 전달 설정
});
