import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import axios from "axios";
import "datatables.net-responsive-dt";
import "datatables.net-select-dt";

import "../../css/DataTable2.css";

const DataTable2 = () => {
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://jsonplaceholder.typicode.com/users";
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
          { title: "Name", data: "name" },
          { title: "Username", data: "username" },
          { title: "Email", data: "email" },
          { title: "Phone", data: "phone" },
          { title: "Website", data: "website" },
        ],
        paging: true,
        pageLength: 10,
        destroy: true,
      });
    }
  }, [data]);

  return (
    <div>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default DataTable2;
