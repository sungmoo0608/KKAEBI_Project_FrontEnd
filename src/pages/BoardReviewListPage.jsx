import React, { useEffect, useState } from "react";
import reviewService from "../services/ReviewService";
import SavingsPagingnation from "../components/paging/SavingsPagingnation";
import { Link } from "react-router-dom";
import GoodsCodeSelect from "../components/selectoption/GoodsCodeSelect";
import { useAuth } from "../components/context/AuthContext";
import GoodsViewButton from "../components/button/GoodsViewButton";

// 평점 별표시로 렌더링 함수
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

const BoardReviewListPage = () => {
  //http://192.168.0.13:8282/reviewr/list
  const { authorities } = useAuth();
  const isAdmin = authorities.includes("ROLE_ADMIN");

  const [review, setReview] = useState([]);
  const [paging, setPaging] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedGoodsCode, setSelectedGoodsCode] = useState(""); // 상품 코드 상태 추가
  const [selectedStatus, setSelectedStatus] = useState(""); // 진열 상태 추가

  useEffect(() => {
    console.log("use Effective 실행");
    initReview();
  }, []); // 필터 값이 바뀔 때마다 호출

  const initReview = () => {
    reviewService
      .getList()
      .then((response) => {
        console.log(response);
        setReview(response.data);
        setPaging(response.data.page);

        console.log(response.data.page);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 평점과 상품 코드로 필터링
  const filterReviews = (reviews, rating, goodsCode, status) => {
    return reviews.filter((review) => {
      const isMatchingRating =
        !rating || review.star_rating === parseInt(rating);
      const isMatchingGoodsCode =
        !goodsCode || review.goods_code.toString() === goodsCode; // 상품 코드 비교
      const isMatchingStatus = !status || review.status === parseInt(status);
      return (
        isMatchingRating &&
        isMatchingGoodsCode &&
        isMatchingStatus &&
        (isAdmin || review.status === 1)
      );
    });
  };

  // 평점 변경 처리
  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value || ""); // 평점 상태 업데이트
  };

  // 상품 코드 변경 처리
  const handleGoodsCodeChange = (e) => {
    setSelectedGoodsCode(e.target.value || ""); // 상품 코드 상태 업데이트
  };

  // 진열 상태 변경 처리
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value || ""); // 상품 코드 상태 업데이트
  };

  // 필터링된 리뷰
  const filteredReviews = filterReviews(
    review,
    selectedRating,
    selectedGoodsCode,
    selectedStatus
  );

  const onClickPaging = (e) => {
    e.preventDefault(); //기존에 링크 동작을 하지 말아라

    console.log(e.target.pathname);
    console.log(e.target.search);
    noticeService
      .getList(e.target.pathname, e.target.search)
      .then((response) => {
        setReview(response.data);
        setPaging(response.data.page);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 리뷰 제목 null 값을 처리하는 함수 (기본값을 제공)
  const safeValue = (value, defaultValue = "정보 없음") => {
    return value == null || value === "" ? defaultValue : value;
  };

  // 상태 전환 처리
  const handleBlind = (reviewId) => {
    const currentReview = review.find((n) => n.seq_no === reviewId);

    if (!currentReview) return;

    const updatedStatus = currentReview.status === 1 ? 9 : 1; // 상태 전환 (1 -> 9, 9 -> 1)

    // 상태 변경 요청
    reviewService
      .blind({ seq_no: reviewId, status: updatedStatus }) // 상태 전환 요청
      .then((response) => {
        // 상태 전환이 완료되면 상태 업데이트
        const updatedReviewList = review.map((n) =>
          n.seq_no === reviewId ? { ...n, status: updatedStatus } : n
        );
        setReview(updatedReviewList); // 새로운 리뷰 리스트로 상태 업데이트
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
                  후기 게시판
                </h3>
                <div className="row mb-3">
                  {/* 상품 코드 직접 검색 필터링2 */}
                  {/* <div className="col-md-4 mb-3">
                    <div className="form-floating">
                      <input
                        className="form-control"
                        onChange={handleGoodsCodeChange} // 상품 코드 선택 시 상태 업데이트
                        value={selectedGoodsCode}
                        id="goodsCodeSelect"
                        placeholder="상품 코드를 입력하세요."
                      />
                      <label htmlFor="goodsCodeSelect">
                        상품 코드를 입력하세요.
                      </label>
                    </div>
                  </div> */}

                  {/* 상품 코드 Json 필터링1 */}
                  <GoodsCodeSelect
                    value={selectedGoodsCode}
                    onChange={handleGoodsCodeChange} // 상품 코드 선택 시 상태 업데이트
                  />

                  {/* 평점 필터링 */}
                  <div className="col-md-6 mb-3">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        onChange={handleRatingChange} // 평점 선택 시 상태 업데이트
                        value={selectedRating || ""}
                        id="ratingSelect"
                      >
                        <option value="">모든 평점</option>
                        <option value="5">★★★★★</option>
                        <option value="4">★★★★</option>
                        <option value="3">★★★</option>
                        <option value="2">★★</option>
                        <option value="1">★</option>
                      </select>
                      <label htmlFor="ratingSelect">평점 선택</label>
                    </div>
                  </div>
                </div>
                {/* 어드민 권한 진열 여부 필터링 */}
                {isAdmin && (
                  <>
                    <div className="row mb-3">
                      <div className="col mb-3">
                        <div className="form-floating">
                          <select
                            className="form-select"
                            onChange={handleStatusChange} // 진열 여부 선택 시 상태 업데이트
                            value={selectedStatus || ""}
                            id="satusSelect"
                          >
                            <option value="">All</option>
                            <option value="1">진열중</option>
                            <option value="9">미진열중</option>
                          </select>
                          <label htmlFor="satusSelect">진열 여부 선택</label>
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
                        <th>상품 코드</th>
                        <th>후기 제목</th>
                        <th>평점</th>
                        <th>등록일</th>
                        <th>보기</th>
                        {isAdmin && (
                          <>
                            {/* 어드민 권한*/}
                            <th>수정</th>
                            <th>게시 상태</th>
                          </>
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      {filteredReviews.map((review) => (
                        <tr key={review.seq_no}>
                          <td>{review.seq_no}</td>
                          <td>{review.goods_code}</td>
                          <td>
                            <Link to={"/review/" + review.seq_no}>
                              {safeValue(
                                review.notice_title?.length > 10
                                  ? review.notice_title.substring(0, 10) + "..."
                                  : review.notice_title,
                                "제목 없음"
                              )}
                            </Link>
                          </td>
                          <td>{renderStarRating(review.star_rating)}</td>
                          <td>{review.regist_date}</td>
                          <td>
                            <Link to={"/review/" + review.seq_no}>
                              <button className="btn btn-success btn-sm mx-1">
                                보기
                              </button>
                            </Link>
                          </td>

                          {isAdmin && (
                            <>
                              {/* 어드민 권한*/}
                              <td>
                                <Link
                                  to={"/review/" + review.seq_no + "/modify"}
                                >
                                  <button className="btn btn-outline-warning btn-sm mx-1">
                                    수정
                                  </button>
                                </Link>
                              </td>
                              <td>
                                <button
                                  className="btn btn-light btn-sm position-relative mx-1"
                                  onClick={() => handleBlind(review.seq_no)}
                                >
                                  전환
                                  <span
                                    className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${
                                      review.status === 1
                                        ? "bg-dark"
                                        : review.status === 9
                                        ? "bg-secondary"
                                        : "bg-light"
                                    }`}
                                  >
                                    {
                                      // notice.status 값에 따라 출력할 텍스트 변경
                                      review.status === 1
                                        ? "진열중"
                                        : review.status === 9
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
    </div>
    // <!-- /.container-fluid -->);
  );
};

export default BoardReviewListPage;
