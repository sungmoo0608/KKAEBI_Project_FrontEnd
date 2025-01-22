import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import transactionService from "../services/TransactionService";
import { useAuth } from "./../components/context/AuthContext";
import TransactionSuccessPopup from "../components/modal/TransactionSuccessPopup";

const TransactionDepositPage = () => {
  //http://localhost:8282/api/transaction/invest_init?user_id=user1&goods_gubun=1&goods_code=1000

  const { goods_gubun, goods_code } = useParams();
  const { userId, isLoggedIn } = useAuth();

  const navigate = useNavigate();

  // 로그인된 사용자 정보가 URL의 user_id와 일치하는지 확인
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // 로그인 상태가 아니라면 로그인 페이지로 리디렉션
    } else if (!userId) {
      alert("고객 정보가 일치하지 않습니다."); // 고객 정보 불일치 시 알림
      goBack(); // 이전 페이지로 이동 (없을 경우 홈으로 이동)
    }
  }, [userId, isLoggedIn, navigate]);

  const initTransactionState = {};
  const [transaction, setTransaction] = useState(initTransactionState);
  const [showTransactionSuccessPopup, setTransactionSuccessPopup] =
    useState(false);

  useEffect(() => {
    const fetchTransaction = () => {
      console.log("Fetching transaction for:", userId, goods_gubun, goods_code);
      transactionService
        .getTransaction(userId, goods_gubun, goods_code)
        .then((response) => {
          console.log("Transaction data:", response.data); // 응답 데이터 확인
          setTransaction(response.data); // 받아온 데이터를 상태에 저장
        })
        .catch((error) => {
          console.error("Error :", error);
        });
    };

    if (goods_gubun && goods_code) {
      fetchTransaction(); // URL에서 값이 제대로 전달되면 API 호출
    }
  }, [goods_gubun, goods_code, userId]); // 빈 배열은 처음 한 번만 실행

  // 상태 관리
  const [investAmt, setInvestAmt] = useState("");
  const [interest, setInterest] = useState(0);
  const [haejiAmt, setHaejiAmt] = useState(0);

  // 이자 계산 함수
  const calculateInterest = () => {
    const curPrice = parseFloat(transaction.curprice);
    const periodMm = parseInt(transaction.period_mm, 10);
    const investAmount = parseFloat(investAmt);

    if (!investAmount || isNaN(investAmount) || investAmount <= 0) {
      alert("유효한 투자 금액을 입력해주세요.");
      return;
    }

    let calculatedInterest = 0;

    // 예치기간에 따른 이자 계산
    if (periodMm === 6) {
      calculatedInterest = Math.floor((curPrice / 100) * investAmount * 0.5);
    } else if (periodMm === 12) {
      calculatedInterest = Math.floor((curPrice / 100) * investAmount * 1.0);
    } else if (periodMm === 24) {
      calculatedInterest = Math.floor((curPrice / 100) * investAmount * 2.0);
    } else if (periodMm === 36) {
      calculatedInterest = Math.floor((curPrice / 100) * investAmount * 3.0);
    }

    setInterest(calculatedInterest);
    setHaejiAmt(investAmount + calculatedInterest);
  };

  const acceptanceClick = () => {
    const requestData = {
      user_id: transaction.user_id,
      goods_gubun: transaction.goods_gubun,
      goods_code: transaction.goods_code,
      invest_amt: investAmt, // 사용자가 입력한 투자 금액
      curprice: transaction.curprice,
      // 필요한 다른 데이터 추가 가능
    };

    transactionService
      .getTransactionResult(requestData)
      .then((respose) => {
        console.log(respose);
        setTransactionSuccessPopup(true);
        setTimeout(() => {
          setTransactionSuccessPopup(false);
          navigate(
            `/transaction/deposit/${transaction.goods_gubun}/${transaction.goods_code}/result`,
            { state: { transaction: respose.data } } // 여기에 상태를 전달
          );
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });

    /* axios 글 저장 */
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
                  <FontAwesomeIcon icon={faPenToSquare} />{" "}
                  {transaction.goods_gubun_nm} 거래 진행중
                </h3>
              </div>

              <div className="card-body">
                <div className="row mb-2">
                  <div className="container">
                    <div className="card border-0 bg-light mb-2 text-white bg-dark">
                      <div className="card-header border-0 ">
                        <h4 className="text-center font-weight-light">
                          {transaction.name}님{" "}
                          <FontAwesomeIcon icon={faPenToSquare} />{" "}
                          {transaction.goods_name}거래가 진행중입니다.
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-md-center mb-4">
                  <div className="col-xl-6 col-md-6 mb-6">
                    <div className="card h-100 bg-light">
                      <div className="card-header">
                        <FontAwesomeIcon icon={faUser} /> {transaction.name}
                      </div>
                      <div className="card-body">
                        <div className="input-group mb-3">
                          <span className="input-group-text">고객ID</span>
                          <input
                            className="form-control"
                            type="text"
                            value={transaction.user_id}
                            name="user_id"
                            disabled
                          ></input>
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">고객명</span>
                          <input
                            className="form-control"
                            type="text"
                            value={transaction.name}
                            name="name"
                            disabled
                          ></input>
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">상품명</span>
                          <input
                            className="form-control"
                            type="text"
                            value={transaction.goods_name}
                            name="goods_name"
                            disabled
                          ></input>
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">예치기간</span>
                          <input
                            className="form-control"
                            type="text"
                            value={transaction.period_mm}
                            name="period_mm"
                            disabled
                          ></input>
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-text">금리</span>
                          <input
                            className="form-control"
                            type="text"
                            value={transaction.curprice}
                            name="curprice"
                            disabled
                          ></input>
                        </div>

                        <div className="input-group mb-3">
                          <span className="input-group-text">예금금액</span>
                          <input
                            type="number"
                            id="invest_amt"
                            className="form-control"
                            name="invest_amt"
                            aria-describedby="basic-addon3"
                            value={investAmt || ""}
                            onChange={(e) => setInvestAmt(e.target.value)}
                          />
                          <span className="input-group-text">원</span>
                          <button
                            className="btn btn-info btn-sm"
                            onClick={calculateInterest}
                          >
                            이자 계산하기
                          </button>
                        </div>

                        <div className="input-group mb-3">
                          <span className="input-group-text">만기일자</span>
                          <input
                            className="form-control"
                            type="text"
                            value={transaction.mangi_date}
                            name="mangi_date"
                            disabled
                          ></input>
                        </div>

                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            만기시 이자금액
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            value={interest.toFixed(0)}
                            name="ija_amt"
                            disabled
                          ></input>
                          <span className="input-group-text">원</span>
                        </div>

                        <div className="input-group mb-3">
                          <span className="input-group-text">
                            만기시 수령금액
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            value={haejiAmt.toFixed(0)}
                            name="haeji_amt"
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
                    className="btn btn-success btn-sm"
                    onClick={acceptanceClick}
                  >
                    투자하기
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    style={{ marginLeft: "10px" }}
                    onClick={goBack}
                  >
                    돌아가기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showTransactionSuccessPopup && (
          <TransactionSuccessPopup message="투자 진행중입니다." />
        )}
      </main>
    </div>
  );
};

export default TransactionDepositPage;
