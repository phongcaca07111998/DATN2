import React from "react";
import { Container, Row, Col } from "reactstrap";
import { db } from "../../../Components/firebase/firebase"
import { doc, deleteDoc } from "firebase/firestore";
import useGetData from "../../../custom-hooks/useGetData";
import { toast } from "react-toastify";
import { getAuth} from 'firebase/auth';
import './allproduct.css';

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
    <section >
      <div className="container16">
        <div className="row1">
          <div className="col-12">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;