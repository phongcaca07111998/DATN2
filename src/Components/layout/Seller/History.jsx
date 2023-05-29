import React from 'react'
import { db } from "../../../Components/firebase/firebase"
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import useGetData from "../../../custom-hooks/useGetData";
import { toast } from "react-toastify";
import { getAuth} from 'firebase/auth';
import './allproduct.css';
import { useSelector } from 'react-redux';
const History = () => {
   
 const { data: oderData,loading } = useGetData("Oders");
 const {currentUser} = getAuth();
 const maindataproduct = oderData.filter(oderData => oderData.email == currentUser?.email );
  // const deleteProduct = async id => {
  //   await deleteDoc(doc(db, "Oders", id));
  //   toast.success("Deleted!");
  // };
  //
  const cartItems = maindataproduct.flatMap(orderData => orderData.cartItems);

console.log(cartItems);
  console.log(maindataproduct);
  const deleteProduct = async (id, cartItems) => {
    // Xóa đơn hàng khỏi cơ sở dữ liệu
    await deleteDoc(doc(db, "Oders", id));
  
    // Cập nhật trường quantity của sản phẩm trong cơ sở dữ liệu
    cartItems.forEach(async (cartItem) => {
      const productRef = doc(db, "product", cartItem.id);
      const productDoc = await getDoc(productRef);
  
      if (productDoc.exists()) {
        const productData = productDoc.data();
        const newQuantity = productData.sl + cartItem.quantity;
        await updateDoc(productRef, { sl: newQuantity });
      }
    });
    console.log("xoa xong r");
    toast.success("Deleted!");
  };

  //




  console.log(maindataproduct.length);
  return (
    <section >
      <div className="container18">
        <div className="row1">
          <div className="col-12 his">
          {maindataproduct?.length === 0 ? (
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
                  <th>Trạng thái</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <h4 className="py-5 text-center fw-bold ">Loading.....</h4>
                ) : maindataproduct?.map((item) =>
                item.cartItems?.map((cartItem) => (
                  <tr key={cartItem.id}>
                    <td>
                      <img src={cartItem.imgUrls} alt={item.title} width="75" height="50" />
                    </td>
                    <td>{cartItem.id}</td>
                    <td>{cartItem.productName}</td>
                    <td>{cartItem.quantity}</td>
                    <td>{cartItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</td>
                    <td>{cartItem.orderStatus}</td>
                    <td>
                    <button
                        onClick={() => {
                          deleteProduct(item.id,cartItems);
                        }}
                        className="btn btn-danger"
                      >
                        Hủy Đơn Hàng
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
  );
};

export default History