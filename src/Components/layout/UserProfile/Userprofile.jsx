import React from 'react'
import './userprofile.css'
import { getAuth } from 'firebase/auth';
import useGetData from '../../../custom-hooks/useGetData';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';


const Userprofile = () => {
    const {currentUser} = getAuth();
    const [users, setUsers] = useState([]);
    const { data: usersData, loading } = useGetData("users");
    const [userfname,setUserfname]=useState("")

    const mainUser = usersData.find(userData => userData.email === currentUser.email);
    
    
       
    
    useEffect(() => {
      if (!loading) {
        setUsers([mainUser]);
      }
    }, [loading, mainUser]);
    

    // 
    const updateUserFname = async (e) => {
        e.preventDefault()
        const userId = getAuth().currentUser.uid;
        const userDocRef = doc(db, "users", userId);
      
        try {
          await updateDoc(userDocRef, {
            userfname: userfname,
          });
          console.log("Cập nhật thành công trường userfname trong tài liệu của người dùng hiện tại");
        } catch (error) {
          console.log("Lỗi khi cập nhật trường userfname: ", error);
        }
        console.log(userId);
      }
    

      










    // 
    // console.log(currentUser.uid);
  return (
    <div className="container">
        <div className="row layout-profile">
          <div className="col-3-5">
            <div className="sidebar">
              <div className="profile-section justify-content-between align-items-center d-flex flex-column">
                <div className="user-avatar">
                  <img src="https://d1l9t1uin73ojb.cloudfront.net/media/images/6794c3cb-bf94-4fff-9767-c5030b452f21.png" alt="user_avatar" />
                  <div className="edit-avatar border-0 d-flex align-items-center"><input type="file" />
                  <img src="../userprofile/public/images/icon_photographic.svg"/>
                  </div>
                </div>
                <div className="user-name">{currentUser.displayName}</div>
                <div style={{marginBottom: '2.25rem'}}>
                  <div className="follow d-flex justify-content-center align-items-center">
                    <div className="info-section text-center" style={{cursor: 'pointer'}}>
                      <h3 className="mb-0">Theo dõi</h3>
                      <p className="mb-0">0</p>
                    </div>
                    <div className="devider" />
                    <div className="info-section text-center" style={{cursor: 'pointer'}}>
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
                {users.map((key) => (
                  <div className>
                    
                    <div className="d-flex form-group mb-4"><label className="mb-0">Họ tên</label>
                      <div onClick={updateUserFname}  onChange= {(e)=> setUserfname (e.target.value)}  className="input-and-error"><input name="userName" className="profile-form-control form-control" type="text" placeholder="Họ và tên" defaultValue={key.userfname} /></div>
                    </div>
                    <div className="d-flex form-group mb-4"><label className="mb-0">Số điện thoại</label>
                   
                      <div className="input-and-error d-flex">
                      
                        <div className=" flex-1"><input name="phoneNumber" className="profile-form-control form-control" type="text" placeholder="Nhập số điện thoại" defaultValue={key.phone}/></div>
                      </div>


                      
                    </div>
                    <div className="d-flex form-group mb-4"><label className="mb-0">Số CMND/CCCD</label>
                      <div className="input-and-error"><input name="identity_number" className="profile-form-control form-control" type="text" placeholder="Nhập số CMND/ CCCD" defaultValue={+131241121} /></div>
                    </div>
                    <div className="d-flex form-group mb-4"><label className="mb-0">Email</label>
                      <div className="input-and-error"><input name="email" className="profile-form-control form-control" type="text" placeholder="Nhập Email" defaultValue={key.email} /></div>
                    </div>
                    <div className="d-flex form-group mb-4"><label className="mb-0">Giới tính</label>
                      <div className="input-and-error"><input name="gender" type="radio" id="nu" defaultValue={2} defaultChecked /><label className="option" htmlFor="nu">Nữ</label><input name="gender" type="radio" id="nam" defaultValue={1} /><label className="option" htmlFor="nam">Nam</label><input name="gender" type="radio" id="khac" defaultValue={3} /><label className="option" htmlFor="khac">Khác</label></div>
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
                          <div className="d-flex form-group mb-3"><label className="mb-0">Mật khẩu cũ</label>
                            <div className="flex-1 input-and-error"><input name="currentPassword" type="password" placeholder="Mật khẩu cũ" className="form-control" defaultValue />
                              <div className="ml-2 mt-2 error-auth-input " style={{color: 'rgb(234, 84, 85)'}}></div>
                            </div>
                          </div>
                          <div className="d-flex flex-row justify-content-between mb-3"><label className="mb-0">Mật khẩu mới</label>
                            <div className="flex-1"><input name="newPassword" type="password" placeholder="Mật khẩu mới" className="form-control" defaultValue />
                              <div className="ml-2 mt-2 error-auth-input " style={{color: 'rgb(234, 84, 85)'}}>Bắt buộc</div>
                            </div>
                          </div>
                          <div className="d-flex flex-row justify-content-between mb-3"><label className="mb-0">Nhập lại mật khẩu</label>
                            <div className="flex-1"><input name="passwordRetype" type="password" placeholder="Nhập lại mật khẩu" className="form-control" defaultValue />
                              <div className="ml-2 mt-2 error-auth-input " style={{color: 'rgb(234, 84, 85)'}}>Bắt buộc</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div  className="d-flex form-group mb-4-5"><button className="btn-bidu mx-auto">Cập nhật</button></div>
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