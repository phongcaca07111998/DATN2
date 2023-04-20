import React ,{useState}from "react";
import Helmet from "../../Components/Helmet/Helmet";
import CommonSection from "./CommonSection";
import { Container, Row, Col } from "reactstrap";
import "./cart.css"
import { motion } from "framer-motion";
import { cartActions } from "../../Components/redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

import { Link, Navigate } from "react-router-dom";
import { UseStore } from "../../store";



const Cart = () => {
  
  const cartItems = useSelector((state) => state.cart.cartItems);
  

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  
 
  

  
  
  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <div className="container">
          <div className="cartall">
            <div className="col-9" >
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>

                      
                    </tr>
                  </thead>

                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="col-3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between fs-4 fw-bold ">
                  Tổng giá trị :
          
                </h6>
              </div>
              <p className="fs-4 fw-bold">
              {totalAmount .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ
              </p>
              <div>
                <button className="buy__btn w-100 ">
                  <Link  to="/thanh-toan">Checkout</Link>
                </button>
                
                <button className="buy__btn w-100 mt-3">
                  <Link to="/bidu-ecommerce">Shopping</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
};


const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  console.log(item);
  

  return (
    <tr>
      <td>
        <img src={item.imgUrls} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>{item.price .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") } VNĐ</td>
      <td>{item.quantity }sp</td>
      <td>
        
        <button className="" onClick={deleteProduct}>Xóa</button>
       
      </td>
    </tr>
  );
};

export default Cart;
