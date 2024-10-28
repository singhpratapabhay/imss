import React, {useState} from 'react'
import "./getInvoices.css";
import { base_Url } from '../pages/api';
import axios from "axios";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
const GetInvoice = () => {
    const [data, setData] = useState({
        startDate: "",
        endDate: ""
    });
    const [receivedData, setReceivedData] = useState(null);
    const [copyData, setCopyData] = useState(receivedData)
    const [current, setCurrent] = useState(1)
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const allPurchase = async () => {
        try {
            const response = await axios.post(`${base_Url}/invoice/find_product_list`, data);
            console.log(response.data.data)
            setReceivedData(response.data.data)
            setCopyData(response.data.data)
            // setData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        allPurchase();
        setData({
            startDate: "",
            endDate: ""
        })
    }
    const paginationPrevHandler =(page)=>{
        
        if(page<1) return;
      setCurrent(page);
    }
    const paginationNextHandler = (page)=>{
        if(page*10-9>data.length) return;
        setCurrent(page);
    }
    const searchHandler = (e) => {
        console.log(e.target.value.length)
        if (e.target.value.length>0) {
            const filterData = receivedData.filter((val) => {
                return val.purchase_no.includes(e.target.value);
            });
            setCopyData(filterData);
        }else if(e.target.value.length===0){
            setCopyData(receivedData)
        }
        setSearchKeyWord(e.target.value)
    }
  return (
    <div className='getInvoice'>
        <form onSubmit={submitHandler}>
            <input type='date' value={data.startDate} onChange={(e)=>setData((prev)=>({...prev, startDate:e.target.value}))}/>
            <input type='date' value={data.endDate} onChange={(e)=>setData((prev)=>({...prev, endDate:e.target.value}))}/>
            <button type='submit'>Search</button>
        </form>
        <div className='getInvoice'>
    <div className='getInvoice-heading'>
        <h5>All Product</h5>
        <input placeholder='Purchase No' value={searchKeyWord} onChange={(e) => searchHandler(e)}  />
        
    </div>
    <div className='getInvoice-table'>
        <table>
            <thead>
                <tr>
                    <th style={{ width: '20px' }}>S No.</th>
                    <th style={{ width: '20px' }}>Purchase No.</th>
                    <th style={{ width: '130px' }}>Product Name</th>
                    <th style={{ width: '100px' }}>Date</th>
                
                    <th style={{ width: '80px' }}>category</th>
                    <th style={{ width: '50px' }}>QTY</th>
                    <th style={{ width: '50px' }}>Per Unit Cost</th>
                    <th style={{ width: '50px' }}>Total Cost</th>
                    <th style={{ width: '100px' }}>Status</th>
                  
                </tr>
            </thead>
            <tbody>
                {
                    copyData && copyData.slice(current * 10 - 10, current * 10).map((val, i) => (
                        <tr key={val.id}>
                            <td>{(current - 1) * 10 + i + 1}</td>
                            <td>{val.purchase_no}</td>
                            <td>{val.product_Name}</td>
                            <td>{val.date}</td>
                     
                            <td>{val.category_name}</td>
                            <td>{val.noOfUnit}</td>
                            <td>{val.perUnitPrice}</td>
                            <td>{val.totalPrice}</td>
                            <td>{val.status}</td>
                           
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
    {data?.length > 10 && <div className='getInvoice-pagination'>
        <ul>
            <li onClick={() => paginationPrevHandler(current - 1)}><MdKeyboardDoubleArrowLeft />Prev</li>
            <li>{current}</li>
            <li onClick={() => paginationNextHandler(current + 1)}>Next <MdKeyboardDoubleArrowRight /></li>
        </ul>
    </div>}
</div>

    </div>
  )
}

export default GetInvoice
