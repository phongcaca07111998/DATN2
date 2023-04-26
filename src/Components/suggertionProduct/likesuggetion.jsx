import React, { useEffect, useState } from "react";
import "./suggertionProduct.scss";
import { Card } from "./card/card";
import { CircularProgress } from "@mui/material";
import { LoadingSuggest } from "../loading/loadingSuggest";
import useGetData from "../../custom-hooks/useGetData";

export const Likesuggetion = ({ tieude }) => {
  const { data: productsData, loading: firstLoading } = useGetData("product");
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([]);

  const handleSeeMore = () => {
    setLoading(true);
    setLimit(prevLimit => prevLimit + 5);
    setLoading(false);
  };

  useEffect(() => {
    const sorted = [...productsData].sort((a, b) => b.rating - a.rating);
    setSortedProducts(sorted.slice(0, 5));
  }, [productsData]);
  console.log(sortedProducts);
  return (
    <div className="suggestionProduct">
      <div className="suggestionProduct_header">
        <h3>{tieude}</h3>
      </div>
      <div className="suggestionProduct_content">
        {firstLoading ? (
          <LoadingSuggest />
        ) : (
          sortedProducts.map((item, index) => <Card key={index} item={item} />)
        )}
      </div>
      {limit < sortedProducts.length && (
        <div className="suggestionProduct_seeMore" onClick={handleSeeMore}>
          {loading ? (
            <CircularProgress color="inherit" />
          ) : (
            <div className="seeMore">
              <div className="text">Xem thêm</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
