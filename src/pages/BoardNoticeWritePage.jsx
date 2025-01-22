import React, { useEffect, useState } from "react";
import noticeService from "../services/NoticeService";
import { Navigate, useNavigate } from "react-router-dom";

const BoardNoticeWritePage = () => {
  const initNoticeState = {
    notice_title: "",
    notice_content: "",
    notice_target: "1",
    notice_st_date: "",
    notice_end_date: "",
    status: "1",
    regist_id: "",
    regist_date: "",
    last_chg_id: "",
    last_chg_date: "",
    expire_id: "",
    expire_date: "",
  };

  const [notice, setNotice] = useState(initNoticeState);
  const [submitted, setSubmitted] = useState(false);
  // 경고 메시지를 위한 상태 추가
  const [errorMessage, setErrorMessage] = useState("");

  // 입력 값 변경 처리
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNotice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 공지 종료일과 해제일자를 동기화
  const syncExpireDate = (notice_end_date) => {
    setNotice((prevState) => ({
      ...prevState,
      expire_date: notice_end_date,
      last_chg_date: notice_end_date,
    }));
  };

  // 공지 시작일과 등록일자를 동기화
  const syncRegistDate = (notice_st_date) => {
    setNotice((prevState) => ({
      ...prevState,
      regist_date: notice_st_date,
    }));
  };

  // 등록자와 해제자를 동일하게 설정
  const syncId = (regist_id) => {
    setNotice((prevState) => ({
      ...prevState,
      expire_id: regist_id,
    }));
  };

  const saveNotice = () => {
    // 입력 내용 확인
    if (!notice.notice_title.trim()) {
      setErrorMessage("공지 사항 제목을 입력하세요.");
      return;
    }
    if (!notice.notice_content.trim()) {
      setErrorMessage("공지 사항 내용을 입력하세요.");
      return;
    }

    let data = {
      notice_title: notice.notice_title,
      notice_content: notice.notice_content,
      notice_target: notice.notice_target,
      notice_st_date: notice.notice_st_date,
      notice_end_date: notice.notice_end_date,
      status: notice.status,
      regist_id: notice.regist_id,
      regist_date: notice.regist_date,
      last_chg_id: notice.last_chg_id,
      last_chg_date: notice.last_chg_date,
      expire_id: notice.expire_id,
      expire_date: notice.expire_date,
    };

    console.log(data);

    noticeService
      .write(data)
      .then((respose) => {
        console.log(respose);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });

    /* axios 글 저장 */
  };

  const navigate = useNavigate();

  const cancleClick = () => {
    navigate(`/notice`);
  };

  // 상태 값 확인 (디버깅용)
  useEffect(() => {
    console.log("Notice state:", notice);
  }, [notice]);

  return submitted ? (
    <Navigate to={{ pathname: "/notice" }} />
  ) : (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  공지 사항 등록 하기
                </h3>
              </div>

              <div className="card-body">
                <div className="form-group mt-3">
                  <label> 공지 사항 제목 입력 </label>
                  <input
                    type="text"
                    placeholder="공지 사항 제목을 입력하세요."
                    name="notice_title"
                    className="form-control"
                    value={notice.notice_title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label> 공지 사항 내용 입력 </label>
                  <textarea
                    placeholder="공지 사항 내용을 입력하세요."
                    name="notice_content"
                    className="form-control"
                    value={notice.notice_content}
                    onChange={handleInputChange}
                    rows="15"
                  />
                </div>
                <div className="form-group mt-3 mb-3">
                  <label> 공지 대상 선택 </label>
                  <select
                    className="form-control"
                    name="notice_target"
                    placeholder="공지 대상을 선택하세요"
                    value={notice.notice_target}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="1">고객</option>
                    <option value="2">관리자</option>
                    <option value="3">전체</option>
                  </select>
                </div>
                <div className="form-group mt-3 mb-3">
                  <label> 공지 시작일 선택 </label>
                  <input
                    type="date"
                    placeholder="공지 시작일을 선택하세요."
                    name="notice_st_date"
                    className="form-control"
                    value={notice.notice_st_date}
                    onChange={(e) => {
                      handleInputChange(e);
                      syncRegistDate(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="form-group mt-3 mb-3">
                  <label> 공지 종료일 선택</label>
                  <input
                    type="date"
                    placeholder="공지 종료일를 선택하세요."
                    name="notice_end_date"
                    className="form-control"
                    value={notice.notice_end_date}
                    onChange={(e) => {
                      handleInputChange(e);
                      syncExpireDate(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="form-group mt-3 mb-3">
                  <label> 공지 진행 상태 </label>
                  <select
                    placeholder="공지 진행 상태를 선택하세요."
                    className="form-control"
                    name="status"
                    value={notice.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="1">1=활성화</option>
                    <option value="9">9=비활성화</option>
                  </select>
                </div>

                <div className="form-group mt-3 mb-3">
                  <label> 등록자 </label>
                  <input
                    type="text"
                    placeholder="등록자를 적으세요."
                    name="regist_id"
                    className="form-control"
                    value={notice.regist_id}
                    onChange={(e) => {
                      handleInputChange(e);
                      syncId(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group mt-3 mb-3">
                  <label> 등록 일자 (공지 시작일과 동일) </label>
                  <input
                    type="date"
                    placeholder="등록 일자를 적으세요."
                    name="regist_date"
                    className="form-control"
                    value={notice.regist_date}
                    readonly
                  />
                </div>

                <div className="form-group mt-3 mb-3">
                  <label> 최종 변경자 </label>
                  <input
                    type="text"
                    placeholder="최종 변경자를 적으세요."
                    name="last_chg_id"
                    className="form-control"
                    value={notice.last_chg_id}
                    onChange={handleInputChange}
                    readonly
                  />
                </div>

                <div className="form-group mt-3 mb-3">
                  <label> 최종 변경 일자 (공지 시작일과 동일) </label>
                  <input
                    type="date"
                    placeholder="최종 변경 일자를 적으세요."
                    name="last_chg_date"
                    className="form-control"
                    value={notice.last_chg_date}
                    onChange={handleInputChange}
                    readonly
                  />
                </div>

                <div className="form-group mt-3 mb-3">
                  <label> 공지 해제 등록자 </label>
                  <input
                    type="text"
                    placeholder="해제 등록자를 적으세요."
                    name="expire_id"
                    className="form-control"
                    value={notice.expire_id}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group mt-3 mb-3">
                  <label> 공지 해제 일자 (공지종료일과 동일) </label>
                  <input
                    type="date"
                    placeholder="공지 해제 일자 (공지종료일과 동일) 를 선택하세요."
                    name="expire_date"
                    className="form-control"
                    value={notice.expire_date}
                    readonly
                  />
                </div>
                {/* 경고 메시지 표시 */}
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <div className="d-flex justify-content-center">
                  <button className="btn btn-success" onClick={saveNotice}>
                    공지등록
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                    onClick={cancleClick}
                  >
                    돌아가기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BoardNoticeWritePage;
