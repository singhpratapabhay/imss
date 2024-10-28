import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {user} from "./data"

const Edit = () => {

    let navigate = useNavigate();
    let [name,setName] = useState("");
    let [phoneNo, setPhoneNo] = useState("");
    let [email,setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [index,setIndex] =  useState("");
    const addHandler = (e)=>{
       e.preventDefault();
    console.log(+index)

       user[index]={name,phoneNo, email, password};
        navigate("/");
        
        
    }
    useEffect(()=>{
        setName(localStorage.getItem("name"));
        setPhoneNo(localStorage.getItem("phone"));
        setEmail(localStorage.getItem("email"));
        setPassword(localStorage.getItem("password"));
        setIndex(localStorage.getItem("index"));
    },[])
  return (
    <form className='container mt-5' onSubmit={addHandler}>
        <h2>Add User</h2>
        <input id='name' name='name' value={name} placeholder='name' type='text' onChange={e=>{setName(e.target.value)}}/>
        <input type="tel" name="phone" value={phoneNo} id="phone" onChange={e=>{setPhoneNo(e.target.value)}} placeholder='Mobile No.'  />
        <input id='email' name='email' value={email} placeholder='email' onChange={e=>{setEmail(e.target.value)}} type='email'/>
        <input id='password' name='password' value={password} placeholder='password' onChange={e=>{setPassword(e.target.value)}} type='password'/>
        <button className='add' type='submit' >Update</button>
    </form>
  )
  
}

export default Edit