import React from "react";
import { useAuth } from "../context/AuthContext";

// 별점 별표시로 렌더링 함수
const renderStarRating = (rating) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${i <= rating ? "selected" : ""}`}
        style={{ fontSize: "1rem", color: i <= rating ? "gold" : "#ccc" }}
      >
        &#9733;
      </span>
    );
  }
  return stars;
};

const ReviewList = ({ reviews }) => {
  const { authorities } = useAuth();

  // AMMIN_ROLE은 status가 9인 리뷰를 볼 수 있음
  const isAdminRole = authorities.includes("ROLE_ADMIN");

  return (
    <div className="row">
      <div className="col-xl col-md-12">
        <div className="card border-0 bg-light mb-4">
          <div className="card-header border-0 py-1">상품 후기</div>
          <div className="card-body py-3">
            {reviews.length > 0 ? (
              <ul className="list-group">
                {reviews.map((review, index) => {
                  // AMMIN_ROLE은 모든 상태의 리뷰를 볼 수 있습니다.
                  // USER_ROLE은 review.status 값 상관없이 후기를 볼 수 있으므로 조건 제거
                  if (isAdminRole || review.status === 1) {
                    return (
                      <li className="list-group-item" key={index}>
                        작성자 ID | <strong>{review.regist_id} </strong> |{" "}
                        {review.notice_title} |{" "}
                        {renderStarRating(review.star_rating)}
                      </li>
                    );
                  }
                  // review.status가 1인 경우만 표시
                  return null;
                })}
              </ul>
            ) : (
              <ul className="list-group">
                <li className="list-group-item">아직 후기가 없습니다.</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
