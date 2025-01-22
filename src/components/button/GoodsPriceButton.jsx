import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GoodsPriceButton = ({ goodsCode, goodsGubun }) => {
  const { authorities } = useAuth();

  const isAdmin = authorities.includes("ROLE_ADMIN");

  let updatePriceLink = "";

  switch (goodsGubun) {
    case 1: // 예금
      updatePriceLink = "/goods/depositlist/update/" + goodsCode;
      break;
    case 2: // 펀드
      updatePriceLink = "/goods/fundlist/update/" + goodsCode;
      break;
    case 3: // 외환
      updatePriceLink = "/goods/exlist/update/" + goodsCode;
      break;
    case 4: // 주식
      updatePriceLink = "/goods/stocklist/update/" + goodsCode;
      break;
    default:
      updatePriceLink = "#"; // 다른 값일 경우 기본값으로 설정
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
    <Link to={updatePriceLink} onClick={handleClick}>
      <button className="btn btn-dark btn-block btn-sm mx-1">
        기준가 등록
      </button>
    </Link>
  );
};

export default GoodsPriceButton;
