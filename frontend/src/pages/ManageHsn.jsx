
import React, { useEffect, useState } from 'react';
import "./managersuplier.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import { base_Url } from './api';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import Hsn from './Hsn';
const ManageHsn = () => {
    const [formToggle, setFormToggle] = useState(false);
    const [data, setData] = useState(null);
    const [current, setCurrent] = useState(1)
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [editData, setEditData] = useState("");
    const allHsn = async () => {
        try {
            const response = await axios.get(`${base_Url}/hsn/findall_hsn`);
            setData(response.data.data);
        
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allHsn();
    }, []);
    const editHandler = (item) => {
        setEditData(item);
        console.log(item)
        setFormToggle(true);
    }

    const deleteHandler = async (id) => {
        await axios.delete(`${base_Url}/hsn/${id}`).then((res) => {
            console.log(res.data);
            alert("deleted")
            allHsn();

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
            {formToggle ? <Hsn  editData={editData} setEditData={setEditData} allHsn={allHsn} setFormToggle={setFormToggle} /> : <></>}
            <div className='managersuplier'>
                <div className='managersuplier-heading'>
                    <h5>All hsn</h5>
                    <input placeholder='search' value={searchKeyWord} onChange={(e) => setSearchKeyWord(e.target.value)} onKeyDown={searchHandler} />
                    <button onClick={() => setFormToggle(true)}>Add hsn</button>
                </div>
                <div className='managersuplier-table'>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '19px' }}>S.No.</th>
                                <th style={{ width: '117px' }}>HSN N0.</th>
                              
                                <th style={{ width: '80px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.slice(current*10-10, current*10).map((val, i) => (
                                    <tr key={val.id}>
                                        <td>{(current-1)*10 +i + 1}</td>
                                        <td>{val.hsn}</td>
                                        
                                        <td><BiEdit onClick={() => editHandler(val)} /><RiDeleteBinLine onClick={() => deleteHandler(val._id)} /></td>
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
  )
}

export default ManageHsn
