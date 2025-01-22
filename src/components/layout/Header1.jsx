import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  NavbarToggle,
  NavbarOffcanvas,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { routes } from "../../router/Router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faSearch,
  faColumns,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

const Header1 = () => {
  return (
    <>
      <div className="sb-nav-fixed">
        <Nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <a className="navbar-brand ps-3" href="#">
            돈 나와라 뚝딱
          </a>

          <button
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            href="#!"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <NavbarOffcanvas div id="layoutSidenav">
            <div id="layoutSidenav_nav">
              <Navbar
                div
                className="sb-sidenav accordion sb-sidenav-dark"
                id="sidenavAccordion"
              >
                <div>
                  <Navbar.Toggle aria-controls="collapseLayouts" />
                  <Navbar.Collapse
                    id="collapseLayouts"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordion"
                  >
                    <Nav className="sb-sidenav-menu-nested nav">
                      <Nav.Link href="#home">Static Navigation</Nav.Link>
                      <Nav.Link href="#link">Light Sidenav</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </div>
                <div className="sb-sidenav-footer">
                  <div className="small">Logged in as:</div>
                  Start Bootstrap
                </div>
              </Navbar>
            </div>
          </NavbarOffcanvas>
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
            <NavDropdown className="faUser">
              <NavDropdown.Item href="#action/3.1">Action1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Action2</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Action3</NavDropdown.Item>
            </NavDropdown>
          </ul>
        </Nav>
      </div>
    </>
  );
};

export default Header1;
