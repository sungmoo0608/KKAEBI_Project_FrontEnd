import { useEffect, useState, useRef } from "react";
import $ from "jquery";
import axios from "axios";
import "datatables.net-responsive-dt";
import "datatables.net-select-dt";

import "../../css/DataT.css";

const DataTable3 = () => {
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);
  const [data, setData] = useState([]);

  // Fetch data from JSONPlaceholder API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setData(response.data); // Set data into the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Initialize DataTable when the data changes
  useEffect(() => {
    if (dataTableRef.current === null && data.length > 0) {
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
        pageLength: 5,
        destroy: true, // Destroy the previous instance before reinitializing
      });
      dataTableRef.current = true;
    }

    // Cleanup DataTable instance on unmount
    return () => {
      if (dataTableRef.current) {
        $(tableRef.current).DataTable().destroy(true);
        dataTableRef.current = null;
      }
    };
  }, [data]);

  return (
    <div>
      <h2>User Data</h2>
      <table ref={tableRef} className="display">
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

export default DataTable3;
