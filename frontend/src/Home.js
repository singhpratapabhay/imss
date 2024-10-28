import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {user} from "./data";
import './App.css';
const Home = () => {

    let [users,setUsers] = useState(user);
    let navigate = useNavigate();

    
    const editHandler = (i, name,phone, email, password)=>{
        localStorage.setItem("index", i);
        localStorage.setItem("name", name);
        localStorage.setItem("phone", phone);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        navigate("/edit")
        
      }
    const deleteHandler = (i)=>{
        let userCopy = users;
        userCopy.splice(i,1);
        setUsers(userCopy);
        console.log(userCopy);
        navigate("/")
    }
  return (
    <div className='container mt-5'>
    <Link to={"/User"}>
    <button className='add' type='button' >Add</button>
    </Link>
    <table className='table'>
    <thead >
      <tr>
        <th>No.</th>
       <th>Name</th>
       <th>Mobile</th>
       <th>Email</th>
       <th>Password</th>
       <th>Actions</th>
      </tr>
    </thead>
    <tbody>

        {users && users.length >0 ?users.map((value,i)=>(
           <tr key={i}>
            <td>{i+1}</td>
            <td>{value.name}</td>
            <td>{value.phoneNo}</td>
            <td>{value.email}</td>
            <td>{value.password}</td>
            <td><button type='button' className='edit' onClick={() => editHandler(i, value.name, value.phoneNo, value.email, value.password)}>Edit</button> &nbsp;
              <button type="button" className='delete' onClick={() => deleteHandler(i)}>Delete</button>
            </td>
           </tr>
        )): "no user data"}
     
    </tbody>
    </table>
  </div>
  )
}

export default Home