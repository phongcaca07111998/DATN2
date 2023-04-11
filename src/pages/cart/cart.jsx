import React, { useState, useEffect } from "react";
import "./cart.scss";
import chevronRight from "../../assets/img/chevron-right.svg";
import iconCart from "../../assets/img/icon-cart.svg";
import { CartItem } from "../../Components/cart/cartitem/cart_item";
import CheckBox from "react-animated-checkbox";
import { useLocation, useNavigate } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import { UseStore, action } from "../../store";
import { CircularProgress } from "@mui/material";
import useGetData from "../../custom-hooks/useGetData";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "./../../Components/redux/slices/cartSlice";
export const Cart = () => {
  // const location = useLocation();
  // const [data, setData] = useState([]);
  // const [check, setCheck] = useState(false);
  // const [countCheckout, setCountCheckout] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [totalItem, setTotalItem] = useState(0);
  // const [loading, setLoading] = useState(false);
  // const [checkFinishUpdateItemProduct, setCheckFinishUpdateItemProduct] =
  //   useState(false);

  // const [state, dispatch] = UseStore();
  // const { CheckCountInCart, checkoutData, checkAddToCart } = state;
  // const totalProductCheck = checkoutData.filter((x) => x.checkBuyNow === true);
  // const navigate = useNavigate();
  // //
  // const { data: productsData, firstLoading } = useGetData("product");
  // const productId = location.pathname.split("/")[2];
  // const mainData = productsData.find((productsData) => productsData.id === productId);
  
  // useEffect(() => {
  //   setLoading(true);
  //   mainData.cart.retrieve().then((cart) => {
  //     dispatch(action.SetItemCheckout(cart.line_items));
  //     setData(cart.line_items);
  //     setTotalItem(cart.total_unique_items);
  //     setLoading(false);
  //     setCheckFinishUpdateItemProduct(!checkFinishUpdateItemProduct);
  //   });
  // }, [CheckCountInCart]);

  // useEffect(() => {
  //   let count = 0;
  //   checkoutData.forEach((element) => {
  //     if (element.checkBuyNow === true) {
  //       count = count + element.line_total.raw;
  //     }
  //   });
  //   setTotalPrice(count);
  // }, [checkAddToCart, loading, check]);

  // const handleClickCheckBox = (check) => {
  //   setCheck(check);
  //   if (check) {
  //     checkoutData.forEach((element) => {
  //       element.checkBuyNow = true;
  //     });
  //   } else {
  //     checkoutData.forEach((element) => {
  //       element.checkBuyNow = false;
  //     });
  //   }
  // };

  // const handleCheckOut = () => {
  //   localStorage.setItem("checkOutItem", JSON.stringify(state.checkoutData));
  //   navigate("/thanh-toan");
  // };
  // const checkHandleCount = () => {};

  // const handleDeleteAll = () => {
  //   setLoading(true);
  //   mainData.cart.delete().then((response) => {
  //     dispatch(action.CheckAddToCart(!checkAddToCart));
  //     setData([]);
  //     setTotalItem(0);
  //     dispatch(action.CheckAddToCart(!checkAddToCart));
  //     setLoading(false);
  //   });
  // };

  // const UpdateDuplicateProduct = async (
  //   productLocation,
  //   count,
  //   variantGroupsUpdate,
  //   ItemDelete
  // ) => {
  //   setLoading(true);
  //   mainData.cart.remove(ItemDelete.productId).then((response) => {
  //     mainData.cart
  //       .add(data[productLocation].productId, count, variantGroupsUpdate)
  //       .then((response) => {
  //         dispatch(action.CheckChangeCountInCart(!CheckCountInCart));
  //       });
  //   });
  // };
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
            {cartItems?.map((item, index) => (
              <CartItem
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
