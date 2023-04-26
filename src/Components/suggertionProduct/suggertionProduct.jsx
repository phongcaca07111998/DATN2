import React, { useEffect, useState } from "react";
import "./suggertionProduct.scss";
import { Card } from "./card/card";
import { commerce } from "../../lib/commerce";
import { CircularProgress } from "@mui/material";
import { LoadingSuggest } from "../loading/loadingSuggest";
import useGetData from "../../custom-hooks/useGetData";


export const SuggestionProduct = ({ tieude }) => {
  const { data: productsData, loading: firstLoading } = useGetData("product");
  const [limit, setLimit] = useState(4);
  const [loading, setLoading] = useState(false);

  const handleSeeMore = () => {
    setLoading(true);
    setLimit(prevLimit => prevLimit + 4);
    setLoading(false);
  };
  return (
    <div className="suggestionProduct">
      <div className="suggestionProduct_header">
        <h3>{tieude}</h3>
      </div>
      <div className="suggestionProduct_content">
        {firstLoading ? (
          <LoadingSuggest />
        ) : (
          productsData.slice(0, limit).map((item, index) => <Card key={index} item={item} />)
        )}
      </div>
      {limit < productsData.length && (
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
