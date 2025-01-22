import React, { useEffect, useState } from "react";
import stockService from "../services/StockService";
import { Link, useNavigate, useParams } from "react-router-dom";
import GoodsMenuButton from "../components/button/GoodsMenuButton";

const GoodsStockUpdatePage = () => {
  const initGoodsState = {
    goods_code: "",
    goods_gubun: "",
    provider_code: "",
    goods_name: "",
    orign_code: "",
    invest_gubun: "",
    tran_unit: "",
    goods_status: "",
  };

  // path: "/boards/:bid/:name",
  // path: "/boards/:bid",
  // loader: () => "글 업데이트",
  // element: <BoardUpdatePage />,

  const { goods_code } = useParams();

  const [goods, setGoods] = useState(initGoodsState);

  //처음 랜더링 하고, 한번만 타라
  useEffect(() => {
    stockService
      .get(goods_code)
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

  const updateGoods = () => {
    stockService
      .update(goods)
      .then((respose) => {
        console.log(respose);
        navigate(`/goods/stocklist`);
      })
      .catch((error) => {
        console.log(error);
      });

    /* axios 글 저장 */
  };

  const navigate = useNavigate();

  const cancleClick = () => {
    navigate(`/goods/stocklist`);
  };

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  주식 상품 수정 하기
                </h3>
                <GoodsMenuButton></GoodsMenuButton>
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
                      <div className="card-header border-0 py-1">종목명</div>
                      <div className="card-body py-1">
                        <input
                          type="text"
                          placeholder="종목명을 넣으시오"
                          name="goods_name"
                          className="form-control"
                          value={goods.goods_name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl  col-md-6">
                    <div className="card border-0 bg-light mb-4">
                      <div className="card-header border-0 py-1">종목코드</div>
                      <div className="card-body py-1">
                        <input
                          type="number"
                          placeholder="종목코드을 넣으시오"
                          name="orign_code"
                          className="form-control"
                          value={goods.orign_code}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl  col-md-6">
                    <div className="card border-0 bg-light mb-4">
                      <div className="card-header border-0 py-1">판매 여부</div>
                      <div className="card-body py-1">
                        <input
                          type="number"
                          placeholder="판매 여부를 선택하시오"
                          name="goods_status"
                          className="form-control"
                          value={goods.goods_status}
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
                        onClick={updateGoods}
                      >
                        상품 수정
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

export default GoodsStockUpdatePage;
