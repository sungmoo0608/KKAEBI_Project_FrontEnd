import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-select-dt";

import "../../css/DataT.css";

DataTable.use(DT);

function DataT() {
  const columns = [
    { data: "name" },
    { data: "position" },
    { data: "office" },
    { data: "extn" },
    { data: "start_date" },
    { data: "salary" },
  ];

  return (
    <>
      <div>
        <h2>DataTables + React example</h2>

        <DataTable
          ajax="/data.json"
          columns={columns}
          className="display"
          options={{
            responsive: true,
            select: true,
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Office</th>
              <th>Extn.</th>
              <th>Start date</th>
              <th>Salary</th>
            </tr>
          </thead>
        </DataTable>
      </div>
    </>
  );
}

export default DataT;
