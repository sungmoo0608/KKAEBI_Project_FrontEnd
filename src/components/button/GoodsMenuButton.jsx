import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GoodsMenuButton = () => {
  const { authorities } = useAuth();

  return (
    <div className="text-center mb-4">
      <div className="row justify-content-center">
        <div className="col">
          <Link to={"/goods/alllist"}>
            <button className="btn btn-outline-secondary btn-block m-1">
              모든 상품 보기
            </button>
          </Link>
          <Link to={"/goods/depositlist"}>
            <button className="btn btn-outline-secondary btn-block m-1">
              예금 상품 보기
            </button>
          </Link>
          <Link to={"/goods/fundlist"}>
            <button className="btn btn-outline-secondary btn-block m-1">
              펀드 상품 보기
            </button>
          </Link>
          <Link to={"/goods/exlist"}>
            <button className="btn btn-outline-secondary btn-block m-1">
              외환 상품 보기
            </button>
          </Link>
          <Link to={"/goods/stocklist"}>
            <button className="btn btn-outline-secondary btn-block m-1">
              주식 상품 보기
            </button>
          </Link>
          {authorities.includes("ROLE_ADMIN") && (
            <Link to={"/goods/create"}>
              <button className="btn btn-outline-secondary btn-block m-1">
                상품 등록
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoodsMenuButton;
