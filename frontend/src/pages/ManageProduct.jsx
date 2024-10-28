import React, { useEffect, useState } from 'react';
import "./managersuplier.css";

import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import { base_Url } from './api';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import ProductForm from '../component/ProductForm';

const ManageProduct = () => {
    const [formToggle, setFormToggle] = useState(false);
    const [data, setData] = useState(null);
    const [current, setCurrent] = useState(1)
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [editData, setEditData] = useState("");
    const allProduct = async () => {
        try {
            const response = await axios.post(`${base_Url}/product/all_product`);
            console.log(response.data.result)
            setData(response.data.result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allProduct();
    }, []);
    const editHandler = (item) => {
        setEditData(item);
        console.log(item)
        setFormToggle(true);
    }
console.log(data)
    const deleteHandler = async (id) => {
        await axios.delete(`${base_Url}/product/delete_product/${id}`).then((res) => {
            console.log(res.data);
            alert("deleted")
            allProduct();

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
            {formToggle ? <ProductForm  editData={editData} setEditData={setEditData} allProduct={allProduct} setFormToggle={setFormToggle} /> : <></>}
            <div className='managersuplier'>
                <div className='managersuplier-heading'>
                    <h5>All Product</h5>
                    <input placeholder='search' value={searchKeyWord} onChange={(e) => setSearchKeyWord(e.target.value)} onKeyDown={searchHandler} />
                    <button onClick={() => (setFormToggle(true))}>Add Product</button>
                </div>
                <div className='managersuplier-table'>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '19px' }}>S.No.</th>
                                <th style={{ width: '280px' }}>Product Name</th>
                                <th style={{ width: '280px' }}>Supplier Email</th>
                                <th style={{ width: '150px' }}>Unit </th>
                                <th style={{ width: '80px' }}>category</th>
                                <th style={{ width: '80px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.slice(current*10-10, current*10).map((val, i) => (
                                    <tr key={val.id}>
                                        <td>{(current-1)*10 +i + 1}</td>
                                        <td>{val.product_Name}</td>
                                        <td>{val.suplire_Email}</td>
                                        <td>{val.unit_Name}</td>
                                        <td>{val.category_name }</td>
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

export default ManageProduct
