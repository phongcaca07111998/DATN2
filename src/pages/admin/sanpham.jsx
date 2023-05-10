import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { doc, deleteDoc } from "firebase/firestore";
import './sanpham.css';
import { NavbarAdmin } from "../../Components/admin/layout/navbar";
import { FormDetailOrder } from "../../Components/admin/content/formDetailOrder";
import { Card } from "../../Components/admin/content/card";
import { Navbar } from "../../Components/admin/content/navbar";
import { db } from "../../Components/firebase/firebase";
import useGetData from "../../custom-hooks/useGetData";
const SanPham = () => {
  const { data: productsData, loading } = useGetData("users");

  const deleteProduct = async id => {
    await deleteDoc(doc(db, "product", id));
  };
  const [ItemDetail, setItemDetail] = useState({});
  const { data: productsDatas } = useGetData("product");
  const { data: oderData } = useGetData("Oders");
  const [checkFormDetail, setCheckFormDetail] = useState(false);
  //





  const dataProductCard = [
    {
      text: "TỔNG SỐ DANH MỤC",
      count: 13,
    },
    {
      text: "TỔNG SỐ SẢN PHẨM",
      count: productsDatas?.length,
    },
    {
      text: "TỔNG SỐ ĐƠN HÀNG",
      count: oderData?.length,
    },
    {
      text: "TỔNG SỐ USER",
      count: productsData?.length,
    },
  ];

  return (
    <div className="_loading_overlay_wrapper css-79elbk">

    <NavbarAdmin />
    <div className="main-content">
      <Navbar />
      <div
        className="Products-Card"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        {dataProductCard.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
      <div className="chart">
        <div className="header"></div>
        <div className="content1">
     
     
          <div sx={{ minWidth: 650 }} className="col-12 userad">
          <table className="table">
              <thead>
                <tr>
                <th>Image</th>
                  <th className="sp1">Tên sản phẩm</th>
                  <th className="sp1">Danh mục</th>
                  <th className="sp1">Số lượng</th>
                  <th style={{textAlign:"center"}}>Giá</th>
                  <th className="sp1">Ngày</th>
                  <th >Action</th>

                 
                  
                    
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h4 className="py-5 text-center fw-bold ">Loading.....</h4>
                ) : (
                    productsDatas.map(item => (
                    <tr key={item.id}>

                      <td className="sp1">{item.imgUrls && item.imgUrls.length > 0 ? (
                          <img className="anh" src={item.imgUrls[1]} alt="" />
                        ) : (
                          <span>No image available</span>
                        )}</td>
                      <td >{item.productName}</td>
                      <td >{item.category}</td>
                      <td >{item.sl}</td>
                      <td >{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
                      <td>{item.date} </td>
                      <td>
                        <button
                          onClick={() => {
                            deleteProduct(item.id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
    
  );
};

export default SanPham;