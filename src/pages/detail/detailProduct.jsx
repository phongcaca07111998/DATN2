import React, { useEffect, useState } from "react";
import {  useDispatch } from 'react-redux'
import { useLocation, useParams } from "react-router-dom";
import "./detailProduct.scss";
import minus_grey from "../../assets/img/minus_grey.svg";
import plus_white from "../../assets/img/plus_white.svg";
import { useNavigate } from "react-router-dom";
import { Alert, CircularProgress } from "@mui/material";
import { LoadingDetail } from "../../Components/loading/loadingDetail";

import { ref } from "firebase/storage";
import { ChevronRight } from "@mui/icons-material";
import useGetData from "../../custom-hooks/useGetData";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import { cartActions } from "../../Components/redux/slices/cartSlice";

import { db } from "../../Components/firebase/firebase";

import { doc, getDoc } from "firebase/firestore"
export const DetailProduct = ({item}) => {
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
  const currenUser = localStorage.getItem("customerName");
  const [variantGroups, setVariantGroups] = useState({}); 

  // const { checkAddToCart, checkoutData } = state;
  const [idItemCart, setIdItemCart] = useState("");
  const [data, setData] = useState([]);
  





  const moveToCheckout = async (data) => {
    localStorage.setItem("checkOutItem", JSON.stringify(data));
    navigate("/thanh-toan");
  };

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
  }, [id]);

  const {
    imgUrls,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category,
  } = product;

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrls,
        productName,
        price,
      })
    );

    toast.success("Product added successfully");
  };
 
  
  
  const handleCount = (type) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
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








  const payNow = () => {
    // UseStore.dispatch(addToCart(mainData, selectedSize, count));
    navigate("/thanh-toan");
  };
  //Binh luan va dnah gia
const [comment, setComment] = useState("");
const [comments, setComments] = useState([
  { id: 1, name: "John", content: "Great product!", rating: 4 },
  { id: 2, name: "Mary", content: "I love it!", rating: 5 },
]);
const [rating, setRating] = useState(0);

const handleRatingChange = (newRating) => {
  setRating(newRating);
};

const handleCommentChange = (event) => {
  setComment(event.target.value);
};

const handleSubmitComment = () => {
  const newComment = {
    id: comments.length + 1,
    name: "Guest",
    content: comment,
    rating: rating,
  };
  setComments([...comments, newComment]);
  setComment("");
  setRating(0);
};

/////
  // console.log(productsData);
  // console.log(mainData);
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
                  <h1>{mainData?.price}</h1>
                  <div className="discount">
                    <span>10%</span>
                  </div>
                </div>
                <div className="price">
                  <p>{(mainData?.price * 110) / 100}đ</p>
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
                    onClick={(e) => addToCart()}
                  >
                    Thêm vào giỏ
                  </button>
                  <button className="btn buyNow" onClick={payNow}>
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
        <h2>Đánh giá và bình luận</h2>
        <div className="rating">
            <ReactStars
              count={5}
              onChange={handleRatingChange}
              size={24}
              activeColor="#ffd700"
            />
            <span>{rating} sao</span>
          </div>
          <div className="comment">
            <textarea
              placeholder="Viết bình luận của bạn..."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
            <button onClick={handleSubmitComment}>Gửi</button>
          </div>
          <div className="comments">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span>{comment.name}</span>
                  <ReactStars
                    count={5}
                    value={comment.rating}
                    size={16}
                    edit={false}
                    activeColor="#ffd700"
                  />
                </div>
                <div className="comment-content">{comment.content}</div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};
