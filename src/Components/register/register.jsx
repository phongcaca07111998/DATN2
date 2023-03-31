import React, { useState } from "react";
import "./register.scss";
import { Formik, FastField, Form } from "formik";
import auth_background from "../../assets/img-login/auth_background.svg";
// import text_bidu from "../../assets/img-login/text_bidu.svg";
import Cursor from "../../assets/img/cursor.png";
import icon_close_menu from "../../assets/img-login/icon_close_menu.svg";
import { RegisterSchema } from "./validate";
import { Alert, CircularProgress } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase";
import logo from '../../assets/img/logo.png'
export const Register=(prop) => {

    const auth = getAuth(app);

    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState("")

    const initialValues = {
        username: "",
        email: "",
        password: "",
        password_confirm: "",
        phone: "",
    };

    const closeRegister = () => {
        prop.closeRegister(false);
    };

    const onAdd = ( { resetForm }) => {
        signUp( {resetForm});
    };


    const signUp=({resetForm})=>{
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          setLoading(false);
          // console.log(user);
          setMessage("Đăng ký thành công!");
          // setAlert("Đăng ký thành công!");
          setAlert(true);
          // resetForm()
          // setAlert(false);
          setTimeout(() => {
            
            prop.closeRegister(false);
          }, 3000);
        
          // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            setLoading(false);
            // console.log(error);
            setMessage("Đăng ký thất bại!");
            setAlert(true);
            // setAlert("Đăng ký thất bại!");
            // setTimeout(() => {
            // setAlert(false);
            // }, 3000);
            // // ..
        });

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
          onClick={closeRegister}
          style={{ cursor: `url(${Cursor}), pointer` }}
        ></div>
        <div className="form">
          <div
            className="intro"
            style={{ backgroundImage: `url(${auth_background})` }}
          >
            <img src={logo} alt="" />
          </div>
          <div className="form__register">
            <div className="form__header">
              <img src={icon_close_menu} alt="" onClick={closeRegister} />
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={RegisterSchema}
              onSubmit={onAdd}
            >
              {({ errors, touched }) => (
                <Form className="form_fields">
                  <label htmlFor="">ĐĂNG KÝ</label>
                  <div className="field" >
                    <FastField
                      name="username"
                      placeholder="Họ và tên"
                      className="input"
                      type="text"
                    />
                    {errors.username && touched.username ? (
                      <div className="formError">{errors.username}</div>
                    ) : null}
                  </div>
                  <div className="field" onChange= {(e)=>setEmail(e.target.value)}>
                    <FastField 
                      name="email"
                      placeholder="Email"
                      className="input"
                    //   onChange= {(e)=>setEmail(e.target.value)}
                    />
                    
                  </div>
                  <div className="field" onChange= {(e)=>setPassword(e.target.value)}>
                    <FastField
                      name="password"
                      placeholder="Mật khẩu"
                      className="input"
                      type="password"
                    //   onChange= {(e)=>setPassword(e.target.value)}
                    />
                    {errors.password && touched.password ? (
                      <div className="formError">{errors.password}</div>
                    ) : null}
                  </div>
                  <div className="field">
                    <FastField
                      name="password_confirm"
                      placeholder="Nhập lại mật khẩu"
                      className="input"
                      type="password"
                    //   onChange= {(e)=>setPassword(e.target.value)}
                    />
                    {errors.password_confirm && touched.password_confirm ? (
                      <div className="formError">{errors.password_confirm}</div>
                    ) : null}
                  </div>
                  <div className="field">
                    <FastField
                      name="phone"
                      placeholder="Số điện thoại"
                      className="input"
                    />
                    {errors.phone && touched.phone ? (
                      <div className="formError">{errors.phone}</div>
                    ) : null}
                  </div>
                  <div className="field">
                    <button onClick={signUp} type="submit" className="btn_register">
                      Đăng ký
                    </button>
                  </div>
                </Form>
              )} 
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

