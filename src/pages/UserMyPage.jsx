import React, { useEffect, useState } from "react";
import userService from "../services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartColumn,
  faFileLines,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import perfomanceService from "../services/PerfomanceService";

const UserMyPage = () => {
  const { userId } = useAuth();

  const [userInfo, setUserInfo] = useState({});
  const [userPerformance, setUserPerformance] = useState(null);

  const navigate = useNavigate();

  //처음 랜더링 하고, 한번만 타라
  useEffect(() => {
    userService
      .getUserInfo(userId)
      .then((response) => {
        console.log(response);
        setUserInfo(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userId]);

  useEffect(() => {
    perfomanceService
      .getList()
      .then((response) => {
        const performanceData = response.data;

        const userPerformanceData = performanceData.find(
          (performance) => performance.user_id === userId
        );

        if (userPerformanceData) {
          setUserPerformance(userPerformanceData);
        }
      })
      .catch((e) => {
        console.error("Error fetching performance data", e);
      });
  }, [userId]);

  // 이전 페이지로 이동
  const goBack = () => {
    navigate(-1);
  };

  // 메인으로 이동
  const goPerformance = () => {
    navigate(`/myinfo/performance`);
  };

  // 장바구니로 이동
  const goBasket = () => {
    navigate(`/myinfo/basketlist`);
  };

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-6 mb-5">
              <div className="card h-100 shadow-sm border-0 rounded-lg mt-5">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-4">
                    <FontAwesomeIcon icon={faUser} />
                    &nbsp;{userInfo.name}&nbsp;
                    <FontAwesomeIcon icon={faFileLines} />
                    &nbsp;회원 정보
                  </h3>
                </div>
                <div className="card-body">
                  <div className="input-group mb-3">
                    <span className="input-group-text">고객ID</span>
                    <span className="form-control">{userInfo.user_id}</span>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">고객명</span>
                    <span className="form-control">{userInfo.name}</span>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">생년월일</span>
                    <span className="form-control">{userInfo.birthday}</span>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">사업자 번호</span>
                    <span className="form-control">
                      {userInfo.biz_no || "해당없음"}
                    </span>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">전화번호</span>
                    <span className="form-control">{userInfo.telno}</span>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">email</span>
                    <span className="form-control">{userInfo.email}</span>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text">가입일자</span>
                    <span className="form-control">{userInfo.create_date}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-5">
              <div className="card h-100 shadow-sm border-0 rounded-lg mt-5">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-4">
                    <FontAwesomeIcon icon={faUser} />
                    &nbsp;{userInfo.name}&nbsp;
                    <FontAwesomeIcon icon={faChartColumn} />
                    &nbsp;투자 요약
                  </h3>
                </div>
                <div className="card-body">
                  {userPerformance ? (
                    <>
                      <div className="input-group mb-3">
                        <span className="input-group-text">고객등급</span>
                        <span className="form-control">
                          {userPerformance.grade || "N/A"}
                        </span>
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">투자금액</span>
                        <span className="form-control">
                          {userPerformance.trkwa_amt || "N/A"}
                        </span>
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">평가금액</span>
                        <span className="form-control">
                          {userPerformance.val_amt || "N/A"}
                        </span>
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">투자손익</span>
                        <span className="form-control">
                          {userPerformance.sonik_amt || "N/A"}
                        </span>
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">수익률</span>
                        <span className="form-control">
                          {userPerformance.suik_rate || "N/A"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="input-group mb-3 text-center">
                      <span className="form-control bg-dark text-light">
                        투자 요약 데이터가 존재하지 않습니다.
                      </span>
                    </div>
                  )}
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-outline-secondary btn-sm m-1"
                      onClick={goBack}
                    >
                      뒤로 가기
                    </button>
                    <button
                      className="btn btn-info btn-sm m-1"
                      onClick={goPerformance}
                    >
                      투자 상세 보기
                    </button>
                    <button
                      className="btn btn-warning btn-sm m-1"
                      onClick={goBasket}
                    >
                      장바구니
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

export default UserMyPage;
