import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import GoodsMenuButton from "../components/button/GoodsMenuButton";
import basketService from "../services/BasketService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";

const GoodStockPriceResultPage = () => {
  // React Router의 useLocation을 통해 URL에서 전달된 데이터를 가져옵니다.
  const location = useLocation();
  const goods = location.state?.goods; // 이전 페이지에서 state로 전달된 goods 데이터
  const navigate = useNavigate(); // navigate를 사용해 페이지 이동

  // 데이터가 없으면, 빈 페이지를 반환하거나 에러 페이지를 처리할 수 있습니다.
  if (!goods) {
    return <div>잘못된 요청입니다.</div>;
  }

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // 이전 페이지로 이동
    } else {
      navigate("/"); // 이전 페이지가 없으면 홈으로 이동
    }
  };

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  {goods.goods_name} 주가 변경 완료
                </h3>
                <GoodsMenuButton></GoodsMenuButton>
              </div>
              <div className="card-body">
                <div className="row justify-content-md-center mb-4">
                  <div className="col-xl-6 col-md-6 mb-6">
                    <div className="card h-100 bg-light">
                      <div className="card-header bg-dark text-white text-center">
                        <h4 className="text-center font-weight-light m-0 p-0">
                          <FontAwesomeIcon icon={faPencilSquare} />{" "}
                          {goods.goods_name} 주가 변경 완료 되었습니다.
                        </h4>
                      </div>
                      <div className="card-body">
                        <div className="input-group mb-3">
                          <span className="input-group-text">상품 코드</span>
                          <input
                            className="form-control"
                            type="text"
                            value={goods.goods_code}
                            name="goods_code"
                            disabled
                          ></input>
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">상품 유형</span>
                          <input
                            className="form-control"
                            type="text"
                            value={goods.goods_gubun_nm}
                            name="goods_gubun_nm"
                            disabled
                          ></input>
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            상품 제공 기관
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            value={goods.provider_nm}
                            name="provider_nm"
                            disabled
                          ></input>
                        </div>

                        <div className="input-group mb-3">
                          <span className="input-group-text">주식 종목</span>
                          <input
                            className="form-control"
                            type="text"
                            value={goods.goods_name}
                            name="goods_name"
                            disabled
                          ></input>
                        </div>

                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            기존 등록된 주가
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            value={goods.befprice}
                            name="befprice"
                            disabled
                          ></input>
                          <span className="input-group-text">원</span>
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">등록된 주가</span>
                          <input
                            className="form-control"
                            type="text"
                            value={goods.curprice}
                            name="curprice"
                            disabled
                          ></input>
                          <span className="input-group-text">원</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-danger btn-sm btn-sm mx-1"
                    onClick={goBack}
                  >
                    돌아가기
                  </button>
                  <Link to={"/goods/stocklist"}>
                    <button className="btn btn-success btn-sm mx-1">
                      상품 목록
                    </button>
                  </Link>
                  <Link to={"/performance/list"}>
                    <button className="btn btn-warning btn-sm mx-1">
                      거래 현황
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GoodStockPriceResultPage;
