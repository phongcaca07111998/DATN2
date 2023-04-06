import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./detailProduct.scss";
import minus_grey from "../../assets/img/minus_grey.svg";
import plus_white from "../../assets/img/plus_white.svg";
import { UseStore, action } from "../../store";
import { useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import { LoadingDetail } from "../../Components/loading/loadingDetail";
import parse from "html-react-parser";

import { ref } from "firebase/storage";
import { ChevronRight } from "@mui/icons-material";
import useGetData from "../../custom-hooks/useGetData";

export const DetailProduct = (  ) => {
  const location = useLocation();
  const [count, setCount] = useState(1);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [firstLoading, setFirstLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { data: productsData} = useGetData("product");
  const productId = location.pathname.split("/")[2];
  const mainData = productsData.find((productsData) => productsData.id === productId);
  

  const handleCount = (type) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (count > 1) {
        setCount(count - 1);
      }
    }
  };

  

  const handleItemImage = (item) => {
    setImage(item.imgUrls);
    
    
  };

  const addToCart = (redirect) => {
    UseStore.dispatch(addToCart(mainData, selectedSize, count));
  
    setMessage("Đã thêm vào giỏ hàng");
    setAlert(true);
    setFirstLoading(true);
    // setLoading(false);
    setTimeout(() => {
      setAlert(false);
      setMessage("");
      if (redirect) {
        navigate("/cart");
      }
    }, 3000);
  };

  const payNow = () => {
    UseStore.dispatch(addToCart(mainData, selectedSize, count));
    navigate("/checkout");
  };
// console.log(productsData);
console.log(mainData);
  return (
    <div className="detailProduct">
      {alert && (
        <div className="alert">
          <Alert severity="info">{message}</Alert>
        </div>
      )}
      
        <div className="loading">
          <CircularProgress color="inherit" className="loading_progress" />
        </div>
      
      <div className="detailProduct_header">
        <div className="detailProduct_header_content">
          <p>Trang chủ</p>
          <img src={ChevronRight} alt="" />
          <p>{mainData?.category}</p>
        </div>
      </div>
      <div className="detailProduct_content">
        <div className="main">
          {firstLoading ? (
            <LoadingDetail />
          ) : (
            <div className="main_content">
              <div className="slide-image">
                <div className="slide">
                  {mainData?.assets.map((item, index) => (
                    <div
                      key={index}
                      className="item-img"
                      style={{ backgroundImage: `url(${item.imgUrls})` }}
                      onClick={(e) => handleItemImage(item)}
                    ></div>
                  ))}
                </div>
              </div>
              <div
                className="image"
                style={{ backgroundImage: `url(${mainData?.imgUrls})` }}
              ></div>
              <div className="inf">
                <div className="name">
                  <p>{mainData?.shortDesc}</p>
                  <div className="row">
                    <div className="col">
                      <p>20</p>
                      <span>Đánh giá</span>
                    </div>
                    <div className="devider"></div>
                    <div className="col">
                      <p>19</p>
                      <span>Đã bán</span>
                    </div>
                  </div>
                </div>
                <div className="price">
                  <h1>{mainData?.price.formatted_with_symbol}</h1>
                  <div className="discount">
                    <span>10%</span>
                  </div>
                </div>
                <div className="price">
                  <p>{(mainData?.price.raw * 110) / 100}đ</p>
                </div>
                <div className="sizes">
                  {/* <span>Kích cỡ: </span> */}
                  {/* {mainData?.variant_groups[0].options?.map((item, index) => (
                    <div
                      ref={(element) => {
                        ref.current[index] = element;
                      }}
                      key={index}
                      className="size "
                      onClick={(e) => handleSize(item, index)}
                    >
                      {item.name}
                    </div>
                  ))} */}
                </div>
                <div className="amount">
                  <span>Số lượng: </span>
                  <div
                    className="btn_amount minus"
                    onClick={() => handleCount("minus")}
                  >
                    <img className="icon_amount" src={minus_grey} alt="" />
                  </div>
                  <p>{count}</p>
                  <div
                    className="btn_amount plus"
                    onClick={() => handleCount("plus")}
                  >
                    <img className="icon_amount" src={plus_white} alt="" />
                  </div>
                </div>
                <div className="button">
                  <button
                    className="btn addToCart"
                    onClick={(e) => addToCart(true)}
                  >
                    Thêm vào giỏ
                  </button>
                  <button className="btn buyNow" onClick={payNow}>
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="description">
            <h2>Mô tả:</h2>
            {mainData?.description}
          </div>
        </div>
      </div>
    </div>
  );
};
