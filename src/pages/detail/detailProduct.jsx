import React, { useEffect, useState } from "react";
import {  useDispatch } from 'react-redux'
import { useLocation, useParams } from "react-router-dom";
import "./detailProduct.scss";
import minus_grey from "../../assets/img/minus_grey.svg";
import plus_white from "../../assets/img/plus_white.svg";
import { useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import { LoadingDetail } from "../../Components/loading/loadingDetail";
import { ChevronRight } from "@mui/icons-material";
import useGetData from "../../custom-hooks/useGetData";
import { cartActions } from "../../Components/redux/slices/cartSlice";

import { db } from "../../Components/firebase/firebase";

import { doc, getDoc } from "firebase/firestore"
import CommentSection from "./CommentSection";
import useAuth from "../../custom-hooks/useAuth";
export const DetailProduct = (checklogin) => {
  const location = useLocation();
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  // const [selectedSize, setSelectedSize] = useState("");
  // const [firstLoading, setFirstLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { data: productsData, firstLoading } = useGetData("product");
  

  const productId = location.pathname.split("/")[2];
  const mainData = productsData.find((productsData) => productsData.id === productId);
  const firstImgUrls = mainData?.imgUrls[0];
  const [image=firstImgUrls, setImage] = useState(firstImgUrls);
  //
const {currentUser} = useAuth()
  const [variantGroups, setVariantGroups] = useState({}); 
  console.log(mainData?.date);

  // const { checkAddToCart, checkoutData } = state;
  const [idItemCart, setIdItemCart] = useState("");
  const [data, setData] = useState([]);
  





 

  useEffect(() => {
    const getProduct = async () => {
      const docRef = doc(db, "product", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("no product!");
      }
    };

    getProduct();
  }, [id,checklogin]);

  const {
    imgUrls,
    productName,
    price,
    username,
  } = product;

  const addToCart = () => {
    if (currentUser === null) {
      setMessage("Đăng nhập để tiếp tục")
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrls[0],
        productName,
        price,
        count,
        username,
      })
      
      
    );
    setMessage("Thêm sản phẩm thành công");
    setAlert(true)
    setTimeout(() => {
      setAlert(false);
    }, 3000);
    
  };

}
 
  const handleCount = (type, limit) => {
    if (type === "plus") {
      if (count < limit) {
        setCount(count + 1);
      }
      else{
        setMessage("Vui lòng liên hệ shop để mua số lượng lớn");
        setAlert(true)
        setTimeout(() => {
          setAlert(false);
        }, 5000);

      }
    } 
    else {
      if (count > 1) {
        setCount(count - 1);
      }
    }
    
  };
  const handleItemImage = (imgUrl, index) => {
    setCurrentIndex(index);
    setImage(imgUrl);
    // console.log(imgUrl);
  };

  //
  const handleBuyNow = () => {
    if (currentUser === null) {
      setMessage("Đăng nhập để tiếp tục")
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {

        dispatch(
          cartActions.addItem({
            id,
            image: imgUrls[0],
            productName,
            price,
            count,
            username,
          })
        );
        setMessage("Đã thêm sản phẩm thành công");
        setAlert(true)
        setTimeout(() => {
          setAlert(false);
        }, 3000);
    navigate("/gio-hang");
  }
};
  return (
    <div className="detailProduct">
      {alert && (
        <div className="alert">
          <Alert severity="info">{message}</Alert>
        </div>
      )}
      {loading && (
        <div className="loading">
          <CircularProgress color="inherit" className="loading_progress" />
        </div>
      )}
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
                  {mainData?.imgUrls?.map((imgUrl, index) => (
                    <div
                      key={index}
                      className={`item-img ${index === currentIndex ? 'active' : ''}`}
                      style={{ backgroundImage: `url(${imgUrl})` }}
                      onClick={(e) => handleItemImage(imgUrl)}
                    ></div>
                  ))}
                </div>
              </div>
              <div
                className="image"
                style={{ backgroundImage: `url(${image})` }}
              ></div>

              <div className="inf">
                <div className="name">
                  <p>{mainData?.productName}</p>
                  <div className="row">
                    <div className="col">
                      <p>{mainData?.sl}</p>
                      <span>Tồn Kho</span>
                    </div>
                    <div className="devider"></div>
                    <div className="col">
                      <p>19</p>
                      <span>Đã bán</span>
                    </div>
                  </div>
                </div>
                <div className="price">
                  <h1>{mainData?.price .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</h1>
                  <div className="discount">
                    <span>10%</span>
                  </div>
                </div>
                <div className="price">
                  <p>{[(mainData?.price * 110) / 100].toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") } VNĐ</p>
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
                    onClick={() => handleCount("plus",mainData?.sl)}
                  >
                    <img className="icon_amount" src={plus_white} alt="" />
                  </div>
                </div>
                <div className="button">
                  <button
                    className="btn addToCart"
                    onClick={(e) => addToCart()}
                  >
                    Thêm vào giỏ
                  </button>

                  <button  className="btn buyNow" onClick={handleBuyNow}>
                    Mua ngay
                  </button>
                </div>
                <div className="description">
            <h2>Mô tả:</h2>
            <div>{mainData?.description}</div>
            
          </div>
              </div>
            </div>
          )}
          
        </div>
        <CommentSection/>
      </div>
    </div>
  );
};
