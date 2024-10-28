import React, { useState, useEffect } from 'react';
import { base_Url } from '../pages/api';
import axios from 'axios';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import "./manageUnit.css"
const ManageUnits = () => {
    const [data, setData] = useState(null);
    const [current, setCurrent] = useState(1);
    const [searchKeyWord, setSearchKeyWord] = useState('');

    // Number of items per page
    const itemsPerPage = 10;

    const allUnits = async () => {
        try {
            const response = await axios.get(`${base_Url}/noOfUnit/noOfUnit`);
            console.log(response.data.data)
            setData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        allUnits();
    }, []);

    const searchHandler = (e) => {
        if (e.key === 'Enter' && data) {
            const filterData = Object.entries(data).filter(([key, value]) => {
                return value.name.toLowerCase().includes(searchKeyWord.toLowerCase());
            });
            setData(Object.fromEntries(filterData));
        }
    };

    const paginationPrevHandler = () => {
        if (current > 1) {
            setCurrent(current - 1);
        }
    };

    const paginationNextHandler = () => {
        if (data) {
            const totalPages = Math.ceil(Object.keys(data).length / itemsPerPage);
            if (current < totalPages) {
                setCurrent(current + 1);
            }
        }
    };

    return (
        <>
            <div className='new-manager-supplier'>
                <div className='new-manager-supplier-heading'>
                    <h5>All Units</h5>
                    <input
                        placeholder='search'
                        value={searchKeyWord}
                        onChange={(e) => setSearchKeyWord(e.target.value)}
                        onKeyDown={searchHandler}
                    />
                </div>
                <div className='new-manager-supplier-table'>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '117px' }}>Product Name</th>
                                <th style={{ width: '80px' }}>No Of Units</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                Object.entries(data)
                                    .slice((current - 1) * itemsPerPage, current * itemsPerPage)
                                    .map(([key, entry]) => (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{entry}</td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
                {data && Object.keys(data).length > itemsPerPage && (
                    <div className='new-manager-supplier-pagination'>
                        <ul>
                            <li onClick={paginationPrevHandler}>
                                <MdKeyboardDoubleArrowLeft />Prev
                            </li>
                            <li>{current}</li>
                            <li onClick={paginationNextHandler}>
                                Next <MdKeyboardDoubleArrowRight />
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default ManageUnits;
