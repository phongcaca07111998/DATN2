import React, { useEffect, useState } from "react";
import { Banner } from '../../Components/banner/banner'
import './Home.scss'

import { SuggestionProduct } from "../../Components/suggertionProduct/suggertionProduct";
import { NewsuggestionProduct } from "../../Components/suggertionProduct/newsuggertionProduc";


import { Category } from "../../Components/category/category";
import Categories from "../../Components/MainPage/Categories";
import useGetData from "../../custom-hooks/useGetData";
import { Likesuggetion } from "../../Components/suggertionProduct/likesuggetion";


export const Home = (props) => {
 
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
        <NewsuggestionProduct tieude="MẶC HÀNG MỚI NHẤT" />
      </div>
      <div className="Content Content_2">
        <SuggestionProduct tieude="MẶC HÀNG GIẢM GIÁ"/>
      </div>
      <div className="Content Content_2">
        <Likesuggetion tieude="SẢN PHẨM YÊU THÍCH"/>
        </div>

      </div>
    </div>
  );

};
export default Home;