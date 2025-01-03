import React, { useEffect, useState } from "react";
import { Container, Navbar, Offcanvas, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../Header/header.css";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  // Sticky Header function
  const isSticky = () => {
    const header = document.querySelector(".header-section");
    const scrollTop = window.scrollY;
    scrollTop >= 120
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };

  return (
    <header className="header-section">
      <Container>
        <Navbar expand="lg" className="p-0">
          {/* Logo Section */}
          <Navbar.Brand>
            <NavLink to="/" className="logo">
              RetireRight
            </NavLink>
          </Navbar.Brand>
          {/* End Logo Section */}

          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={toggleMenu}
            className="navbar-toggler"
          >
            <i className="bi bi-list"></i>
          </Navbar.Toggle>

          <Navbar.Collapse className="justify-content-end">
            {/* This will align the Login button to the right */}
            <Nav className="ml-auto align-items-center">
              <NavLink
                className="nav-link cta-button"
                to="/login"
              >
                Login
              </NavLink>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            show={open}
            onHide={toggleMenu}
          >
            {/* Mobile Logo Section */}
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel" className="logo">
                RetireRight
              </Offcanvas.Title>
            </Offcanvas.Header>
            {/* End Mobile Logo Section */}

            <Offcanvas.Body className="d-lg-none">
              {/* Mobile View Login Button */}
              <Nav className="flex-grow-1">
                <NavLink
                  className="nav-link cta-button"
                  to="/login"
                  onClick={toggleMenu}
                >
                  Login
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
