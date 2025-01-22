import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DepositPagingnation from "../components/paging/DepositPagingnation";
import allGoodsService from "../services/AllGoodsService";
import GoodsMenuButton from "../components/button/GoodsMenuButton";
import GoodsStatusModal from "../components/modal/GoodsStatusModal";
import GoodsStatusButton from "../components/button/GoodsStatusButton";
import TransactionButton from "../components/button/TransactionButton";
import { useAuth } from "../components/context/AuthContext";
import GoodsViewButton from "../components/button/GoodsViewButton";
import BasketAddButton from "../components/button/BasketAddButton";
import GoodsPriceButton from "./../components/button/GoodsPriceButton";

const AllGoodsListPage = () => {
  //http://localhost:8282/goodsrest/Alllist
  const { authorities, userId } = useAuth(); // 권한을 가져옵니다.
  const isAdmin = authorities.includes("ROLE_ADMIN");

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
    allGoodsService
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

    allGoodsService
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
                  모든 상품 목록
                </h3>
                <GoodsMenuButton></GoodsMenuButton>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover text-center">
                    <thead>
                      <tr>
                        <th>상품코드</th>
                        <th>상품유형</th>
                        <th>상품공급자</th>
                        <th>상품명</th>
                        {!isAdmin && <th>장바구니</th>}
                        {!isAdmin && <th>투자하기</th>}
                        <th>상품보기</th>
                        {isAdmin && <th>기준가등록</th>}
                        {isAdmin && <th>판매상태</th>}
                      </tr>
                    </thead>

                    <tbody>
                      {goods &&
                        goods
                          .filter((goodsItem) => {
                            // ROLE_USER일 경우, 상품 상태가 1인 경우만 필터링
                            if (
                              !isAdmin &&
                              goodsItem.goods.goods_status !== 1
                            ) {
                              return false;
                            }
                            return true;
                          })
                          .map((goodsItem) => (
                            <tr key={goodsItem.goods.goods_code}>
                              <td>{goodsItem.goods.goods_code}</td>
                              <td>
                                {
                                  // goods_gubun 값에 따라 출력할 텍스트 변경
                                  goodsItem.goods.goods_gubun === 1
                                    ? "예금"
                                    : goodsItem.goods.goods_gubun === 2
                                    ? "펀드"
                                    : goodsItem.goods.goods_gubun === 3
                                    ? "외환"
                                    : goodsItem.goods.goods_gubun === 4
                                    ? "주식"
                                    : "알 수 없음" // 예외 처리: 다른 값이 올 경우
                                }
                              </td>
                              <td>{goodsItem.provider.provider_name}</td>
                              <td>{goodsItem.goods.goods_name}</td>
                              {!isAdmin && (
                                <>
                                  <td>
                                    <BasketAddButton
                                      goodsCode={goodsItem.goods.goods_code}
                                      userId={userId} // BasketAddButton에 userId 전달
                                    />
                                  </td>

                                  <td>
                                    <TransactionButton
                                      goods_gubun={goodsItem.goods.goods_gubun}
                                      goods_code={goodsItem.goods.goods_code}
                                    />
                                  </td>
                                </>
                              )}
                              <td>
                                <GoodsViewButton
                                  goodsCode={goodsItem.goods.goods_code}
                                  goodsGubun={goodsItem.goods.goods_gubun}
                                />
                              </td>
                              {isAdmin && (
                                <td>
                                  <GoodsPriceButton
                                    goodsCode={goodsItem.goods.goods_code}
                                    goodsGubun={goodsItem.goods.goods_gubun}
                                  />
                                </td>
                              )}
                              {isAdmin && (
                                <>
                                  <td>
                                    <GoodsStatusButton
                                      goodsStatus={goodsItem.goods.goods_status}
                                      onClick={() => handleShowModal(goodsItem)}
                                    />
                                  </td>
                                </>
                              )}
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

export default AllGoodsListPage;
