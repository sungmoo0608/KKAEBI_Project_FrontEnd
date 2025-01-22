import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../router/Router";
import {
  Navbar,
  Nav,
  NavDropdown,
  NavbarToggle,
  NavLink,
  NavbarCollapse,
  NavbarBrand,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faSearch,
  faColumns,
  faAngleDown,
  faTachometerAlt,
  faBookOpen,
  faAngleDoubleDown,
  faChartArea,
  faTable,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";

const Header2 = () => {
  return (
    <>
      <Nav div className="sb-nav-fixed">
        <Nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <a className="navbar-brand ps-3" href="#">
            <FontAwesomeIcon icon={faMoneyBillTrendUp} /> 도깨비 은행
          </a>
          <button
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            href="#!"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
              <Nav
                nav
                className="sb-sidenav accordion sb-sidenav-dark"
                id="sidenavAccordion"
              >
                <div className="sb-sidenav-menu">
                  <Nav div className="nav">
                    <NavLink a className="nav-link" href="/">
                      <div className="sb-nav-link-icon">
                        <FontAwesomeIcon icon={faTachometerAlt} />
                      </div>
                      Dashboard
                    </NavLink>
                    <NavbarToggle aria-controls="basic-navbar-nav">
                      <a
                        className="nav-link collapsed"
                        href="#"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseLayouts"
                        aria-expanded="false"
                        aria-controls="collapseLayouts"
                      >
                        <div className="sb-nav-link-icon">
                          <FontAwesomeIcon icon={faColumns} />
                        </div>
                        Layouts
                        <div className="sb-sidenav-collapse-arrow">
                          <FontAwesomeIcon icon={faAngleDown} />
                        </div>
                      </a>
                    </NavbarToggle>
                    <NavbarCollapse id="basic-navbar-nav">
                      <div
                        className="collapse"
                        id="collapseLayouts"
                        aria-labelledby="headingOne"
                        data-bs-parent="#sidenavAccordion"
                      >
                        <Nav nav className="sb-sidenav-menu-nested nav">
                          <NavLink a className="nav-link" href="#">
                            Static Navigation
                          </NavLink>
                          <NavLink a className="nav-link" href="#">
                            Light Sidenav
                          </NavLink>
                        </Nav>
                      </div>
                    </NavbarCollapse>

                    <a
                      className="nav-link collapsed"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsePages"
                      aria-expanded="false"
                      aria-controls="collapsePages"
                    >
                      <div className="sb-nav-link-icon">
                        <FontAwesomeIcon icon={faBookOpen} />
                      </div>
                      Pages
                      <div className="sb-sidenav-collapse-arrow">
                        <FontAwesomeIcon icon={faAngleDown} />
                      </div>
                    </a>
                    <div
                      className="collapse"
                      id="collapsePages"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#sidenavAccordion"
                    >
                      <nav
                        className="sb-sidenav-menu-nested nav accordion"
                        id="sidenavAccordionPages"
                      >
                        <a
                          className="nav-link collapsed"
                          href="#"
                          data-bs-toggle="collapse"
                          data-bs-target="#pagesCollapseAuth"
                          aria-expanded="false"
                          aria-controls="pagesCollapseAuth"
                        >
                          Authentication
                          <div className="sb-sidenav-collapse-arrow">
                            <FontAwesomeIcon icon={faAngleDoubleDown} />
                          </div>
                        </a>
                        <div
                          className="collapse"
                          id="pagesCollapseAuth"
                          aria-labelledby="headingOne"
                          data-bs-parent="#sidenavAccordionPages"
                        >
                          <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" href="#">
                              Login
                            </a>
                            <a className="nav-link" href="#">
                              Register
                            </a>
                            <a className="nav-link" href="#">
                              Forgot Password
                            </a>
                          </nav>
                        </div>
                        <a
                          className="nav-link collapsed"
                          href="#"
                          data-bs-toggle="collapse"
                          data-bs-target="#pagesCollapseError"
                          aria-expanded="false"
                          aria-controls="pagesCollapseError"
                        >
                          Error
                          <div className="sb-sidenav-collapse-arrow">
                            <FontAwesomeIcon icon={faAngleDoubleDown} />
                          </div>
                        </a>
                        <div
                          className="collapse"
                          id="pagesCollapseError"
                          aria-labelledby="headingOne"
                          data-bs-parent="#sidenavAccordionPages"
                        >
                          <nav className="sb-sidenav-menu-nested nav">
                            <a className="nav-link" href="#">
                              401 Page
                            </a>
                            <a className="nav-link" href="#">
                              404 Page
                            </a>
                            <a className="nav-link" href="#">
                              500 Page
                            </a>
                          </nav>
                        </div>
                      </nav>
                    </div>

                    <a className="nav-link" href="#">
                      <div className="sb-nav-link-icon">
                        <FontAwesomeIcon icon={faChartArea} />
                      </div>
                      Charts
                    </a>
                    <a className="nav-link" href="#">
                      <div className="sb-nav-link-icon">
                        <FontAwesomeIcon icon={faTable} />
                      </div>
                      Tables
                    </a>
                  </Nav>
                </div>
                <div className="sb-sidenav-footer">
                  <div className="small">Logged in as:</div>
                  Start Bootstrap
                </div>
              </Nav>
            </div>
          </div>
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Search for..."
                aria-label="Search for..."
                aria-describedby="btnNavbarSearch"
              />
              <button
                className="btn btn-primary"
                id="btnNavbarSearch"
                type="button"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>

          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <FontAwesomeIcon icon={faUser} />
            <NavDropdown className="nav-item dropdown">
              <NavDropdown.Item href="#action/3.1">Action1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Action2</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Action3</NavDropdown.Item>
            </NavDropdown>
          </ul>
        </Nav>
      </Nav>
    </>
  );
};

export default Header2;
