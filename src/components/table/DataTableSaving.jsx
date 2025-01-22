import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import axios from "axios";
import "datatables.net-responsive-dt";
import "datatables.net-select-dt";

import "../../css/DataTable2.css";

const DataTableSaving = () => {
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://192.168.0.6:8282/savingsrest/optionlist";
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
          { title: "은행", data: "korconm" },
          { title: "상품명", data: "finprdtnm" },
          { title: "가입방법", data: "joinway" },
          {
            title: "기간",
            data: null, // No direct data for this column, it's custom
            render: (data, type, row) => {
              // Access the first product rate in the 'productRates' array
              const firstProductRate = row.productRates && row.productRates[0];
              // Render the 'intrrate' (interest rate) for the first entry in the productRates array
              return firstProductRate ? firstProductRate.savetrm : "N/A";
            },
          },

          {
            title: "우대금리적용",
            data: null, // No direct data for this column, it's custom
            render: (data, type, row) => {
              // Access the first product rate in the 'productRates' array
              const firstProductRate = row.productRates && row.productRates[0];
              // Render the 'intrrate' (interest rate) for the first entry in the productRates array
              return firstProductRate ? firstProductRate.intrrate2 : "N/A";
            },
          },

          {
            title: "바로가기",
            data: null, // No data, this is a custom column
            render: (data, type, row) => {
              // Render a "View Details" button in each row
              return `<a href="/savingsrest/${row.finprdtcd}" class="btn btn-primary btn-sm">상세보기</a>`;
            },
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

export default DataTableSaving;
