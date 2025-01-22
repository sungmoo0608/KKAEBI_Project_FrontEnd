import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// EditButton 컴포넌트 정의
const GoodsEditButton = ({ goodsCode, goodsGubun }) => {
  // AuthContext에서 권한을 가져옵니다.
  const { authorities } = useAuth();

  // 사용자가 'ROLE_ADMIN'인지 확인
  const isAdmin = authorities.includes("ROLE_ADMIN");

  // goods_gubun에 따라 수정할 링크를 설정
  let modifyLink = "";

  switch (goodsGubun) {
    case 1: // 예금
      modifyLink = "/goods/depositlist/modify/" + goodsCode;
      break;
    case 2: // 펀드
      modifyLink = "/goods/fundlist/modify/" + goodsCode;
      break;
    case 3: // 외환
      modifyLink = "/goods/exlist/modify/" + goodsCode;
      break;
    case 4: // 주식
      modifyLink = "/goods/stocklist/modify/" + goodsCode;
      break;
    default:
      modifyLink = "#"; // 다른 값일 경우 기본값으로 설정
  }

  const handleClick = (e) => {
    // ROLE_ADMIN이면 원래의 기능을 실행, 아니면 경고 메시지
    if (isAdmin) {
      return true; // 정상적으로 링크를 이동
    } else {
      e.preventDefault(); // 링크 이동을 막음
      alert("관리자 기능 입니다"); // ROLE_USER이면 경고 메시지를 띄움
    }
  };

  // ROLE_ADMIN이 아닐 경우 버튼을 렌더링하지 않음
  if (!isAdmin) return null;

  return (
    <Link to={modifyLink} onClick={handleClick}>
      <button className="btn btn-warning btn-block btn-sm mx-1">
        수정 하기
      </button>
    </Link>
  );
};

export default GoodsEditButton;
