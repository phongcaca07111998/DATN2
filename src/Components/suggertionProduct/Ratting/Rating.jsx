import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";

const Rating = (props) => {
  const [rating, setRating] = useState(5);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi kết quả đánh giá lên server
    console.log("Số sao được đánh giá: ", rating);
  };

  return (
    <div>
      <ReactStars
        count={5}
        size={24}
        activeColor="#ffd700"
        value={5}
      />
    </div>
  );
};

export default Rating;