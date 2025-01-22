import React, { useEffect, useState } from "react";
import savingsService from "../services/SavingsService";
import SavingsPagingnation from "../components/paging/SavingsPagingnation";
import { Link } from "react-router-dom";

const GoodsSavingsListPage = () => {
  const [products, setProducts] = useState([]);
  //http://192.168.0.13:8282/savingsrest/list
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
    <div id="layoutAuthentication_content">
      <main>
        <div className="container mt-3">
          <div className="container-fluid">
            {/* <!-- DataTales Example --> */}
            <div className="card shadow-lg border-0 rounded-lg mt-5">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  예금 상품 목록
                </h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>금융 회사명</th>
                        <th>금융 상품명</th>
                        <th>가입 방법</th>
                        <th>상품 보기</th>
                      </tr>
                    </thead>

                    <tbody>
                      {products &&
                        products.map((products) => (
                          <tr key={products.finprdtcd}>
                            <td>{products.korconm}</td>
                            <td>{products.finprdtnm}</td>
                            <td>{products.joinway}</td>
                            <td>
                              <Link
                                to={"/goods/savingsrest/" + products.finprdtcd}
                              >
                                <button className="btn btn-primary btn-block">
                                  상품 보기
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
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
    // <!-- /.container-fluid -->);
  );
};

export default GoodsSavingsListPage;
