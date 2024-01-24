import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import "./header.css"

import { Link } from "react-router-dom";
const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const [isCartModalVisible, setCartModalVisible] = useState(false);

  const handleToggleModal = () => {
    setCartModalVisible(!isCartModalVisible);
  };
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar expand="lg" className="bgf" variant="danger">
      <Container>
        <Navbar.Brand >Admin</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={handleToggle}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
      <Link to="/category" className="nav-link">Categories</Link>
      <Link to="/product" className="nav-link">Product</Link>
    </Nav>
          <Nav></Nav>
        </Navbar.Collapse>
      </Container>
      <Nav className="">
     
       
        <Link to="/profile">
          <FaUser className="mx-3" />
          </Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
