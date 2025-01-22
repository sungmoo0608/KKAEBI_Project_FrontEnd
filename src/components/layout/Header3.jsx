import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarOffcanvas,
  NavbarToggle,
  NavDropdown,
  NavLink,
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
} from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Header3 = () => {
  const { isLoggedIn, userId, handleLogout, handleLogin, authorities } =
    useAuth();

  const getRoleText = () => {
    if (authorities.includes("ROLE_ADMIN")) {
      return "관리자";
    }
    if (authorities.includes("ROLE_USER")) {
      return "회원";
    }
    return "";
  };

  return (
    <>
      <div className="bg-light">
        <Navbar expand="lg">
          <div className="container d-flex justify-content-between w-100">
            <NavbarBrand href="/">
              <FontAwesomeIcon icon={faArrowTrendUp} /> 돈 나와라 뚝딱
            </NavbarBrand>
            <div className="d-flex align-items-center">
              <NavbarToggle aria-controls="navbar-expand-md" />
              <NavbarOffcanvas
                id="navbar-expand-md"
                aria-labelledby="navbar-expand-md"
                placement="end"
              >
                <OffcanvasHeader closeButton>
                  <OffcanvasTitle id="navbarLabel-expand-md">
                    <FontAwesomeIcon icon={faBars} /> Menu
                  </OffcanvasTitle>
                </OffcanvasHeader>
                <OffcanvasBody>
                  <Nav
                    variant="underline"
                    className="justify-content-start flex-grow-1 pe-3"
                  >
                    <NavDropdown
                      title="금융 상품 목록"
                      id="navbarDropdown-expand-md"
                    >
                      <NavDropdown.Item href="/goods/alllist">
                        모든 상품
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/goods/depositlist">
                        예금 상품
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/goods/fundlist">
                        펀드 상품
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/goods/exlist">
                        외환 상품
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/goods/stocklist">
                        주식 상품
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="게시판" id="navbarDropdown-expand-md">
                      <NavDropdown.Item href="/notice">
                        공지 사항
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/review">
                        후기 게시판
                      </NavDropdown.Item>
                    </NavDropdown>
                    {authorities.includes("ROLE_ADMIN") && (
                      <NavLink href="/performance/list">
                        회원 거래 상세 보기
                      </NavLink>
                    )}
                    {/* 로그인 안 했을 때만 회원가입 로그인 버튼 표시 */}
                    {!isLoggedIn && (
                      <>
                        <NavLink href="/register">회원 가입</NavLink>
                        <NavLink href="/login">로그인</NavLink>
                      </>
                    )}
                    {/* 로그인 상태일 때만 로그아웃 표시 */}
                    {isLoggedIn && (
                      <>
                        <div className="btn-group">
                          <NavLink href={`/myinfo`}>
                            <button
                              type="button"
                              className="btn btn-dark btn-sm m-0"
                            >
                              <span
                                className={`badge rounded-pill ${
                                  getRoleText() === "관리자"
                                    ? "bg-info"
                                    : "bg-success"
                                }`}
                              >
                                {getRoleText()}
                              </span>
                              &nbsp;
                              <FontAwesomeIcon icon={faUser} />
                              &nbsp;{userId}
                            </button>
                          </NavLink>
                          <NavLink onClick={handleLogout}>
                            <button className="btn btn-outline-secondary btn-sm m-0">
                              Log out
                            </button>
                          </NavLink>
                        </div>
                      </>
                    )}

                    {authorities.includes("ROLE_ADMIN") && (
                      <NavDropdown title="샘플" id="navbarDropdown-expand-md">
                        <NavDropdown.Item href="/goods/savingsrest2">
                          예금 상품 카드 목록
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/sample/datatables">
                          DataTables
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/sample/charts">
                          Charts
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/sample/dashboard">
                          DashBoard
                        </NavDropdown.Item>
                      </NavDropdown>
                    )}
                  </Nav>
                </OffcanvasBody>
              </NavbarOffcanvas>
            </div>
          </div>
        </Navbar>
      </div>
    </>
  );
};

export default Header3;
