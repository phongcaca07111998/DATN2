import React, { useEffect, useState } from "react";
import { Banner } from '../../Components/banner/banner'
import './Home.scss'

import { SuggestionProduct } from "../../Components/suggertionProduct/suggertionProduct";

import { Category } from "../../Components/category/category";
import Categories from "../../Components/MainPage/Categories";
import useGetData from "../../custom-hooks/useGetData";


export const Home = () => {
  const { data: productsData, loading } = useGetData("product");


  // const latestProduct = productsData ? productsData.sort((a, b) => new Date(b.date) - new Date(a.date))[productsData] : null;
  // console.log(latestProduct);
  //
  // const latestProduct = productsData.reduce((latest, product) => {
  //   const productDate = new Date(product.date);
  //   const latestDate = latest ? new Date(latest.date) : new Date(0); // lấy giá trị latest.date hoặc 0 nếu latest chưa được gán giá trị
  //   return productDate > latestDate ? product : latest;

  // }, null);
  // console.log(latestProduct);
  // let latestProducts = [];
  // let latestDate = new Date(0);

  // for (let i = 0; i < productsData.length; i++) {
  //   const product = productsData[i];
  //   const productDate = new Date(product.date);
  //   if (productDate >= latestDate) {
  //     if (productDate > latestDate) {
  //       // Nếu ngày sản phẩm mới hơn ngày sản phẩm mới nhất hiện tại, 
  //       // cập nhật lại danh sách sản phẩm mới nhất và ngày sản phẩm mới nhất.
  //       latestProducts = [];
  //       latestDate = productDate;
  //     }
  //     // Thêm sản phẩm vào danh sách sản phẩm mới nhất.
  //     latestProducts.push(product);
  //   }
  // }

  // console.log(latestProducts);

  const now = new Date();
const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);

const latestProducts = [];

for (let i = 0; i < productsData.length; i++) {
  const product = productsData[i];
  const productDate = new Date(product.date);
  if (productDate >= tenDaysAgo && productDate <= now) {
    // Nếu sản phẩm có ngày trong khoảng 10 ngày gần nhất, thêm sản phẩm vào danh sách sản phẩm mới nhất.
    latestProducts.push(product);
  }
}

console.log(latestProducts);
  //

  return (
    <div className="container">
      <div className="Home_content">
        <div className="banner">
          <div className="ct1"><Categories /></div>
          <div className="bn1"><Banner /></div>
        </div>
        <div className="Content Content_2">
          <SuggestionProduct tieude="Gợi Ý CHO BẠN" />
        </div>
        <div className="Content Content_2">
          <SuggestionProduct tieude="MẶC HÀNG MỚI NHẤT"  />
        </div>
        <div className="Content Content_2">
          <SuggestionProduct tieude="MẶC HÀNG GIẢM GIÁ" />
        </div>
        <div className="Content Content_2">
          <SuggestionProduct tieude="SẢN PHẨM YÊU THÍCH" />
        </div>
      </div>
    </div>
  );

};
export default Home;