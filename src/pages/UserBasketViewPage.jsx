import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import basketService from "../services/BasketService";
import { useAuth } from "../components/context/AuthContext";

const UserBasketViewPage = () => {
  //http://localhost:8282/performancerest/customer?user_id=

  const { userId } = useAuth();

  const initBasketState = [];
  const initDetailState = [];

  const [basket, setBaskets] = useState(initBasketState);
  const [basketDetails, setBasketDetails] = useState(initDetailState);
  const [hiddenCategories, setHiddenCategories] = useState(new Set());

  //처음 랜더링 하고, 한번만 타라
  useEffect(() => {
    basketService
      .getBasketList(userId) // 장바구니 목록 가져오기
      .then((response) => {
        console.log(response);
        setBaskets(response.data);

        // 모든 goods_gubun에 대해 세부 정보를 가져오는 API 요청 배열 생성
        const fetchAllDetails = response.data.map((item) =>
          basketService.getBasketDetail(userId, item.goods_gubun)
        );

        // Promise.all로 모든 요청을 병렬로 처리
        Promise.all(fetchAllDetails)
          .then((responses) => {
            const allDetails = responses.map((res) => res.data);
            setBasketDetails(allDetails); // 모든 세부 정보를 상태에 저장
          })
          .catch((e) => {
            console.log("세부 정보를 가져오는 중 오류 발생:", e);
          });
      })
      .catch((e) => {
        console.log("장바구니 목록을 가져오는 중 오류 발생:", e);
      });
  }, [userId]);

  // "분류" 버튼 클릭 시 토글 방식으로 설정
  const handleButtonClick = (goodsGubun) => {
    setHiddenCategories((prev) => {
      const updated = new Set(prev);
      if (updated.has(goodsGubun)) {
        updated.delete(goodsGubun); // Remove from hidden categories
      } else {
        updated.add(goodsGubun); // Add to hidden categories
      }
      return updated;
    });
  };

  // 필터링된 상세 정보
  const filteredDetail = basketDetails
    .flat()
    .filter((item) => !hiddenCategories.has(item.goods_gubun_nm));

  // 장바구니 삭제
  const handleDeleteClick = (seq_no) => {
    const data = { userId, seq_no };

    // UI에서 바로 항목 제거 (Optimistic Update)
    const updatedDetails = basketDetails
      .flat()
      .filter((detail) => detail.seq_no !== seq_no); // 삭제된 항목을 UI에서 제거

    setBasketDetails(updatedDetails); // 상태를 즉시 업데이트

    // 서버에 삭제 요청을 보냄
    basketService
      .getBasketDelete(data)
      .then((response) => {
        console.log("삭제 성공", response);

        // 삭제 후 장바구니 목록을 다시 불러올 수 있음 (옵션)
        basketService.getBasketList(userId).then((response) => {
          setBaskets(response.data); // 장바구니 목록 새로 업데이트
        });
      })
      .catch((e) => {
        console.log("삭제 오류", e);

        // 서버 요청 실패 시, UI에서 항목 복원 (비관적 업데이트 취소)
        setBasketDetails(basketDetails);
      });
  };

  //상품유형에 따른 링크값
  const getLinkForGoodsGubun = (goods_gubun_nm, goods_code) => {
    if (!goods_code) {
      console.log("No goods_code provided:", goods_code); // 디버깅을 위한 로그
      return "#"; // Invalid goods_code일 경우 fallback
    }

    let link = "#"; // 기본값
    switch (goods_gubun_nm) {
      case "예금":
        link = `/goods/depositlist/${goods_code}`;
        break;
      case "펀드":
        link = `/goods/fundlist/${goods_code}`;
        break;
      case "외화":
        link = `/goods/exlist/${goods_code}`;
        break;
      case "주식":
        link = `/goods/stocklist/${goods_code}`;
        break;
      default:
        console.log("Unknown goods_gubun:", goods_gubun_nm); // 디버깅을 위한 로그
        link = "#"; // 기본값
    }

    console.log("Generated Link:", link); // 디버깅을 위한 로그
    return link;
  };

  //상품유형에 투자값
  const getLinkForTransaction = (goods_gubun, goods_code) => {
    if (!goods_code) {
      console.log("No goods_code provided:", goods_code); // 디버깅을 위한 로그
      return "#"; // Invalid goods_code일 경우 fallback
    }

    let link = "#"; // 기본값
    switch (goods_gubun) {
      case "1":
        link = `/transaction/deposit/${goods_gubun}/${goods_code}`;
        break;
      case "2":
        link = `/transaction/fund/${goods_gubun}/${goods_code}`;
        break;
      case "3":
        link = `/transaction/exchange/${goods_gubun}/${goods_code}`;
        break;
      case "4":
        link = `/transaction/stock/${goods_gubun}/${goods_code}`;
        break;
      default:
        console.log("Unknown goods_gubun:", goods_gubun); // 디버깅을 위한 로그
        link = "#"; // 기본값
    }

    console.log("Generated Link:", link); // 디버깅을 위한 로그
    return link;
  };

  const navigate = useNavigate();

  // 이전 페이지로 이동
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  <FontAwesomeIcon icon={faUser} />
                  &nbsp;{userId} 장바구니 현황
                </h3>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="container">
                    <div className="card border-0 bg-light mb-2 text-white bg-dark">
                      <div className="card-header border-0 ">
                        <h4 className="text-center font-weight-light">
                          <FontAwesomeIcon icon={faCartShopping} /> 상품 유형별
                          장바구니 현황
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl">
                    <div className="table-responsive">
                      <table className="table table-hover text-center">
                        <thead>
                          <tr>
                            <th>상품 유형</th>
                            <th>등록 건수</th>
                          </tr>
                        </thead>
                        <tbody>
                          {basket.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item.goods_gubun_nm}{" "}
                                <button
                                  className="btn btn-outline-info btn-block btn-sm"
                                  onClick={() =>
                                    handleButtonClick(item.goods_gubun_nm)
                                  }
                                >
                                  {hiddenCategories.has(item.goods_gubun_nm)
                                    ? "해제"
                                    : "숨기기"}
                                </button>
                              </td>
                              <td>{item.cnt}</td>
                              <td></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* 상세 정보 표시 */}
                {filteredDetail.length > 0 && (
                  <div className="row">
                    <div className="container">
                      <div className="card border-0 bg-light mb-2 text-white bg-dark">
                        <div className="card-header border-0 ">
                          <h4 className="text-center font-weight-light">
                            <FontAwesomeIcon icon={faCartShopping} /> 상품별
                            장바구니 상세 현황
                          </h4>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-hover text-center">
                          <thead>
                            <tr>
                              <th>상품유형</th>
                              <th>상품명</th>
                              <th>예금기간</th>
                              <th>예금만기일</th>
                              <th>예금금리</th>
                              <th>펀드기준가</th>
                              <th>외화 환율</th>
                              <th>주식 주가</th>
                              <th>상품보기</th>
                              <th>삭제하기</th>
                              <th>투자하기</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredDetail.map((detail, index) => (
                              <tr key={index}>
                                <td>{detail.goods_gubun_nm}</td>
                                <td>{detail.goods_name}</td>
                                <td>{detail.period_mm}</td>
                                <td>{detail.mangi_date}</td>
                                <td>{detail.iyul}</td>
                                <td>{detail.baseprice}</td>
                                <td>{detail.exchangeprice}</td>
                                <td>{detail.stockprice}</td>
                                <td>
                                  <Link
                                    to={getLinkForGoodsGubun(
                                      detail.goods_gubun_nm,
                                      detail.goods_code
                                    )}
                                  >
                                    <button className="btn btn-success btn-block btn-sm">
                                      상품보기
                                    </button>
                                  </Link>
                                </td>

                                <td>
                                  <button
                                    className="btn btn-outline-danger btn-block btn-sm"
                                    onClick={() =>
                                      handleDeleteClick(detail.seq_no)
                                    }
                                  >
                                    삭제하기
                                  </button>
                                </td>

                                <td>
                                  <Link
                                    to={getLinkForTransaction(
                                      detail.goods_gubun,
                                      detail.goods_code
                                    )}
                                  >
                                    <button className="btn btn-outline-info btn-block btn-sm">
                                      투자하기
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                <div className="row text-center px-0 mx-0">
                  <div className="col">
                    <button
                      className="btn btn-outline-secondary btn-sm m-1"
                      onClick={goBack}
                    >
                      뒤로 가기
                    </button>
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

export default UserBasketViewPage;
