

import React, { useEffect, useState } from 'react';
import { BiSolidDashboard } from "react-icons/bi";
import { ImUserTie } from "react-icons/im";
import { BiTask } from "react-icons/bi";
import { MdGroupAdd } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { BiSupport } from 'react-icons/bi';

import { FaUsers } from "react-icons/fa";



import './sidebar.css'
import {  useLocation, useNavigate} from 'react-router-dom';

export const Sidebar = () => {
    const location = useLocation();
    
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false);
    const [hsnToggle, setHsnToggle] = useState(false)
    const [categoryToggle, setCategoryToggle] =useState(false);
    const [productToggle, setProductToggle] = useState(false);
    const [inVoiceToggle, setInVoiceToggle] = useState(false);
    const [purchaseToggle, setPurchaseToggle] = useState(false);
    const [customerToggle, setCustomerToggle] = useState(false);
    const [unitToggle, setUnitToggle] = useState(false);
    const [taxToggle, setTaxToggle] = useState(false)
    const [active, setActive] = useState(location.pathname.slice(1));

    useEffect(()=>{
        switch (active) {
            case "allProduct":
                setProductToggle(true);
            
                break;  
            case "allSuppliers":
                setToggle(true);
                break;
            case "allCategory":
                setCategoryToggle(true);
                break;
        case "allPurchase":
            setPurchaseToggle(true);
            break;
        case "allCustomer":
            setCustomerToggle(true);
            break;
        case "allInvoice":
            setInVoiceToggle(true);
            break;
        case "approveInvoice":
            setInVoiceToggle(true);
            break;
        case "allHsn":
                setHsnToggle(true);
                break;
        case "allUnit":
        setUnitToggle(true);
        break;
        default:
                break;  
        }
    },[])
  


    return (
        <>
            <div className='sai'>
                
                <div className={'sidebar'}>
                    <ul className='side-links'>
                        <li className={active === "home" ? "side-Navlinks active"  : "side-Navlinks"} onClick={() => {setActive("home"); navigate('/home')}}>
                            <BiSolidDashboard className='sideIcons' /> <p>Dashboard</p>
                        </li>

                        <li className='drop-down-menu'>
                            <div className='side-Navlinks' onClick={() => setProductToggle(!productToggle)}>
                                <MdGroupAdd className='sideIcons' />
                                <p>Manage Product</p>
                                <IoIosArrowDown className={productToggle ? "drop-down-icon down" : "drop-down-icon"} />
                            </div>
                            {productToggle && (
                                <div className='sub-nav'>
                                    <ul className='sub-sidebar__nav-links'>
                                        <li className={active === "allProduct" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("allProduct"); navigate('/allProduct')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>All Product</p>
                                        </li>
                                       

                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className='drop-down-menu'>
                            <div className='side-Navlinks' onClick={() => setPurchaseToggle(!purchaseToggle)}>
                                <MdGroupAdd className='sideIcons' />
                                <p>Manage Purchase</p>
                                <IoIosArrowDown className={purchaseToggle ? "drop-down-icon down" : "drop-down-icon"} />
                            </div>
                            {purchaseToggle && (
                                <div className='sub-nav'>
                                    <ul className='sub-sidebar__nav-links'>
                                        <li className={active === "allPurchase" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("allPurchase"); navigate('/allPurchase')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>All Purchase</p>
                                        </li>
                                        <li className={active === "approvePurchase" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("approvePurchase"); navigate('/approvePurchase')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>Approve Purchase</p>
                                        </li>
                                        <li className={active === "getPurchase" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("getPurchase"); navigate('/getPurchase')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>Get Purchase</p>
                                        </li>
                                       

                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className='drop-down-menu'>
                            <div className='side-Navlinks' onClick={() => setCustomerToggle(!customerToggle)}>
                                <MdGroupAdd className='sideIcons' />
                                <p>Manage Cust.</p>
                                <IoIosArrowDown className={customerToggle ? "drop-down-icon down" : "drop-down-icon"} />
                            </div>
                            {customerToggle && (
                                <div className='sub-nav'>
                                    <ul className='sub-sidebar__nav-links'>
                                        <li className={active === "allCustomer" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("allCustomer"); navigate('/allCustomer')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>All Customer</p>
                                        </li>
                                       

                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className='drop-down-menu'>
                            <div className='side-Navlinks' onClick={() => setInVoiceToggle(!inVoiceToggle)}>
                                <MdGroupAdd className='sideIcons' />
                                <p>Manage Invoice</p>
                                <IoIosArrowDown className={inVoiceToggle ? "drop-down-icon down" : "drop-down-icon"} />
                            </div>
                            {inVoiceToggle && (
                                <div className='sub-nav'>
                                    <ul className='sub-sidebar__nav-links'>
                                        <li className={active === "allInvoice" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("allInvoice"); navigate('/allInvoice')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>All Invoice</p>
                                        </li>
                                       <li className={active === "approveInvoice" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("approveInvoice"); navigate('/approveInvoice')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>Approve Invoice</p>
                                        </li>
                                        <li className={active === "dueInvoice" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("dueInvoice"); navigate('/dueInvoice')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>Due Invoice</p>
                                        </li>
                                        <li className={active === "paidInvoice" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("paidInvoice"); navigate('/paidInvoice')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>Paid Invoice</p>
                                        </li>
                                        <li className={active === "getInvoice" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("getInvoice"); navigate('/getInvoice')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>Get Invoice</p>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className={active === "Admin" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("Admin"); navigate('/')}}>
                            <ImUserTie className='sideIcons' />
                            <p>Admin</p>
                        </li>

                        <li className='drop-down-menu'>
                            <div className='side-Navlinks' onClick={() => setToggle(!toggle)}>
                                <MdGroupAdd className='sideIcons' />
                                <p>Manage Supplier</p>
                                <IoIosArrowDown className={toggle ? "drop-down-icon down" : "drop-down-icon"} />
                            </div>
                            {toggle && (
                                <div className='sub-nav'>
                                    <ul className='sub-sidebar__nav-links'>
                                        <li className={active === "allSuppliers" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("allSuppliers"); navigate('/allSuppliers')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>All Suppliers</p>
                                        </li>
                                        <li className={active === "Task" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("Task"); navigate('/employe')}}>
                                            <FaUsers className='sideIcons' />
                                            <p>Employe</p>
                                        </li>
                                        <li className={active === "Report" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => setActive("Report")}>
                                            <BiTask className='sideIcons' />
                                            <p>Report</p>
                                        </li>

                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className='drop-down-menu'>
                            <div className='side-Navlinks' onClick={() => setCategoryToggle(!categoryToggle)}>
                                <MdGroupAdd className='sideIcons' />
                                <p>Manage category</p>
                                <IoIosArrowDown className={categoryToggle ? "drop-down-icon down" : "drop-down-icon"} />
                            </div>
                            {categoryToggle && (
                                <div className='sub-nav'>
                                    <ul className='sub-sidebar__nav-links'>
                                        <li className={active === "allCategory" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("allCategory"); navigate('/allCategory')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>All Category</p>
                                        </li>
                                       

                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className='drop-down-menu'>
                            <div className='side-Navlinks' onClick={() => setHsnToggle(!hsnToggle)}>
                                <MdGroupAdd className='sideIcons' />
                                <p>Manage Hsn</p>
                                <IoIosArrowDown className={hsnToggle ? "drop-down-icon down" : "drop-down-icon"} />
                            </div>
                            {hsnToggle && (
                                <div className='sub-nav'>
                                    <ul className='sub-sidebar__nav-links'>
                                        <li className={active === "allHsn" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("allHsn"); navigate('/allHsn')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>All Hsn</p>
                                        </li>
                                       

                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className='drop-down-menu'>
                            <div className='side-Navlinks' onClick={() => setUnitToggle(!unitToggle)}>
                                <MdGroupAdd className='sideIcons' />
                                <p>Manage Units</p>
                                <IoIosArrowDown className={unitToggle ? "drop-down-icon down" : "drop-down-icon"} />
                            </div>
                            {unitToggle && (
                                <div className='sub-nav'>
                                    <ul className='sub-sidebar__nav-links'>
                                        <li className={active === "allUnit" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("allUnit"); navigate('/allUnit')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>All unit</p>
                                        </li>
                                       

                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className='drop-down-menu'>
                            <div className='side-Navlinks' onClick={() => setTaxToggle(!taxToggle)}>
                                <MdGroupAdd className='sideIcons' />
                                <p>Manage Taxes</p>
                                <IoIosArrowDown className={taxToggle ? "drop-down-icon down" : "drop-down-icon"} />
                            </div>
                            {taxToggle && (
                                <div className='sub-nav'>
                                    <ul className='sub-sidebar__nav-links'>
                                        <li className={active === "allTaxes" ? "side-Navlinks active" : "side-Navlinks"} onClick={() => {setActive("allTaxes"); navigate('/allTaxes')}}>
                                            <IoCalendarOutline className='sideIcons' />
                                            <p>All Taxes</p>
                                        </li>
                                       

                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>

                    <div className='side-support'>
                        <BiSupport className='sideIcons' />
                        <p>Contact Support</p>
                    </div>
                    
                   
                </div>
            </div>
        </>
    )
}