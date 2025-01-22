import axios from "axios";
import React, { useEffect, useState } from "react";

const AuthorityPage = () => {
  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-4">
                    접근 권한 안내 페이지
                  </h3>
                </div>
                <div className="container my-5">
                  <div className="alert alert-danger text-center">
                    <strong>접근 권한이 없습니다!</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthorityPage;
