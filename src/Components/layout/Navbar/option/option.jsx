import React, { useState } from 'react'
import './option.scss'
import icon_cart from "../../../../assets/imgs/icon_cart.svg";
import icon_bell from "../../../../assets/imgs/icon_bell.svg";
import chat_normal from "../../../../assets/imgs/chat_normal.svg";
import { Cart } from "./cart/cart";
import { useNavigate } from 'react-router-dom';
import { Login } from '@mui/icons-material';
import { useEffect } from 'react';
import Userprofile from '../../UserProfile/Userprofile';

const Option=(prop)=> {
  const currenUser = localStorage.getItem("customerName");
  const [textLogin, setTextLogin] = useState("Đăng nhập");
  const [showUserProfile, setShowUserProfile] = useState(false);
  const navigate = useNavigate()

  const register = () => {
    prop.passCheckRegister(true);
  };

  const login = () => {
    prop.passCheckLogin(true);
    
  };

  const logOut = () => {
    localStorage.removeItem("customerName");
    // localStorage.removeItem("isAdmin");
    // localStorage.removeItem("userId");
    setTextLogin("Đăng nhập");
    prop.checkLogout(true)
    navigate("/bidu-ecommerce")
  };
  useEffect(() => {
    if (currenUser) {
      setTextLogin("Đăng xuất");
    }
  },[currenUser]);
  const profile = () => {
    navigate('/userprofile'); // chuyển hướng đến trang Userprofile
  };
  return (
    <div style={{ position: "relative" }}>
      <div className="option">
        <div className="option_icon">
      <div className='phantu'><i className='fa fa-user icon-circle'></i>
            <div className="bottom">
                <p onClick={textLogin === "Đăng nhập" ? login : logOut} >
                
                   {textLogin} </p>
                   {/* <p>{currenUser ? <p style={{color: "rgb(187, 58, 165)"}}>{currenUser}</p> : <p onClick={register}>Đăng ký</p>}</p> */}
                <p onClick={profile}>Trang cá nhân</p> 
                <p>Tư vấn hướng dẫn</p>       
            </div>
            </div> 
            </div>
        <div className="option_icon">
          <img src={icon_bell} alt="" />
        </div>
        <div className="option_icon cart">
          <div className="menuCart">
          <Cart  />
          </div>
          <img src={icon_cart} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Option
