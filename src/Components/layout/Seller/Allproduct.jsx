import React from "react";
import { Container, Row, Col } from "reactstrap";
import { db } from "../../../Components/firebase/firebase"
import { doc, deleteDoc } from "firebase/firestore";
import useGetData from "../../../custom-hooks/useGetData";
import { toast } from "react-toastify";
import { getAuth} from 'firebase/auth';
import './allproduct.css';
import { Link } from "react-router-dom";

const AllProducts = () => {
  const {currentUser} = getAuth();
  const { data: productsData, loading } = useGetData("product");
  const maindataproduct = productsData.filter(productsData => productsData.username == currentUser?.displayName);
  console.log(maindataproduct);
  const deleteProduct = async id => {
    await deleteDoc(doc(db, "product", id));
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
            <Link to="/selerprofile">Quản Lý Vận Chuyển</Link>
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
    <section >
      <div className="container18">
        <div className="row1">
          <div className="col-12 his ">
          {maindataproduct?.length === 0 ? (
                <h2 className="fs-4 text-center khongcart1">No item added to the cart</h2>
              ) :(
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Số lượng</th>
                  <th>Price</th>
                  <th>Ngày tháng</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h4 className="py-5 text-center fw-bold ">Loading.....</h4>
                ) : (
                  maindataproduct?.map(item => (
                    <tr key={item.id}>
                      <td >
                        {item.imgUrls && item.imgUrls.length > 0 ? (
                          <img className="anh" src={item.imgUrls[1]} alt="" />
                        ) : (
                          <span>No image available</span>
                        )}
                      </td>
                      <td>{item.productName}</td>
                      <td >{item.category}</td>
                      <td style={{textAlign: 'center'}}>{item.sl}</td>
                      <td>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
                      <td>{item.date}</td>
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
             )}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default AllProducts;