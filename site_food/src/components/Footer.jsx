import React from 'react';
import '../styles/Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>Restorant</p>
          <div className='div-footer-text'>
            <p className=''>discover awesome news</p>
            <p>adress:oujda morocco</p>
          </div>
        </div>
        <div className="footer-center">
          <ul className="footer-links">
            <li><a href="#" className="active">
              <Link to="/">Home</Link>
            </a></li>
            
            <li><a href="#">
              <Link to="/about">about us</Link>
            </a></li>
            <li><a href="#">
              <Link to="/Order">meals</Link>
            </a></li>
          </ul>
        </div>
        <div className="footer-right">
          <ul className="social-media">
            <li><a href="https://www.facebook.com/profile.php?id=61555236568851" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
            <li><a href="https://www.instagram.com/bonappetit783" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
      <div className="container-lg">
        <p>&copy; 2024 BonAppetit.com</p>
      </div>
    </footer>
  );
};

export default Footer;