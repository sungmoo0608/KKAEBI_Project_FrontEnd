import React, { useState, useEffect } from "react";
import allGoodsService from "../../services/AllGoodsService";

const GoodsCodeSelect = ({ onChange, value }) => {
  const [goodsCodes, setGoodsCodes] = useState([]);

  useEffect(() => {
    // 상품 코드 리스트를 가져옵니다.
    allGoodsService
      .getGoodsCode()
      .then((response) => {
        setGoodsCodes(response.data); // 받은 데이터를 상태에 저장
      })
      .catch((error) => {
        console.log("상품 코드 리스트 가져오기 실패:", error);
      });
  }, []);

  return (
    <div className="col-md-6 mb-3">
      <div className="form-floating">
        <select
          className="form-select"
          onChange={onChange} // 상품 코드 선택 시 상태 업데이트
          value={value}
          id="goodsCodeSelect"
        >
          <option value="">상품 코드를 선택하세요</option>
          {goodsCodes.map((goods, index) => (
            <option key={index} value={goods}>
              {goods}
            </option>
          ))}
        </select>
        <label htmlFor="goodsCodeSelect">상품 코드 선택</label>
      </div>
    </div>
  );
};

export default GoodsCodeSelect;
