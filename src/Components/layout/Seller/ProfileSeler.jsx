import React from 'react'
import './proflieseler.css';
import { motion } from "framer-motion";
import { useSelector,useDispatch } from 'react-redux';
import Helmet from '../../Helmet/Helmet';
import { Link } from 'react-router-dom';
import { cartActions } from '../../redux/slices/cartSlice';
const ProfileSeler = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
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
                            <a href="#">Tất Cả Sản Phẩm</a>
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
                                            <span>Tất cả</span>
                                        </div>
                                    </div>
                                    <div className="tabs-nav-tabs">
                                        <div className="tab-label">
                                            <span>Chờ xác nhận</span>
                                        </div>
                                    </div>
                                    <div className="tabs-nav-tabs">
                                        <div className="tab-label">
                                            <span>Chờ lấy hàng</span>
                                        </div>
                                    </div>
                                    <div className="tabs-nav-tabs">
                                        <div className="tab-label">
                                            <span>Đang giao</span>
                                        </div>
                                    </div>
                                    <div className="tabs-nav-tabs">
                                        <div className="tab-label">
                                            <span>Đã giao</span>
                                        </div>
                                    </div>
                                    <div className="tabs-nav-tabs">
                                        <div className="tab-label">
                                            <span>Đơn Hủy</span>
                                        </div>
                                    </div>
                                    <div className="tabs-nav-tabs">
                                        <div className="tab-label">
                                            <span>Trả hàng/ Hoàn tiền</span>
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
                <div className="order-search-container">
                    <div className="input-group">
                        <div className="select">
                            {/* <div class="selector">
  </div> */}
                        </div>
                        <span className="input-group-append">
                            <div className="search-wrapper">
                                <div className="order-search-btn">
                                    <div className="input-inner">
                                        <input type="text" placeholder="Nhập Mã đơn hàng" className="input-input" />
                                    </div>
                                    {/* <div class="input-suffix">
        <i class='bx bx-search'></i>
      </div> */}
                                </div>
                            </div>
                        </span></div>
                    <button type="button" className="search1 sp-button">
                        <span>Tìm kiếm</span>
                    </button>
                </div>
                <div className="order-panel-header">
                    <div className="title">0 Đơn hàng</div>
                </div>
            </div>
        </div>
    </div>
    <div className="order-list-section">
    <Helmet title="Cart">
      <section>
        <div className="container1">
          <div className="cartall">
            <div className="col-9" >
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </Helmet>
    </div>
</div>
  )
}
const Tr = ({ item }) => {
    const dispatch = useDispatch();
  
    const deleteProduct = () => {
      dispatch(cartActions.deleteItem(item.id));
    };
  
    return (
      <tr>
        <td>
          <img src={item.imgUrls} alt="" />
        </td>
        <td>{item.productName}</td>
        <td>${item.price}</td>
        <td>{item.quantity}px</td>
        <td>
          <motion.i
            whileTap={{ scale: 1.2 }}
            onClick={deleteProduct}
            class="ri-delete-bin-line"
          ></motion.i>
        </td>
      </tr>
    );
  };

export default ProfileSeler