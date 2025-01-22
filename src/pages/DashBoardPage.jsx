import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faChartArea,
  faChartBar,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import savingsService from "../services/SavingsService";
import { Link } from "react-router-dom";

const DashBoardPage = () => {
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
                  <div className="col-xl col-md-6">
                    <div className="card border-0 bg-light mb-4">
                      <div className="card-header border-0 py-1">고객ID</div>
                      <div className="card-body py-1">APT APT</div>
                    </div>
                  </div>
                  <div className="col-xl  col-md-6">
                    <div className="card border-0 bg-light mb-4">
                      <div className="card-header border-0 py-1">고객명</div>
                      <div className="card-body py-1">이로제</div>
                    </div>
                  </div>
                  <div className="col-xl  col-md-6">
                    <div className="card border-0 bg-light mb-4">
                      <div className="card-header border-0 py-1">회원등급</div>
                      <div className="card-body py-1">S등급</div>
                    </div>
                  </div>
                  <div className="col-xl col-md-6">
                    <div className="card border-0 bg-light mb-4">
                      <div className="card-header border-0 py-1">투자금액</div>
                      <div className="card-body py-1">60,000,000원</div>
                    </div>
                  </div>
                  <div className="col-xl col-md-6">
                    <div className="card border-0 bg-light mb-4">
                      <div className="card-header border-0 py-1">평가금액</div>
                      <div className="card-body py-1">66,000,000원</div>
                    </div>
                  </div>
                  <div className="col-xl col-md-6">
                    <div className="card border-0 bg-light mb-4">
                      <div className="card-header border-0 py-1">투자 손익</div>
                      <div className="card-body py-1">6,000,000원</div>
                    </div>
                  </div>
                  <div className="col-xl col-md-12">
                    <div className="card border-0 bg-light mb-4">
                      <div className="card-header border-0 py-1">수익률</div>
                      <div className="card-body py-1">10.0%</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl">
                    <div className="card border-0 bg-light mb-2 text-white bg-dark">
                      <div className="card-header border-0">
                        <h4 className="text-center font-weight-light">
                          투자 요약
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
                            <th>상품 유형</th>
                            <th>투자 건수</th>
                            <th>투자 원금</th>
                            <th>평가 금액</th>
                            <th>투자 손익</th>
                            <th>수익률</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                          </tr>
                          <tr>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>임의값1</td>
                          </tr>
                          <tr>
                            <td>임의값2</td>
                            <td>임의값2</td>
                            <td>임의값2</td>
                            <td>임의값2</td>
                            <td>임의값2</td>
                            <td>임의값2</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl">
                    <div className="card border-0 bg-light mb-2 text-white bg-dark">
                      <div className="card-header border-0">
                        <h4 className="text-center font-weight-light">
                          투자 상세
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
                            <th>상품 유형</th>
                            <th>상품제공사</th>
                            <th>상품명</th>
                            <th>투자 기간(월)</th>
                            <th>투자 일자</th>
                            <th>만기 일자</th>
                            <th>투자 원금</th>
                            <th>투자 자산</th>
                            <th>평가 금액</th>
                            <th>투자 손익</th>
                            <th>수익률</th>
                            <th>리뷰 보기</th>
                            <th>리뷰 작성</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>
                              <button className="btn btn-primary btn-block">
                                보기
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-success btn-block">
                                작성
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>임의값1</td>
                            <td>
                              <button className="btn btn-primary btn-block">
                                보기
                              </button>
                            </td>
                            <td>
                              <button className="btn btn-success btn-block">
                                작성
                              </button>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>합계</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td>임의값</td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    // <!-- /.container-fluid -->);
  );
};

export default DashBoardPage;
