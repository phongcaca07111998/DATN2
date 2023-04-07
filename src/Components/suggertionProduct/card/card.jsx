import React from "react";
import "./card.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import useGetData from "../../../custom-hooks/useGetData";
import { Rating } from "@mui/material";

export const Card = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveToDetail = () => {
    navigate(`/san-pham/${item.id}`);
  };

  const addToCart = () => {
    dispatch(cartActions.addToCart(item));
    toast.success(`${item.productName} đã được thêm vào giỏ hàng!`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <div className="cardProduct" onClick={moveToDetail}>
      <div
        className="image"
        style={{ backgroundImage: `url(${item.imgUrls})` }}
      ></div>
      <div className="company">
        <span>{item.category}</span>
      </div>
      <div className="cardProduct__inf">
        <p>{item.productName}</p>
        <b>{item.price}</b>
        <div className="address">
          <p onClick={addToCart}>Việt Nam</p>
        </div>
        <Rating/>
      </div>
    </div>
  );
};