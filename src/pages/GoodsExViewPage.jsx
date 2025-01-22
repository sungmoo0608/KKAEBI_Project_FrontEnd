import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import exService from "../services/ExService";
import reviewService from "../services/ReviewService";
import LineChartUrlExchangeRate from "../components/chart/LineChartUrlExchangeRate";
import ReviewList from "../components/data/ReviewList";
import TransactionButton from "../components/button/TransactionButton";
import GoodsMenuButton from "../components/button/GoodsMenuButton";
import GoodsEditButton from "../components/button/GoodsEditButton";
import BasketAddButton from "../components/button/BasketAddButton";
import { useAuth } from "../components/context/AuthContext";
import GoodsPriceButton from "../components/button/GoodsPriceButton";

const GoodsExViewPage = () => {
  const { authorities, userId } = useAuth(); // 권한을 가져옵니다.
  const isAdmin = authorities.includes("ROLE_ADMIN");
  const initProductState = {};
  const initExchangerateState = [];
  const initProviderState = [];
  const initReviewState = []; // 후기 목록 초기 상태

  // path: "/boards/:bid/:name",
  // path: "/boards/:bid",
  // loader: () => "글 업데이트",
  // element: <BoardUpdatePage />,

  const { goods_code } = useParams();

  const [product, setProduct] = useState(initProductState);
  const [exchangerate, setExchangerate] = useState(initExchangerateState);
  const [providers, setProviders] = useState(initProviderState);
  const [reviews, setReviews] = useState(initReviewState); // 후기 상태 추가

  //처음 랜더링 하고, 한번만 타라
  useEffect(() => {
    exService
      .get(goods_code)
      .then((response) => {
        console.log(response);
        setProduct(response.data);
        setExchangerate(response.data.exchangerate || []);
        setProviders(response.data.provider || []);
      })
      .catch((e) => {
        console.log(e);
      });
    // 상품 코드에 해당하는 후기를 가져옵니다.
    reviewService
      .getList("/reviewr/list", goods_code) // 후기를 상품 코드로 가져옵니다.
      .then((response) => {
        console.log("Review List:", response.data);
        setReviews(response.data); // 후기를 상태에 저장
      })
      .catch((e) => {
        console.log(e);
      });
  }, [goods_code]);

  const navigate = useNavigate();

  const cancleClick = () => {
    navigate(`/goods/exlist`);
  };

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  외환 상품 상세 보기
                </h3>
                <GoodsMenuButton></GoodsMenuButton>
              </div>

              {product.goods_status !== 1 && !isAdmin ? (
                <>
                  <div className="container">
                    <div className="card border-0 bg-light m-4 text-white bg-dark">
                      <div className="card-header border-0">
                        <h4 className="text-center font-weight-light">
                          비활성화 된 상품입니다.
                        </h4>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="card-body">
                    <div className="row">
                      <div className="container">
                        <div className="card border-0 bg-light mb-2 text-white bg-dark">
                          <div className="card-header border-0 ">
                            <h4 className="text-center font-weight-light">
                              {product.goods_name} 정보
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="container my-3">
                        <LineChartUrlExchangeRate></LineChartUrlExchangeRate>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl col-md-6">
                        <div className="card border-0 bg-light mb-4">
                          <div className="card-header border-0 py-1">
                            상품명
                          </div>
                          <div className="card-body py-1">
                            {product.goods_name}
                          </div>
                        </div>
                      </div>

                      <div className="col-xl  col-md-6">
                        <div className="card border-0 bg-light mb-4">
                          <div className="card-header border-0 py-1">
                            외환 종류
                          </div>
                          <div className="card-body py-1">
                            {
                              // invest_gubun 값에 따라 출력할 텍스트 변경
                              product.forignexg_kind === 1
                                ? "KRW(한국 원화)"
                                : product.forignexg_kind === 2
                                ? "USD(미국 달러)"
                                : product.forignexg_kind === 3
                                ? "JPY(일본 엔)"
                                : product.forignexg_kind === 4
                                ? "EUR(유럽 유로)"
                                : product.forignexg_kind === 5
                                ? "CNY(중국 위안)"
                                : product.forignexg_kind === 6
                                ? "HKD(홍콩 달러)"
                                : product.forignexg_kind === 7
                                ? "THB(태국 바트)"
                                : product.forignexg_kind === 8
                                ? "VND(베트남 동)"
                                : product.forignexg_kind === 9
                                ? "AUD(호주 달러)"
                                : product.forignexg_kind === 10
                                ? "GBP(영국 파운드)"
                                : "알 수 없음" // 예외 처리: 다른 값이 올 경우
                            }
                          </div>
                        </div>
                      </div>

                      {/* 기준일 */}
                      {exchangerate.length > 0 && (
                        <div className="col-xl col-md-6">
                          <div className="card border-0 bg-light mb-4">
                            <div className="card-header border-0 py-1">
                              환율 적용 기준일
                            </div>
                            <div className="card-body py-1">
                              {exchangerate[0].base_date}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 판매 가격 */}
                      {exchangerate.length > 0 && (
                        <div className="col-xl col-md-6">
                          <div className="card border-0 bg-light mb-4">
                            <div className="card-header border-0 py-1">
                              환율
                            </div>
                            <div className="card-body py-1">
                              {exchangerate[0].exchange_rate}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 제공자 정보 */}
                      {providers.length > 0 && (
                        <div className="col-xl col-md-6">
                          <div className="card border-0 bg-light mb-4">
                            <div className="card-header border-0 py-1">
                              제공자
                            </div>
                            <div className="card-body py-1">
                              {providers[0].provider_name}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="col-xl  col-md-6">
                        <div className="card border-0 bg-light mb-4">
                          <div className="card-header border-0 py-1">
                            판매 상태
                          </div>
                          <div className="card-body py-1">
                            {
                              // product.goods_status 값에 따라 출력할 텍스트 변경
                              product.goods_status === 0
                                ? "판매중비중"
                                : product.goods_status === 1
                                ? "판매중"
                                : product.goods_status === 9
                                ? "판매중지"
                                : "알 수 없음" // 예외 처리: 다른 값이 올 경우
                            }
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 후기 목록 */}
                    <ReviewList reviews={reviews} />

                    <div className="text-center">
                      <div className="row justify-content-center">
                        <div className="col">
                          <button
                            className="btn btn-outline-secondary btn-block btn-sm mx-1"
                            onClick={goBack}
                          >
                            뒤로 가기
                          </button>
                          <button
                            className="btn btn-secondary btn-block btn-sm mx-1"
                            onClick={cancleClick}
                          >
                            목록 보기
                          </button>
                          {!isAdmin && (
                            <>
                              <BasketAddButton
                                goodsCode={product.goods_code}
                                userId={userId} // BasketAddButton에 userId 전달
                              />

                              <TransactionButton
                                goods_gubun={product.goods_gubun}
                                goods_code={product.goods_code}
                              />
                            </>
                          )}
                          <GoodsEditButton
                            goodsCode={product.goods_code}
                            goodsGubun={product.goods_gubun}
                          />
                          <GoodsPriceButton
                            goodsCode={product.goods_code}
                            goodsGubun={product.goods_gubun}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GoodsExViewPage;
