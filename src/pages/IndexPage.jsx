import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "../css/mainSlide.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";

const IndexPage = () => {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate("/goods/depositlist"); // 페이지 이동
  };
  const handleClick2 = () => {
    navigate("/goods/fundlist"); // 페이지 이동
  };
  const handleClick3 = () => {
    navigate("/goods/exlist"); // 페이지 이동
  };
  const handleClick4 = () => {
    navigate("/goods/stocklist"); // 페이지 이동
  };

  return (
    <div>
      <main>
        <Carousel>
          <Carousel.Item>
            <div className="slidercontents">
              <div className="wrapText">
                <h1>예금 상품</h1>
                <div className="d-none d-md-block">
                  <p>차곡차곡 자유롭게 고르자</p>
                </div>
                <button className="btn btn-outline-dark" onClick={handleClick1}>
                  <FontAwesomeIcon icon={faArrowPointer} /> Click
                </button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="slidercontents2">
              <div className="wrapText">
                <h1>펀드 상품</h1>
                <div className="d-none d-md-block">
                  <p>차곡차곡 자유롭게 고르자</p>
                </div>
                <button className="btn btn-outline-dark" onClick={handleClick2}>
                  <FontAwesomeIcon icon={faArrowPointer} /> Click
                </button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="slidercontents3">
              <div className="wrapText">
                <h1>외환 상품</h1>
                <div className="d-none d-md-block">
                  <p>차곡차곡 자유롭게 고르자</p>
                </div>
                <button className="btn btn-outline-dark" onClick={handleClick3}>
                  <FontAwesomeIcon icon={faArrowPointer} /> Click
                </button>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="slidercontents4">
              <div className="wrapText">
                <h1>주식 상품</h1>
                <div className="d-none d-md-block">
                  <p>차곡차곡 자유롭게 고르자</p>
                </div>
                <button className="btn btn-outline-dark" onClick={handleClick4}>
                  <FontAwesomeIcon icon={faArrowPointer} /> Click
                </button>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </main>
    </div>
  );
};

export default IndexPage;
