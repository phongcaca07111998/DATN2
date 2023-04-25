import React from 'react'
import './proflieseler.css';
import { motion } from "framer-motion";
import { useSelector,useDispatch } from 'react-redux';
import Helmet from '../../Helmet/Helmet';
import { Link } from 'react-router-dom';
import { cartActions } from '../../redux/slices/cartSlice';
import useGetData from '../../../custom-hooks/useGetData';
import { getAuth } from 'firebase/auth';
const ProfileSeler = () => {
    const cartItems=""
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const { data: oderData,loading } = useGetData("Oders");
  const {currentUser} = getAuth();
 
 
  const userSellValues = oderData.map(order => {
    return order.cartItems.map(item => item.usersell);
  });
  const index = userSellValues.findIndex(userSellArray => userSellArray.includes(currentUser.email));
  
if (index !== -1) {
  const cartItems = oderData[index].cartItems;
  console.log("currentUser's email is in userSellValues");
  console.log("cartItems:", cartItems);
  cartItems.forEach(item => console.log(item.usersell));
} else {
  console.log("currentUser's email is not in userSellValues");
}
 

  const deleteProduct = async id => {
     await deleteDoc(doc(db, "Oders", id));
     toast.success("Deleted!");
   };
  return (
    <div>
    <div className="sidebar-container">
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li className="sidebar-menu-box">
                    <div className="sidebar-menu-item">
                        <i className="bx bx-package" />
                        <span className="sidebar-menu-item-text">Vận Chuyển</span>
                    </div>
                    <ul className="sidebar-submenu">
                        <li className="sidebar-submenu-item">
                            <a href="#">Quản Lý Vận Chuyển</a>
                        </li>
                    </ul>
                </li>
                <li className="sidebar-menu-box">
                    <div className="sidebar-menu-item">
                        <i className="bx bx-notepad" />
                        <span className="sidebar-menu-item-text">Quản Lý Đơn Hàng</span>
                    </div>
                    <ul className="sidebar-submenu">
                        <li className="sidebar-submenu-item">
                            <a href="#">Tất Cả</a>
                        </li>
                        <li className="sidebar-submenu-item">
                            <a href="#">Đơn Hủy</a>
                        </li>
                        <li className="sidebar-submenu-item">
                            <a href="#">Trả Hàng/ Hoàn tiền</a>
                        </li>
                    </ul>
                </li>
                <li className="sidebar-menu-box">
                    <div className="sidebar-menu-item">
                        <i className="bx bx-shopping-bag" />
                        <span className="sidebar-menu-item-text">Quản Lý Sản Phẩm</span>
                    </div>
                    <ul className="sidebar-submenu">
                        <li className="sidebar-submenu-item">
                            <Link to="/allproduct">Tất Cả Sản Phẩm</Link>
                        </li>
                        <li className="sidebar-submenu-item">
                            <Link to="/addproduct">Thêm Sản Phẩm</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    
    <div className="page-container">
        <div className="page-content1">
            <div className="portal-sale-container">
                <div className="portal-panel">
                    <div className="list-tab">
                        <div className="tab top-tabs">
                            <div className="tabs-nav">
                                <div className="tabs-nav-warp">
                                    <div className="tabs-nav-tabs">
                                        <div className="tab-label">
                                            {/* <span>Tất cả</span> */}
                                        </div>
                                    </div>
                                    <div className="tabs-nav-tabs">
                                        <div className="tab-label">
                                            {/* <span>Chờ xác nhận</span> */}
                                        </div>
                                    </div>
                                    <div className="tabs-nav-tabs">
                                        <div className="tab-label">
                                            {/* <span>Chờ lấy hàng</span> */}
                                        </div>
                                    </div>
                                    <div className="tabs-nav-tabs">
                                        <div className="tab-label">
                                            {/* <span>Đang giao</span> */}
                                        </div>
                                    </div>
                                    <div className="tabs-nav-tabs">
                                        <div className="tab-label">
                                            {/* <span>Đã giao</span> */}
                                        </div>
                                    </div>
                                    <div className="tabs-nav-tabs">
                                        <div className="tab-label">
                                            {/* <span>Đơn Hủy</span> */}
                                        </div>
                                    </div>
                                    <div className="tabs-nav-tabs">
                                        <div className="tab-label">
                                            {/* <span>Trả hàng/ Hoàn tiền</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    </div>
    <div className="order-list">
        <div className="padding-wrap">
            <div className="order-search-panel">
                <div className="order-export">
                    <div className="signal-picker-wrapper">
                        <span className="col">Ngày đặt hàng</span>
                        <div className="date-picker">
                            <div className="date-picker-input">
                                <input type="date" id="react-datepicker-wrapper" placeholder="DD/MM/YY" defaultValue="11/01/2001" />
                            </div>
                        </div>
                    </div>
                    <div className="export-button">
                        <div className="latest">
                            <button type="button" className="export sp-button">
                                <span>Xuất</span>
                            </button>
                        </div>
                    </div>
                </div>
              
               
            </div>
        </div>
    </div>
    <section >
      <div className="container18">
        <div className="row1">
          <div className="col-12 his">
          {cartItems?.length === 0 ? (
                <h2 className="fs-4 text-center khongcart">No item added to the cart</h2>
              ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Số lượng</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h4 className="py-5 text-center fw-bold ">Loading.....</h4>
                ) : cartItems?.forEach((item) =>    
                  <tr key={item.id}>
                    <td>
                      <img src={item.imgUrls} alt={item.title} width="75" height="50" />
                    </td>
                    <td>{item.id}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                   
                    <td>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
                    <td>{item.orderStatus}</td>
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
                  
             
              )}
              </tbody>
            </table>
            )}
          </div>
        </div>
      </div>
    </section>
  
</div>
  )
}


export default ProfileSeler