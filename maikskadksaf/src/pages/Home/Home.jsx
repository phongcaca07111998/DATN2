import React, { useEffect, useState } from "react";
import {Banner} from '../../Components/banner/banner'
import './Home.scss'

import { SuggestionProduct } from "../../Components/suggertionProduct/suggertionProduct";
import { commerce } from "../../lib/commerce";

import { Category } from "../../Components/category/category";
import Categories from "../../Components/MainPage/Categories";
import { useLocation } from "react-router-dom";
import { UseStore } from "../../store";

export const Home = (prop) => {

  useEffect(()=>{
    fetchData1()
  },[])
  const fetchData1 = () => {
    commerce.products.list().then((product) => {
      console.log(product);
    });
  };
  const [data, setData] = useState([]);
  const location = useLocation();
  const search = location.pathname?.split("keyword=")[1];
  const [state] = UseStore();
  const [loading, setLoading] = useState(false);

  const fetchData = (search) => {
    setLoading(true);
    commerce.products
      .list({
        query: search,
      })
      .then((product) => {
        setData(product.data);
        setLoading(false);
      }
      );
  };

  const sentData = (category) => {
    // setData(
    //   DataProduct.filter((item) =>
    //     removeVietnameseTones(item?.name)
    //       ?.toLocaleLowerCase()
    //       ?.includes(category?.toLocaleLowerCase())
    //   )
    // );
    if (category === "all") {
      setLoading(true);
      commerce.products.list({
        limit: 35
      }).then((product) => {
        setData(product.data);
        setLoading(false);
      });
    } else {
      fetchData(category);
    }
  };

  useEffect(() => {
    fetchData(search);
    window.scrollTo({
      top: 0,
    });
  }, [location]);
  return (
    <div className="container">
      <div className="Home_content">
        <div className="banner">
          <div className="ct1">  <Categories /></div>
          <div className="bn1"> <Banner/></div>
        
         
        </div>
        <div className="Content Content_2">
          <SuggestionProduct tieude="Gợi Ý CHO BẠN"/>
        </div>
        <div className="Content Content_2">
          <SuggestionProduct tieude="MẶC HÀNG BÁN CHẠY"/>
        </div>
        <div className="Content Content_2">
          <SuggestionProduct tieude="MẶC HÀNG GIẢM GIÁ"/>
        </div>
        <div className="Content Content_2">
          <SuggestionProduct tieude="SẢN PHẨM YÊU THÍCH"/>
        </div>
        
      </div>
    </div>
  )

};
export default Home;