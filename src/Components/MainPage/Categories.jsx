import React, { useEffect } from "react"
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom"
import {useNavigate} from "react-router-dom"
import useGetData from "../../custom-hooks/useGetData";
const Categories = ({prop,item}) => {
  const { data: productsData, loading: firstLoading } = useGetData("product");
  const [categories, setCategories] = useState([]);
  // console.log(productsData);
  // console.log(productsData?.category);
  useEffect(() => {
    if (productsData) {
      const allCategories = productsData.map((product) => product.category);
      const uniqueCategories = allCategories.filter(
        (category, index, self) => self.indexOf(category) === index
      );
      setCategories(uniqueCategories);
    }
  }, [productsData]);

  
  const data = [
    {
      id:categories[0],
      cateImg: "./images/category/cat1.png",
      cateName: "Điện máy",
    },
    {
      id:categories[1],
      cateImg: "./images/category/cat2.png",
      cateName: "Đồ gia dụng",
    },
    {
      id:categories[2],
      cateImg: "./images/category/cat3.png",
      cateName: "Công cụ & Dụng cụ",
    },
    {
      id:categories[3],
      cateImg: "./images/category/cat4.png",
      cateName: "Y tế & Sức khoẻ",
    },
    {
      id:categories[4],
      cateImg: "./images/category/cat5.png",
      cateName: "Thể thao & Ngoài trời",
    },
    {
      id:categories[5],
      cateImg: "./images/category/cat6.png",
      cateName: "Thiết bị công nghiệp",
    },
    {
      id:categories[6],
      cateImg: "./images/category/cat7.png",
      cateName: "Thiết bị số, Phụ kiện",
    },
    {
      id:categories[7],
      cateImg: "./images/category/cat8.png",
      cateName: "Nhà cửa & Đời sống",
    },
    {
      id:categories[8],
      cateImg: "./images/category/cat9.png",
      cateName: "Thiết bị văn phòng",
    },
    {
      id:categories[9],
      cateImg: "./images/category/cat10.png",
      cateName: "Mỹ phẩm & Làm đẹp",
    },
    {
      id:categories[10],
      cateImg: "./images/category/cat11.png",
      cateName: "Mẹ và bé",
    },
    {
      id:categories[11],
      cateImg: "./images/category/cat11.png",
      cateName: "Phụ kiện ô tô, xe hơi",
    },
    {
      id:categories[12],
      cateImg: "./images/category/cat11.png",
      cateName: "Thời trang & Du lịch",
    },
    {
      id:categories[13],
      cateImg: "./images/category/cat11.png",
      cateName: "Bách hoá tổng hợp",
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