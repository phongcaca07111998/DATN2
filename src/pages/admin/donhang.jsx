import React, { useEffect, useState } from "react";
import { Navbar } from "../../Components/admin/content/navbar";
import "./admin.scss";
import Chart from "react-apexcharts";
import { NavbarAdmin } from "../../Components/admin/layout/navbar";
import { Card } from "../../Components/admin/content/card";

import { removeVietnameseTones } from "../../Components/layout/Navbar/search/removeVNtones";
import { TableOrder } from "../../Components/admin/content/tableOrder";
import { FormDetailOrder } from "../../Components/admin/content/formDetailOrder";
import useGetData from "../../custom-hooks/useGetData";


export const Donhang = ({item,prop}) => {

  const [ItemDetail, setItemDetail] = useState({});
  const { data: productsData } = useGetData("product");

  const { data: userData } = useGetData("users");
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
      count: productsData?.length,
    },
    {
      text: "TỔNG SỐ ĐƠN HÀNG",
      count: oderData?.length,
    },
    {
      text: "TỔNG SỐ USER",
      count: userData?.length,
    },
  ];

  const sendItemDetailOrder = (item) => {
    setItemDetail(item);
    console.log(item);
    setCheckFormDetail(true);
  };

  const closeForm = (check) => {
    setCheckFormDetail(check)
  }
  return (
    
    <div className="_loading_overlay_wrapper css-79elbk">
      
      {checkFormDetail && <FormDetailOrder ItemDetail={ItemDetail} closeForm={closeForm} />}
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
          <div className="content">
            <TableOrder sendItemDetailOrder={sendItemDetailOrder} />
          </div>
        </div>
      </div>
    </div>
  );
};
