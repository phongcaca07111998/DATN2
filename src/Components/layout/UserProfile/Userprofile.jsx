import React from 'react'
import './userprofile.css'
import { getAuth, updatePassword } from 'firebase/auth';
import useGetData from '../../../custom-hooks/useGetData';
import { useEffect } from 'react';
import { useState } from 'react';
import {  db } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Alert, CircularProgress } from "@mui/material";


const Userprofile = () => {
  const { currentUser } = getAuth();
  const [users, setUsers] = useState([]);
  const { data: usersData, loading } = useGetData("users");
  const [userfname, setUserfname] = useState("")
  const [usephone, setPhone] = useState("")
  const [setgender, setGender] = useState("")
  const [setnewpass, setNewPass] = useState("")
  const [message, setMessage] = useState("")
 const [alert, setAlert] = useState(false);


  const mainUser = usersData.find(userData => userData.email === currentUser.email);

  const navigate = useNavigate()


  useEffect(() => {
    if (!loading) {
      setUsers([mainUser]);
    }
  }, [loading, mainUser]);

  const gender = mainUser?.gioitinh;
  console.log(gender);
  // 
  const updateUserFname = async (e) => {
    e.preventDefault()
    const userId = getAuth().currentUser.uid;
    const userDocRef = doc(db, "users", userId);
    navigate('/userprofile')
    try {
      await updateDoc(userDocRef, {
        userfname: userfname,
        phoneNumber: usephone,
        gioitinh: setgender,
        pass:setnewpass,
      });
      handleUpdatepass()
      console.log("Cập nhật thành công trường userfname trong tài liệu của người dùng hiện tại");
    } catch (error) {
      console.log("Lỗi khi cập nhật trường userfname: ", error);
    }
    console.log(userId);
  }



  const handleUpdatepass = async () => {
    try {
      await updatePassword(currentUser,setnewpass);
     
      setMessage("cập nhật thành công")
      setAlert(true)
      setTimeout(() => {
        
      
        setAlert(false);
      }, 3000);
      
      
      
    } catch (error) {
    
      setMessage("cập nhật thất bại")
      setAlert(true)
      setTimeout(() => {
        
      
        setAlert(false);
      }, 3000);
      
     
    }
      // updatePassword(user, newPassword)

   }









  // 
  // console.log(currentUser.uid);
  return (
    <div className="container">
      {alert && (
          <div className="alert">
            <Alert severity="info">{message}</Alert>
          </div>
        )}
      <div className="row layout-profile">
        <div className="col-3-5">
          <div className="sidebar">
            <div className="profile-section justify-content-between align-items-center d-flex flex-column">
              <div className="user-avatar">
                <img src="https://www.shutterstock.com/image-vector/man-avatar-icon-vector-sign-260nw-1719745753.jpg" alt="user_avatar" />
                <div className="edit-avatar border-0 d-flex align-items-center"><input type="file" />
                  <img src="https://www.shutterstock.com/image-vector/man-avatar-icon-vector-sign-260nw-1719745753.jpg" />
                </div>
              </div>
              <div className="user-name">{currentUser.displayName}</div>
              <div style={{ marginBottom: '2.25rem' }}>
                <div className="follow d-flex justify-content-center align-items-center">
                  <div className="info-section text-center" style={{ cursor: 'pointer' }}>
                    <h3 className="mb-0">Theo dõi</h3>
                    <p className="mb-0">0</p>
                  </div>
                  <div className="devider" />
                  <div className="info-section text-center" style={{ cursor: 'pointer' }}>
                    <h3 className="mb-0">Đang theo dõi</h3>
                    <p className="mb-0">0</p>
                  </div>
                </div>
              </div>
              <div className="change-profile"><button type="button" className="btn-see-more font-size-14px font-weight-400">Chỉnh sửa hồ sơ</button></div>
            </div>
            <div />
            <div />
            <div className="tabList-section">
              <div className="d-flex align-items-center justify-content-between cursor-pointer py-2 pb-4 ">
                {/* <div className="tab font-size-14px "><img classname="icon-tab" src="../userprofile/public/images/Profile.png" /><span>Tài khoản</span></div> */}
                {/* <div><img src="./userprofile/public/images/arrow_black.png"></div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-8-5">
          <div className="profile-inform h-100-p">
            <div className="header-title">Thông tin tài khoản</div>

            <form action="#" className="h-100">
              {users?.map((key) => (
                <div className>

                  <div className="d-flex form-group mb-4"><label className="mb-0">Họ tên</label>
                    <div  className="input-and-error"><input onChange={(e) => setUserfname(e.target.value)} name="userName" className="profile-form-control form-control" type="text" placeholder="Họ và tên" defaultValue={key.userfname} /></div>
                  </div>
                  <div className="d-flex form-group mb-4"><label className="mb-0">Số điện thoại</label>

                    <div className="input-and-error d-flex">

                      <div  className=" flex-1"><input onChange={(e) => setPhone(e.target.value)} name="phoneNumber" className="profile-form-control form-control" type="text" placeholder="Nhập số điện thoại" defaultValue={key.phoneNumber} /></div>
                    </div>



                  </div>
                  <div className="d-flex form-group mb-4"><label className="mb-0">Số CMND/CCCD</label>
                    <div className="input-and-error"><input name="identity_number" className="profile-form-control form-control" type="text" placeholder="Nhập số CMND/ CCCD" defaultValue={+131241121} /></div>
                  </div>
                  <div className="d-flex form-group mb-4"><label className="mb-0">Email</label>
                    <div className="input-and-error"><input name="email" className="profile-form-control form-control" type="text" placeholder="Nhập Email" defaultValue={key.email} /></div>
                  </div>
                  <div  className="d-flex form-group mb-4"><label className="mb-0">Giới tính</label>
                    <div onChange={(e) => setGender(e.target.value)} className="input-and-error">
                      <input value={"Nữ"} name="gender" type="radio" id="nu" defaultValue={2}
                        defaultChecked={gender === "Nữ"} /><label className="option" htmlFor="nu">Nữ</label>
                      <input value={"Nam"} name="gender" type="radio" id="nam" defaultValue={1}
                        defaultChecked={gender === "Nam"} /><label className="option" htmlFor="nam">Nam</label>

                    </div>
                  </div>
                  <div className="d-flex form-group mb-4"><label className="mb-0">Ngày sinh</label>
                    <div className="input-and-error">
                      <div className="react-datepicker-wrapper">
                        <div className="react-datepicker__input-container"><span role="alert" aria-live="polite" className="react-datepicker__aria-live" /><input type="date" id="react-datepicker-wrapper" placeholder="DD/MM/YY" className="profile-form-control form-control" defaultValue=" " /></div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex form-group mb-5">
                    <div className="change-password d-flex flex-column py-2 border-top border-bottom">
                      <div className="d-flex justify-content-between pb-3 ">
                        <p className="expand-password cursor-pointer m-0">Thay đổi mật khẩu </p>
                      </div>
                      <div className="change-password">
                       
                        <div className="d-flex flex-row justify-content-between mb-3"><label className="mb-0">Mật khẩu mới</label>
                          <div onChange={(e) => setNewPass(e.target.value)} className="flex-1"><input name="newPassword" type="password" placeholder="Mật khẩu mới" className="form-control"  />
                            
                          </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between mb-3"><label className="mb-0">Nhập lại mật khẩu</label>
                          <div  className="flex-1"><input name="passwordRetype" type="password" placeholder="Nhập lại mật khẩu" className="form-control"  />
                           
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex form-group mb-4-5"><button onClick={updateUserFname} className="btn-bidu mx-auto">Cập nhật</button></div>
                  <div className="text-center form-group pt-2 mb-4 font-size-14px delete-account mx-auto cursor-pointer">Xóa tài khoản</div>
                </div>
              )
              )}
            </form>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Userprofile