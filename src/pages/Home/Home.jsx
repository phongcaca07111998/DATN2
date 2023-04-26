import React, { useEffect, useState } from "react";
import { Banner } from '../../Components/banner/banner'
import './Home.scss'

import { SuggestionProduct } from "../../Components/suggertionProduct/suggertionProduct";
import { NewsuggestionProduct } from "../../Components/suggertionProduct/newsuggertionProduc";


import { Category } from "../../Components/category/category";
import Categories from "../../Components/MainPage/Categories";
import useGetData from "../../custom-hooks/useGetData";


export const Home = (props) => {
  const { data: productsData, loading } = useGetData("product");
  const [latestProducts, setLatestProducts] = useState([]);
  // useEffect(()=>{
  //   fetchData()
  // },[])
  // const fetchData = () => {
  //   commerce.products.list().then((product) => {
  //     console.log(product);
  //   });
  // };
  // console.log(productsData);
  useEffect(() => {
    if (productsData && !loading) {
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      const now = new Date();
  
      const filteredProducts = productsData.filter((product) => {
        const productDate = new Date(product.date);
        return productDate >= tenDaysAgo && productDate <= now;
      });

      filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date)); // sắp xếp mảng sản phẩm theo ngày tháng đảo ngược (tức là giảm dần)
  
      setLatestProducts(filteredProducts.slice(0, 2)); // lấy ra 5 sản phẩm mới nhất để hiển thị
    }
  }, [productsData, loading]);
  console.log(latestProducts);
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
        <SuggestionProduct tieude="SẢN PHẨM YÊU THÍCH"/>
        </div>

      </div>
    </div>
  );

};
export default Home;