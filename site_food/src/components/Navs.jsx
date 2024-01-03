import React, { useState } from "react";
import "../styles/Navs.css";
import { RiMenuLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
const Navs = ({ setShow, addToCart, cartItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  return (
    <div className="all-nav">
      <a href="#" className="logo-nav">
        <i className="logo-icon"></i>
        <span className="logo-text">bonAppetit</span>
      </a>
      {/* placer ici */}
      <ul className={`navbar-nav ${isOpen ? "open" : ""}`}>
        <li>
          <a href="#" className="active">
            <Link to="/">Home</Link>
          </a>
        </li>
        <li>
          <a href="#">
            <Link to="/Order">meals</Link>
          </a>
        </li>
        <li>
          <a href="#">
            <Link to="/contact">contact</Link>
          </a>
        </li>
        <li>
          <a href="#">
            <Link to="/about">about us</Link>
          </a>
        </li>
      </ul>
      <div className="sign-in">
        <a href="#" className="user">
          <i className="ri-user-fill"></i>
          <Link to="/logot" className="black-text">
            Register
          </Link>
        </a>
        <a href="#" className="user">
          <Link to="/login" className="black-text">
            Sign in
          </Link>
        </a>
      </div>
      <div className="nav_box">
        <div className="cart" onClick={() => navigate("/cart")}>
          <span>
            <i className="fas fa-cart-plus"></i>
          </span>
          <span>{cartItems ? cartItems.length : 0}</span>
        </div>
      </div>
      <RiMenuLine
        id="menu-icon"
        className={isOpen ? "open" : ""}
        onClick={toggleMenu}
      />
    </div>
  );
};

export default Navs;
