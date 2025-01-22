import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import perfomanceService from "../services/PerfomanceService";

const PerformanceListPage = () => {
  //http://localhost:8282/performancerest/performanceall_list
  const [userPerformances, setUserPerformances] = useState([]);

  useEffect(() => {
    console.log("use Effective 실행");
    initUserPerformances();
  }, []);

  const initUserPerformances = () => {
    perfomanceService
      .getList()
      .then((response) => {
        console.log(response);
        setUserPerformances(response.data);

        console.log(response.data.page);
      })
      .catch((e) => {
        console.log(e);
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
                  회원 거래 상세 보기
                </h3>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="container">
                    <div className="card border-0 bg-light mb-2 text-white bg-dark">
                      <div className="card-header border-0 ">
                        <h4 className="text-center font-weight-light">
                          고객 정보
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>고객ID</th>
                            <th>고객명</th>
                            <th>생년월일</th>
                            <th>가입일자</th>
                            <th>고객등급</th>
                            <th>투자금액</th>
                            <th>평가금액</th>
                            <th>투자손익</th>
                            <th>수익률(%)</th>
                            <th>상세보기</th>
                            <th>장바구니보기</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userPerformances.map((Data) => (
                            <tr key={Data.user_id}>
                              <td>{Data.user_id}</td>
                              <td>{Data.name}</td>
                              <td>{Data.birthday}</td>
                              <td>{Data.create_date}</td>
                              <td>{Data.grade}</td>
                              <td>{Data.trkwa_amt}</td>
                              <td>{Data.val_amt}</td>
                              <td>{Data.sonik_amt}</td>
                              <td>{Data.suik_rate}%</td>
                              <td>
                                <Link
                                  to={"/performance/customer/" + Data.user_id}
                                >
                                  <button className="btn btn-outline-info btn-block btn-sm">
                                    상세 보기
                                  </button>
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={"/performance/basketlist/" + Data.user_id}
                                >
                                  <button className="btn btn-outline-warning btn-block btn-sm">
                                    장바구니 보기
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {userPerformances.map((Data) => (
                    <div className="col-xl-4 col-md-6 mb-4" key={Data.user_id}>
                      <div className="card h-100 bg-light">
                        <div className="card-header">
                          <FontAwesomeIcon icon={faUser} /> {Data.name}
                        </div>
                        <div className="card-body">
                          <p className="m-0 p-0">
                            <span className="badge bg-dark">고객ID</span>{" "}
                            {Data.user_id}
                          </p>
                          <p className="m-0 p-0">
                            <span className="badge bg-dark">고객명</span>{" "}
                            {Data.name}
                          </p>
                          <p className="m-0 p-0">
                            <span className="badge bg-dark">생년월일</span>{" "}
                            {Data.birthday}
                          </p>
                          <p className="m-0 p-0">
                            <span className="badge bg-dark">가입일자</span>{" "}
                            {Data.create_date}
                          </p>
                          <p className="m-0 p-0">
                            <span className="badge bg-dark">고객등급</span>{" "}
                            {Data.grade}
                          </p>
                          <p className="m-0 p-0">
                            <span className="badge bg-dark">투자금액</span>{" "}
                            {Data.trkwa_amt}
                          </p>
                          <p className="m-0 p-0">
                            <span className="badge bg-dark">평가금액</span>{" "}
                            {Data.val_amt}
                          </p>
                          <p className="m-0 p-0">
                            <span className="badge bg-dark">투자 손익</span>{" "}
                            {Data.sonik_amt}
                          </p>
                          <p className="m-0 p-0">
                            <span className="badge bg-dark">수익률</span>{" "}
                            {Data.suik_rate}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerformanceListPage;
