import React, { useEffect, useState } from 'react';


import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import axios from 'axios';
import { base_Url } from '../pages/api';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import "./approvePurchase.css"

const Approvepurchase = () => {
  
    const [data, setData] = useState(null);
    const [current, setCurrent] = useState(1)
    const [searchKeyWord, setSearchKeyWord] = useState("");

    const allPurchase = async () => {
        try {
            const response = await axios.get(`${base_Url}/product_details/allpurchase`);
            console.log(response)
            console.log(response.data.result)
            setData(response.data.result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allPurchase();
    }, []);
    
console.log(data)
    const rejectHandler = async (item) => {
        item.status = "rejected";
        console.log(item)
        try{
            await axios.patch(`${base_Url}/product_details/updateProductstatus/${item._id}`, item);
            alert("Request is Rejected")
            allPurchase();
        }catch(error){
            alert(error)
        }
        

        }
    
    const approveHandler = async (item) => {
        item.status = "approved";
        console.log(item)
        try{
            await axios.patch(`${base_Url}/product_details/updateProductstatus/${item._id}`, item);
            alert("Request is Approved")
            allPurchase();
        }catch(error){
            alert(error)
        }
      
    }
    const searchHandler = (e) => {
        if (e.key === "Enter") {
            const filterData = data.filter((val) => {
                return val.name.toLowerCase().includes(searchKeyWord.toLowerCase());
            });
            setData(filterData);
        }
    }
    const paginationPrevHandler =(page)=>{
        
        if(page<1) return;
      setCurrent(page);
    }
    const paginationNextHandler = (page)=>{
        if(page*10-9>data.length) return;
        setCurrent(page);
    }
  return (
    <div className='managersuplier'>
                <div className='managersuplier-heading'>
                    <h5>All Product</h5>
                    <input placeholder='search' value={searchKeyWord} onChange={(e) => setSearchKeyWord(e.target.value)} onKeyDown={searchHandler} />
                   
                </div>
                <div className='managersuplier-table'>
                    <table>
                        <thead>
                            <tr>
                            <th style={{ width: '20px' }}>S No.</th>
                                <th style={{ width: '20px' }}>Purchase No.</th>
                                <th style={{ width: '100px' }}>Date</th>
                                <th style={{ width: '150px' }}>Supplier Name </th>
                                <th style={{ width: '80px' }}>category</th>
                                <th style={{ width: '50px' }}>QTY</th>
                                <th style={{ width: '130px' }}>Product Name</th>
                                <th style={{ width: '100px' }}>Status</th>
                                <th style={{ width: '80px' }}>Action</th>



                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.filter((val)=>{
                                    return(val.status==="pending")
                                }).slice(current*10-10, current*10).map((val, i) => (
                                    <tr key={val.id}>
                                        <td>{(current-1)*10 +i + 1}</td>
                                        <td>{val.purchase_no}</td>
                                        <td>{val.date}</td>
                                        <td>{val.suplire_Name}</td>
                                        <td>{val.category_name }</td>
                                        <td>{val.noOfUnit }</td>
                                        <td>{val.product_Name }</td>
                                        <td>{val.status }</td>
                                       
                                       <td><TiTick className='approved' onClick={() => approveHandler(val)} /> <RxCross2 className='rejected' onClick={() => rejectHandler(val)} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
               {data?.length>10 &&  <div className='managersuplier-pagination'>
                    <ul>
                        <li onClick={()=>paginationPrevHandler(current-1)}><MdKeyboardDoubleArrowLeft/>Prev</li>
                        <li>{current}</li>
                        <li onClick={()=>paginationNextHandler(current+1)}>Next <MdKeyboardDoubleArrowRight/></li>
                        
                    </ul>
                </div>}
            </div>
  )
}

export default Approvepurchase
