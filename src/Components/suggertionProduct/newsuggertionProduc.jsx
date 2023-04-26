import React, { useEffect, useState } from "react";
import "./suggertionProduct.scss";
import { Card } from "./card/card";
import { CircularProgress } from "@mui/material";
import { LoadingSuggest } from "../loading/loadingSuggest";
import useGetData from "../../custom-hooks/useGetData";


export const NewsuggestionProduct = ({ tieude  }) => {
  const { data: productsData, loading: firstLoading } = useGetData("product");
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    // Lọc danh sách sản phẩm mới nhất
    const now = new Date();
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(now.getDate() - 10);
    const filteredProducts = productsData.filter((product) => {
      const productDate = new Date(product.date);
      return productDate >= tenDaysAgo && productDate <= now;
    });

    // Sắp xếp theo thứ tự giảm dần của ngày tháng
    filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Lưu danh sách sản phẩm mới nhất vào state
    setLatestProducts(filteredProducts);
  }, [productsData]);
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
          latestProducts.slice(0, limit).map((item, index) => (
            <Card key={index} item={item} />
          ))
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
