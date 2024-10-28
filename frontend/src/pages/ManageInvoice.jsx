import React, { useEffect, useState } from 'react';
import "./managersuplier.css";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import { base_Url } from './api';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import InvoiceForm from '../component/InvoiceForm';
import Invoice from '../component/Invoice';
const ManageInvoice = () => {
    const [formToggle, setFormToggle] = useState(false);
    const [viewToggle, setViewToggle] = useState(false);

    const [data, setData] = useState(null);
    const [current, setCurrent] = useState(1)
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [editData, setEditData] = useState("");
    const allPurchase = async () => {
        try {
            const response = await axios.get(`${base_Url}/invoice/allInvoices`);
            console.log(response)
            console.log(response.data.result)
            setData(response.data.result[0].arr);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allPurchase();
    }, []);
    
console.log(data)
    const deleteHandler = async (id) => {
        await axios.delete(`${base_Url}/invoice/remove_invoice_details/${id}`).then((res) => {
            console.log(res.data);
            alert("deleted")
            allPurchase();

        }).catch((err) => console.log(err))
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
        <>  
        {viewToggle ? <Invoice  editData={editData} setViewToggle={setViewToggle} /> : <></>}
            {formToggle ? <InvoiceForm  allPurchase={allPurchase} setFormToggle={setFormToggle} /> : <></>}
            <div className='managersuplier'>
                <div className='managersuplier-heading'>
                    <h5>All Invoice</h5>
                    <input placeholder='search' value={searchKeyWord} onChange={(e) => setSearchKeyWord(e.target.value)} onKeyDown={searchHandler} />
                    <button onClick={() => setFormToggle(true)}>Add Invoice</button>
                </div>
                <div className='managersuplier-table'>
                    <table>
                        <thead>
                            <tr>
                            <th>S No.</th>
                                <th>ID</th>
                                <th>Date</th>
                                <th >Product Name </th>
                                <th >category</th>
                                <th >QTY</th>
                                <th >total Price</th>
                                <th>Paid status</th>
                                <th>Due</th>
                                <th>Paid</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.slice(current*10-10, current*10).map((val, i) => (
                                    <tr key={val.id}>
                                        <td>{(current-1)*10 +i + 1}</td>
                                        <td>{val.purchase_no}</td>
                                        <td>{val.date}</td>
                                        <td>{val.product_Name }</td>
                                        <td>{val.category_name }</td>
                                        <td>{val.noOfUnit}</td>
                                        <td>{val.totalPrice }</td>
                                        <td>{val.paidStatus}</td>
                                        <td>{val.dueAmount}</td>
                                        <td>{val.paidAmount}</td>

                                        
                                        <td><b>{(val.status).toUpperCase()}</b></td>
                                       
                                       {val.status==="pending" || val.status==="rejected"? <td><RiDeleteBinLine onClick={() => deleteHandler(val._id)} /></td>:<td><MdOutlineRemoveRedEye onClick={()=> (setEditData(val ),setViewToggle(true))}/></td>}
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
        </>
    );
}

export default ManageInvoice
