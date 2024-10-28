import React from 'react';
import Header from '../component/Header';

import MainPage from '../component/MainPage';

import ManageSuplier from './ManageSuplier';
import ManageCategory from './ManageCategory';
import "./home.css"
import { Routes,Route } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import ManageProduct from './ManageProduct';
import ManagePurchase from './ManagePurchase';
import Approvepurchase from '../component/Approvepurchase';
import ManageCustomer from './ManageCustomer';
import ManageInvoice from './ManageInvoice';
import ApprovalInvoice from '../component/ApprovalInvoice';
import DueInvoice from '../component/DueInvoice';
import PaidInvoices from '../component/PaidInvoices';
import ManageHsn from './ManageHsn';
import ManageUnits from '../component/ManageUnits';
import GetInvoice from '../component/GetInvoice';
import GetPurchase from '../component/GetPurchase';
const Home = () => {
  return (
     <>
      <Header />
      <div className='main-page'>
      <Sidebar/>
        <Routes>
          <Route path='/home' element={<MainPage/>} />
          <Route path='/allSuppliers' element={<ManageSuplier/>} />
          <Route path='/allCategory' element={<ManageCategory/>}/>
          <Route path='/allProduct' element={<ManageProduct/>}/>
          <Route path='/allPurchase' element={<ManagePurchase/>} />
          <Route path='/approvePurchase' element={<Approvepurchase/>} />
          <Route path='/approveInvoice' element={<ApprovalInvoice/>} />
          <Route path='/allCustomer' element={<ManageCustomer/>}/>
          <Route path='/allInvoice' element={<ManageInvoice/>}/>
          <Route path='/dueInvoice' element={<DueInvoice/>}/>
          <Route path='/paidInvoice' element={<PaidInvoices/>}/>
          <Route path='/allHsn' element={<ManageHsn/>}/>
          <Route path='/allUnit' element={<ManageUnits/>}/>
          <Route path='/getPurchase' element={<GetPurchase/>}/>
          <Route path='/getInvoice' element={<GetInvoice/>}/>
          <Route path='/allTaxes' element={<GetInvoice/>}/>
        </Routes>
        
      </div>
      
      </>
  )
}

export default Home
