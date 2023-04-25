import React, { useEffect, useState } from "react";
import {Banner} from '../../Components/banner/banner'
import './Home.scss'

import { SuggestionProduct } from "../../Components/suggertionProduct/suggertionProduct";

import { Category } from "../../Components/category/category";
import Categories from "../../Components/MainPage/Categories";
import useGetData from "../../custom-hooks/useGetData";


export const Home = () => {
  const { data: productsData, loading } = useGetData("product");
  // useEffect(()=>{
  //   fetchData()
  // },[])
  // const fetchData = () => {
  //   commerce.products.list().then((product) => {
  //     console.log(product);
  //   });
  // };
  // console.log(productsData);
  
  const latestProduct = productsData ? productsData.sort((a, b) => new Date(b.date) - new Date(a.date))[productsData] : null;
  console.log(latestProduct);
return (
  <div className="container">
    <div className="Home_content">
      <div className="banner">
        <div className="ct1"><Categories/></div>
        <div className="bn1"><Banner/></div>
      </div>
      <div className="Content Content_2">
        <SuggestionProduct tieude="Gợi Ý CHO BẠN"/>
      </div>
      <div className="Content Content_2">
        <SuggestionProduct tieude="MẶC HÀNG MỚI NHẤT" product={latestProduct}/>
      </div>
      <div className="Content Content_2">
        <SuggestionProduct tieude="MẶC HÀNG GIẢM GIÁ"/>
      </div>
      <div className="Content Content_2">
        <SuggestionProduct tieude="SẢN PHẨM YÊU THÍCH"/>
      </div>
    </div>
  </div>
);

};
export default Home;