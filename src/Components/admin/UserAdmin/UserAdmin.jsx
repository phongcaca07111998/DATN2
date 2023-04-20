import React from "react";
import { Container, Row, Col } from "reactstrap";
import { db } from "../../../Components/firebase/firebase"
import { doc, deleteDoc } from "firebase/firestore";
import useGetData from "../../../custom-hooks/useGetData";
import { toast } from "react-toastify";
import './useradmin.css';

const UserAdmin = () => {
  const { data: productsData, loading } = useGetData("users");

  const deleteProduct = async id => {
    await deleteDoc(doc(db, "users", id));
    toast.success("Deleted!");
  };

  return (
    <section >
      <div className="container17">
        <div className="row2">
          <div className="col-12">
          <table className="table">
              <thead>
                <tr>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Phone</th>
                  <th>Phân Quyền</th>
                  <th>ID</th>
                    
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
                      <td>{item.phone} </td>
                      <td>{item.seller==="Nhà bán hàng"?"Nhà bán hàng":"Người dùng"} </td>
                      <td>{item.uid} </td>
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
    </section>
  );
};

export default UserAdmin;