import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Header from '../Header';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';
import ResponsiveSidebar from '../ResponsiveSidebar';

const ProfileLayout = () => {
let history = useHistory();
  useEffect(()=>{
    if(!localStorage.getItem("user-token")) {
        history.push('/login')
    }
},[])


  return (
    <div className="Profle_layout">
      <Header/>
      <div className="profile_wrapper">
         
        <div className="container">
        <ProfileSidebar/>
        <ProfileContent/>
        </div>
       
        </div>
        
      </div>
  )
}

export default ProfileLayout
