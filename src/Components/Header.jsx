import React, { useEffect, useContext, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { GlobalState } from "../Data/Context";
import { Navbar, Collapse, Nav, NavItem } from "reactstrap";
import logo from "../Assets/logo.png";
import { FaTimes, FaBars } from "react-icons/fa";

const Header = () => {
  const { headerList } = useContext(GlobalState);
  let location = useLocation(),
    [isOpen, setIsOpen] = useState(false),
    [isShadow, setIsShadow] = useState(false),
    toggle = () => {
      setIsOpen(!isOpen);
    },
    navigate = useNavigate();

  useEffect(() => {
    document.title = CapitalizeFirst(
      `Mu'ujiza  ${location.pathname.split("/").join(" ").substring(1)}`
    );
  }, [location.pathname]);

  let handleScroll = () => {
    window.onscroll = () => {
      if (window.scrollY > 100) setIsShadow(true);
      else setIsShadow(false);
    };
  };

  useEffect(() => {
    handleScroll();
  }, []);
  let classCss = (list) =>
    `menuItem text-decoration-none ${
      location.pathname.length > 1 &&
      list.url.length > 1 &&
      location.pathname.includes(list.url)
        ? "fw-bold headerActive"
        : location.pathname.length === 1 && list.url.length === 1
        ? "fw-bold headerActive"
        : "text-dark"
    } text-capitalize hug`;

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className={`container-fluid px-3 px-lg-5 header bg-white headerScroll py-4 w-100 ${
        isShadow ? "shadow" : ""
      }`}
      light
    >
      <Link
        to="/"
        className="text-decoration-none text-dark d-flex align-items-center"
      >
        {/* <img src={logo} alt="Honourworld" className="logo me-1 logo-img-size" /> */}
        <div className="d-block">
          <p className="text-capitalize site-primary-color m-0">Mu'ujiza</p>
          <p className="text-capitalize site-secondary-color ml-4">
            
          </p>
        </div>
      </Link>
      {isOpen ? (
        <FaTimes
          color="white"
          onClick={toggle}
          className="navbar-close rounded d-lg-none textColor2"
        />
      ) : (
        <FaBars
          color="white"
          onClick={toggle}
          className="navbar-close rounded d-lg-none textColor2"
        />
      )}
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mx-auto d-flex align-items-center" navbar>
          {headerList.map((list, index) => (
            <NavItem key={index} className="mx-2 mx-lg-3 my-2 my-lg-auto">
              {list.type === "button" ? (
                <span
                  onClick={() => {
                    navigate("/login");
                    if (isOpen) setIsOpen(false);
                  }}
                  className={`${classCss(list)} myCursor`}
                >
                  {list.name}
                </span>
              ) : (
                <Link
                  to={list.url}
                  onClick={() => (isOpen ? setIsOpen(false) : null)}
                  className={classCss(list)}
                >
                  {list.name}
                </Link>
              )}
            </NavItem>
          ))}
        </Nav>
        <div className="d-flex align-items-center justify-content-center me-lg-0">
          <NavItem className="myCursor list-unstyled me-lg-4 me-2">
            <Link
              to={"/login"}
              onClick={() => (isOpen ? setIsOpen(false) : null)}
              className="text-decoration-none btn btn-primary1 text-capitalize px-4 py-3 hug"
            >
              Register
            </Link>
          </NavItem>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;

export let CapitalizeFirst = (text) => {
  return text.replace(/\b\w/g, (m) => {
    return m.toUpperCase();
  });
};
