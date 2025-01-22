import React, { useEffect, useState } from "react";
import crawlerService from "../../services/CrawlerService";

const ExchangeData = () => {
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    console.log("use Effective 실행");
    initExchanges();
  }, []);

  const initExchanges = () => {
    crawlerService
      .getExchangeAllList()
      .then((response) => {
        console.log(response);
        setExchanges(response.data);
        console.log(response.data.page);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //1분마다 새로 고침하는 소스
  useEffect(() => {
    initExchanges();

    const intervalId = setInterval(() => {
      initExchanges();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table" id="dataTable" width="100%">
          <thead>
            <tr>
              <th>통화명</th>
              <th>매매기준율</th>
              <th>현찰 사실 때</th>
              <th>현찰 파실 때</th>
              <th>송금 보내실 때</th>
              <th>송금 받으실 때</th>
              <th>미화환산율</th>
            </tr>
          </thead>

          <tbody>
            {exchanges.map((Data, index) => (
              <tr key={index}>
                <td>{Data.basedate}</td>
                <td>{Data.baseRate}</td>
                <td>{Data.buyCash}</td>
                <td>{Data.sellCash}</td>
                <td>{Data.buyTransfer}</td>
                <td>{Data.sellTransfer}</td>
                <td>{Data.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExchangeData;
