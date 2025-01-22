import React, { useEffect, useState } from "react";
import savingsService from "../services/SavingsService";
import { Link } from "react-router-dom";

const BasketListPage = () => {
  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  장바구니 목록
                </h3>
              </div>
              <div className="container mt-3">
                <div className="row mb-3">
                  <div className="col-10">
                    <div className="form-floating">
                      <select className="form-select" id="noSelect">
                        <option value="1">예금</option>
                        <option value="2">펀드</option>
                        <option value="3">외환</option>
                        <option value="4">주식</option>
                      </select>
                      <label htmlFor="noSelect">상품 유형 선택</label>
                    </div>
                  </div>
                  <div className="col-2">
                    <div>
                      <label htmlFor="search">
                        <button className="btn btn-secondary btn-block">
                          조회
                        </button>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>상품코드</th>
                        <th>상품명</th>
                        <th>상품제공기관</th>
                        <th>거치기관</th>
                        <th>금리</th>
                        <th>만기시 수령액</th>
                        <th>상세 보기</th>
                        <th>투자 하기</th>
                        <th>삭제</th>
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
                        <td>
                          <button className="btn btn-primary btn-block">
                            보기
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-success btn-block">
                            투자
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-danger btn-block">
                            삭제
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>상품코드</th>
                        <th>상품명</th>
                        <th>상품제공기관</th>
                        <th>펀드유형</th>
                        <th>금일 기준가</th>
                        <th>최근 3일 수익률</th>
                        <th>상세 보기</th>
                        <th>투자 하기</th>
                        <th>삭제</th>
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
                        <td>
                          <button className="btn btn-primary btn-block">
                            보기
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-success btn-block">
                            투자
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-danger btn-block">
                            삭제
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>상품코드</th>
                        <th>상품명</th>
                        <th>상품제공기관</th>
                        <th>외환명</th>
                        <th>현재 환율</th>
                        <th>환전시 외화</th>
                        <th>상세 보기</th>
                        <th>투자 하기</th>
                        <th>삭제</th>
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
                        <td>
                          <button className="btn btn-primary btn-block">
                            보기
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-success btn-block">
                            투자
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-danger btn-block">
                            삭제
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>상품 코드</th>
                        <th>종목명</th>
                        <th>종목 구분</th>
                        <th>투자 유형</th>
                        <th>현재 주가</th>
                        <th>매수시 주식수</th>
                        <th>상세 보기</th>
                        <th>투자 하기</th>
                        <th>삭제</th>
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
                        <td>
                          <button className="btn btn-primary btn-block">
                            보기
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-success btn-block">
                            투자
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-danger btn-block">
                            삭제
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default BasketListPage;
