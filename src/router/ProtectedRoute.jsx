import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
// AuthContext에서 로그인 상태 가져오기

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth(); // 로그인 상태 확인
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // isLoggedIn 상태가 변경될 때까지 기다리기
    setIsLoading(false);
  }, [isLoggedIn]);

  // 로딩 상태일 때는 아무것도 렌더링하지 않음
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 로그인되지 않은 상태일 경우 로그인 페이지로 리디렉션
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 로그인 상태라면 해당 페이지 컴포넌트 렌더링
  return element;
};

export default ProtectedRoute;
