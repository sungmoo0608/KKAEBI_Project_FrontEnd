import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import reviewService from "../services/ReviewService";
import { useAuth } from "../components/context/AuthContext";

// 별점 렌더링 함수
const renderStarRating = (rating) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${i <= rating ? "selected" : ""}`}
        style={{ fontSize: "1.5rem", color: i <= rating ? "gold" : "#ccc" }}
      >
        &#9733;
      </span>
    );
  }
  return stars;
};

const BoardReviewViewPage = () => {
  const initReviewState = {};
  const { seq_no } = useParams();
  const { isLoggedIn, userId, authorities } = useAuth();

  const [review, setReview] = useState(initReviewState);

  //처음 랜더링 하고, 한번만 타라
  useEffect(() => {
    reviewService
      .get(seq_no)
      .then((response) => {
        console.log(response);
        setReview(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [seq_no]);

  const navigate = useNavigate();

  const cancleClick = () => {
    navigate(`/review`);
  };

  const isAdmin = authorities.includes("ROLE_ADMIN");
  const canEditReview = isLoggedIn && (userId === review.regist_id || isAdmin);

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  후기 자세히 보기
                </h3>
              </div>
              {review.status === 9 && !isAdmin ? (
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
                        <div className="card border-0 bg-light mb-2 text-white bg-dark">
                          <div className="card-header border-0">
                            <h4 className="text-center font-weight-light">
                              {review.notice_title}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="card border-0 bg-light mb-4 text-center">
                          <div className="card-header border-0">리뷰내용</div>
                          <div className="card-body">
                            <p className="fw-bold fs-3">
                              {review.notice_content}
                            </p>
                            <p className="fw-bold">
                              별점&nbsp;{renderStarRating(review.star_rating)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-xl-3 col-md-6">
                        <div className="card border-0 bg-light mb-4">
                          <div className="card-header border-0 py-1">
                            상품 코드
                          </div>
                          <div className="card-body py-1">
                            {review.goods_code}
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-3 col-md-6">
                        <div className="card border-0 bg-light mb-4">
                          <div className="card-header border-0 py-1">
                            작성자ID
                          </div>
                          <div className="card-body py-1">
                            {review.regist_id}
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-md-6">
                        <div className="card border-0 bg-light mb-4">
                          <div className="card-header border-0 py-1">
                            후기 등록일
                          </div>
                          <div className="card-body py-1">
                            {review.regist_date}
                          </div>
                        </div>
                      </div>
                    </div>

                    {isAdmin && (
                      <>
                        <div className="row">
                          <div className="col-xl-3 col-md-6">
                            <div className="card border-0 bg-light mb-4">
                              <div className="card-header border-0 py-1">
                                조회수
                              </div>
                              <div className="card-body py-1">
                                {review.bhit}
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="card border-0 bg-light mb-4">
                              <div className="card-header border-0 py-1">
                                해제 등록자ID
                              </div>
                              <div className="card-body py-1">
                                {review.expire_id}
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="card border-0 bg-light mb-4">
                              <div className="card-header border-0 py-1">
                                해제일
                              </div>
                              <div className="card-body py-1">
                                {review.expire_date}
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4 col-md-6">
                            <div className="card border-0 bg-light mb-4">
                              <div className="card-header border-0 py-1">
                                최종 수정 일자
                              </div>
                              <div className="card-body py-1">
                                {review.last_chg_date}
                              </div>
                            </div>
                          </div>

                          <div className="col-xl-4 col-md-6">
                            <div className="card border-0 bg-light mb-4">
                              <div className="card-header border-0 py-1">
                                진열 상태
                              </div>
                              <div className="card-body py-1">
                                {review.status === 1 && "활성화"}
                                {review.status === 9 && "비활성화"}
                                {review.status !== 1 &&
                                  review.status !== 9 &&
                                  "알 수 없음"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="row text-center px-0 mx-0">
                      <div className="col">
                        <button
                          className="btn btn-secondary btn-block m-1"
                          onClick={cancleClick}
                        >
                          목록 보기
                        </button>
                        {canEditReview && (
                          <Link to={"/review/" + review.seq_no + "/modify"}>
                            <button className="btn btn-warning btn-block m-1">
                              후기 수정 하기
                            </button>
                          </Link>
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

export default BoardReviewViewPage;
