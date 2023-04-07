import React from "react";
import "./card.scss";
import { useNavigate } from "react-router-dom";
import Rating from "../Ratting/Rating";

export const Card = (props) => {
  const data = props.item;
  const navigate = useNavigate();
  const moveToDetail = () => {
    navigate(`/san-pham/${data.id}`);
  };
  return (
    <div className="cardProduct" onClick={moveToDetail}>
      <div
        className="image"
        style={{ backgroundImage: `url(${data.image.url})` }}
      ></div>
      <div className="company">
        <span>Chính hãng</span>
        <span>{data.seller}</span>
      </div>
      <div className="cardProduct__inf">
        <p>{data.name}</p>
        <b>{data.price.formatted_with_code}</b>
        <div className="address">
          <p>Việt nam</p>
        </div>
        <Rating productId={data.id} />
      </div>
    </div>
  );
};
