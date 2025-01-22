import React, { useEffect, useState } from "react";
import crawlerService from "../../services/CrawlerService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";

const ExchangeDataBig4 = () => {
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

  const getSelected = () => {
    // 원하는 통화 항목들만 필터링
    const selected = [
      "미국 USD",
      "유럽연합 EUR",
      "일본 JPY (100엔)",
      "중국 CNY",
    ];

    // "basedate"가 selectedCurrencies 배열에 포함된 것만 필터링
    return exchanges.filter((exchange) => selected.includes(exchange.basedate));
  };

  const selectedRates = getSelected();

  //1분마다 새로 고침하는 소스
  useEffect(() => {
    initExchanges();

    const intervalId = setInterval(() => {
      initExchanges();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mb-4">
      <div className="row">
        {selectedRates.map((Data, index) => (
          <div className="col-xl-3 col-md-6" key={index}>
            <div className="card shadow bg-light text-center">
              <div className="card-header">
                <FontAwesomeIcon icon={faMoneyBillTransfer} /> {Data.basedate}
              </div>
              <div className="card-body">
                <p className="m-0 p-0">
                  <span className="badge bg-success">현금 사실 때</span>{" "}
                  {Data.buyCash}
                </p>
                <p className="m-0 p-0">
                  <span className="badge bg-dark">현금 파실 때</span>{" "}
                  {Data.sellCash}
                </p>
                <p className="m-0 p-0">
                  <span className="badge bg-success">송금 보내실 때</span>{" "}
                  {Data.buyTransfer}
                </p>
                <p className="m-0 p-0">
                  <span className="badge bg-dark">송금 받으실 때</span>{" "}
                  {Data.sellTransfer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeDataBig4;
