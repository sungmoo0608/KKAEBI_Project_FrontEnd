import React from "react";
import { Link } from "react-router-dom";

// EditButton 컴포넌트 정의
const GoodsViewButton = ({ goodsCode, goodsGubun }) => {
  // goods_gubun에 따라 수정할 링크를 설정
  let viewLink = "";

  switch (goodsGubun) {
    case 1: // 예금
      viewLink = "/goods/depositlist/" + goodsCode;
      break;
    case 2: // 펀드
      viewLink = "/goods/fundlist/" + goodsCode;
      break;
    case 3: // 외환
      viewLink = "/goods/exlist/" + goodsCode;
      break;
    case 4: // 주식
      viewLink = "/goods/stocklist/" + goodsCode;
      break;
    default:
      viewLink = "#"; // 다른 값일 경우 기본값으로 설정
  }

  return (
    <Link to={viewLink}>
      <button className="btn btn-outline-info btn-block btn-sm mx-1">
        상품 보기
      </button>
    </Link>
  );
};

export default GoodsViewButton;
