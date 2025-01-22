import { faHandshake, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TransactionExResultPage = () => {
  // React Router의 useLocation을 통해 URL에서 전달된 데이터를 가져옵니다.
  const location = useLocation();
  const transaction = location.state?.transaction; // 이전 페이지에서 state로 전달된 transaction 데이터
  const navigate = useNavigate(); // navigate를 사용해 페이지 이동

  // 데이터가 없으면, 빈 페이지를 반환하거나 에러 페이지를 처리할 수 있습니다.
  if (!transaction) {
    return <div>잘못된 요청입니다.</div>;
  }

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  <FontAwesomeIcon icon={faHandshake} />{" "}
                  {transaction.goods_gubun_nm} 거래 완료
                </h3>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="container">
                    <div className="card border-0 bg-light mb-2 text-white bg-dark">
                      <div className="card-header border-0 ">
                        <h4 className="text-center font-weight-light">
                          {transaction.name}님{" "}
                          <FontAwesomeIcon icon={faHandshake} />{" "}
                          {transaction.goods_name}거래가 완료 되었습니다.
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-md-center mb-2">
                  <div className="col-xl-6 col-md-6 mb-6">
                    <div className="card h-100 bg-light">
                      <div className="card-header">
                        <FontAwesomeIcon icon={faUser} /> {transaction.name}
                      </div>

                      <div className="card-body">
                        <div class="input-group mb-3">
                          <span className="input-group-text">고객ID</span>
                          <input
                            className="form-control"
                            type="text"
                            value={transaction.user_id}
                            name="user_id"
                            readonly
                            disabled
                          ></input>
                        </div>
                        <div class="input-group mb-3">
                          <span className="input-group-text">고객명</span>
                          <input
                            className="form-control"
                            type="text"
                            value={transaction.name}
                            name="name"
                            readonly
                            disabled
                          ></input>
                        </div>
                        <div class="input-group mb-3">
                          <span className="input-group-text">계좌번호</span>
                          <input
                            className="form-control"
                            type="text"
                            value={transaction.account_no}
                            name="name"
                            readonly
                            disabled
                          ></input>
                        </div>
                        <div class="input-group mb-3">
                          <span className="input-group-text">거래번호 </span>
                          <input
                            className="form-control"
                            type="text"
                            value={transaction.tr_seqno}
                            name="name"
                            readonly
                            disabled
                          ></input>
                        </div>
                        <div class="input-group mb-3">
                          <span className="input-group-text">상품명</span>
                          <input
                            className="form-control"
                            type="text"
                            value={transaction.goods_name}
                            name="goods_name"
                            readonly
                            disabled
                          ></input>
                        </div>

                        <div class="input-group mb-3">
                          <span className="input-group-text">환율</span>
                          <input
                            type="number"
                            id="curprice"
                            className="form-control"
                            name="curprice"
                            aria-describedby="basic-addon3"
                            value={transaction.curprice}
                            readonly
                            disabled
                          />
                          <span class="input-group-text">원</span>
                        </div>

                        <div class="input-group mb-3">
                          <span className="input-group-text">투자 금액</span>
                          <input
                            className="form-control"
                            type="text"
                            name="tr_amt"
                            value={transaction.tr_amt}
                            readonly
                            disabled
                          ></input>
                          <span class="input-group-text">원</span>
                        </div>

                        <div class="input-group mb-3">
                          <span className="input-group-text">환전 외화</span>
                          <input
                            className="form-control"
                            type="text"
                            name="trforign_amt"
                            value={transaction.trforign_amt}
                            readonly
                            disabled
                          ></input>
                          <span class="input-group-text">
                            {transaction.goods_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <Link to={"/goods/exlist"}>
                    <button className="btn btn-success btn-sm">
                      상품 목록
                    </button>
                  </Link>
                  <Link to={"/myinfo/performance"}>
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

export default TransactionExResultPage;
