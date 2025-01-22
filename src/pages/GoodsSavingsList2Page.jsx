import React, { useEffect, useState } from "react";
import savingsService from "../services/SavingsService";
import SavingsPagingnation from "../components/paging/SavingsPagingnation";
import { Link } from "react-router-dom";

const GoodsSavingsList2Page = () => {
  const [products, setProducts] = useState([]);
  //http://192.168.0.6:8282/savingsrest/list
  const [paging, setPaging] = useState(null);

  useEffect(() => {
    console.log("use Effective 실행");
    initProducts();
  }, []);

  const initProducts = () => {
    savingsService
      .getPagingList()
      .then((response) => {
        console.log(response);
        setProducts(response.data.product);
        setPaging(response.data.page);

        console.log(response.data.page);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onClickPaging = (e) => {
    e.preventDefault(); //기존에 링크 동작을 하지 말아라

    console.log(e.target.pathname);
    console.log(e.target.search);

    savingsService
      .getPagingList(e.target.pathname, e.target.search)
      .then((response) => {
        setProducts(response.data.product);
        setPaging(response.data.page);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <main>
        <div className="container-fluid px-4">
          <div className="container-lg">
            <h1 className="h3 my-5 text-gray-800 text-center">
              예금 상품 목록
            </h1>
            <div className="row">
              {products &&
                products.map((products) => (
                  <div className="col-xl-3 col-md-6 mb-5">
                    <div className="card h-100">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{products.korconm}</h5>
                        <p className="card-text">
                          {products.finprdtnm} | {products.joinway}
                        </p>
                      </div>
                      <div className="card-footer">
                        <small className="text-muted">
                          <Link to={"/savingsrest/" + products.finprdtcd}>
                            <button className="btn btn-primary btn-block">
                              보기
                            </button>
                          </Link>
                        </small>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="mt-4">
                {/* 페이징           */}
                {paging != null ? (
                  <SavingsPagingnation
                    paging={paging}
                    onClickPaging={onClickPaging}
                  ></SavingsPagingnation>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GoodsSavingsList2Page;
