import React, { useEffect, useState } from "react";
import noticeService from "../services/NoticeService";
import { Link, useNavigate, useParams } from "react-router-dom";

const BoardNoticeUpdatePage = () => {
  const initNoticeState = {
    notice_title: "",
    notice_content: "",
    notice_target: "",
    notice_st_date: "",
    notice_end_date: "",
    status: "",
    regist_id: "",
    last_chg_id: "",
    last_chg_date: "",
    expire_id: "",
    expire_date: "",
  };

  const { seq_no } = useParams();

  const [notice, setNotice] = useState(initNoticeState);

  //처음 랜더링 하고, 한번만 타라
  useEffect(() => {
    noticeService
      .get(seq_no)
      .then((response) => {
        console.log(response);
        setNotice(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleInputChange = () => {
    const { name, value } = event.target;
    setNotice({ ...notice, [name]: value });
  };

  const updateNotice = () => {
    noticeService
      .update(notice)
      .then((respose) => {
        console.log(respose);
        navigate(`/notice`);
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

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  공지 사항 수정 하기
                </h3>
              </div>

              <div className="card-body">
                <div className="form-group mt-3">
                  <label> 공지 사항 제목 </label>
                  <input
                    type="text"
                    placeholder="공지 사항 제목을 입력하세요."
                    name="notice_title"
                    className="form-control"
                    value={notice.notice_title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label> 공지 사항 내용 </label>
                  <textarea
                    placeholder="공지 사항 내용을 입력하세요."
                    name="notice_content"
                    className="form-control"
                    value={notice.notice_content}
                    onChange={handleInputChange}
                    rows="20"
                  />
                </div>
                <div className="form-group mt-3 mb-3">
                  <label> 공지 대상 </label>
                  <select
                    className="form-control"
                    name="notice_target"
                    placeholder="공지 대상을 선택하세요."
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
                  <label> 공지 시작일 </label>
                  <input
                    type="date"
                    placeholder="공지 시작일을 선택하세요."
                    name="notice_st_date"
                    className="form-control"
                    value={notice.notice_st_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3 mb-3">
                  <label> 공지 종료일 </label>
                  <input
                    type="date"
                    placeholder="공지 종료일를 선택하세요."
                    name="notice_end_date"
                    className="form-control"
                    value={notice.notice_end_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3 mb-3">
                  <label> 공지 진행 상태 </label>
                  <input
                    type="number"
                    placeholder="공지 진행 상태를 선택하세요."
                    name="status"
                    className="form-control"
                    value={notice.status}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3 mb-3">
                  <label> 등록자 </label>
                  <input
                    type="text"
                    placeholder="등록자를 적으세요."
                    name="regist_id"
                    className="form-control"
                    value={notice.regist_id}
                    onChange={handleInputChange}
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
                  />
                </div>

                <div className="row text-center px-0 mx-0">
                  <div className="col">
                    <button
                      className="btn btn-secondary btn-block m-1"
                      onClick={cancleClick}
                    >
                      목록 보기
                    </button>
                    <button
                      className="btn btn-outline-success btn-block m-1"
                      onClick={updateNotice}
                    >
                      공지 수정
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

export default BoardNoticeUpdatePage;
