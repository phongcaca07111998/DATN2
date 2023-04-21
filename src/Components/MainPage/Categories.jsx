import React, { useEffect } from "react"
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import {useNavigate} from "react-router-dom"
import useGetData from "../../custom-hooks/useGetData";
const Categories = ({prop,item}) => {



  // console.log(productsData);
  // console.log(productsData?.category);

  
  const data = [
    {
      id:"dienmay",
      cateImg: "./images/category/cat1.png",
      cateName: "Điện máy",
    },
    {
      id:"dogiadung",
      cateImg: "./images/category/cat2.png",
      cateName: "Đồ gia dụng",
    },
    {
      id:"congcudungcu",
      cateImg: "./images/category/cat3.png",
      cateName: "Công cụ & Dụng cụ",
    },
    {
      id:"ytesuckhoe",
      cateImg: "./images/category/cat4.png",
      cateName: "Y tế & Sức khoẻ",
    },
    {
      id:"thethaongoaitroi",
      cateImg: "./images/category/cat5.png",
      cateName: "Thể thao & Ngoài trời",
    },
    {
      id:"thietbicongnghiep",
      cateImg: "./images/category/cat6.png",
      cateName: "Thiết bị công nghiệp",
    },
    {
      id:"thietbisophukien",
      cateImg: "./images/category/cat7.png",
      cateName: "Thiết bị số, Phụ kiện",
    },
    {
      id:"nhacuadoisong",
      cateImg: "./images/category/cat8.png",
      cateName: "Nhà cửa & Đời sống",
    },
    {
      id:"thietbivanphong",
      cateImg: "./images/category/cat9.png",
      cateName: "Thiết bị văn phòng",
    },
    {
      id:"myphamlamdep",
      cateImg: "./images/category/cat10.png",
      cateName: "Mỹ phẩm & Làm đẹp",
    },
    {
      id:"mevabe",
      cateImg: "./images/category/cat11.png",
      cateName: "Mẹ và bé",
    },
    {
      id:"phukienoto",
      cateImg: "./images/category/cat11.png",
      cateName: "Phụ kiện ô tô, xe hơi",
    },
    {
      id:"thoitrangdulich",
      cateImg: "./images/category/cat11.png",
      cateName: "Thời trang & Du lịch",
    },
    {
      id:"bachhoatonghop",
      cateImg: "./images/category/cat11.png",
      cateName: "Bách hoá tổng hợp",
    },
  ]
  const navigate = useNavigate();
  
    const handleSearch12 = (id) => {
      navigate(`/tim-kiem/keyword=${id}`)
    }
  return (
    <>
     <div className='catgrories3 d_flex'>
            <span className='fa-solid fa-border-all icon'></span>
            <h4>
              Categories <i className='fa fa-chevron-down icon1'></i>
            </h4>
</div>
      <div className='category1'>
        {data.map((value, index) => {
          return (
            <div onClick={() => handleSearch12(value.id)} className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories