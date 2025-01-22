import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import GoodsMenuButton from "../components/button/GoodsMenuButton";
import basketService from "../services/BasketService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare, faUser } from "@fortawesome/free-solid-svg-icons";

const GoodsFundPricePage = () => {
  const initGoodsPriceState = {};

  // path: "/boards/:bid/:name",
  // path: "/boards/:bid",
  // loader: () => "글 업데이트",
  // element: <BoardUpdatePage />,

  const { goods_code } = useParams();
  const location = useLocation();

  const getGoodsGubun = () => {
    return 2; // 강제로 2번 반환
  };

  const [goods, setGoods] = useState(initGoodsPriceState);

  //처음 랜더링 하고, 한번만 타라
  useEffect(() => {
    const goods_gubun = getGoodsGubun();
    basketService
      .getGoodsPrice({ goods_gubun, goods_code })
      .then((response) => {
        console.log(response);
        setGoods(response.data); // 응답 받은 데이터로 goods 상태 업데이트
      })
      .catch((e) => {
        console.log(e);
      });
  }, [goods_code, location.pathname]);

  const handleInputChange = () => {
    const { name, value } = event.target;
    setGoods({ ...goods, [name]: value });
  };

  const updateGoodsPrice = () => {
    goods.job_gubun = 1;
    if (goods.befprice > 0) {
      goods.job_gubun = 2;
    }

    const dataToUpdate = {
      goods_gubun: getGoodsGubun(),
      goods_code: goods.goods_code,
      tr_price: goods.curprice,
      job_gubun: goods.job_gubun,
    };

    basketService
      .updateGoodsPrice(dataToUpdate)
      .then((respose) => {
        console.log(respose);
        navigate(`/goods/fundlist/update/${goods.goods_code}/result`, {
          state: { goods },
        });
      })
      .catch((error) => {
        console.log(error);
      });

    /* axios 글 저장 */
  };

  const navigate = useNavigate();

  const cancleClick = () => {
    navigate(`/goods/fundlist`);
  };

  // 이전 페이지로 돌아가기, 없으면 홈으로 리디렉션
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
                  {goods.goods_name} 기준가 등록/변경
                </h3>
                <GoodsMenuButton></GoodsMenuButton>
              </div>

              <div className="card-body">
                <div className="row justify-content-md-center mb-4">
                  <div className="col-xl-6 col-md-6 mb-6">
                    <div className="card h-100 bg-light">
                      <div className="card-header bg-dark text-white text-center">
                        <h4 className="text-center font-weight-light m-0 p-0">
                          <FontAwesomeIcon icon={faPencilSquare} /> 기준가 변경
                          진행중입니다.
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
                          <span className="input-group-text">상품명</span>
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
                            기존 등록된 기준가
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            value={goods.befprice}
                            name="befprice"
                            disabled
                          ></input>
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            등록할 기준가
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            value={goods.curprice}
                            onChange={handleInputChange}
                            name="curprice"
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-outline-secondary btn-sm mx-1"
                    onClick={goBack}
                  >
                    돌아가기
                  </button>
                  <button
                    className="btn btn-secondary btn-block btn-sm mx-1"
                    onClick={cancleClick}
                  >
                    목록 보기
                  </button>
                  <button
                    className="btn btn-outline-success btn-block btn-sm mx-1"
                    onClick={updateGoodsPrice}
                  >
                    기준가 등록
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GoodsFundPricePage;
