import React, { useState } from "react";
import "./layout.scss";
import logo from "../../../assets/img/logo.png"
import icBidu from "../../../assets/admin/ic-bidu-text.png";
import lnactive from "../../../assets/admin/narbar/lnactive.png";
import Arowlnactive from "../../../assets/admin/narbar/Arrow_Inactivedown.png";
import home from "../../../assets/admin/narbar/home.svg";
import banner from "../../../assets/admin/narbar/banner.svg";
import category from "../../../assets/admin/narbar/category.svg";
import bell from "../../../assets/admin/narbar/icon-bell.svg";
import live from "../../../assets/admin/narbar/live-streaming.svg";
import product from "../../../assets/admin/narbar/product.svg";
import shop from "../../../assets/admin/narbar/shop.svg";
import voucher from "../../../assets/admin/narbar/home.svg";
import order from "../../../assets/admin/narbar/order.png";
import registration from "../../../assets/admin/narbar/icon_registration.svg";
import { removeVietnameseTones } from "../../layout/Navbar/search/removeVNtones";
import { useNavigate } from "react-router-dom";

export const NavbarAdmin = () => {
  const [check, setCheck] = useState(true);
  const navigate = useNavigate();

  const data = [
    {
      name: "Tổng quan",
      img: home,
      
    },
    {
      name: "Đơn hàng",
      img: order,
    },
    {
      name: "User",
      img: shop,
    }, 
    {
      name: "Sản phẩm",
      img: product,
    },
    {
      name: "Danh mục",
      img: category,
    },
    
   
    {
      name: "Banner",
      img: banner,
    },
    {
      name: "Mã giảm giá",
      img: voucher,
    },
    {
      name: "Streaming",
      img: live,
    },
    {
      name: "Thông báo",
      img: bell,
    },
  ];

  const hideCommerce = () => {
    setCheck(!check);
  };
  const moveToItem = (item) =>{
    console.log(item);
    const address = removeVietnameseTones(item.name)
    navigate(`/${address}`)
  }
  return (
    <div className="navbarAdmin">
      <div className="scroll-wrapper">
        <div>
          <div className="sidenav-header">
            <div className="nav-logo-pito">
              <a href="/admin-ecommerce">
                <img src={logo} width="70" />
              </a>
            </div>
          </div>
          <div className="navbar-inner">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <div>
                  <div className="CMS Commerce" onClick={hideCommerce}>
                    <div className="fo-we-bo">CMS Commerce</div>
                    <div className="image">
                      <img src={!check ? lnactive : Arowlnactive} alt="" />
                    </div>
                  </div>
                  {check && (
                    <div className="ReactCollapse--collapse">
                      <div className="ReactCollapse--content">
                        {data.map((item, index) => (
                          <div className="dropdownmenu" key={index} onClick={(e) => moveToItem(item)}>
                            <img src={item.img} alt="" />
                            <div className="name">{item.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
