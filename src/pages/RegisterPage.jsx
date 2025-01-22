import React, { useEffect, useState } from "react";
import userService from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const initUserState = {
    user_id: "",
    passwd: "",
    confirm_passwd: "",
    cif_gubun: "",
    birthday: "",
    biz_no: "",
    name: "",
    telno: "",
    email: "",
    create_date: "",
    last_change_date: "",
  };

  const [user, setUser] = useState(initUserState);
  const [submitted, setSubmitted] = useState(false);
  const [isIdValid, setIsIdValid] = useState(null);
  const [isPhoneValid, setIsPhoneValid] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isBiznoValid, setIsBiznoValid] = useState(null);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // 입력 필드가 변경될 때마다 ID 유효성 상태 초기화
    if (name === "user_id") {
      setIsIdValid(null); // ID 유효성 상태 초기화
    }

    // 입력 필드가 변경될 때마다 telno 유효성 상태 초기화
    if (name === "telno") {
      setIsPhoneValid(null); // telno 유효성 상태 초기화
    }

    // 입력 필드가 변경될 때마다 email 유효성 상태 초기화
    if (name === "email") {
      setIsEmailValid(null); // email 유효성 상태 초기화
    }

    // 입력 필드가 변경될 때마다 biz_no 유효성 상태 초기화
    if (name === "biz_no") {
      setIsBiznoValid(null); // biz_no 유효성 상태 초기화
    }

    setUser({ ...user, [name]: value });
  };

  const checkPasswordMatch = () => {
    setIsPasswordChecked(true); // 비밀번호 확인 버튼을 눌렀을 때만 확인

    // 비밀번호나 확인 비밀번호가 비어있으면 "비밀번호를 입력하세요."
    if (!user.passwd || !user.confirm_passwd) {
      setIsPasswordMatch(null); // 비밀번호 입력이 안되었으면 비교를 하지 않음
      return;
    }

    // 비밀번호가 일치하는지 비교
    if (user.passwd !== user.confirm_passwd) {
      setIsPasswordMatch(false); // 비밀번호 불일치
    } else {
      setIsPasswordMatch(true); // 비밀번호 일치
    }
  };

  const saveUser = (event) => {
    event.preventDefault(); // form의 기본 동작인 새로고침 방지

    if (user.passwd !== user.confirm_passwd) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (
      !user.user_id ||
      !user.passwd ||
      !user.name ||
      !user.birthday ||
      !user.telno ||
      !user.email ||
      !user.cif_gubun
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (user.cif_gubun === "2" || user.cif_gubun === "3") {
      if (!user.biz_no) {
        alert("사업자/법인 번호를 입력해주세요.");
        return;
      }
    }

    let data = {
      user_id: user.user_id,
      passwd: user.passwd,
      cif_gubun: user.cif_gubun,
      birthday: user.birthday,
      biz_no: user.biz_no,
      name: user.name,
      telno: user.telno,
      email: user.email,
      create_date: user.create_date,
      last_change_date: user.last_change_date,
    };

    console.log(data);

    userService
      .register(data)
      .then((response) => {
        console.log(response);
        setSubmitted(true);
        // 회원 가입 완료 팝업
        alert("회원 가입이 완료되었습니다.");
        // 일정 시간 후 메인 페이지로 이동
        setTimeout(() => {
          navigate(`/`); // 2초 뒤 메인 페이지로 리디렉션
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        alert("회원 가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
      });
  };

  // 아이디 유효성 검사
  const validateUserId = (userId) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(userId);
  };

  // 아이디 유효성 검사
  const checkUserId = (event) => {
    if (!user.user_id) {
      alert("가입할 ID를 입력해주세요.");
      return;
    }

    event.preventDefault();

    if (!validateUserId(user.user_id)) {
      setIsIdValid(false); // Invalid ID format
      return;
    }

    userService
      .checkUserId(user.user_id)
      .then((response) => {
        if (response.data === "이미 가입된 ID입니다.") {
          setIsIdValid(false); // ID already exists
        } else {
          setIsIdValid(true); // Valid ID
        }
      })
      .catch((error) => {
        console.log("Error checking ID:", error);
        setIsIdValid(false); // Error occurred, invalid ID
      });
  };

  //전화번호 유효성 검사//
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{10,11}$/;
    return regex.test(phoneNumber);
  };

  //전화번호 유효성 검사//
  const checkUserPhone = (event) => {
    if (!user.telno) {
      alert("가입할 전화번호를 입력해주세요.");
      return;
    }

    event.preventDefault();

    if (!validatePhoneNumber(user.telno)) {
      setIsPhoneValid(false); // Invalid phone number format
      return;
    }

    userService
      .checkUserPhone(user.telno)
      .then((response) => {
        if (response.data === "이미 가입된 전화번호입니다.") {
          setIsPhoneValid(false); // 이미 사용 중인 전화번호일 때
        } else {
          setIsPhoneValid(true); // 사용 가능한 전화번호일 때
        }
      })
      .catch((error) => {
        console.log("Error checking ID:", error);
        setIsPhoneValid(false); // 오류 발생 시 false 설정
      });
  };

  //이메일 유효성 검사
  const checkUserEmail = (event) => {
    if (!user.email) {
      alert("가입할 Email를 입력해주세요.");
      return;
    }

    event.preventDefault();
    userService
      .checkUserEmail(user.email)
      .then((response) => {
        if (response.data === "이미 가입된 Email입니다.") {
          setIsEmailValid(false); // 이미 사용 중인 전화번호일 때
        } else {
          setIsEmailValid(true); // 사용 가능한 전화번호일 때
        }
      })
      .catch((error) => {
        console.log("Error checking ID:", error);
        setIsEmailValid(false); // 오류 발생 시 false 설정
      });
  };

  // 사업자/법인 번호 유효성 검사
  const checkUserBizno = (event) => {
    if (!user.biz_no) {
      alert("가입할 사업자/법인 번호를 입력해주세요.");
      return;
    }

    event.preventDefault();
    userService
      .checkUserBizno(user.biz_no)
      .then((response) => {
        if (response.data === "이미 가입된 사업자/법인 번호입니다.") {
          setIsBiznoValid(false); // 이미 사용 중인 전화번호일 때
        } else {
          setIsBiznoValid(true); // 사용 가능한 전화번호일 때
        }
      })
      .catch((error) => {
        console.log("Error checking ID:", error);
        setIsBiznoValid(false); // 오류 발생 시 false 설정
      });
  };

  const cancleClick = () => {
    navigate(`/`);
  };

  return submitted ? (
    <Navigate to={{ pathname: "/" }} />
  ) : (
    <div id="layoutAuthentication_content">
      <main>
        <div className="container mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-4">
                    회원 가입
                  </h3>
                </div>
                <div className="card-body">
                  <div className="row justify-content-md-center mb-2">
                    <form>
                      <div className="row">
                        <div className="col">
                          <div className="mb-3">
                            <div className="input-group">
                              <span className="input-group-text">아이디</span>
                              <input
                                className="form-control"
                                id="inputUserid"
                                type="text"
                                name="user_id"
                                placeholder="아이디를 입력해주세요."
                                value={user.user_id}
                                onChange={handleInputChange}
                              ></input>
                              <button
                                className="btn btn-dark btn-sm"
                                onClick={checkUserId}
                                type="button"
                              >
                                중복 확인
                              </button>
                            </div>
                            {isIdValid === false && (
                              <div className="bg-light rounded my-1 text-center text-danger">
                                ID는 영어와 숫자만 가능합니다.
                              </div>
                            )}
                            {isIdValid === false && (
                              <div className="bg-light rounded my-1 text-center text-danger">
                                이미 가입된 ID입니다.
                              </div>
                            )}
                            {isIdValid === true && (
                              <div className="bg-light rounded my-1 text-center text-success">
                                가입 가능한 ID입니다.
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            <div className="input-group mb-1">
                              <span className="input-group-text">비밀번호</span>
                              <input
                                className="form-control"
                                id="inputPassword"
                                name="passwd"
                                type="password"
                                placeholder="비밀번호를 입력하세요."
                                value={user.passwd}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="input-group">
                              <span className="input-group-text">
                                비밀번호 재확인
                              </span>
                              <input
                                className="form-control"
                                id="inputConfirmPassword"
                                name="confirm_passwd"
                                type="password"
                                placeholder="비밀번호를 재입력하세요."
                                value={user.confirm_passwd}
                                onChange={handleInputChange}
                              />
                              <button
                                type="button"
                                className="btn btn-dark btn-sm"
                                onClick={checkPasswordMatch}
                              >
                                비밀번호 확인
                              </button>
                            </div>
                            {isPasswordChecked && isPasswordMatch === false && (
                              <div className="bg-light rounded my-1 text-center text-danger">
                                비밀번호가 일치하지 않습니다.
                              </div>
                            )}
                            {isPasswordChecked && isPasswordMatch === true && (
                              <div className="bg-light rounded my-1 text-center text-success">
                                비밀번호가 일치합니다.
                              </div>
                            )}
                            {isPasswordChecked && isPasswordMatch === null && (
                              <div className="bg-light rounded my-1 text-center text-danger">
                                비밀번호를 입력하세요.
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            <div className="input-group mb-3">
                              <span className="input-group-text">이름</span>
                              <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={user.name}
                                placeholder="이름을 입력하세요."
                                onChange={handleInputChange}
                              ></input>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="input-group mb-3">
                              <span className="input-group-text">생년월일</span>
                              <input
                                className="form-control"
                                id="inputBirthday"
                                type="date"
                                name="birthday"
                                value={user.birthday}
                                placeholder="생년월일을 선택하세요."
                                onChange={handleInputChange}
                              ></input>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="input-group">
                              <span className="input-group-text">전화번호</span>
                              <input
                                className="form-control"
                                id="inputTelno"
                                type="number"
                                name="telno"
                                placeholder="전화번호를 입력해주세요"
                                value={user.telno}
                                onChange={handleInputChange}
                              ></input>
                              <button
                                className="btn btn-dark btn-sm"
                                onClick={checkUserPhone}
                                type="button"
                              >
                                중복 확인
                              </button>
                            </div>
                            {isPhoneValid === false && (
                              <div className="bg-light rounded my-1 text-center text-danger">
                                전화번호는 10자 이상 11자 이하로 입력해주세요.
                              </div>
                            )}
                            {isPhoneValid === false && (
                              <div className="bg-light rounded my-1 text-center text-danger">
                                이미 가입된 전화번호입니다.
                              </div>
                            )}
                            {isPhoneValid === true && (
                              <div className="bg-light rounded my-1 text-center text-success">
                                가입 가능한 전화번호입니다.
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            <div className="input-group">
                              <span className="input-group-text">
                                이메일 주소
                              </span>
                              <input
                                className="form-control"
                                id="inputEmail"
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={user.email}
                                onChange={handleInputChange}
                              ></input>
                              <button
                                className="btn btn-dark btn-sm"
                                onClick={checkUserEmail}
                                type="button"
                              >
                                중복 확인
                              </button>
                            </div>
                            {isEmailValid === false && (
                              <div className="bg-light rounded my-1 text-center text-danger">
                                이미 가입된 이메일입니다.
                              </div>
                            )}
                            {isEmailValid === true && (
                              <div className="bg-light rounded my-1 text-center text-success">
                                가입 가능한 이메일입니다.
                              </div>
                            )}
                          </div>
                          <div className="mb-3">
                            <div className="input-group">
                              <label
                                className="input-group-text"
                                htmlFor="inputGroupSelect01"
                              >
                                고객 유형 선택
                              </label>
                              <select
                                className="form-select"
                                name="cif_gubun"
                                value={user.cif_gubun}
                                onChange={handleInputChange}
                                id="inputGroupSelect01"
                              >
                                <option value="">
                                  고객 유형을 선택하세요.
                                </option>
                                <option value="1">개인</option>
                                <option value="2">사업자</option>
                                <option value="3">법인</option>
                              </select>
                            </div>
                          </div>
                          <div className="mb-3">
                            {user.cif_gubun === "2" ||
                            user.cif_gubun === "3" ? (
                              <div className="input-group">
                                <span className="input-group-text">
                                  사업자/법인 번호
                                </span>
                                <input
                                  className="form-control"
                                  id="inputBizno"
                                  type="text"
                                  name="biz_no"
                                  value={user.biz_no}
                                  onChange={handleInputChange}
                                  placeholder="사업자/법인 번호를 입력해주세요."
                                />
                                <button
                                  type="button"
                                  className="btn btn-dark btn-sm"
                                  onClick={checkUserBizno}
                                >
                                  중복 확인
                                </button>
                              </div>
                            ) : null}
                            {isBiznoValid === false && (
                              <div className="bg-light rounded my-1 text-center text-danger">
                                이미 가입된 사업자/법인 번호입니다.
                              </div>
                            )}
                            {isBiznoValid === true && (
                              <div className="bg-light rounded my-1 text-center text-success">
                                가입 가능한 사업자/법인 번호입니다.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mb-0">
                        <div className="d-grid">
                          <button
                            className="btn btn-success btn-block"
                            onClick={saveUser}
                          >
                            등록하기
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card-footer text-center py-3">
                  <div className="mb-0">
                    <div className="d-grid">
                      <a className="btn btn-warning btn-block" href="/login">
                        로그인 가기
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

export default RegisterPage;
