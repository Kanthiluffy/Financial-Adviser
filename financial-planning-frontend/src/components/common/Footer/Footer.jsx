import React, { useState, useEffect } from "react";
import "../Footer/footer.css";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", toggleVisible);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", toggleVisible);
      }
    };
  }, []);

  return (
    <>
      <footer className="pt-5">
        <Container>
          <Row>
            <Col md="3" sm="12" className="quick_link mt-3 mt-md-0 ">
              <h4 className="mt-lg-0 mt-sm-3">Retirement Planning</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <NavLink to="/">Retirement Basics</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/">Retirement Savings Tips</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/">Tax Strategies</NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md="3" sm="12" className="quick_link mt-3 mt-md-0 ">
              <h4 className="mt-lg-0 mt-sm-3">Explore Resources</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <NavLink to="/">Retirement Calculators</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/">Investment Options</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/">Healthcare Planning</NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md="3" sm="12" className="quick_link mt-3 mt-md-0 ">
              <h4 className="mt-lg-0 mt-sm-3">Quick Links</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <NavLink to="/">Home</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/">FAQs</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/">Contact Us</NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md="3" sm="12" className="location mt-3 mt-md-0 ">
              <h4 className="mt-lg-0 mt-sm-3">Contact Info</h4>

              <div className="d-flex align-items-center">
              <i className="bi bi-geo-alt me-3"></i>
                <p className="pb-2">Dehradun, Uttarakhand, India</p>
              </div>

              <div className="d-flex align-items-top my-2">
                
                <a
                  target="_blank"
                  href="mailto:info@retirementplanning.com"
                  className="d-block"
                >
                  info@retirementplanning.com
                </a>
              </div>
              <div className="d-flex align-items-top ">
                <i className="bi bi-telephone me-3"></i>
                <a target="_blank" href="tel:+918976543210" className="d-block">
                  +91 9177943431
                </a>
              </div>
            </Col>
          </Row>
          <Row className="py-2 bdr mt-3">
            <Col className="col copyright">
              <p className="text-light">
                @ 2024. Retirement Planning Inc. All rights reserved
              </p>
            </Col>
          </Row>
        </Container>
      </footer>

      <div
        id="back-top"
        onClick={scrollTop}
        className={visible ? "active" : ""}
      >
        <i className="bi bi-arrow-up"></i>
      </div>
    </>
  );
};

export default Footer;
