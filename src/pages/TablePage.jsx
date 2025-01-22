import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import DataTableDeposit from "./../components/table/DataTableDeposit";
import DataTableAPIExchange from "../components/table/DataTableAPIExchange";
import ExchangeData from "../components/data/ExchangeData";
import ExchangeDataBig4 from "../components/data/ExchangeDataBig4";
import StockTradeRankData from "../components/data/StockTradeRankData";
import StockTradeRankBig4 from "../components/data/StockTradeRankBig4";
import StockUpRankData from "../components/data/StockUpRankData";
import StockUpRankBig4 from "../components/data/StockUpRankBig4";
import StockDownRankData from "./../components/data/StockDownRankData";
import StockDownRankBig4 from "./../components/data/StockDownRankBig4";

const TablePage = () => {
  return (
    <div className="container">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
          <StockDownRankBig4></StockDownRankBig4>
          <StockDownRankData></StockDownRankData>
          <StockUpRankBig4></StockUpRankBig4>
          <StockUpRankData></StockUpRankData>
          <StockTradeRankBig4></StockTradeRankBig4>
          <StockTradeRankData></StockTradeRankData>
          <ExchangeDataBig4></ExchangeDataBig4>
          <div className="card shadow mb-4">
            <div className="card-header">
              <FontAwesomeIcon icon={faTable} /> 예금 상품 정보
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <DataTableDeposit></DataTableDeposit>
              </div>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-header">
              <FontAwesomeIcon icon={faTable} /> 환율 정보
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <DataTableAPIExchange></DataTableAPIExchange>
              </div>
            </div>
          </div>

          <div className="card shadow mb-4">
            <div className="card-header">
              <FontAwesomeIcon icon={faTable} /> 환율 정보
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <ExchangeData></ExchangeData>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TablePage;
