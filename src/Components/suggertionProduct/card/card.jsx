import React from "react";
import "./card.scss";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import Rating from "../Ratting/Rating";

// import { Rating } from "@mui/material";

export const Card = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveToDetail = () => {
    navigate(`/san-pham/${item.id}`);
  };
  return (
    <div className="cardProduct" onClick={moveToDetail}>
      <div
        className="image"
        style={{ backgroundImage: `url(${item.imgUrls})` }}
      ></div>
      <div className="company">
        <span>{item.nameseller}</span>
      </div>
      <div className="cardProduct__inf">
        <p>{item.productName}</p>
        <b>{item.price .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</b>
        <div className="address">
        <a>{item.shortDesc}</a>
        </div>
          
        <div className="rating-wrapper">
          <Rating rating={item.rating} />
          <div className="rating-value">({item.rating?.toFixed(1)})</div>
        </div>
      </div>
    </div>
  );
};