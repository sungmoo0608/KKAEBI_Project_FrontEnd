import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import perfomanceService from "../services/PerfomanceService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faUser } from "@fortawesome/free-solid-svg-icons";

const PerformanceViewPage = () => {
  //http://localhost:8282/performancerest/customer?user_id=
  const initPerformanceCustomerSummaryListState = [];
  const initPerformanceCustomerDetailListState = [];

  const { user_id } = useParams();

  const [summary, setPerformanceCustomerSummaryList] = useState(
    initPerformanceCustomerSummaryListState
  );
  const [detail, setPerformanceCustomerDetailList] = useState(
    initPerformanceCustomerDetailListState
  );
  const [visibleCategories, setVisibleCategories] = useState({
    예금: false,
    펀드: false,
    외환: false,
    주식: false,
  });

  //처음 랜더링 하고, 한번만 타라
  useEffect(() => {
    perfomanceService
      .getPerformanceCustomerSummary(user_id)
      .then((response) => {
        console.log(response);
        setPerformanceCustomerSummaryList(
          response.data.PerformanceCustomerSummaryList || []
        );
        setPerformanceCustomerDetailList(
          response.data.PerformanceCustomerDetailList || []
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user_id]);

  const handleButtonClick = (category) => {
    setVisibleCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const filteredDetail = detail.filter((item) =>
    visibleCategories[item.goods_gubun_nm] ? true : false
  );

  const navigate = useNavigate();

  const cancleClick = () => {
    navigate(`/performance/list`);
  };
  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  <FontAwesomeIcon icon={faUser} />{" "}
                  {summary.length > 0 ? summary[0].name : "고객명 없음"} 투자
                  현황
                </h3>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="container">
                    <div className="card border-0 bg-light mb-2 text-white bg-dark">
                      <div className="card-header border-0 ">
                        <h4 className="text-center font-weight-light">
                          <FontAwesomeIcon icon={faChartColumn} />{" "}
                          {summary.length > 0 ? summary[0].name : "고객명 없음"}{" "}
                          상품 유형별 투자 현황
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
                            <th>상품 유형 </th>
                            <th>투자 건수</th>
                            <th>투자 원금</th>
                            <th>평가 금액</th>
                            <th>투자 손익</th>
                            <th>수익률(%)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {summary.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item.goods_gubun_nm}
                                <button
                                  className={`btn btn-sm mx-1 ${
                                    visibleCategories[item.goods_gubun_nm]
                                      ? "btn-secondary"
                                      : "btn-success"
                                  }`}
                                  onClick={() =>
                                    handleButtonClick(item.goods_gubun_nm)
                                  }
                                >
                                  {visibleCategories[item.goods_gubun_nm]
                                    ? "숨기기"
                                    : "보기"}
                                </button>
                              </td>
                              <td>{item.cnt}</td>
                              <td>{item.trkwa_amt}</td>
                              <td>{item.val_amt}</td>
                              <td>{item.sonik_amt}</td>
                              <td>{item.suik_rate}</td>
                            </tr>
                          ))}
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
                          <FontAwesomeIcon icon={faChartColumn} />{" "}
                          {summary.length > 0 ? summary[0].name : "고객명 없음"}{" "}
                          상품별 투자 상세 현황
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
                            <th>상품명</th>
                            <th>예치 기간</th>
                            <th>이율</th>
                            <th>투자 일자</th>
                            <th>만기 일자</th>
                            <th>투자 금액</th>
                            <th>상품 수량</th>
                            <th>평가 금액</th>
                            <th>투자 손익</th>
                            <th>수익률</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDetail.map((item, index) => (
                            <tr key={index}>
                              <td>{item.goods_gubun_nm}</td>
                              <td>{item.goods_name}</td>
                              <td>{item.period_mm}</td>
                              <td>{item.iyul}</td>
                              <td>{item.tr_date}</td>
                              <td>{item.mangi_date}</td>
                              <td>{item.trkwa_amt}</td>
                              <td>{item.goods_number}</td>
                              <td>{item.val_amt}</td>
                              <td>{item.sonik_amt}</td>
                              <td>{item.suik_rate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row text-center px-0 mx-0">
                  <div className="col">
                    <button
                      className="btn btn-secondary btn-block m-1"
                      onClick={cancleClick}
                    >
                      뒤로가기
                    </button>
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

export default PerformanceViewPage;
