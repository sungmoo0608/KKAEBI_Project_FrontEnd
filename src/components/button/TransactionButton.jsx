import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TransactionButton = ({ goods_gubun, goods_code }) => {
  const { userId } = useAuth(); // AuthContext에서 userId 가져오기

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const navigate = useNavigate();

  // goods_code and user_id 체크
  if (!goods_code) {
    console.log("No goods_code or user_id provided:", goods_code, userId); // 디버깅을 위한 로그
    return null;
  }

  let link = "#"; // 기본값

  const handleToTransaction = () => {
    if (!userId) {
      console.log("로그인 상태가 아닙니다.");
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
        navigate("/login");
      }, 2000);
    } else {
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        switch (goods_gubun) {
          case 1:
            navigate(`/transaction/deposit/${goods_gubun}/${goods_code}`);
            break;
          case 2:
            navigate(`/transaction/fund/${goods_gubun}/${goods_code}`);
            break;
          case 3:
            navigate(`/transaction/exchange/${goods_gubun}/${goods_code}`);
            break;
          case 4:
            navigate(`/transaction/stock/${goods_gubun}/${goods_code}`);
            break;
          default:
            console.log("Unknown goods_gubun:", goods_gubun);
            link = "#";
        }
      }, 1000);
    }
  };

  console.log("Generated Link:", link); // 디버깅을 위한 로그

  return (
    <>
      {/* 로그인 상태 일때 성공 팝업 */}
      {showSuccessPopup && (
        <div
          className="popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px 40px",
            backgroundColor: "green",
            color: "white",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: "1000",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          투자 페이지로 이동합니다.
        </div>
      )}

      {/* 로그인 아닐 때 에러 팝업 */}
      {showErrorPopup && (
        <div
          className="popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px 40px",
            backgroundColor: "#777777",
            color: "white",
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
      <button
        className="btn btn-success btn-block btn-sm mx-1"
        onClick={handleToTransaction}
      >
        투자 하기
      </button>
    </>
  );
};
export default TransactionButton;
