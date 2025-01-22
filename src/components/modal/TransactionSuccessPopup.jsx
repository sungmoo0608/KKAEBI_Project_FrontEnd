import React from "react";

const TransactionSuccessPopup = ({ message }) => {
  return (
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
      {message}
    </div>
  );
};

export default TransactionSuccessPopup;
