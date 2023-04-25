import React, { useState } from "react";
import "./login.scss";
import { Formik, FastField, Form } from "formik";
import { LoginSchema } from "./validate";
import logo1 from "../../assets/img-login/facebook.svg";
import logo2 from "../../assets/img-login/google.svg";
import logo3 from "../../assets/img-login/zalo.svg";
import logo4 from "../../assets/img-login/apple.svg";
import Cursor from "../../assets/img/cursor.png";
import auth_background from "../../assets/img-login/auth_background.svg";
// import text_bidu from "../../assets/img-login/text_bidu.svg";
// import icon_close_menu from "../../assets/img-login/icon_close_menu.svg";
import { Alert, CircularProgress } from "@mui/material";
import logo from '../../assets/img/logo.png'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
export const Login = (prop) => {

    const auth = getAuth(app);
    const {currentUser}=getAuth()
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const initialValues = {
        username: "",
        password: "",
    };
    const closeLogin = () => {
        prop.closeLogin(false); 
    const admin = email==="phongcaca07111998@gmail.com"
    console.log(admin);
    if (admin === true) {
      navigate("/admin-ecommerce")
    };
     }

    const openRegister = () => {
    prop.openRegister(true);
    };
    const onAdd = async (values, { resetForm }) => {
        await onLogin(values);
        await resetForm();
    };
    const onLogin = () => {
        setLoading(true);

    signInWithEmailAndPassword(auth, email, password)


    .then(function() {
        // Signed in 
        setLoading(false);
        // localStorage.setItem("userId", userCredential.user);
        // localStorage.setItem("isAdmin", userCredential.user);
        prop.closeLogin(false);
        setMessage("Đăng nhập thành công");
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      })
    .catch(function(error)  {
        setLoading(false);
        setMessage("Sai tên đăng nhập hoặc mật khẩu");
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      });
      localStorage.setItem('user', JSON.stringify(email));
}



  return (
    <div>
      <div className="container">
      {loading && (
        <div className="loading">
          <CircularProgress color="inherit" className="loading_progress" />
        </div>
      )}
      {alert && (
        <div className="alert">
          <Alert severity="info">{message}</Alert>
        </div>
      )}
      <div
        className="outsite"
        onClick={closeLogin}
        style={{ cursor: `url(${Cursor}), pointer` }}
      >
        {" "}
      </div>
      <div className="form">
        <div
          className="intro"
          style={{ backgroundImage: `url(${auth_background})` }}
        >
          <img src="./images/logo1.png" alt="" />
        </div>
        <div className="form__login">
          <div className="form__header">
            <img src={logo} alt="" onClick={closeLogin} />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={onAdd}
          >
            {({ errors, touched }) => (
              <Form className="form_fields">
                <div className="field" onChange= {(e)=>setEmail(e.target.value)} >
                  <FastField
                    name="username"
                    placeholder="Email hoặc SĐT"
                    className="input"
                    type="text"
                  />
                  {errors.username && touched.username ? (
                    <div className="formError">{errors.username}</div>
                  ) : null}
                </div>
                <div className="field" onChange= {(e)=>setPassword(e.target.value)}>
                  <FastField
                    name="password"
                    placeholder="Mật khẩu"
                    className="input"
                    type="password"
                  />
                  {errors.password && touched.password ? (
                    <div className="formError">{errors.password}</div>
                  ) : null}
                </div>
                <div className="field">
                  <button onClick={onLogin} type="submit" className="btn_login" >
                    Đăng nhập
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="sign-in-social-text">
            <span>Đăng nhập với tài khoản khác</span>
            <div className="logo">
              <img src={logo1} alt="" className="logo" />
              <img src={logo2} alt="" className="logo" />
              <img src={logo3} alt="" className="logo" />
              <img src={logo4} alt="" className="logo" />
            </div>
            <b>Quên mật khẩu</b>
            <div className="register">
              <span>Không có tài khoản? </span>{" "}
              <p onClick={openRegister}> Đăng ký </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}


