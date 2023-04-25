import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase/firebase";

export const FormDetailOrder = (prop) => {
  // const [orderxStatus, setOrderStatus] = useState(0);
  const [orderStatus, setOrderStatus] = useState(prop.ItemDetail.orderStatus);
  const [cartItems, setCartItems] = useState(prop.ItemDetail.cartItems);

  const statusMap = {
    1: "Vừa đặt",
    2: "Đang giao",
    3: "Đã nhận",
    4: "Gửi trả"
  };
  const handleSelectChange = (index, e) => {
    const newCartItems = [...cartItems];
    const selectedValue = parseInt(e.target.value);
    newCartItems[index].orderStatus = statusMap[selectedValue];
    console.log(newCartItems[index].orderStatus);
    setCartItems(newCartItems);


  };

  //
  const updateOrderStatus = async () => {
    const orderRef = doc(db, "Oders", prop.ItemDetail.id);
    const updatedData = {
      cartItems: cartItems,
      // orderStatus: orderStatus,
    };
    await updateDoc(orderRef, updatedData);
  };
  //
  const data = prop.ItemDetail;

  const closeFormDetail = () => {
    prop.closeForm(false)
  }
  return (
    <div className="formDetail-container">
      <div className="formDetai">
        <div className="header">
          <h3>Thông tin chi tiết đơn hàng</h3>
        </div>
        <div className="content">
          <div className="row">Tên khách hàng: {data.name}</div>
          <div className="row">Số điện thoại: {data.phone}</div>
          <div className="row">
            Địa chỉ: {data.address + " " + data.province}
          </div>
          <div className="row">Email: {data.email}</div>
          <div className="row">
            <h4>Thông tin sản phẩm:</h4>
            {cartItems?.map((item, index) => {
              console.log("Item " + (index + 1) + ":");
              console.log("ID sản phẩm: " + item.id);
              console.log("Tên sản phẩm: " + item.productName);
              console.log("Số lượng: " + item.quantity);
              console.log(

              );
              return (
                <div className="card-item" key={index}>
                  <div className="card-item-id">
                    ID sản phẩm: {item.id}
                  </div>
                  <div className="card-item-name">Tên sp :{item.productName}</div>
                  <div className="card-item-name">Số lượng: {item.quantity}</div>
                  <div className="card-item-name"> <img src={item.imgUrls} alt={item.title} width="75" height="50" />

                  </div>
                  <div className="row">
                    Trạng thái đơn hàng:
                    <select
                      // value={item.orxderStatus}
                      onChange={(e) => handleSelectChange(index, e)}
                      className="select-status"
                    >
                      <option value="1">Vừa đặt</option>
                      <option value="2">Đang giao</option>
                      <option value="3">Đã nhận</option>
                      <option value="4">Gửi trả</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="row-btn">
            <div className="groupBtn">
              <button onClick={() => updateOrderStatus()} className="btn btn-update">Cập nhật</button>
              <button className="btn btn-cancel" onClick={closeFormDetail}>Hủy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
