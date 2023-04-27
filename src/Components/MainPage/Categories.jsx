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
      cateImg: "https://meta.vn/icons/cats/1013.png",
      cateName: "Điện máy",
    },
    {
      id:"dogiadung",
      cateImg: "https://meta.vn/icons/cats/382.png",
      cateName: "Đồ gia dụng",
    },
    {
      id:"congcudungcu",
      cateImg: "https://meta.vn/icons/cats/680.png",
      cateName: "Công cụ & Dụng cụ",
    },
    {
      id:"ytesuckhoe",
      cateImg: "https://meta.vn/icons/cats/290.png",
      cateName: "Y tế & Sức khoẻ",
    },
    {
      id:"thethaongoaitroi",
      cateImg: "https://meta.vn/icons/cats/263.png",
      cateName: "Thể thao & Ngoài trời",
    },
    {
      id:"thietbicongnghiep",
      cateImg: "https://meta.vn/icons/cats/3584.png",
      cateName: "Thiết bị công nghiệp",
    },
    {
      id:"thietbisophukien",
      cateImg: "https://meta.vn/icons/cats/880.png",
      cateName: "Thiết bị số, Phụ kiện",
    },
    {
      id:"nhacuadoisong",
      cateImg: "https://meta.vn/icons/cats/728.png",
      cateName: "Nhà cửa & Đời sống",
    },
    {
      id:"thietbivanphong",
      cateImg: "https://meta.vn/icons/cats/514.png",
      cateName: "Thiết bị văn phòng",
    },
    {
      id:"myphamlamdep",
      cateImg: "https://meta.vn/icons/cats/906.png",
      cateName: "Mỹ phẩm & Làm đẹp",
    },
    {
      id:"mevabe",
      cateImg: "https://meta.vn/icons/cats/229.png",
      cateName: "Mẹ và bé",
    },
    {
      id:"phukienoto",
      cateImg: "https://meta.vn/icons/cats/3434.png",
      cateName: "Phụ kiện ô tô, xe hơi",
    },
    {
      id:"thoitrangdulich",
      cateImg: "https://meta.vn/icons/cats/3320.png",
      cateName: "Thời trang & Du lịch",
    },
    // {
    //   id:"bachhoatonghop",
    //   cateImg: "./images/category/cat11.png",
    //   cateName: "Bách hoá tổng hợp",
    // },
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