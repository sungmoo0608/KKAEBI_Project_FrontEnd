import React, { useEffect, useState } from "react";
import crawlerService from "../../services/CrawlerService";

const StockTradeRankData = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    console.log("use Effective 실행");
    initStocks();
  }, []);

  const initStocks = () => {
    crawlerService
      .getStockTradeRank()
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
    if (!crease) {
      return "데이터 없음"; // 만약 crease가 비어 있거나 undefined일 경우
    }

    const [direction, number] = crease.split(" ");

    // number 값이 존재하는지, 유효한지 확인
    if (!number) {
      return "정보 없음"; // number가 없으면 '정보 없음' 반환
    }

    // number에서 쉼표 제거 및 숫자로 변환
    const numberValue = parseInt(number.replace(/,/g, ""), 10);

    // numberValue가 숫자가 아닌 경우 처리
    if (isNaN(numberValue)) {
      return "정보 없음"; // 만약 숫자가 아닌 값이 오면 '정보 없음' 반환
    }

    const formattedNumber = numberValue.toLocaleString(); // 숫자를 적절한 형식으로 변환

    // 'direction'이 '보합'일 때 처리
    if (direction === "보합") {
      return <span>— {formattedNumber}</span>; // '보합'일 경우 '—'로 표시
    }

    if (direction === "하락") {
      return <span style={{ color: "blue" }}>▼ {formattedNumber}</span>;
    } else if (direction === "상승") {
      return <span style={{ color: "red" }}>▲ {formattedNumber}</span>;
    }
    return crease;
  };

  const formatVariance = (variance) => {
    // 'variance'가 undefined나 null이면 처리하지 않고 기본값을 반환
    if (!variance) {
      return "데이터 없음"; // 혹은 원하는 기본값을 설정
    }

    // "0.00"인 경우를 직접 처리
    if (variance === "0.00") {
      return <span>0.00</span>; // "0.00"일 경우 그대로 표시
    }

    const value = parseFloat(variance.replace("%", ""));

    // value가 "0.00" 아닐 경우
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

export default StockTradeRankData;
