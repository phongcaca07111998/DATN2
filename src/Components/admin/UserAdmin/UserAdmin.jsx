import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { db } from "../../../Components/firebase/firebase"
import { doc, deleteDoc } from "firebase/firestore";
import useGetData from "../../../custom-hooks/useGetData";
import { toast } from "react-toastify";
import './useradmin.css';
import { NavbarAdmin } from "../layout/navbar";
import { FormDetailOrder } from "../content/formDetailOrder";
import { Card } from "../content/card";
import { Navbar } from "../content/navbar";
const UserAdmin = () => {
  const { data: productsData, loading } = useGetData("users");

  const deleteProduct = async id => {
    await deleteDoc(doc(db, "users", id));
    toast.success("Deleted!");
  };
  const [ItemDetail, setItemDetail] = useState({});
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
    setCheckFormDetail(false);
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
        <div className="content1">
     
     
          <div className="col-12 userad">
          <table className="table">
              <thead>
                <tr>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Phone</th>
                  <th>Phân Quyền</th>
                  <th>Hành Đ</th>
                  
                    
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h4 className="py-5 text-center fw-bold ">Loading.....</h4>
                ) : (
                  productsData.map(item => (
                    <tr key={item.uid}>

                      <td>{item.displayName}</td>
                      <td >{item.email}</td>
                      <td >{item.pass}</td>
                      <td>{item.phoneNumber} </td>
                      <td>{item.seller==="Nhà bán hàng"?"Nhà bán hàng":"Người dùng"} </td>
                      
                      <td>
                        <button
                          onClick={() => {
                            deleteProduct(item.uid);
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

export default UserAdmin;