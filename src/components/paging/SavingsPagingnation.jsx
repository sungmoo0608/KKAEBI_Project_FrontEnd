import React from "react";
import { Link } from "react-router-dom";

//https://getbootstrap.com/docs/5.0/components/pagination/

const SavingsPagingnation = ({ paging, onClickPaging }) => {
  console.log(paging);

  const startQuery =
    "/savingsrest/list" +
    "?pageNum=" +
    (paging.startPage - 1) +
    "&" +
    "amount=" +
    paging.criteria.amount;

  const endQuery =
    "/savingsrest/list" +
    "?pageNum=" +
    (paging.endPage + 1) +
    "&" +
    "amount=" +
    paging.criteria.amount;

  console.log(startQuery);

  const rendering = () => {
    const row = [];

    for (let i = paging.startPage; i <= paging.endPage; i++) {
      console.log(
        "/list/" + "?pageNum=" + i + "&" + "amount=" + paging.criteria.amount
      );

      const query =
        "/savingsrest/list" +
        "?pageNum=" +
        i +
        "&" +
        "amount=" +
        paging.criteria.amount;

      row.push(
        <li className="page-item">
          <Link to={query} onClick={onClickPaging} className="page-link">
            {i}
          </Link>
        </li>
      );
    }

    return row;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {paging.prev == true && (
          <li className="page-item">
            <Link
              to={startQuery}
              onClick={onClickPaging}
              className="page-link"
              aria-label="Previous"
            >
              &laquo;
            </Link>
          </li>
        )}

        {rendering()}
        {/* <li className="page-item">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li> */}

        {paging.next == true && paging.endPage > 0 && (
          <li className="page-item">
            <Link
              to={endQuery}
              onClick={onClickPaging}
              className="page-link"
              aria-label="Next"
            >
              &raquo;
              {/* <span aria-hidden="true">&raquo;</span> */}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SavingsPagingnation;
