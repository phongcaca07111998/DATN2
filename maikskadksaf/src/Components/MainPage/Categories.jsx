import React from "react"
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import {useNavigate} from "react-router-dom"
const Categories = (prop) => {
  const data = [
    {
      id:"asus",
      cateImg: "./images/category/cat1.png",
      cateName: "Fashion",
    },
    {
      id:"acer",
      cateImg: "./images/category/cat2.png",
      cateName: "Electronic",
    },
    {
      id:"dell",
      cateImg: "./images/category/cat3.png",
      cateName: "Cars",
    },
    {
      id:"lenovo",
      cateImg: "./images/category/cat4.png",
      cateName: "Home & Garden",
    },
    {
      id:"msi",
      cateImg: "./images/category/cat5.png",
      cateName: "Gifts",
    },
    {
      id:"dell",
      cateImg: "./images/category/cat6.png",
      cateName: "Music",
    },
    {
      id:"dell",
      cateImg: "./images/category/cat7.png",
      cateName: "Health & Beauty",
    },
    {
      id:"dell",
      cateImg: "./images/category/cat8.png",
      cateName: "Pets",
    },
    {
      id:"dell",
      cateImg: "./images/category/cat9.png",
      cateName: "Baby Toys",
    },
    {
      id:"dell",
      cateImg: "./images/category/cat10.png",
      cateName: "Groceries",
    },
    {
      id:"dell",
      cateImg: "./images/category/cat11.png",
      cateName: "Books",
    },
  ]
  const navigate = useNavigate();
  const filterSearch = (data) =>{
    prop.sentData(data)
  }
    const handleSearch12 = (id) => {
      navigate(`/tim-kiem/keyword=${id}`)
    }
  return (
    <>
     <div className='catgrories3 d_flex'>
            <span class='fa-solid fa-border-all icon'></span>
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
