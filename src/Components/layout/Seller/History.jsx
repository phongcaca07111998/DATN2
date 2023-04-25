import React from 'react'
import { db } from "../../../Components/firebase/firebase"
import { doc, deleteDoc } from "firebase/firestore";
import useGetData from "../../../custom-hooks/useGetData";
import { toast } from "react-toastify";
import { getAuth} from 'firebase/auth';
import './allproduct.css';
import { useSelector } from 'react-redux';
const History = () => {
   
 const { data: oderData,loading } = useGetData("Oders");
 const {currentUser} = getAuth();
 const maindataproduct = oderData.filter(oderData => oderData.email == currentUser?.email );
  const deleteProduct = async id => {
    await deleteDoc(doc(db, "Oders", id));
    toast.success("Deleted!");
  };
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
  );
};

export default History