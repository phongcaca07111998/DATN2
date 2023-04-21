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
import { auth } from "../../../firebase/firebase";
import { getAuth, signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import useGetData from '../../../../custom-hooks/useGetData';

const Option=(prop)=> {
  const {currentUser} = getAuth();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  
  const { data: usersData, loading } = useGetData("users");
  const mainUser = usersData.find(userData => userData.email == currentUser?.email);

  console.log(mainUser?.seller);


  const navigate = useNavigate()
  

  const moveToCart = () => {
    navigate("/gio-hang");
  };

  const register = () => {
    prop.passCheckRegister(true);
  };

  const login = () => {
    prop.passCheckLogin(true);
    
  };


  const logOut = () => {  
    signOut(auth)
    

      .then(() => {
        // toast.success("Logged out");
        navigate("/bidu-ecommerce");
        prop.passCheckLogout(true)
        
      })
      .catch(err => {
        // toast.error(err.message);
      });
      
  }
  const profileseler = () => {
    navigate('/selerprofile'); // chuyển hướng đến trang Userprofile
  };

  const profile = () => {
    navigate('/userprofile'); // chuyển hướng đến trang Userprofile
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="option">
        <div className="option_icon">
      <div className='phantu'><i className='fa fa-user icon-circle'></i>

            {currentUser ? (
              <div className="bottom">
                


              <p>{currentUser ? <a >Hello dit me may:{currentUser.displayName}</a> : <p></p>}</p>
              
                 
              <p onClick={profile}>Trang cá nhân</p> 
              <p 
               onClick={profileseler}>
                {mainUser?.seller=="Nhà bán hàng" ? <a>Trang người bán</a> :<a>Đăng kí trang người bán</a>}</p>
              <p>Tư vấn hướng dẫn</p>       
              <p onClick={logOut}>Đăng xuất</p>       
          </div>

            ) : (
              <div className="bottom">
                <p onClick={login} >Không đăng nhập thì cút</p> 
                <p onClick={register}>Đăng kí ở đây</p>       
            </div>

            )
          }
            
            </div> 
            </div>
        <div className="option_icon">
          <img src={icon_bell} alt="" />
        </div>
        <div className="option_icon cart">
          <div className="menuCart">
          
          </div>
          
          {currentUser?(
            <div>
            <img onClick={moveToCart}  src={icon_cart} alt="" />
          
            <span className="badge">{totalQuantity}</span>
            </div>
            

          ):(
            <img   src={icon_cart} alt="" />

          )}
          
          
        </div>
      </div>
    </div>
  )
}

export default Option
