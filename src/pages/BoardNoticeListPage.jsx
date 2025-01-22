import React, { useEffect, useState } from "react";
import noticeService from "../services/NoticeService";
import SavingsPagingnation from "../components/paging/SavingsPagingnation";
import { Link } from "react-router-dom";
import BoardStatusModal from "../components/modal/BoardTargetModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import { useAuth } from "../components/context/AuthContext";

const BoardNoticeListPage = () => {
  //http://192.168.0.13:8282/noticerest/list

  const { authorities } = useAuth();
  const isAdmin = authorities.includes("ROLE_ADMIN");

  const [notice, setNotice] = useState([]);
  const [paging, setPaging] = useState(null);
  const [showModal, setShowModal] = useState(false); // 모달 관련 상태 관리
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [target, setTarget] = useState(0); // 타겟 선택
  const [selectedStatus, setSelectedStatus] = useState(""); // 진열 상태 추가
  const [selectedTarget, setSelectedTarget] = useState(""); // 공지 대상 추가
  // 날짜 선택
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    console.log("use Effective 실행");
    initNotice();
  }, []);

  const initNotice = () => {
    noticeService
      .getList()
      .then((response) => {
        console.log(response);
        setNotice(response.data);
        setPaging(response.data.page);

        console.log(response.data.page);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 공지 상태,공지 대상으로 필터링
  const filterNotices = (notices, status, target) => {
    return notices.filter((notice) => {
      // 관리자는 모든 상태를 볼 수 있지만, 비관리자는 진열중(상태 1)만 볼 수 있음
      const isMatchingStatus = !status || notice.status === parseInt(status);
      const isMatchingTarget =
        !target || notice.notice_target === parseInt(target);

      // 날짜 선택
      const noticeStartDate = new Date(notice.notice_st_date);
      const noticeEndDate = new Date(notice.notice_st_date);
      const isWithinStartDate =
        !startDate || noticeStartDate >= new Date(startDate);
      const isWithinEndDate = !endDate || noticeEndDate <= new Date(endDate);

      // 일반 사용자일 경우 notice_target이 1 또는 3만 허용
      // 관리자면 모든 대상, 아니면 1 (고객) 또는 3 (전체)만 허용
      const isValidTarget = isAdmin || [1, 3].includes(notice.notice_target);

      return (
        isMatchingStatus &&
        isMatchingTarget &&
        isWithinStartDate &&
        isWithinEndDate &&
        isValidTarget &&
        (isAdmin || notice.status === 1) // 관리자면 모든 상태, 아니면 진열중(상태 1)만
      );
    });
  };

  // 진열 상태 변경 처리
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value); // 상품 코드 상태 업데이트
  };

  // 공지 대상 변경 처리
  const handleTargetChange = (e) => {
    setSelectedTarget(e.target.value); // 공지 대상 업데이트
  };

  // 날짜 선택 변경 처리
  // const handleDateChange = (dates) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  // 필터링된 공지 리스트
  const filteredNotices = filterNotices(
    notice,
    selectedStatus,
    selectedTarget,
    startDate,
    endDate
  );

  const handleShowModal = (notice) => {
    setSelectedNotice(notice);
    setTarget(notice.notice_target); // 상태로 초기화
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveTarget = () => {
    if (selectedNotice) {
      noticeService
        .updateTarget(selectedNotice.seq_no, target)
        .then((response) => {
          console.log("상태 업데이트 성공:", response);
          setShowModal(false);
          initNotice(); // 상태 변경 후 상품 목록을 다시 로드
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
    noticeService
      .getList(e.target.pathname, e.target.search)
      .then((response) => {
        setNotice(response.data);
        setPaging(response.data.page);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // null 값을 처리하는 함수 (기본값을 제공)
  const safeValue = (value, defaultValue = "정보 없음") => {
    return value == null || value === "" ? defaultValue : value;
  };

  // noticeId로 상태 전환 처리
  const handleBlind = (noticeId) => {
    const currentNotice = notice.find((n) => n.seq_no === noticeId);

    if (!currentNotice) return;

    const updatedStatus = currentNotice.status === 1 ? 9 : 1; // 상태 전환 (1 -> 9, 9 -> 1)

    // 상태 변경 요청
    noticeService
      .blind({ seq_no: noticeId, status: updatedStatus }) // 상태 전환 요청
      .then((response) => {
        // 상태 전환이 완료되면 상태 업데이트
        const updatedNoticeList = notice.map((n) =>
          n.seq_no === noticeId ? { ...n, status: updatedStatus } : n
        );
        setNotice(updatedNoticeList); // 새로운 공지 리스트로 상태 업데이트
      })
      .catch((error) => {
        console.log("전환 실패:", error);
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
                  공지 사항
                </h3>
                {isAdmin && (
                  <>
                    <div className="row mb-3">
                      {/* 진열 여부 필터링 */}
                      <div className="col-md-6 mb-3">
                        진열 여부 선택
                        <div className="form-floating">
                          <select
                            className="form-select"
                            onChange={handleStatusChange} // 진열 여부 선택 시 상태 업데이트
                            value={selectedStatus}
                            id="satusSelect"
                          >
                            <option value="">All</option>
                            <option value="1">진열중</option>
                            <option value="9">미진열중</option>
                          </select>
                        </div>
                      </div>
                      {/* 공지 대상 필터링 */}
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          공지 대상 선택
                          <select
                            className="form-select"
                            onChange={handleTargetChange} // 상태 업데이트
                            value={selectedTarget}
                            id="targetSelect"
                          >
                            <option value="">All</option>
                            <option value="1">고객</option>
                            <option value="2">관리자</option>
                            <option value="3">전체</option>
                          </select>
                        </div>
                      </div>

                      {/* 날짜 필터링 */}
                      {/* <div className="col-md-4 mb-3">
                    <div className="form-floating">
                      공지 시작일 범위 선택
                      <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        isClearable
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                      />
                    </div>
                  </div> */}
                      <div className="mb-0">
                        <div className="d-grid">
                          <a
                            className="btn btn-warning btn-block"
                            href="/notice/write"
                          >
                            공지 등록
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover text-center">
                    <thead>
                      <tr>
                        <th>번호</th>
                        <th>공지 제목</th>
                        <th>공지 시작</th>
                        <th>공지 종료</th>
                        <th>등록 ID</th>
                        <th>등록 일자</th>
                        <th>보기</th>
                        {isAdmin && (
                          <>
                            <th>수정</th>
                            <th>공지 대상</th>
                            <th>공지 상태</th>
                          </>
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      {filteredNotices.map((notice) => (
                        <tr key={notice.seq_no}>
                          <td>{notice.seq_no}</td>
                          <td>
                            <Link to={"/notice/" + notice.seq_no}>
                              {safeValue(
                                notice.notice_title?.length > 10
                                  ? notice.notice_title.substring(0, 10) + "..."
                                  : notice.notice_title,
                                "제목 없음"
                              )}
                            </Link>
                          </td>

                          <td>{notice.notice_st_date}</td>
                          <td>{notice.notice_end_date}</td>
                          <td>{notice.regist_id}</td>
                          <td>{notice.regist_date}</td>

                          <td>
                            <Link to={"/notice/" + notice.seq_no}>
                              <button className="btn btn-success btn-sm">
                                보기
                              </button>
                            </Link>
                          </td>
                          {isAdmin && (
                            <>
                              <td>
                                <Link
                                  to={"/notice/" + notice.seq_no + "/modify"}
                                >
                                  <button className="btn btn-outline-warning btn-sm">
                                    수정
                                  </button>
                                </Link>
                              </td>
                              <td>
                                <button
                                  onClick={() => handleShowModal(notice)}
                                  className="btn btn-light btn-sm position-relative"
                                >
                                  전환
                                  <span
                                    className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${
                                      notice.notice_target === 1
                                        ? "bg-primary"
                                        : notice.notice_target === 2
                                        ? "bg-success"
                                        : notice.notice_target === 3
                                        ? "bg-dark"
                                        : "btn-light"
                                    }`}
                                  >
                                    {
                                      // product.goods_status 값에 따라 출력할 텍스트 변경
                                      notice.notice_target === 1
                                        ? "고객"
                                        : notice.notice_target === 2
                                        ? "관리자"
                                        : notice.notice_target === 3
                                        ? "전체"
                                        : "알 수 없음" // 예외 처리: 다른 값이 올 경우
                                    }
                                  </span>
                                </button>
                              </td>
                              <td>
                                <button
                                  onClick={() => handleBlind(notice.seq_no)}
                                  className="btn btn-light btn-sm position-relative"
                                >
                                  전환
                                  <span
                                    className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${
                                      notice.status === 1
                                        ? "bg-dark"
                                        : notice.status === 9
                                        ? "bg-secondary"
                                        : "bg-light"
                                    }`}
                                  >
                                    {
                                      // notice.status 값에 따라 출력할 텍스트 변경
                                      notice.status === 1
                                        ? "진열중"
                                        : notice.status === 9
                                        ? "미진열"
                                        : "알 수 없음" // 예외 처리: 다른 값이 올 경우
                                    }
                                  </span>
                                </button>
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
                  <SavingsPagingnation
                    paging={paging}
                    onClickPaging={onClickPaging}
                  ></SavingsPagingnation>
                ) : null} */}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 공지 상태 변경 모달 */}
      <BoardStatusModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSaveTarget={handleSaveTarget}
        notice_target={target}
        setTarget={setTarget}
      />
    </div>
    // <!-- /.container-fluid -->);
  );
};

export default BoardNoticeListPage;
