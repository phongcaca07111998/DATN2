import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import './addproduct.css';
import { db, storage } from "../../../Components/firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import useGetData from "../../../custom-hooks/useGetData";
import { Alert } from "@mui/material";

const AddProducts = () => {
  //
  const {currentUser} = getAuth();
  const { data: usersData } = useGetData("users");
  const mainUser = usersData.find(userData => userData.email == currentUser?.email);
  console.log(mainUser?.userfname);

  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescription, setEnterDescription] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterUsername, setEnterUsername] = useState("");
  const [enterSl, setSl] = useState("");
  const [enterDate, setDate] = useState("");
  const [enterProductImgs, setEnterProductImgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const addProduct = async e => {
    e.preventDefault();
    setLoading(true);

    // Upload product images to Firebase Storage and get download URLs
    let imgUrls = [];
    for (let i = 0; i < enterProductImgs.length; i++) {
      const img = enterProductImgs[i];
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + img.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, img);

      try {
        await uploadTask;
        const imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
        imgUrls.push(imgUrl);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to upload product images!");
        return;
      }
    }

    // Add product to Firebase Firestore
    try {
      const docRef = await collection(db, "product");

      await addDoc(docRef, {
        productName: enterTitle,
        shortDesc: enterShortDesc,
        description: enterDescription,
        category: enterCategory,
        nameseller:mainUser?.userfname,
        price: enterPrice,
        username: mainUser?.displayName,
        imgUrls: imgUrls,
        sl: enterSl,
        date:enterDate,
      });

      setLoading(false);
      setAlert(true);
      setMessage("Thêm sản phẩm thành công");
      setTimeout(() => {
        setEnterTitle("");
      setEnterShortDesc("");
      setEnterDescription("");
      setEnterCategory("");
      setEnterPrice("");
      setEnterUsername("");
      setSl("");
      setDate("");
      setEnterProductImgs([]);
        setAlert(false);
      }, 4000);
      
      // navigate("/addproduct");
    } catch (err) {
      setLoading(false);
      setAlert(true);
      console.log(error);
      setMessage("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      setTimeout(() => {
        setAlert(false);
      }, 4000); 
    }
  };
  

  return (
      <section className="section">
        <div className="container12">
          <Row>
            <Col lg="12">
              {loading ? (
                <h4 className="py-5 ">Loading.......</h4>
              ) : (
                <>
                  <h4 className="titlel mb-5">Add Product</h4>
                  <Form onSubmit={addProduct}>
                  {alert && (
                    <div className="alert">
                      <Alert severity="info">{message}</Alert>
                    </div>
                  )}
                    <FormGroup className="form__group">
                      <span>Tên sản phẩm</span>
                      <input
                        type="text"
                        placeholder="Điện thoại"
                        value={enterTitle}
                        onChange={e => setEnterTitle(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup className="form__group">
                      <span>Mô tả ngắn</span>
                      <input
                        type="text"
                        placeholder="text"
                        value={enterShortDesc}
                        onChange={e => setEnterShortDesc(e.target.value)}
                        required
                      />
                    </FormGroup>

                    <FormGroup className="form__group">
                      <span>Mô tả</span>
                      <input
                        type="text"
                        placeholder="Mô tả...."
                        value={enterDescription}
                        onChange={e => setEnterDescription(e.target.value)}
                        required
                      />
                    </FormGroup>
                  
                    <div className="d-flex align-items-center justify-content-between gap-5">
                      <FormGroup className="form__group w-50">
                        <span>Giá</span>
                        <input
                          type="number"
                          placeholder="VNĐ"
                          value={enterPrice}
                          onChange={e => setEnterPrice(e.target.value)}
                          required
                        />
                      </FormGroup>
                      <FormGroup className="form__group w-50">
                        <span>Số Lượng</span>
                        <input
                          type="number"
                          placeholder="1"
                          value={enterSl}
                          onChange={e => setSl(e.target.value)}
                          required
                        />
                      </FormGroup>
                      <FormGroup className="form__group w-50">
                        <span>Ngày Tháng Năm</span>
                        <input
                          type="date"
                          value={enterDate}
                          onChange={e => setDate(e.target.value)}
                          required
                        />
                      </FormGroup>

                      <FormGroup className="form__group w-50">
                        <span>Danh mục</span>
                        <select
                          className="w-100 p-2"
                          onChange={e => setEnterCategory(e.target.value)}
                        >
                          <option>Chọn danh mục</option>
                          <option value="dienmay">Điện máy</option>
                          <option value="dogiadung">Đồ gia dụng</option>
                          <option value="congcudungcu">Công cụ & Dụng cụ</option>
                          <option value="ytesuckhoe">Y tế & Sức khoẻ</option>
                          <option value="thethaongoaitroi">Thể thao & Ngoài trời</option>
                          <option value="thietbicongnghiep">Thiết bị công nghiệp</option>
                          <option value="thietbisophukien">Thiết bị số, Phụ kiện</option>
                          <option value="nhacuadoisong">Nhà cửa & Đời sống</option>
                          <option value="thietbivanphong">Thiết bị văn phòng</option>
                          <option value="myphamlamdep">Mỹ phẩm & Làm đẹp</option>
                          <option value="mevabe">Mẹ và bé</option>
                          <option value="phukienoto">Phụ kiện ô tô, xe hơi</option>
                          <option value="thoitrangdulich">Thời trang & Du lịch</option>
                          <option value="bachhoatonghop">Bách hoá tổng hợp</option>
                        </select>
                      </FormGroup>
                    </div>

                    <div>
                      <FormGroup className="form__group ">
                        <span>Ảnh</span>
                        <input
                          type="file"
                          onChange={e => setEnterProductImgs(e.target.files)}
                          required
                          multiple
                        />
                      </FormGroup>
                    </div>

                    <button className="buy__btn " type="submit">
                      Thêm sản phẩm
                    </button>
                  </Form>
                </>
              )}
            </Col>
          </Row>
        </div>
      </section>
  );
};

export default AddProducts;