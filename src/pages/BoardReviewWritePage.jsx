import React, { useEffect, useState } from "react";
import reviewService from "../services/ReviewService";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

const BoardReviewWritePage = () => {
  const initReviewState = {
    goods_code: "",
    notice_title: "",
    notice_content: "",
    status: 1,
    regist_id: "",
    regist_date: "",
    last_chg_date: "",
    expire_id: "",
    expire_date: "",
    star_rating: 1,
  };

  const { goods_code } = useParams();
  const { userId } = useAuth();

  const [review, setReview] = useState(initReviewState);
  const [submitted, setSubmitted] = useState(false);
  // 경고 메시지를 위한 상태 추가
  const [errorMessage, setErrorMessage] = useState("");

  // 입력 값 변경 처리
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 등록자와 해제자를 동일하게 설정
  const syncId = (regist_id) => {
    setReview((prevState) => ({
      ...prevState,
      expire_id: regist_id,
    }));
  };

  const saveReview = () => {
    // 입력 내용 확인
    if (!review.notice_title.trim()) {
      setErrorMessage("후기 제목을 입력하세요.");
      return;
    }
    if (!review.notice_content.trim()) {
      setErrorMessage("후기 내용을 입력하세요.");
      return;
    }

    let data = {
      goods_code: goods_code,
      notice_title: review.notice_title,
      notice_content: review.notice_content,
      status: review.status,
      regist_id: userId,
      regist_date: review.regist_date,
      last_chg_date: review.last_chg_date,
      expire_id: review.expire_id,
      expire_date: review.expire_date,
      star_rating: review.star_rating,
    };

    console.log(data);

    reviewService
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

  const handleStarClick = (rating) => {
    setReview({ ...review, star_rating: rating }); // Set the selected star rating
  };

  const navigate = useNavigate();

  const cancleClick = () => {
    navigate(`/review`);
  };

  // 상태 값 확인 (디버깅용)
  useEffect(() => {
    console.log("Review state:", review);
  }, [review]);

  return submitted ? (
    <Navigate to={{ pathname: "/review" }} />
  ) : (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container my-5">
          <div className="container-fluid">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  후기 등록 하기
                </h3>
              </div>

              <div className="card-body">
                <div className="form-group mt-3 mb-3">
                  <label> 상품코드 </label>
                  <input
                    className="form-control"
                    name="goods_code"
                    placeholder="상품코드를 선택하세요"
                    value={goods_code}
                    onChange={handleInputChange}
                    required
                    disabled
                  ></input>
                </div>
                <div className="form-group mt-3">
                  <label> 후기 제목 입력 </label>
                  <input
                    type="text"
                    placeholder="후기 제목 입력을 입력하세요."
                    name="notice_title"
                    className="form-control"
                    value={review.notice_title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label> 후기 내용 입력 </label>
                  <textarea
                    placeholder="후기 내용을 입력하세요."
                    name="notice_content"
                    className="form-control"
                    value={review.notice_content}
                    onChange={handleInputChange}
                    rows="15"
                  />
                </div>

                <div className="form-group mt-3 mb-3">
                  <label> 작성자ID </label>
                  <input
                    type="text"
                    placeholder="작성자ID를 적으세요."
                    name="regist_id"
                    className="form-control"
                    value={userId}
                    onChange={(e) => {
                      handleInputChange(e);
                      syncId(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group mt-3 mb-3">
                  <label> 후기 별점 선택</label>
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

                {/* 경고 메시지 표시 */}
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}
                <div className="d-flex justify-content-center">
                  <button className="btn btn-success" onClick={saveReview}>
                    후기등록
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

export default BoardReviewWritePage;
