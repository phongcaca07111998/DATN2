import React from "react";
import "./cart.scss";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export const Cart = (prop) => {
  const cartProduct = prop.dataCart;
  const currenUser = localStorage.getItem("customerName");
  const navigate = useNavigate();
  const totalQty = useSelector(state => state.cart.totalQuantity)
  const cartItems = useSelector((state) => state.cart.cartItems);
  const moveToCart = () => {
    navigate("/gio-hang");
  };
  const Tr = ({ item }) => {
    const dispatch = useDispatch();
  
    
    console.log(item);
    
  
    return (
      <tr>
        <td>
          <img src={item.imgUrls} alt="" />
        </td>
        <td>{item.productName}</td>
        <td>${item.price}</td>
        <td>{item.quantity}px</td>
        <td>
        </td>
      </tr>
    );
  };
  return (
    <div className="menu__Cart">
      <div  className="menu__Cart__header">
        <h3>Giỏ hàng</h3>
      </div>
      <div className="menu__Cart__content">
        {currenUser ? (
          cartItems.map((item, index) => (
            <Tr key={index} item={item} />
          ))
        ) : (
          <h4>Đăng nhập để xem giỏ hàng của bạn</h4>
        )}
      </div>
      {currenUser && (
        <div className="menu__Cart__btn" onClick={moveToCart}>
          <h4>Xem giỏ hàng ({totalQty})</h4>
        </div>
      )}
    </div>
  );
};
