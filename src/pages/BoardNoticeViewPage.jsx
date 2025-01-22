import React, { useEffect, useState } from "react";
import noticeService from "../services/NoticeService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

const BoardNoticeViewPage = () => {
  const { authorities } = useAuth();
  const isAdmin = authorities.includes("ROLE_ADMIN");

  const initNoticeState = {};

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
  }, [seq_no]);

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
                  공지사항 상세 보기
                </h3>
              </div>

              {notice.status === 9 && !isAdmin ? (
                <>
                  <div className="container">
                    <div className="card border-0 bg-light m-4 text-white bg-dark">
                      <div className="card-header border-0">
                        <h4 className="text-center font-weight-light">
                          비활성화 된 게시글 입니다.
                        </h4>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="card-body">
                    <div className="row">
                      <div className="container">
                        <div className="card bg-light mb-3">
                          <div className="card-header">
                            {notice.notice_title}
                          </div>
                          <div className="card-body">
                            {notice.notice_content}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-3 col-md-6">
                        <div className="card border-0 bg-light mb-4">
                          <div className="card-header border-0 py-1">
                            공지 대상
                          </div>
                          <div className="card-body py-1">
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
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-3 col-md-6">
                        <div className="card border-0 bg-light mb-4">
                          <div className="card-header border-0 py-1">
                            공지 작성자
                          </div>
                          <div className="card-body py-1">
                            {notice.regist_id}
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-3 col-md-6">
                        <div className="card border-0 bg-light mb-4">
                          <div className="card-header border-0 py-1">
                            공지 시작일
                          </div>
                          <div className="card-body py-1">
                            {notice.notice_st_date}
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-3 col-md-6">
                        <div className="card border-0 bg-light mb-4">
                          <div className="card-header border-0 py-1">
                            공지 종료일
                          </div>
                          <div className="card-body py-1">
                            {notice.notice_end_date}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row text-center px-0 mx-0">
                      <div className="col">
                        <button
                          className="btn btn-secondary btn-block m-1"
                          onClick={cancleClick}
                        >
                          목록 보기
                        </button>
                        {isAdmin && (
                          <>
                            <Link to={"/notice/" + notice.seq_no + "/modify"}>
                              <button className="btn btn-outline-info btn-block m-1">
                                공지 사항 수정
                              </button>
                            </Link>
                            <Link to={"/notice/write"}>
                              <button className="btn btn-success btn-block m-1">
                                공지 등록
                              </button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BoardNoticeViewPage;
