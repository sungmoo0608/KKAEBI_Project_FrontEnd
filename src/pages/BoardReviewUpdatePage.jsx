import React, { useEffect, useState } from "react";
import reviewService from "../services/ReviewService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./../components/context/AuthContext";

const BoardReviewUpdatePage = () => {
  const initReviewState = {
    goods_code: "",
    notice_title: "",
    notice_content: "",
    status: "1",
    regist_id: "",
    regist_date: "",
    last_chg_id: "",
    last_chg_date: "",
    expire_id: "",
    expire_date: "",
    star_rating: "",
  };

  const { seq_no } = useParams();

  const { userId, authorities } = useAuth();
  const [hasAccess, setHasAccess] = useState(true);

  const [review, setReview] = useState(initReviewState);

  //처음 랜더링 하고, 한번만 타라
  useEffect(() => {
    reviewService
      .get(seq_no)
      .then((response) => {
        console.log(response);
        setReview({
          ...response.data,
          regist_date: formatDate(response.data.regist_date),
          last_chg_date: formatDate(response.data.last_chg_date),
          expire_date: formatDate(response.data.expire_date),
        });
        const userIsAdmin = authorities.includes("ROLE_ADMIN");
        const userIsOwner = response.data.regist_id === userId;

        // Set access flag based on user's role or ownership of the notice
        if (!userIsAdmin && !userIsOwner) {
          setHasAccess(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [seq_no, userId, authorities]);

  const formatDate = (date) => {
    if (!date) return "";
    return date.length === 10 ? date : ""; // Make sure the date is in correct format
  };

  const handleInputChange = () => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  const handleStarClick = (rating) => {
    setReview({ ...review, star_rating: rating }); // Set the selected star rating
  };

  const updateReview = () => {
    reviewService
      .update(review)
      .then((respose) => {
        console.log(respose);
        navigate(`/review`);
      })
      .catch((error) => {
        console.log(error);
      });

    /* axios 글 저장 */
  };

  const navigate = useNavigate();

  const cancleClick = () => {
    navigate(`/review`);
  };

  if (!hasAccess) {
    return (
      <div id="layoutAuthentication_content">
        <main>
          <div className="container my-5">
            <div className="container-fluid">
              <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-4">
                    후기 수정 하기
                  </h3>
                </div>
                <div className="container my-5">
                  <div className="alert alert-danger text-center ">
                    <strong>접근 권한이 없습니다!</strong> 후기 작성자만 수정할
                    수 있습니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  후기 수정 하기
                </h3>
              </div>

              <div className="card-body">
                <div className="form-group mt-3">
                  <label> 후기 제목 </label>
                  <input
                    type="text"
                    placeholder="후기 제목을 입력하세요."
                    name="notice_title"
                    className="form-control"
                    value={review.notice_title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label> 후기 내용 </label>
                  <textarea
                    placeholder="공지 사항 내용을 입력하세요."
                    name="notice_content"
                    className="form-control"
                    value={review.notice_content}
                    onChange={handleInputChange}
                    rows="10"
                  />
                </div>
                <div className="form-group mt-3 mb-3">
                  <label> 상품 코드 </label>
                  <input
                    type="number"
                    placeholder="상품 코드는 변경 불가합니다."
                    name="goods_code"
                    className="form-control"
                    value={review.goods_code}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>

                <div className="form-group mt-3 mb-3">
                  <label> 진열 상태 </label>
                  <input
                    type="number"
                    placeholder="진열 상태를 선택하세요."
                    name="status"
                    className="form-control"
                    value={review.status}
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
                    value={review.regist_id}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3 mb-3">
                  <label> 등록일 (자동 입력) </label>
                  <input
                    type="date"
                    placeholder="등록일은 자동 입력됩니다."
                    name="regist_date"
                    className="form-control"
                    value={review.regist_date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3 mb-3">
                  <label> 최종 수정일자 </label>
                  <input
                    type="date"
                    placeholder="최종 수정일자를 선택하세요."
                    name="last_chg_date"
                    className="form-control"
                    value={review.last_chg_date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mt-3 mb-3">
                  <label> 해제등록자ID </label>
                  <input
                    type="text"
                    placeholder="해제등록자ID를 적으세요."
                    name="expire_id"
                    className="form-control"
                    value={review.expire_id}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mt-3 mb-3">
                  <label> 해제일자 </label>
                  <input
                    type="date"
                    placeholder="해제일자를 적으세요."
                    name="expire_date"
                    className="form-control"
                    value={review.expire_date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mt-3 mb-3">
                  <label> 별점을 선택해주세요. </label>
                  <div className="d-flex">
                    {/* Render 5 clickable stars */}
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${
                          review.star_rating >= star ? "selected" : ""
                        }`}
                        onClick={() => handleStarClick(star)}
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          color: review.star_rating >= star ? "gold" : "gray",
                        }}
                      >
                        ★
                      </span>
                    ))}
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
                    <button
                      className="btn btn-outline-success btn-block m-1"
                      onClick={updateReview}
                    >
                      후기 수정
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

export default BoardReviewUpdatePage;
