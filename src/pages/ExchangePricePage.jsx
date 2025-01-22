import React, { useEffect, useState } from "react";
import depositService from "../services/DepositService";
import basketService from "../services/BasketService";
import { Link, useNavigate, useParams } from "react-router-dom";
import GoodsMenu from "../components/layout/GoodsMenu";

const ExchangePricePage = () => {
  const initGoodsPriceState = {
    goods_code: "",
    goods_name: "",
    seqno: "",
    goods_gubun: "",
    goods_gubun_nm: "",
    provider_code: "",
    provider_code_nm: "",
    period_mm: "",
    job_gubun: "",
    curprice: "",
    befprice: "",
  };

  // path: "/boards/:bid/:name",
  // path: "/boards/:bid",
  // loader: () => "글 업데이트",
  // element: <BoardUpdatePage />,

  const { goods_code } = useParams();

  const [goods, setGoods] = useState(initGoodsPriceState);

  //처음 랜더링 하고, 한번만 타라
  useEffect(() => {
    basketService
      .getGoodsPrice(goods)
      .then((response) => {
        console.log(response);
        setGoods(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleInputChange = () => {
    const { name, value } = event.target;
    setGoods({ ...goods, [name]: value });
  };

  const updateGoodsPrice = () => {
    goods.job_gubun = 1;
    basketService
      .updateGoodsPrice(goods)
      .then((respose) => {
        console.log(respose);
        navigate(`/goods/exlist`);
      })
      .catch((error) => {
        console.log(error);
      });

    /* axios 글 저장 */
  };

  const navigate = useNavigate();

  const cancleClick = () => {
    navigate(`/goods/exlist`);
  };

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  외환 상품 환율 등록
                </h3>
                <GoodsMenu></GoodsMenu>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="container">
                    <div className="card border-0 bg-light mb-2 text-white bg-dark">
                      <div className="card-header border-0 ">
                        <h4 className="text-center font-weight-light">
                          {goods.goods_name} 정보
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl col-md-6">
                    <div className="card border-0 bg-light mb-4">
                      <div className="card-header border-0 py-1">상품명</div>
                      <div className="card-body py-1">
                        <input
                          type="number"
                          placeholder="상품명을 넣으시오"
                          name="goods_name"
                          className="form-control"
                          value={goods.goods_name}
                          onChange={handleInputChange}
                          readonly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl  col-md-6">
                    <div className="card border-0 bg-light mb-4">
                      <div className="card-header border-0 py-1">
                        기등록 환율
                      </div>
                      <div className="card-body py-1">
                        <input
                          type="number"
                          placeholder="기등록된 환율"
                          name="befprice"
                          className="form-control"
                          value={goods.befprice}
                          onChange={handleInputChange}
                          readonly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl  col-md-6">
                    <div className="card border-0 bg-light mb-4">
                      <div className="card-header border-0 py-1">
                        등록할 환율
                      </div>
                      <div className="card-body py-1">
                        <input
                          type="number"
                          placeholder="등록할 환율을 입력하세요"
                          name="curprice"
                          className="form-control"
                          value={goods.curprice}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="row justify-content-center">
                    <div className="col">
                      <button
                        className="btn btn-secondary btn-block m-1"
                        onClick={cancleClick}
                      >
                        목록 보기
                      </button>
                      <button
                        className="btn btn-outline-success btn-block m-1"
                        onClick={updateGoodsPrice}
                      >
                        금리 등록
                      </button>
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

export default ExchangePricePage;
