import React, { useEffect, useState } from "react";
import "./paymentForm.scss";
import { Formik, FastField, Form } from "formik";
import { commerce } from "../../../lib/commerce.js";
import Cursor from "../../../assets/img/cursor.png";
import {
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import parse from "html-react-parser";
import Select from "@mui/material/Select";
import { PaymentSchema } from "./validate";
import { UseStore, action } from "../../../store";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, doc, updateDoc, addDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Checkout } from "../../../pages/checkout/checkout";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "./../../redux/slices/cartSlice";
import { getAuth } from "firebase/auth";


export const PaymentForm = (prop) => {
  const navigate = useNavigate();
  const { currentUser } = getAuth()
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPayment = prop.totalPayment + 32000;
  const [listCountries, setListCountries] = useState([]);
  const [province, setProvince] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  // const { data: productsData, firstLoading } = useGetData("product");
  const paymentType1 = prop.paymentType
  const dispatch = useDispatch();
  //
  console.log(currentUser.email);
  async function updateProductQuantity(productId, newQuantity) {

    try {
      // Lấy một tham chiếu đến sản phẩm cần cập nhật
      const productDocRef = doc(db, "product", productId)
      // const productRef = updateDoc(doc(db, "product"), productId);
      const productDocSnapshot = await getDoc(productDocRef);
      const productData = productDocSnapshot.data();
      const quantitysl = productData.sl;

      const quantity = String(newQuantity);
      //

      //

      // Thực hiện cập nhật số lượng sản phẩm
      // await productRef.update({sl: quantity ,});
      await updateDoc(productDocRef, {
        sl: quantitysl - quantity,
      });


      console.log(`Đã cập nhật số lượng sản phẩm ${productId} thành công.`);
    } catch (error) {
      console.error(`Lỗi khi cập nhật số lượng sản phẩm ${productId}:`, error);
    }
  }

  // Hàm xử lý khi người dùng click vào thanh toán
  async function handleCheckout(cartItems) {
    // Duyệt qua từng item trong cartItems và cập nhật lại số lượng sản phẩm trong Firestore
    for (const cartItem of cartItems) {
      const productId = cartItem.id;
      const newQuantity = cartItem.quantity;

      console.log(cartItem.id);
      await updateProductQuantity(productId, newQuantity);
    }

    // Thông báo cho người dùng rằng thanh toán thành công
    console.log('Thanh toán thành công.');
  }

  // Sử dụng hàm handleCheckout khi người dùng click vào thanh toán


  // const [listIdCountries, setListIdCountries] = useState([]);


  useEffect(() => {
    commerce.services.localeListSubdivisions("VN").then((response) => {
      const array = Object.values(response.subdivisions);
      setListCountries(array);
    });

  }, []);

  const handleChange = (event) => {
    setProvince(event.target.value);
  };

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };

  const turnOffForm = () => {
    prop.turnOff(false);
  };
  const onAddOrder = async (values) => {
    console.log('onAddOrder called with values:', values);
    try {
      const docRef = doc(collection(db, "Oders"));
      await setDoc(docRef, {
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        province: province,
        cartItems: cartItems,
        totalPayment: totalPayment,
        email: currentUser?.email
      });

      // lấy id vừa được tạo và gán vào trường id của document
      const docId = docRef.id;
      await updateDoc(docRef, { uid: docId });

      handleCheckout(cartItems);

      dispatch(cartActions.resetCart());

      setLoading(true);
      setMessage("Đặt hàng thành công");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);

      navigate("/bidu-ecommerce");
    } catch (err) {

      setLoading(false);
      setMessage("Đặt hàng thất bại . Vui lòng thao tác lại");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };
  return (
    <div className="payment-container">
      {alert && (
        <div className="alert">
          <Alert severity="info">{message}</Alert>
        </div>
      )}
      {loading && (
        <div className="loading">
          <CircularProgress color="inherit" className="loading_progress" />
        </div>
      )}
      <div
        className="outsite"
        onClick={turnOffForm}
        style={{ cursor: `url(${Cursor}), pointer` }}
      ></div>
      <div className="payment">
        <div className="right">
          <div className="image"></div>
        </div>
        <div className="left">
          <div className="form">
            <div className="header">
              <h2 className="header_text">Xác nhận đơn hàng</h2>
              <h4 className="header_text">Địa chỉ giao hàng</h4>
            </div>
            <div className="content">
              <Formik
                initialValues={initialValues}
                validationSchema={PaymentSchema}
                onSubmit={onAddOrder}
              >
                {({ errors, touched }) => (
                  <Form className="form_fields">
                    <div className="fields">
                      <div className="field">
                        <FastField
                          name="name"
                          placeholder="Họ và tên"
                          className="input"
                          type="text"
                        />
                        {errors.name && touched.name ? (
                          <div className="formError">{errors.name}</div>
                        ) : null}
                      </div>

                    </div>
                    <div className="fields">
                      <div className="field">
                        <FastField
                          name="phone"
                          placeholder="Số điện thoại"
                          className="input"
                          type="text"
                        />
                        {errors.phone && touched.phone ? (
                          <div className="formError">{errors.phone}</div>
                        ) : null}
                      </div>
                      <div className="field">
                        <FastField
                          name="address"
                          placeholder="Địa chỉ"
                          className="input"
                          type="text"
                        />
                        {errors.address && touched.address ? (
                          <div className="formError">{errors.address}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="fields">
                      <div className="field">
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-standard-label">
                            Tỉnh thành
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={province}
                            label="Province"
                            onChange={handleChange}
                            className="select"
                          >
                            {listCountries?.map((item, index) => (
                              <MenuItem key={index} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="field">
                        <button type="onSubmit" className="btn btn-accept">
                          Xác nhận
                        </button>
                        <button
                          className="btn btn-cancel"
                          onClick={turnOffForm}
                        >
                          Hủy
                        </button>
                      </div>
                      {/* </FormControl> */}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="total_price">
              <div className="left">
                <p>Hình thức thanh toán: {paymentType1 === "online" ? 'trực tuyến' : 'trực tiếp'}</p>
              </div>
              <div className="right">
                <div className="general-info-item">
                  <span>Phí vận chuyển:</span>
                  {province ? <span>32.000đ</span> : <span>0đ</span>}
                </div>
                <div className="general-info-item">
                  <span>Giảm giá phí vận chuyển:</span>
                  <span>0đ</span>
                </div>
                <div className="general-info-item">
                  <span>Giảm giá tiền hàng:</span>
                  <span>0đ</span>
                </div>
                <div className="general-info-item">
                  <span style={{ fontWeight: "bolder" }}>Tổng thanh toán:</span>
                  {province ? (
                    <span style={{ fontWeight: "bolder", color: "#fd37ae" }}>
                      {totalPayment
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      đ
                    </span>
                  ) : (
                    <span style={{ fontWeight: "bolder", color: "#fd37ae" }}>
                      0đ
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};