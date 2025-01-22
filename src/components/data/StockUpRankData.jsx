import React, { useEffect, useState } from "react";
import crawlerService from "../../services/CrawlerService";

const StockUpRankData = () => {
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
      <div className="table-responsive">
        <table className="table" id="dataTable" width="100%">
          <thead>
            <tr>
              <th>종목명</th>
              <th>주식가</th>
              <th>등락가</th>
              <th>등락율</th>
            </tr>
          </thead>

          <tbody>
            {stocks.map((Data, index) => (
              <tr key={index}>
                <td>{Data.stockName}</td>
                <td>{Data.stockPrice}</td>
                <td>{formatCrease(Data.crease)}</td>
                <td>{formatVariance(Data.variance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockUpRankData;
