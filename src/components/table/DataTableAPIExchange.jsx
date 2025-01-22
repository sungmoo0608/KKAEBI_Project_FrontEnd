import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import axios from "axios";
import "datatables.net-responsive-dt";
import "datatables.net-select-dt";

import "../../css/DataTable.css";

const DataTableAPIExchange = () => {
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost:8282/api/goods/exchangeall";
        const response = await axios.get(url, {
          headers: {
            // headers 서버 url 구성에 맞게 셋팅
          },
        });
        setData(response.data); // 데이터 셋팅 - setData에다가 값을 넣으면 됩니다.
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // datatable 초기화 중복 경고 메시지를 방지
  useEffect(() => {
    if (dataTableRef.current === null) {
      $(tableRef.current).DataTable({
        paging: true,
        pageLength: 10,
      });
      dataTableRef.current = true;
    }
  }, []);

  useEffect(() => {
    // pageLength: 페이지에 보여줄 row 갯수 설정
    // columns: 데이터 key값을 넣으면 됩니다.
    if (dataTableRef.current) {
      $(tableRef.current).DataTable().destroy();
      $(tableRef.current).DataTable({
        data,
        columns: [
          {
            title: "통화명",
            data: (row) => row.basedate, // "통화명" 컬럼
          },
          {
            title: "매매기준율",
            data: (row) => row.baseRate, // "매매기준율" 컬럼
          },
          {
            title: "현찰 사실 때",
            data: (row) => row.buyCash, // "현찰 사실 때" 컬럼
          },
          {
            title: "현찰 파실 때",
            data: (row) => row.sellCash, // "현찰 파실 때" 컬럼
          },
          {
            title: "송금 보내실 때",
            data: (row) => row.buyTransfer, // "송금 보내실 때" 컬럼
          },
          {
            title: "송금 받으실 때",
            data: (row) => row.sellTransfer, // "송금 받으실 때" 컬럼
          },
          {
            title: "미화환산율",
            data: (row) => row.rate, // "미화환산율" 컬럼
          },
        ],
        paging: true,
        pageLength: 10,
        destroy: true,
      });
    }
  }, [data]);

  return (
    <div>
      <table className="table table-hover" ref={tableRef}></table>
    </div>
  );
};

export default DataTableAPIExchange;
