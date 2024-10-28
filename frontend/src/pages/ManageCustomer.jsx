import React, { useEffect, useState } from 'react';
import "./manage-customer.css"; // Updated CSS file name

import CustomerForm from '../component/CustomerForm';
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';
import { base_Url } from './api';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const ManageCustomer = () => {
    const [formToggle, setFormToggle] = useState(false);
    const [data, setData] = useState(null);
    const [current, setCurrent] = useState(1);
    const [searchKeyWord, setSearchKeyWord] = useState("");
    const [editData, setEditData] = useState("");

    const allClient = async () => {
        try {
            const response = await axios.get(`${base_Url}/client/allCustomer`);
            console.log(response.data.result)
            setData(response.data.result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        allClient();
        console.log("hello")
    }, []);

    const editHandler = (item) => {
        setEditData(item);
        console.log(item)
        setFormToggle(true);
    }

    const deleteHandler = async (id) => {
        await axios.delete(`${base_Url}/client/delete_Customer/${id}`).then((res) => {
            console.log(res.data);
            alert("deleted")
            allClient();
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

    const paginationPrevHandler = (page) => {
        if (page < 1) return;
        setCurrent(page);
    }

    const paginationNextHandler = (page) => {
        if (page * 10 - 9 > data.length) return;
        setCurrent(page);
    }

    return (
        <>
            {formToggle ? <CustomerForm editData={editData} setEditData={setEditData} allClient={allClient} setFormToggle={setFormToggle} /> : <></>}
            <div className='manage-customer'>
                <div className='manage-customer-heading'>
                    <h5>All Customer</h5>
                    <input placeholder='search' value={searchKeyWord} onChange={(e) => setSearchKeyWord(e.target.value)} onKeyDown={searchHandler} />
                    <button onClick={() => setFormToggle(true)}>Add Customer</button>
                </div>
                <div className='manage-customer-table'>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '19px' }}>S.No.</th>
                                <th style={{ width: '117px' }}>Customer Name</th>
                                <th style={{ width: '20px' }}>Profile</th>
                                <th style={{ width: '80px' }}>Mobile No.</th>
                                <th style={{ width: '150px' }}>Email </th>
                                <th style={{ width: '240px' }}>Address</th>
                                <th style={{ width: '80px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.slice(current * 10 - 10, current * 10).map((val, i) => (
                                    <tr key={val.id}>
                                        <td>{(current - 1) * 10 + i + 1}</td>
                                        <td>{val.customer_name}</td>
                                        <td className='profile-image-container'><div className='profile-image'><img src={`${val.customer_image.url}`} alt='profile' /></div></td>
                                        <td>{val.customer_contact_no}</td>
                                        <td>{val.customer_email}</td>
                                        <td>{val.customer_address}</td>
                                        <td><BiEdit onClick={() => editHandler(val)} /><RiDeleteBinLine onClick={() => deleteHandler(val._id)} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                {data?.length > 10 && <div className='manage-customer-pagination'>
                    <ul>
                        <li onClick={() => paginationPrevHandler(current - 1)}><MdKeyboardDoubleArrowLeft />Prev</li>
                        <li>{current}</li>
                        <li onClick={() => paginationNextHandler(current + 1)}>Next <MdKeyboardDoubleArrowRight /></li>
                    </ul>
                </div>}
            </div>
        </>
    );
}

export default ManageCustomer;
