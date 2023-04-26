import React, { useState } from "react";
import "./register.scss";
import { Formik, FastField, Form } from "formik";
import auth_background from "../../assets/img-login/auth_background.svg";
// import text_bidu from "../../assets/img-login/text_bidu.svg";
import Cursor from "../../assets/img/cursor.png";
import icon_close_menu from "../../assets/img-login/icon_close_menu.svg";
import { RegisterSchema } from "./validate";
import { Alert, CircularProgress } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
export const Register=(prop) => {
  

  const [userfname,setUserfname]= useState("")
  const [username,setUsername]= useState("")
  const [isChecked, setIsChecked] = useState(false);
  const [phoneNumber,setPhone]= useState("")
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("")

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const signUp = async(e)=>{
    e.preventDefault()
    setLoading(true)
  

  try {
    const userCredential= await createUserWithEmailAndPassword(auth,email,password);
    const user = userCredential.user;
    // const userphone = user.phoneNumber;
    const storageRef= ref(storage,`{username}`)
    const uploadTask =uploadBytesResumable(storageRef)

    uploadTask.on((error)=>{
      const errorCode = error.code
      setLoading(false);
      setMessage("Đăng ký thất bại!")
      setAlert(true);
      // toast.error(error.message)
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(async()=>{
        //update user profile
        await updateProfile(
          user,{
          displayName:username,
          phoneNumber:phoneNumber,
          
          // photoURL: downloadURL,
        });
        
      //store user data firestore database

      if (isChecked===true) {
        await setDoc(doc(db,'users',user.uid),{
          uid:user.uid,
          userfname:userfname,
          displayName:username,
          email,
          seller:"Nhà bán hàng",
          pass :password,
          phoneNumber:phoneNumber,
          // photoURL:dowloadURL,
        });
      } else {
        await setDoc(doc(db,'users',user.uid),{
          uid:user.uid,
          userfname:userfname,
          displayName:username,
          email,
          pass :password,
          phoneNumber:phoneNumber,
          // photoURL:dowloadURL,
        });
      }
      });
    })
    

    setLoading(true)
    // console.log(user)
    setMessage("Đăng ký thành công!");
    setAlert(true);
    setTimeout(() => {
          
                  prop.closeRegister(false);
                }, 3000);
    
    
   
  }catch (error){
    setLoading(false)
    setMessage("Đăng ký thất bại!");
    setAlert(true);
    
    }
  };

  const initialValues = {
      userfname:"",
      username: "",
      email: "",
      password: "",
      password_confirm:"",
      phone:"",
  };

  const closeRegister = () => {
      prop.closeRegister(false);
  };

  const onAdd = ( { resetForm }) => {
      signUp( {resetForm});
  };
  
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
            <img src="./images/logo1.png" alt="" />
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
                  <div className="field" onChange= {(e)=>setUserfname(e.target.value)} >
                    <FastField
                      name="hovaten"
                      placeholder="Họ và tên"
                      className="input"
                      type="text"
                    />
                    {errors.hovaten && touched.hovaten ? (
                      <div className="formError">{errors.hovaten}</div>
                    ) : null}
                  </div>
                  <div className="field" onChange= {(e)=>setUsername(e.target.value)} >
                    <FastField
                      name="username"
                      placeholder="username"
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
                      {errors.email && touched.email ? (
                      <div className="formError">{errors.email}</div>
                    ) : null}
                  </div>
                  <div>
                    <FastField 
                    onClick= {handleCheckbox} 
                    className="checkbox" 
                    type="checkbox" 
                    name="checked"
                    checked={isChecked}
                    />
                    
                    One
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
                    <FastField
                      name="password_confirm"
                      placeholder="Nhập lại mật khẩu"
                      className="input"
                      type="password"
                   
                    />
                    {errors.password_confirm && touched.password_confirm ? (
                      <div className="formError">{errors.password_confirm}</div>
                    ) : null}
                  </div>
                  <div className="field" onChange= {(e)=>setPhone(e.target.value)}>
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

