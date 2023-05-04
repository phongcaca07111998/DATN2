import React from 'react'
import './proflieseler.css';
import { motion } from "framer-motion";
import { useSelector,useDispatch } from 'react-redux';
import Helmet from '../../Helmet/Helmet';
import { Link } from 'react-router-dom';
import { cartActions } from '../../redux/slices/cartSlice';
import useGetData from '../../../custom-hooks/useGetData';
import { getAuth } from 'firebase/auth';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { toast } from 'react-toastify';



const ProfileSeler = () => {

  const { data: oderData,loading } = useGetData("Oders");
  const {currentUser} = getAuth();
 
 //Ở đây, chúng ta sử dụng phương thức reduce để duyệt qua tất cả các đơn đặt hàng trong oderData. Với mỗi đơn đặt hàng, chúng ta lọc ra tất cả các cartItems có trường usersell giống với email của user hiện tại (currentUser.user), sau đó gom tất cả các cartItems này vào mảng acc. Cuối cùng, phương thức reduce sẽ trả về mảng cartItemsWithUserSell chứa tất cả các cartItems có trường usersell giống với user của user hiện tại

    
 const cartItemsWithUserSell = oderData.reduce((acc, order) => {
    const cartItems = order.cartItems.filter(item => item.usersell === currentUser.displayName).map(item => {
      return {
        ...item,
        orderId: order.id
      }
    });
    return acc.concat(cartItems);
  }, []);
  
  console.log(cartItemsWithUserSell);

  
  const deleteProduct = async (orderId, id) => {
    try {
      const docRef = doc(db, "Oders", orderId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const order = docSnap.data();
        const updatedCartItems = order.cartItems.filter(item => item.id !== id);
        const cartItem = order.cartItems.find(item => item.id === id);
        if (cartItem) {
          const productRef = doc(db, "product", cartItem.id);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
            const product = productSnap.data();
            await updateDoc(productRef, { sl: product.sl + cartItem.quantity });
            console.log(`Successfully updated product quantity for product with ID ${cartItem.id}.`);
          } else {
            console.log(`No product found with ID ${cartItem.id}.`);
          }
        }
        await updateDoc(docRef, { cartItems: updatedCartItems });
        console.log(`Successfully updated cartItems for order with ID ${id}.`);
      } else {
        console.log(`No order found with ID ${id}.`);
      }
    } catch (err) {
      console.error(`Error updating cartItems for order with ID ${id}.`, err);
    }
  };
  
  
  



  
  
//

// const deleteProduct = async (id, orderId) => {
//     console.log(id);
//     try {
//         const orderRef= doc(db, "Oder", orderId);
//       const orderDoc = await orderRef.get();
//       if (!orderDoc.exists) {
//         console.log('No such document!');
//         return;
//       }
//       const cartItems = orderDoc.data().cartItems.filter(item => item.id !== id);
//       await orderRef.update({ cartItems });
//       console.log('Document successfully updated!');
//     } catch (error) {
//       console.error('Error updating document: ', error);
//     }
//   }
  
//

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
                        <span className="col">Ngày đặt hàng :</span>
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
          {cartItemsWithUserSell?.length === 0  ? (
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
                ) : cartItemsWithUserSell?.map((item,index) =>    
                  <tr key={index}>
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
                          deleteProduct(item.orderId,item.id);
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