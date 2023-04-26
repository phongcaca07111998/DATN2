import React, { useState, useEffect } from "react";
import "./homeSearch.scss";
import chevronRight from "../../assets/img/chevron-right.svg";
import { Category } from "../../Components/category/category";
import { useLocation } from "react-router-dom";
import { removeVietnameseTones } from "../../Components/layout/Navbar/search/removeVNtones";
import { Card } from "../../Components/suggertionProduct/card/card";
import { UseStore } from "../../store";
import { CircularProgress } from "@mui/material";
import Categories from "../../Components/MainPage/Categories";
import useGetData from "../../custom-hooks/useGetData";

export const HomeSearch = () => {
  
  const location = useLocation();
  const [data, setData] = useState([]);
  const search = location.pathname?.split("keyword=")[1];
  const [state] = UseStore();
  const [loading, setLoading] = useState(false);
  const { data: productsData, loading: firstLoading } = useGetData("product");



  console.log(productsData);
  // useEffect(() => {
  //   const filteredData = productsData.filter((item) => {
  //     const itemName = item.category.toLowerCase();
  //     const searchName = search.toLowerCase();
  //     const itemShort = item.productName.toLowerCase();
  //     const searchShort = search.toLowerCase();
  //     return (itemName.includes(searchName)||
  //           itemShort.includes(searchShort)
            
  //     ) 
  //   });
  //   setData(filteredData);
  //   setLoading(false);  
  // }, [search, productsData]);

  //
  useEffect(() => {
    const filteredData = productsData.filter((item) => {
      const itemName = item.category.toLowerCase();
      const searchName = removeVietnameseTones(search).toLowerCase(); // Loại bỏ dấu tiếng Việt trong chuỗi tìm kiếm
      const itemShort = removeVietnameseTones(item.productName).toLowerCase(); // Loại bỏ dấu tiếng Việt trong tên sản phẩm
      const searchShort = removeVietnameseTones(search).toLowerCase(); // Loại bỏ dấu tiếng Việt trong chuỗi tìm kiếm
      return (
        itemName.includes(searchName) ||
        itemShort.includes(searchShort)
      );
    });
    setData(filteredData);
    setLoading(false);
  }, [search, productsData]);
  //

  return (
    <div className="homeSearch">
      {loading && (
        <div className="loading">
          <CircularProgress color="inherit" className="loading_progress" />
        </div>
      )} 
      <div className="homeSearch_header">
        <div className="homeSearch_header_content">
          <p>Trang chủ</p>
          <img src={chevronRight} alt="" />
          <p>Tìm kiếm</p>
          <img src={chevronRight} alt="" />
          <p>{search}</p>
        </div>
      </div>
      <div className="homeSearch_content">
        <div className="main">
          <div className="category">
            {/* <Category sentData={sentData} /> */}
            <Categories />
          </div>
          <div className="main_content">
            {data?.map((item, index) => (
              <Card key={index} item={item} />
            ))}
            {!data?.length && <h3>Không tìm thấy sản phẩm nào!!!</h3>}
          </div>
        </div>
      </div>
    </div>
  );
};

