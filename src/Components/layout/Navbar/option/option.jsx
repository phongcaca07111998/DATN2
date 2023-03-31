import React from 'react'
import './option.scss'
import icon_cart from "../../../../assets/imgs/icon_cart.svg";
import icon_bell from "../../../../assets/imgs/icon_bell.svg";
import chat_normal from "../../../../assets/imgs/chat_normal.svg";
import { Cart } from "./cart/cart";


function option() {
  return (
    <div style={{ position: "relative" }}>
      <div className="option">
        <div className="option_icon">
      <div className='phantu'><i className='fa fa-user icon-circle'></i>
            <div className="bottom">
                <p > Dang Nhap </p>
                <p>Trang cá nhân</p> 
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

export default option