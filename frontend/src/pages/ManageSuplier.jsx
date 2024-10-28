import React, { useEffect, useState } from 'react';
import "./managersuplier.css";
import SuplierForm from '../component/SuplierForm';
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import { base_Url } from './api';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const ManageSuplier = () => {
    const [formToggle, setFormToggle] = useState(false);
    const [data, setData] = useState(null);
    const [current, setCurrent] = useState(1)
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [editData, setEditData] = useState("");
    const allSupplier = async () => {
        try {
            const response = await axios.get(`${base_Url}/supplier/find_supplire`);
            setData(response.data.product);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allSupplier();
    }, []);
    const editHandler = (item) => {
        setEditData(item);
        console.log(item)
        setFormToggle(true);
    }

    const deleteHandler = async (id) => {
        await axios.delete(`${base_Url}/supplier/delete_supplire/${id}`).then((res) => {
            console.log(res.data);
            alert("deleted")
            allSupplier();

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
            {formToggle ? <SuplierForm data1={data} editData={editData} setEditData={setEditData} allSupplier={allSupplier} setFormToggle={setFormToggle} /> : <></>}
            <div className='managersuplier'>
                <div className='managersuplier-heading'>
                    <h5>All Supliers</h5>
                    <input placeholder='search' value={searchKeyWord} onChange={(e) => setSearchKeyWord(e.target.value)} onKeyDown={searchHandler} />
                    <button onClick={() => setFormToggle(true)}>Add Suplier</button>
                </div>
                <div className='managersuplier-table'>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '19px' }}>S.No.</th>
                                <th style={{ width: '117px' }}>User Name</th>
                                <th style={{ width: '80px' }}>Mobile No.</th>
                                <th style={{ width: '150px' }}>Email </th>
                                <th style={{ width: '240px' }}>Address</th>
                                <th style={{ width: '80px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.slice(current*10-10, current*10).map((val, i) => (
                                    <tr key={val.id}>
                                        <td>{(current-1)*10 +i + 1}</td>
                                        <td>{val.suplierName}</td>
                                        <td>{val.suplierContact}</td>
                                        <td>{val.suplierEmail}</td>
                                        <td>{val.suplierAddress}</td>
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
    );
}

export default ManageSuplier;
