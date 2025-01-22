import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DepositPagingnation from "../components/paging/DepositPagingnation";
import allGoodsService from "../services/AllGoodsService";
import stockService from "../services/StockService";
import GoodsMenu from "../components/layout/GoodsMenu";
import GoodsStatusModal from "../components/modal/GoodsStatusModal";
import GoodsStatusButton from "../components/button/GoodsStatusButton";
import TransactionButton from "../components/button/TransactionButton";
import StockTradeRankBig4 from "../components/data/StockTradeRankBig4";

const StockListPage = () => {
  //http://localhost:8282/goodsrest/Stocklist
  const [goods, setGoods] = useState([]);
  const [paging, setPaging] = useState(null);
  const [showModal, setShowModal] = useState(false); // 모달 관련 상태 관리
  const [selectedGoods, setSelectedGoods] = useState(null);
  const [status, setStatus] = useState(0); // 상태 선택 (0: 준비중, 1: 판매중, 9: 판매중지)

  useEffect(() => {
    console.log("use Effective 실행");
    initProduct();
  }, []);

  const initProduct = () => {
    stockService
      .getList()
      .then((response) => {
        console.log(response);
        setGoods(response.data);
        setPaging(response.data.page);

        console.log(response.data.page);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleShowModal = (goodsItem) => {
    setSelectedGoods(goodsItem);
    setStatus(goodsItem.goods.goods_status); // 현재 상품 상태로 초기화
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveStatus = () => {
    if (selectedGoods) {
      allGoodsService
        .updateStatus(selectedGoods.goods.goods_code, status)
        .then((response) => {
          console.log("상태 업데이트 성공:", response);
          setShowModal(false);
          initProduct(); // 상태 변경 후 상품 목록을 다시 로드
        })
        .catch((error) => {
          console.error("상태 업데이트 실패:", error);
        });
    }
  };

  const onClickPaging = (e) => {
    e.preventDefault(); //기존에 링크 동작을 하지 말아라

    console.log(e.target.pathname);
    console.log(e.target.search);

    stockService
      .getList(e.target.pathname, e.target.search)
      .then((response) => {
        setGoods(response.data);
        setPaging(response.data.page);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  주식 상품 목록
                </h3>
                <GoodsMenu></GoodsMenu>
                <StockTradeRankBig4></StockTradeRankBig4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover text-center">
                    <thead>
                      <tr>
                        <th>상품코드</th>
                        <th>종목명</th>
                        <th>상품제공기관</th>
                        <th>현재 주가</th>
                        <th>투자 하기</th>
                        <th>상품 보기</th>
                        <th>수정 하기</th>
                        <th>판매 여부</th>
                      </tr>
                    </thead>

                    <tbody>
                      {goods &&
                        goods.map((goodsItem) => (
                          <tr key={goodsItem.goods.goods_code}>
                            <td>{goodsItem.goods.goods_code}</td>
                            <td>{goodsItem.goods.goods_name}</td>
                            <td>{goodsItem.provider.provider_name}</td>
                            <td>{goodsItem.stockprice.stock_price}</td>
                            <td>
                              <TransactionButton
                                goods_gubun={goodsItem.goods.goods_gubun}
                                goods_code={goodsItem.goods.goods_code}
                              />
                            </td>
                            <td>
                              <Link
                                to={
                                  "/goods/stocklist/" +
                                  goodsItem.goods.goods_code
                                }
                              >
                                <button className="btn btn-outline-info btn-block btn-sm">
                                  상품 보기
                                </button>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={
                                  "/goods/stocklist/modify/" +
                                  goodsItem.goods.goods_code
                                }
                              >
                                <button className="btn btn-outline-warning btn-block btn-sm">
                                  수정 하기
                                </button>
                              </Link>
                            </td>
                            <td>
                              <GoodsStatusButton
                                goodsStatus={goodsItem.goods.goods_status}
                                onClick={() => handleShowModal(goodsItem)}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* 페이징           */}
                {/* {paging != null ? (
                  <DepositPagingnation
                    paging={paging}
                    onClickPaging={onClickPaging}
                  ></DepositPagingnation>
                ) : null} */}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* 상품 상태 변경 모달 */}
      <GoodsStatusModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSaveStatus={handleSaveStatus}
        status={status}
        setStatus={setStatus}
      />
    </div>
  );
};

export default StockListPage;
