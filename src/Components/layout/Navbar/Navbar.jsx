import React, { useState } from "react";
import logo from '../../../assets/imgs/desktop-computer.png'
import HeaderNavbar from './header_navbar/header_navbar';
import { Search } from './search/search';
import Option from './option/option';
import "../layout.scss"
// import "./search/search.css"
import { useNavigate } from 'react-router-dom';
import { Register } from '../../register/register';
import { Login } from "../../login/login";
import Head from "./header_navbar/Head";


export const Navbar = (prop) => {
  const [checkRegister, setCheckRegister] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const navigate = useNavigate();
  
  const passCheckRegister = (check) => {
    if (check) {
      setCheckRegister(true);
    }
  };
  const closeRegister = (check) => {
    if (!check) {
      setCheckRegister(false);
    }
  };
  const passCheckLogin = (check) => {
    if (check) {
      setCheckLogin(true);
    }
  };
  const closeLogin = (check) => {
    const admin = localStorage.getItem("isAdmin");
    if (admin === "true") {
      navigate("/bidu-ecommerce");
    }
    if (!check) {
      setCheckLogin(false);
      prop.checkLogin(true);
    }
  };
  const openRegister = (check) => {
    if (check) {
      setCheckLogin(false);
      setCheckRegister(true);
    }
  };
  
  const moveToHome = () => {
    navigate("/bidu-ecommerce");
  };
  const checkLogout = (check) => {
    prop.checkLogin(false);
  };
  return (
    <div className="navbar">
      <div className="login">
      {checkRegister && <Register closeRegister={closeRegister} />}
      {checkLogin && (
          <Login closeLogin={closeLogin} openRegister={openRegister} />
      )}
      </div>
      <div className="navbar_container">
        <div className="header">
          <Head/>
          {/* <HeaderNavbar 
          passCheckRegister={passCheckRegister}
          passCheckLogin={passCheckLogin}
          checkLogout={checkLogout}/> */}
        </div>
        <div className="main">
          <div className="content_main">
            <div className="logo" onClick={moveToHome}>
              <a><img  src="./images/logo1.png" alt="" /> </a> 
            </div>
            <div className="search">
              <Search />
            </div>
            <div className="option">
              <Option 
              passCheckRegister={passCheckRegister}
              passCheckLogin={passCheckLogin}
              checkLogout={checkLogout}
              /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Navbar;
