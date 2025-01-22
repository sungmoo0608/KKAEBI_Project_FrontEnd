import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

// 권한에 따른 접근을 제어하는 컴포넌트
const RoleBasedRoute = ({ element, allowedRoles }) => {
  const { isLoggedIn, authorities } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // isLoggedIn 상태가 변경될 때까지 기다리기
    setIsLoading(false);
  }, [isLoggedIn]);

  // 로딩 상태일 때는 아무것도 렌더링하지 않음
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 로그인되지 않은 경우 로그인 페이지로 리디렉션
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 사용자 권한 체크: allowedRoles에 해당하는 권한이 있을 때만 접근 가능
  const hasPermission = allowedRoles.some((role) => authorities.includes(role));

  if (!hasPermission) {
    // 권한이 없으면 Unauthorized 페이지로 리디렉션
    return <Navigate to="/authority" replace />;
  }

  // 권한이 있으면 해당 컴포넌트 렌더링
  return element;
};

export default RoleBasedRoute;
