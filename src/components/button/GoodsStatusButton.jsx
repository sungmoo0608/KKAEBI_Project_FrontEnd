import React from "react";
import { useAuth } from "../context/AuthContext";

const GoodsStatusButton = ({ goodsStatus, onClick }) => {
  // AuthContext에서 권한을 가져옵니다.
  const { authorities } = useAuth();

  // 사용자가 'ROLE_ADMIN'인지 확인
  const isAdmin = authorities.includes("ROLE_ADMIN");

  const getStatusClass = () => {
    switch (goodsStatus) {
      case 0:
        return "bg-secondary";
      case 1:
        return "bg-success";
      case 9:
        return "bg-warning";
      default:
        return "bg-light";
    }
  };

  const getStatusText = () => {
    switch (goodsStatus) {
      case 0:
        return "준비중";
      case 1:
        return "판매중";
      case 9:
        return "판매중지";
      default:
        return "";
    }
  };

  const handleClick = () => {
    if (isAdmin) {
      onClick(); // ROLE_ADMIN이면 원래의 기능을 실행
    } else {
      alert("관리자 기능 입니다"); // ROLE_USER이면 경고 메시지를 띄움
    }
  };

  // ROLE_ADMIN이 아닐 경우 버튼을 렌더링하지 않음
  if (!isAdmin) return null;

  return (
    <button
      className={`btn btn-light btn-sm position-relative`}
      onClick={handleClick}
    >
      전환
      <span
        className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${getStatusClass()}`}
      >
        {getStatusText()}
      </span>
    </button>
  );
};

export default GoodsStatusButton;
