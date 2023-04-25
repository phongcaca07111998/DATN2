import {useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Components/firebase/firebase'
import { fetchUser } from '../Components/redux/slices/authSlice';
const userInfo=fetchUser()
const useAuth = () => {

    const  [currentUser,setCurrenUser]=useState()
    
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setCurrenUser(user)
            }
            else{
                setCurrenUser(userInfo)
            }
        })
    })

  return {
    currentUser,
  };
};

export default useAuth