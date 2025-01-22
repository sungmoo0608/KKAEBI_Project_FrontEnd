import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Context 생성
const AuthContext = createContext();

// AuthContext를 사용할 커스텀 훅
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider 컴포넌트 (앱 전역에 Context를 제공)
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [authorities, setAuthorities] = useState([]);

  // JWT 토큰에서 userId와 authorities를 추출하는 함수
  const getUserDataFromToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decodedData = JSON.parse(atob(base64));

        // 디코딩된 데이터를 console로 확인하여 문제 확인
        console.log(decodedData);

        // user_id와 authorities  추출
        return {
          userId: decodedData.sub,
          authorities: decodedData.authorities || [],
        };
      } catch (error) {
        console.error("JWT 디코딩 실패:", error);
        return { userId: null, authorities: [] };
      }
    }
    return { userId: null, authorities: [] };
  };

  // 로그인 상태와 userId 관리
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
      const { userId, authorities } = getUserDataFromToken();
      console.log("User logged in:", userId, authorities); // 로그인된 사용자 로그 출력
      setUserId(userId);
      setAuthorities(authorities);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
      setAuthorities([]);
    }
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      // 백엔드 로그아웃 요청 (선택 사항, 백엔드에 로그아웃 API가 있다면)
      await axios.post(
        "http://192.168.0.6:8282/logout",
        {},
        { withCredentials: true }
      );

      // localStorage에서 JWT 토큰 제거
      localStorage.removeItem("jwtToken");

      // 필요시 다른 사용자 관련 데이터도 제거
      localStorage.removeItem("userData");

      setIsLoggedIn(false);
      setUserId(null);
      setAuthorities([]);

      // 옵션으로 Axios 헤더에서 JWT 토큰 제거
      delete axios.defaults.headers["Authorization"];

      console.log("로그아웃 성공, JWT 토큰이 localStorage에서 제거되었습니다.");

      // 로그아웃 후 홈 페이지나 로그인 페이지로 리디렉션
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        authorities,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
