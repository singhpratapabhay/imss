import React, {useEffect, useState} from 'react';
import "../component/suplierForm.css";
import { IoCloseOutline } from "react-icons/io5";

import { base_Url } from '../pages/api';
import axios from 'axios';



const Hsn = ({ setFormToggle,allHsn, editData, setEditData}) => {
    const [data, setData] = useState({
     
        hsn: "",
        
    })
 useEffect(()=>{
    setData(editData)
 },[editData])
 
    const addhsn = async () => {

        if(editData){
            try {
         
              
                const response = await axios.patch(`${base_Url}/hsn/update_hsn/${editData._id}`, data);
                console.log(response);
                setFormToggle(false);
                setData({
                    hsn: "",
              
                });
                alert("successfully edited hsn")
                allHsn();
              
              } catch (error) {
                console.error('Error adding hsn:', error.response.data.message);
                alert(error.response.data.message)
      
              } 
        }else{
            try {
            
           
                const response = await axios.post(`${base_Url}/hsn/create_hsn`, data);
                console.log(response);
                
                setFormToggle(false);
               
                setData({
                    hsn: "",
                  
                });
               
                allHsn();
                alert("successfully added hsn")
              
              } catch (error) {
                console.error('Error adding hsn:', error.response.data.message);
                alert(error.response.data.message)
      
              }
        }
        
      };

   
    const submitHandler = () => {
    
        
      
        if (
          data.hsn 
        ) {
            addhsn();
          
         
        } else {
            console.log(data.hsn)
          if (!data.hsn) {
            alert('Please enter the hsn name.');
          } 
        } 
        setData({
          hsn: "",
      });
      setEditData("");
      setFormToggle(false)
    }
   
       
   
  
  return (
    <div className='suplierform-container'>
        <div className='suplierform'>
            <div className='suplierform-heading'>
                <h4>Add  hsn</h4>
                <div className='suplierform-closing'>
                    <IoCloseOutline onClick={()=>{setEditData("") ;setFormToggle(false) }}/>
                </div>
            </div>
            <div className='suplierform-form'>
                <input type='text' placeholder='hsn Name' value={data.hsn} onChange={(e)=>{setData((prev)=>({...prev, hsn: e.target.value}))}}/>
               
                <button onClick={submitHandler}>Add hsn</button>
            </div>
        </div>
      
    </div>
 
  )
}

export default Hsn
