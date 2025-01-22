import axios from "axios";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("error")) {
      setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 백엔드로 로그인 요청 보내기
    try {
      console.log("Sending data:", { userid, password }); // 데이터를 콘솔로 출력

      const response = await axios.post(
        "http://192.168.0.6:8282/api/auth/login", // 백엔드의 로그인 API URL
        {
          userid: userid,
          password: password, // 로그인에 필요한 사용자 아이디와 비밀번호
        },
        {
          withCredentials: true, // 쿠키를 포함해서 요청 보내기
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);

        // 로그인 성공 시 JWT 토큰을 로컬 스토리지에 저장
        const token = response.data;
        localStorage.setItem("jwtToken", token); // 로컬 스토리지에 토큰 저장

        // 이후 요청에서 사용할 수 있도록 토큰을 Axios 기본 헤더에 설정
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        window.location.href = `/`; // 로그인 후 이동할 페이지
      }
    } catch (error) {
      if (error.response) {
        // 서버에서 에러 응답을 받은 경우
        console.error("로그인 실패:", error.response.data);
        setErrorMessage(
          error.response.data.message ||
            "아이디 또는 비밀번호를 다시 확인해주세요."
        );
      } else {
        // 네트워크 오류 등
        console.error("로그인 에러:", error.message);
        setErrorMessage("로그인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-4">로그인</h3>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        id="userid"
                        name="userid"
                        value={userid}
                        onChange={(e) => setUserid(e.target.value)}
                        placeholder="userid"
                      />
                      <label htmlFor="inputID">아이디 입력</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                      <label htmlFor="inputPassword">비밀번호 입력</label>
                    </div>
                    {/* 경고 메시지 표시 */}
                    {errorMessage && (
                      <div className="alert alert-danger">{errorMessage}</div>
                    )}
                    <div className="mt-4 mb-0">
                      <div className="d-grid">
                        <button
                          className="btn btn-success btn-block"
                          type="submit"
                          onClick={handleSubmit}
                        >
                          로그인
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center py-3">
                  <div className="mb-0">
                    <div className="d-grid">
                      <a className="btn btn-warning btn-block" href="/register">
                        회원 가입 하기
                      </a>
                    </div>
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

export default LoginPage;
