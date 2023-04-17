import React, { useState, useEffect } from "react";
import "./cart.scss";
import chevronRight from "../../assets/img/chevron-right.svg";
import iconCart from "../../assets/img/icon-cart.svg";
import { CartItem } from "../../Components/cart/cartitem/cart_item";
import CheckBox from "react-animated-checkbox";



import { CircularProgress } from "@mui/material";



//

import Helmet from "../../Components/Helmet/Helmet";
import CommonSection from "./CommonSection";
import { Container, Row, Col } from "reactstrap";

import { motion } from "framer-motion";
import { cartActions } from "../../Components/redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

export const Cart = () => {
  

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const Tr = ({ item }) => {
    const dispatch = useDispatch();
  
    const deleteProduct = () => {
      dispatch(cartActions.deleteItem(item.id));
    };

  return (
    <div className="cart">
      
        <div className="loading">
          <CircularProgress color="inherit" className="loading_progress" />
        </div>
      
      <div className="cart_header">
        <div className="cart_header_content">
          <p>Trang chủ</p>
          <img src={chevronRight} alt="" />
          <p>Giỏ hàng</p>
        </div>
      </div>
      <div className="cart_content">
        <div className="main">
          <div className="title">
            <div>
              <img src={iconCart} alt="" />
              <span>Giỏ hàng</span>
            </div>
            <div className="btn-delete-all">
              <button onClick={deleteProduct}>Xóa tất cả</button>
            </div>
          </div>
          <div className="list-table">
            {cartItems.map((item, index) => (
              <Tr
                item={item}
                key={index}
                
              />
            ))}
          </div>
          <div className="cart-actions">
            <div className="checkAll">
              <CheckBox
                // checked={check}
                checkBoxStyle={{
                  checkedColor: "#191919",
                  size: 20,
                  unCheckedColor: "#191919",
                }}
                duration={70}
                // onClick={() => handleClickCheckBox(!check)}
              />
              <p>Chọn tất cả ({})</p>
            </div>
            <div className="checkout">
              <span style={{ fontWeight: "bolder" }}>Tổng thanh toán</span>
              <span>( sản phẩm)</span>
              <span style={{ color: "#FE3877", fontWeight: "bolder" }}>
                {/* {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ */}
              </span>
              <button >Mua hàng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
}
