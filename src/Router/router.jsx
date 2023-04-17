import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Navbar} from '../Components/layout/Navbar/Navbar'

import { Checkout } from "../pages/checkout/checkout";
import { DetailProduct } from "../pages/detail/detailProduct";

import { Home } from "../pages/Home/Home";
import { HomeSearch } from "../pages/HomeSearch/homeSearch";
import { StoreProvider } from "../store";
import { Footer } from "../Components/layout/footer";
import { Admin } from "../pages/admin/admin";
import { Donhang } from "../pages/admin/donhang";
import { FormDetailOrder } from "../Components/admin/content/formDetailOrder";
import { TableOrder } from "../Components/admin/content/tableOrder";


// import { Cart } from "../pages/cart/cart";
import Cart1 from "../pages/cart/Cart1";

import Userprofile from "../Components/layout/UserProfile/Userprofile";
import ProfileSeler from "../Components/layout/Seller/ProfileSeler";
import AddProducts from "../Components/layout/Seller/AddProducts";
export const Routerr = (prop) => {
  const [checklogin, setCheckLogin] = useState(false);
  const admin = localStorage.getItem("isAdmin");

  const checkLogin = (check) => {
    setCheckLogin(!checklogin);
  };

  return (
    <div>
      <StoreProvider>
        {admin === 'true' ? (
          <Router>
              <Routes>
                {/* <Route path="/bidu-ecommerce" element={<Admin />} />
                <Route path="/Donhang" element={<Donhang />} /> */}
              </Routes>
          </Router>
        ) : (
          <Router>
            <Navbar  checkLogin={checkLogin}/>
            <Routes>
              <Route path="/bidu-ecommerce" element={<Home />} />
              <Route
                path="/tim-kiem/keyword=:search"
                element={<HomeSearch />}
                
                
              />
             
              <Route
                path="/san-pham/:id"
                element={<DetailProduct />}
              />
              <Route 
                path="/userprofile"
                element={<Userprofile />}/>
              <Route path="/selerprofile" element={<ProfileSeler/>} />
              <Route path="/addproduct"
              element={<AddProducts />}/>

              
              <Route path="/gio-hang" element={<Cart1 />} />
              {/* <Route path="/gio-hang" element={<Cart />} /> */}
              <Route  path="/thanh-toan" element={<Checkout />} />
              <Route path="/admin-ecommerce" element={<Admin />} />
              <Route path="/Donhang" element={<Donhang />} />
             
              
              
            </Routes>
            <Footer />
          </Router>
          
        )}
      </StoreProvider>

      {/* <StoreProvider>
        <Router>
          <Navbar checkLogin={checkLogin} />
          <Routes>
            <Route path="/bidu-ecommerce" element={<Home />} />
            <Route path="/tim-kiem/keyword=:search" element={<HomeSearch />} />
            <Route
              path="/san-pham/:id"
              element={<DetailProduct checklogin={checklogin} />}
            />
            <Route path="/gio-hang" element={<Cart />} />
            <Route path="/thanh-toan" element={<Checkout />} />
            <Route path="/cong-dong" element={<Community />} />
            <Route path="/landing" element={<Landing />} />
          </Routes>
          <Footer />
        </Router>
      </StoreProvider> */}
    </div>
  );
};
