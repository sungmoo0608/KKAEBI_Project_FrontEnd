import React, { useEffect, useState } from "react";
import crawlerService from "../../services/CrawlerService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";

const StockUpRankBig4 = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    console.log("use Effective 실행");
    initStocks();
  }, []);

  const initStocks = () => {
    crawlerService
      .getStockUpRank()
      .then((response) => {
        console.log(response);
        setStocks(response.data);
        console.log(response.data.page);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //1분마다 새로 고침하는 소스
  useEffect(() => {
    initStocks();

    const intervalId = setInterval(() => {
      initStocks();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const formatCrease = (crease) => {
    const [direction, number] = crease.split(" ");
    const numberValue = parseInt(number.replace(/,/g, ""), 10);
    const formattedNumber = numberValue.toLocaleString();

    if (direction === "하락") {
      return <span style={{ color: "blue" }}>▼ {formattedNumber}</span>;
    } else if (direction === "상승" || direction === "상한가") {
      return <span style={{ color: "red" }}>▲ {formattedNumber}</span>;
    }
    return crease;
  };

  const formatVariance = (variance) => {
    const value = parseFloat(variance.replace("%", ""));
    if (value < 0) {
      return <span style={{ color: "blue" }}>{variance}</span>;
    } else if (value > 0) {
      return <span style={{ color: "red" }}>{variance}</span>;
    }
    return variance;
  };

  return (
    <div className="container">
      <div className="row">
        {stocks.slice(0, 4).map((Data, index) => (
          <div className="col-xl-3 col-md-6 mb-4" key={index}>
            <div className="card h-100 shadow bg-light text-center">
              <div className="card-header">
                <FontAwesomeIcon icon={faRankingStar} /> {Data.stockName}
              </div>
              <div className="card-body">
                <p className="m-0 p-0">
                  <span className="badge bg-dark">주식 현재가</span>{" "}
                  {Data.stockPrice}
                </p>
                <p className="m-0 p-0">
                  <span className="badge bg-dark">전일대비</span>{" "}
                  {formatCrease(Data.crease)}
                </p>
                <p className="m-0 p-0">
                  <span className="badge bg-dark">등락률</span>{" "}
                  {formatVariance(Data.variance)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockUpRankBig4;
