import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import axios from "axios";
import "datatables.net-responsive-dt";
import "datatables.net-select-dt";

import "../../css/DataTable.css";

const DataTableDeposit = () => {
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://192.168.0.6:8282/goodsrest/Depositlist";
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
            title: "상품명",
            data: (row) => row.goods.goods_name, // "상품명" 컬럼
          },
          {
            title: "이자율",
            data: (row) => row.interestRate.interest_rate, // "이자율" 컬럼
          },
          {
            title: "기간",
            data: (row) => row.goods.period_mm, // "기간" 컬럼
          },
          {
            title: "제공기관",
            data: (row) => row.provider.provider_name, // "제공기관" 컬럼
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

export default DataTableDeposit;
