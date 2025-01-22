import React, { useEffect, useState } from "react";
import savingsService from "../services/SavingsService";
import { useNavigate, useParams } from "react-router-dom";

const GoodsSavingsViewPage = () => {
  const initProductState = {
    productRates: [], // productRates를 빈 배열로 초기화
  };

  // path: "/boards/:bid/:name",
  // path: "/boards/:bid",
  // loader: () => "글 업데이트",
  // element: <BoardUpdatePage />,

  const { finprdtcd } = useParams();

  const [product, setProduct] = useState(initProductState);

  //처음 랜더링 하고, 한번만 타라
  useEffect(() => {
    savingsService
      .get(finprdtcd)
      .then((response) => {
        console.log(response);
        setProduct(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [finprdtcd]);

  const navigate = useNavigate();

  const cancleClick = () => {
    navigate(`/goods/savingsrest`);
  };

  return (
    <div>
      <div className="container mt-3">
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center mt-3">{product.finprdtnm}</h3>
              <div className="card-body">
                <div className="form-group mt-3">
                  <label> 가입방법 </label>
                  <input
                    placeholder="제목을 넣으시오."
                    name="joinway"
                    className="form-control"
                    value={product.joinway}
                  />
                </div>
                <div className="form-group mt-3 mb-3">
                  <label> 기타사항 </label>
                  <textarea
                    placeholder="내용을 적으시오"
                    name="etcnote"
                    className="form-control"
                    value={product.etcnote}
                    rows="10"
                  />
                </div>
                <div className="form-group mt-3">
                  <label>이자율 상세</label>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>저축 기간(개월)</th>
                        <th>단리 금리</th>
                        <th>우대 금리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.productRates &&
                        product.productRates.map((rate, index) => (
                          <tr key={index}>
                            <td>{rate.savetrm}개월</td>
                            <td>{rate.intrrate}%</td>
                            <td>{rate.intrrate2}%</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <button className="btn btn-danger" onClick={cancleClick}>
                  목록 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsSavingsViewPage;
