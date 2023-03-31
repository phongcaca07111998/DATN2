import React, { useEffect, useState } from "react";
import {Banner} from '../../Components/banner/banner'
import './Home.scss'

import { SuggestionProduct } from "../../Components/suggertionProduct/suggertionProduct";
import { commerce } from "../../lib/commerce";
import Home1 from "../../Components/MainPage/Home1";
import { Category } from "../../Components/category/category";
import Categories from "../../Components/MainPage/Categories";

export const Home = () => {

  useEffect(()=>{
    fetchData()
  },[])
  const fetchData = () => {
    commerce.products.list().then((product) => {
      console.log(product);
    });
  };
  return (
    <div className="container">
      <div className="Home_content">
        <div className="banner">
          <div className="ct1">  <Categories/></div>
          <div className="bn1"> <Banner/></div>
        
         
        </div>
        <div className="Content Content_2">
          <SuggestionProduct />
        </div>
        
      </div>
    </div>
  )

};
export default Home;