import React from "react";
import "./card.scss";
import { motion } from "framer-motion";
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

 

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );

    toast.success("Product added successfully");
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
          <p>Việt Nam</p>
        </div>

        <Rating/>
        <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
        <i class='bx bxs-plus-circle' ></i>
        </motion.span>

      </div>
    </div>
  );
};