import React, { useState, useEffect } from "react";
import "./checkout.scss";
import chevronRight from "../../assets/img/chevron-right.svg";
import iconCheckout from "../../assets/img/icon-checkout.svg";
import iconCheckoutVouucher from "../../assets/img/icon-checkout-system-vouucher.svg";
import iconCheckoutPayment from "../../assets/img/icon-checkout-payment.svg";
import { motion } from "framer-motion";
import { CardItem } from "../../Components/checkout/card_item/card_item";
import momo from "../../assets/imgs/momo.svg";
import vnpay from "../../assets/imgs/vnpay.svg";
import cash from "../../assets/imgs/cash_vi.svg";
import { SetProductsOrder } from "../../store/action";
import { PaymentForm } from "../../Components/checkout/paymentForm/paymentForm";
import { useSelector , useDispatch} from "react-redux";
import { cartActions } from "../../Components/redux/slices/cartSlice";
import Cart from "../cart/Cart1";
import Helmet from "../../Components/Helmet/Helmet";
import CommonSection from "../cart/CommonSection";
import { Link } from "react-router-dom";

export const Checkout = (prop) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
    const [paymentType, setPaymentType] = useState("online");
  
    function handlePaymentTypeChange(event) {
      setPaymentType(event.target.value);
      
    }
    console.log(paymentType);
  const totalQty = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const [checkFormPayment, setCheckFormPayment] = useState(false);
  // const [totalPayment, setTotalPayment] = useState(0);
 const Cartime=()=>{
  return(
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
          </div>
        </div>
      </section>
    </Helmet>
  )
 }
  const Tr = ({ item }) => {
    const dispatch = useDispatch();
    
    // setTotalPayment(item );
    const deleteProduct = () => {
      dispatch(cartActions.deleteItem(item.id));
    };
    
  
    return (
      <tr>
        <td>
          <img src={item.imgUrls} alt="" />
        </td>
        <td>{item.productName}</td>
        <td>{item.price .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
        <td>{item.quantity}sp</td>
        <td>
          <motion.i
            whileTap={{ scale: 1.2 }}
            onClick={deleteProduct}
            class="ri-delete-bin-line"
          ></motion.i>
        </td>
      </tr>
    );
  };
  const payment = () => {
    setCheckFormPayment(true)
  };
  const turnOff = (check) => {
    setCheckFormPayment(check);
  };
  // const Tr = ({ item }) => {
  //   const dispatch = useDispatch();
  //    }
  //    console.log(cartItems);
  
  return (
    <div className="Checkout">
      {checkFormPayment && (
        <div>
          <PaymentForm paymentType={paymentType} turnOff={turnOff} totalPayment={totalAmount}/>
        </div>
      )}
      <div className="Checkout_header">
        <div className="Checkout_header_content">
          <p>Trang chủ</p>
          <img src={chevronRight} alt="" />
          <p>Thanh toán</p>
        </div>
      </div>
      <div className="Checkout_content">
        <div className="main">
          <div className="title">
            <img src={iconCheckout} alt="" />
            <span>Thanh toán</span>
          </div>
          <div className="order-info">
            <div className="order-info-header">
              <span>Đơn hàng</span>
            </div>
            <div className="order-info-body">
                <Cartime/>
                  
            </div>
            <div className="system-vouchers">
              <div className="title">
                <img src={iconCheckoutVouucher} alt="" />
                <p>Mã giảm giá</p>
              </div>
              <div className="action-vouchers">Chọn voucher</div>
            </div>
            <div className="order-payment-header">
              <h2>Chọn hình thức thanh toán</h2>
              
              <div className="input-and-error">
      <input
        type="radio"
        name="payment-type"
        id="online"
        value="online"
        // checked={paymentType }
        onChange={handlePaymentTypeChange}
      />
      <div className="payer">Thanh toán trực tuyến</div>
        <label className="option" htmlFor="online">
        <a href="https://vivnpay.vn/thanh-toan-mua-sam"><img className="pr-3" src={vnpay} alt="" /></a> 
          <a href="https://momo.vn/thanh-toan-hoa-don"><img className="pr-3" src={momo} alt="" /> </a>
        </label>
      <input
        type="radio"
        name="payment-type"
        id="offline"
        value="offline"
        // checked={paymentType }
        onChange={handlePaymentTypeChange}
      />
      <div className="payer">Thanh toán trực tiếp</div>
      <label className="option" htmlFor="offline">
        <img className="pr-3" src={cash} alt="" />
      </label>
    </div>
            </div>
            <div className="order-payment-title">
              <div className="general-info">
                <div className="general-info-item">
                  <span>Tổng sản phẩm ({totalQty} sản phẩm) </span>
                  <span>
                    {totalQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    sp
                  </span>
                </div>
                {/* <div className="general-info-item">
                  <span>Phí vận chuyển:</span>
                  <span>32.000đ</span>
                </div> */}
                <div className="general-info-item">
                  <span>Giảm giá phí vận chuyển:</span>
                  <span>0VNĐ</span>
                </div>
                <div className="general-info-item">
                  <span>Giảm giá tiền hàng:</span>
                  <span>0VNĐ</span>
                </div>
                <div className="general-info-item">
                  <span style={{ fontWeight: "bolder" }}>Tổng thanh toán:</span>
                  <span style={{ fontWeight: "bolder", color: "#fd37ae" }}>
                    {totalAmount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    VNĐ
                  </span>
                </div>
              </div>
            </div>
            <div className="order-create-section">
              <div className="create-order"  onClick={payment}>
                <p>Thanh toán </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};