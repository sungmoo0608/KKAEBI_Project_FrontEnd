import React, { useState } from "react";
import basketService from "../../services/BasketService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useNavigate } from "react-router-dom";

const BasketAddButton = ({ goodsCode, userId }) => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [redirectToBasket, setRedirectToBasket] = useState(false);
  const navigate = useNavigate();

  const handleAddToBasket = () => {
    if (userId) {
      basketService
        .getBasketInsert(userId, goodsCode)
        .then((response) => {
          console.log("상품이 장바구니에 추가되었습니다:", response);
          setShowSuccessPopup(true);
        })
        .catch((error) => {
          console.error("장바구니에 추가 실패:", error);
        });
    } else {
      console.log("로그인 상태가 아닙니다.");
      setShowErrorPopup(true); // show error popup
      setTimeout(() => {
        setShowErrorPopup(false); // hide error popup after 2 seconds
        navigate("/login"); // redirect to login page
      }, 2000);
    }
  };
  const handleRedirectToBasket = () => {
    navigate(`/myinfo/basketlist`);
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <>
      <button
        className="btn btn-outline-dark btn-sm mx-1"
        onClick={handleAddToBasket}
      >
        <FontAwesomeIcon icon={faCartArrowDown} />
        담기
      </button>

      {/* 장바구니 추가 성공 팝업 */}
      {showSuccessPopup && (
        <div
          className="popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px 40px",
            backgroundColor: "#000000",
            color: "white",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: "1000",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          <div>★ 이미 담긴 상품은 새로 담깁니다. ★</div>
          <div>상품이 장바구니에 추가되었습니다!</div>
          <div>장바구니로 이동하시겠습니까?</div>
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={handleRedirectToBasket}
              className="btn btn-light btn-light btn-sm mx-1"
            >
              예
            </button>
            <button
              onClick={handleClosePopup}
              className="btn btn-light btn-light btn-sm mx-1"
            >
              아니오
            </button>
          </div>
        </div>
      )}

      {/* 로그인 상태가 아닐 때 팝업 */}
      {showErrorPopup && (
        <div
          className="popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px 40px",
            backgroundColor: "#E6E6E6",
            color: "black",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: "1000",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          회원 기능 입니다! 로그인 페이지로 이동됩니다.
        </div>
      )}
    </>
  );
};

export default BasketAddButton;
