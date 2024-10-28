import React, { useEffect, useState } from 'react';
import "./header.css";
import logo from "../images/logo.png";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import profile from "../images/employee.jpg";
import { MdOutlineWatchLater } from "react-icons/md";
import Profile from './Profile';
import { base_Url } from '../pages/api';
import axios from 'axios';

const Header = () => {
  const [profileToggle, setProfileToggle] = useState(false);
  const [attendanceSheet, setAttendanceSheet] = useState([]);


  const getAttendanceData= async ()=>{
    const response = await axios.get(`${base_Url}/userTime/find_time`);
    let currentDate = new Date();
    console.log(response)
    let currentDateObj = currentDate.getDate();
   let LoginSheet =  response.data.data;
   if(LoginSheet.length>0){
if(LoginSheet[0].userDate[response.data.data[0].userDate.length-1].year.month[response.data.data[0].userDate[response.data.data[0].userDate.length-1].year.month.length-1].date[response.data.data[0].userDate[response.data.data[0].userDate.length-1].year.month[response.data.data[0].userDate[response.data.data[0].userDate.length-1].year.month.length-1].date.length-1].current===currentDateObj){

  let data = LoginSheet[0].userDate[response.data.data[0].userDate.length-1].year.month[response.data.data[0].userDate[response.data.data[0].userDate.length-1].year.month.length-1].date[response.data.data[0].userDate[response.data.data[0].userDate.length-1].year.month[response.data.data[0].userDate[response.data.data[0].userDate.length-1].year.month.length-1].date.length-1];
  setAttendanceSheet([data])
  console.log([data])
}
  }
}
const loginCall = async ()=>{
  let currentDate = new Date();

     
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth()+1;
  let currentDateObj = currentDate.getDate();
  currentDate.setSeconds(0);
  const currentTimeWithoutSeconds = new Date(currentDate);
  const formattedTime = currentTimeWithoutSeconds.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  console.log(formattedTime)


  const referenceTime = new Date();
referenceTime.setHours(19, 0, 0); 

const isAfter700PM = currentTimeWithoutSeconds > referenceTime;
console.log(isAfter700PM);

if(isAfter700PM){
  alert("timeout");
  return;
};
  // if(`${attendanceSheet[attendanceSheet.length-1]}`===`${formattedTime}`) {
  //   alert("wait for 1 minute");
  //   return;
  // }

  alert("login done")








  let userDate =[
    {
      year: {
        current: currentYear,
        month: [
          {
            current: currentMonth,
            date: [
              {
                current: currentDateObj,
                status: "absent",
                totalBreakTime: 0,
                break: [],
                login: [formattedTime],
                logout: []
              },
            ],
          },
        ],
      },
    },
  ];
  console.log(userDate)
      const response = await axios.post(`${base_Url}/userTime/user_active_time`, {userDate});
      console.log(response)
      setAttendanceSheet([response.data.userTime]);
}
const logoutCall = async ()=>{
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth()+1;
  let currentDateObj = currentDate.getDate();
  currentDate.setSeconds(0);
  const currentTimeWithoutSeconds = new Date(currentDate);
  const formattedTime = currentTimeWithoutSeconds.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const referenceTime = new Date();
  referenceTime.setHours(19, 0, 0); 
 
  const isAfter700PM = currentTimeWithoutSeconds > referenceTime;
  console.log(isAfter700PM);
  
  if(isAfter700PM){
    alert("timeout");
    return;
  };
  // if(`${attendanceSheet[attendanceSheet.length-1]}`===`${formattedTime}`) {
  //   alert("wait for 1 minute");
  //   return;
  // }






  

  alert("logout done")
  let userDate =[
    {
      year: {
        current: currentYear,
        month: [
          {
            current: currentMonth,
            date: [
              {
                current: currentDateObj,
                status: "absent",
                totalBreakTime: 0,
                break: [],
                login: [],
                logout: [formattedTime]
              },
            ],
          },
        ],
      },
    },
  ];
;

      const response = await axios.post(`${base_Url}/userTime/user_active_time`, {userDate});
   
      setAttendanceSheet([response.data.userTime]);
}

  useEffect(()=>{
    getAttendanceData()
  },[]);
  

  const loginTimeHandler = async () => {
    
    if(attendanceSheet.length===0){
     
      loginCall();
    }else if (attendanceSheet.length>0){
      if(attendanceSheet[0].login.length>attendanceSheet[0].logout.length){
        alert("already login");
        return;
      }else{
        loginCall();
      }
    }
     
    }

  
    
   const logoutTimeHandler = async ()=>{
    if(attendanceSheet.length===0){
      alert("login first");
      return;
    }else if (attendanceSheet.length>0){
      if(attendanceSheet[0].login.length===attendanceSheet[0].logout.length){
        alert("already logout");
        return;
      }
    }
     
    logoutCall();
    
    // }

       
   }

  return (
    <>
      <Profile profileToggle={profileToggle} />
      <div className='header' >

        <div className='logo'>
          <img src={logo} alt='company' />
        </div>
        <div className='prof-sett'>
        {(attendanceSheet.length>0 && attendanceSheet[0].totalBreakTime !== 0) && <div className='setting-time'>
            <p>break: {`${attendanceSheet[0].totalBreakTime}`}</p>
          </div>}
          {attendanceSheet.length>0 && <div className='setting-time'>
            <p>In: {`${attendanceSheet[0].login[0]}`}</p>
          </div>}
          {(attendanceSheet.length>0 && attendanceSheet[0].logout.length>0) && <div className='setting-time'>
            <p>Out: {`${attendanceSheet[0].logout[attendanceSheet[0].logout.length-1]}`}</p>
          </div>}

          <div className='loginBtn' onClick={() => loginTimeHandler()}>
            Login
          </div>

          <div className='logoutBtn' onClick={()=> logoutTimeHandler()}>
            Logout
          </div>
          <div className='setting-icon'>
            <IoIosNotificationsOutline />
            <p>2</p>
          </div>
          <div className='setting-icon' onClick={() => setProfileToggle(!profileToggle)}>
            <img src={profile} alt='user' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
