import React, { useEffect, useState } from "react";
import depositService from "../services/DepositService";
import { Navigate, useNavigate } from "react-router-dom";
import allGoodsService from "../services/AllGoodsService";

const GoodsWritePage = () => {
  const initGoodsState = {
    goods_gubun: "",
    provider_code: "",
    goods_name: "",
    orign_code: "",
    period_mm: "",
    invest_gubun: "",
    forignexg_kind: "",
    tran_unit: "",
    goods_status: "",
  };

  const [goods, setGoods] = useState(initGoodsState);
  const [submitted, setSubmitted] = useState(false);
  const [providerList, setProviderList] = useState([]);

  useEffect(() => {
    allGoodsService
      .getProviderCode()
      .then((response) => {
        setProviderList(response.data);
      })
      .catch((error) => {
        console.error("리스트 로딩 에러", error);
      });
  }, []);

  const handleInputChange = () => {
    const { name, value } = event.target;
    setGoods({ ...goods, [name]: value });
  };

  const saveGoods = () => {
    let data = {
      goods_gubun: goods.goods_gubun,
      provider_code: goods.provider_code,
      goods_name: goods.goods_name,
      orign_code: goods.orign_code,
      period_mm: goods.period_mm,
      invest_gubun: goods.invest_gubun,
      forignexg_kind: goods.forignexg_kind,
      tran_unit: goods.tran_unit,
      goods_status: goods.goods_status,
    };

    console.log(data);

    depositService
      .write(data)
      .then((respose) => {
        console.log(respose);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });

    /* axios 글 저장 */
  };

  const navigate = useNavigate();

  const cancleClick = () => {
    navigate(`/goods/depositlist`);
  };

  return submitted ? (
    <Navigate to={{ pathname: "/goods/alllist" }} />
  ) : (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-4">
                    상품등록
                  </h3>
                </div>

                <div className="card-body">
                  <div className="row justify-content-md-center mb-2">
                    <div className="row">
                      <div className="col">
                        {/* <div className="input-group mt-3">
                          <span className="input-group-text">상품 코드 </span>
                          <input
                            type="number"
                            placeholder="상품코드를 입력하세요."
                            name="goods_code"
                            className="form-control"
                            value={goods.goods_code}
                            onChange={handleInputChange}
                          />
                        </div> */}
                        <div className="input-group mt-3">
                          <span className="input-group-text">
                            상품 유형을 선택하세요
                          </span>
                          <select
                            className="form-control"
                            name="goods_gubun"
                            placeholder="상품 유형을 선택하세요."
                            value={goods.goods_gubun}
                            onChange={handleInputChange}
                            required
                          >
                            {/* 기본 선택 옵션 */}
                            <option value="">상품 유형을 선택하세요.</option>
                            <option value="1">예금</option>
                            <option value="2">펀드</option>
                            <option value="3">외환</option>
                            <option value="4">주식</option>
                            <option value="9">유동성(입출금)</option>
                          </select>
                        </div>
                        <div className="input-group mt-3">
                          <span className="input-group-text">
                            상품 공급자 코드
                          </span>
                          <select
                            className="form-control"
                            name="provider_code"
                            value={goods.provider_code}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">상품 공급자를 선택하세요</option>
                            {providerList.map((provider) => (
                              <option
                                key={provider.provider_code}
                                value={provider.provider_code}
                              >
                                {provider.provider_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="input-group mt-3">
                          <span className="input-group-text">상품명 </span>
                          <input
                            type="text"
                            placeholder="상품명을 적으시오"
                            name="goods_name"
                            className="form-control"
                            value={goods.goods_name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="input-group mt-3">
                          <span className="input-group-text">
                            상품 고유 코드
                          </span>
                          <input
                            type="text"
                            placeholder="상품 고유 코드를 적으시오"
                            name="orign_code"
                            className="form-control"
                            value={goods.orign_code}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="input-group mt-3">
                          <span className="input-group-text">
                            예금 기간을 입력하세요.{" "}
                          </span>
                          <input
                            type="number"
                            placeholder="예금 기간을 입력하세요. "
                            name="period_mm"
                            className="form-control"
                            value={goods.period_mm}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="input-group mt-3">
                          <span className="input-group-text">
                            펀드 투자 유형
                          </span>
                          <select
                            className="form-control"
                            name="invest_gubun"
                            placeholder="펀드 투자 유형을 선택하세요"
                            value={goods.invest_gubun || ""} // 초기값으로 빈 문자열을 설정
                            onChange={handleInputChange}
                          >
                            {/* 기본 선택 옵션 */}
                            <option value="">
                              펀드 투자 유형을 선택하세요
                            </option>
                            <option value="1">주식형</option>
                            <option value="2">채권형</option>
                            <option value="3">혼합형</option>
                          </select>
                        </div>
                        <div className="input-group mt-3">
                          <span className="input-group-text">외환 종류</span>
                          <select
                            className="form-control"
                            name="forignexg_kind"
                            placeholder="외환 종류를 선택하시오"
                            value={goods.forignexg_kind || ""} // 초기값으로 빈 문자열을 설정
                            onChange={handleInputChange}
                          >
                            {/* 기본 선택 옵션 */}
                            <option value="">외환 종류를 선택하세요</option>
                            <option value="1">KRW(한국 원화)</option>
                            <option value="2">USD(미국 달러)</option>
                            <option value="3">JPY(일본 엔)</option>
                            <option value="4">EUR(유럽 유로)</option>
                            <option value="5">CNY(중국 위안)</option>
                            <option value="6">HKD(홍콩 달러)</option>
                            <option value="7">THB(태국 바트)</option>
                            <option value="8">VND(베트남 동)</option>
                            <option value="9">AUD(호주 달러)</option>
                            <option value="10">GBP(영국 파운드)</option>
                          </select>
                        </div>

                        <div className="input-group mt-3">
                          <span className="input-group-text"> 거래 단위 </span>
                          <input
                            type="number"
                            placeholder="거래단위를 입력하시오"
                            name="tran_unit"
                            className="form-control"
                            value={goods.tran_unit}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="input-group mt-3">
                          <span className="input-group-text">상품 상태 </span>
                          <select
                            placeholder="상품 상태를 선택하세요"
                            className="form-control"
                            name="goods_status"
                            value={goods.goods_status}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="0">0=준비중</option>
                            <option value="1">1=판매중</option>
                            <option value="9">9=판매중지</option>
                          </select>
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                          <button
                            className="btn btn-success btn-sm mx-1"
                            onClick={saveGoods}
                          >
                            등록하기
                          </button>
                          <button
                            className="btn btn-secondary btn-sm mx-1"
                            onClick={cancleClick}
                          >
                            돌아가기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GoodsWritePage;
