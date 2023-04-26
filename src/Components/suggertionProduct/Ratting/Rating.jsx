import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";

const Rating = (prop) => {
  const [rating, setRating] = useState(5);

  return (
    <div>
      <ReactStars
        count={5}
        size={24}
        activeColor="#ffd700"
        value={prop.rating}
        
      />
      {prop.rating}
    </div>
  );
};

export default Rating;