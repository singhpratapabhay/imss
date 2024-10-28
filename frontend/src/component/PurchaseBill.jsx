import React, { useState,useEffect } from 'react';
import html2canvas from 'html2canvas';
import { RiDeleteBinLine } from "react-icons/ri";
import jsPDF from 'jspdf';
import axios from "axios"
import { SlPrinter } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";
import './Invoice.css';
import companyLogo from "../images/logo.png";
import { base_Url } from '../pages/api';

const PurchaseBill = ({viewPurchase, setViewToggle}) => {
  const [orginalCopy, setOriginalCopy] = useState(true);
  const [editData, setEditData] = useState(null);
  const [data, setData] = useState({
    totalPaid: "",
    totalDueAmount: '',
    totalPrice: "",

  })
  useEffect(()=>{
    purchaseNoHandler()
  }, []);
 

  const purchaseNoHandler= async ()=>{
  
    const response = await   axios.post(`${base_Url}/product_details/allPurchase_no`, {purchase_no: viewPurchase});
    setEditData(response.data.data);
    console.log(response.data.data)
    
  }
  const totalData = ()=>{
    if(editData){
      let totalPaid =  editData.reduce((h1,h2)=>{
      return h1+h2.paidAmount
    },0 );
   let  totalPrice =  editData.reduce((h1,h2)=>{
      return h1+h2.totalPrice
    },0 );
   let totalDueAmount =  editData.reduce((h1,h2)=>{
      return h1+h2.dueAmount
    },0 );
    setData({totalPaid, totalDueAmount, totalPrice})
    }
   
   
  }
  useEffect(()=>{
    totalData()
  }, [editData]);
  const downloadPDF = () => {
    let preven= editData.some((val)=>{
      return val.status === "pending"
    });
  if(preven){
    alert("all products request is not approved");
    return;
  }
    const capture = document.querySelector('.invoice');
    if (capture) {
  
      html2canvas(capture).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = canvas.width * 0.95; 
       const pdfHeight = canvas.height;
        const pdf = new jsPDF('l', 'pt', [pdfWidth, pdfHeight]);
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
        pdf.save('invoice.pdf');
      });
    }
  };
  const deleteHandler = async (id) => {
    await axios.delete(`${base_Url}/product_details/remove_product_details/${id}`).then((res) => {
        console.log(res.data);
        purchaseNoHandler();

    }).catch((err) => console.log(err))
}
  return (
    <div className='invoice-container'>

   
    <div className='download-invoice' ><SlPrinter onClick={downloadPDF}/> <IoCloseOutline className='closing' onClick={()=>setViewToggle(false)}/></div>
   {editData && <div className='invoice'>
      <p className='invoiceCopy' onClick={()=>setOriginalCopy(!orginalCopy)}>{orginalCopy? "Orginal Copy": "Duplicate Copy"}</p>
      <div className='invoice-first-div'>
        <div className='logo-container'>
          <div className='invoice-logo'>
            <img src={companyLogo} alt='logo' />
          </div>
          <p>Kasper Infotech Pvt. Ltd.</p>
        </div>
        <div className='date-container'>
          <h3>Tax Invoice</h3>
          <p><span>Purchase Date: </span>{editData[0].date}</p>
        </div>
      </div>
      <div className='invoice-address'>
        <div className='invoice-address-left'>
          <p><span>Office Address:</span><br /> Office Number 214, Tower B, The iThum Towers, Sector 62, Noida, Uttar Pradesh 201301</p>
          <p><span>Phone No: </span>+91 80062 36800</p>
          <p><span>CIN: </span>2222 80062 36800</p>
          <p><span>GST: </span>2222 80062 36800</p>
        </div>
       {editData && <div className='invoice-address-right'>
          <p><span>Invoice ID: </span>{editData[0].purchase_no}</p>
          <p><span>To: </span>{editData[0].customer_detail[0].customer_name.toUpperCase()}</p>
          <p><span>Add: </span>{editData[0].customer_detail[0].customer_address}</p>
          <p><span>Email: </span>{editData[0].customer_detail[0].customer_email}</p>
          <p><span>GST No: </span>{editData[0].customer_detail[0].customer_gst}</p>
        </div>} 
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>HSN/SAC code</th>
            <th>Unit Price </th>
            <th>Qty</th>
            <th>Discount</th>
            <th>Tax</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {editData && editData.map((val)=>{
            return(
              <tr key={val.id}>
            {val.status==="pending" || val.status==="rejected"?<td className='print-hide'><h4>{val.product_Name}</h4><RiDeleteBinLine className='danger' onClick={() => deleteHandler(val.id)} /></td>:<td><h4>{val.product_Name}</h4></td>} 
     
              <td>
                <h4>{val.hsn}</h4>
              </td>
              <td>₹ {val.perUnitPrice}</td>
              <td>{val.noOfUnit}</td>
              <td>₹ {val.discount}</td>
              <td>{val.taxName}</td>
              <td>₹ {val.totalPrice}</td>
             

            </tr>
            )
          })}
        
        </tbody>
      </table>
      <div className='totalAmount-container'>
        <div className='totalAmount'>
          <p><span>Total Amount: </span>₹ {data.totalPrice}</p>
          <p><span>Paid Amount: </span>₹ {data.totalPaid}</p>
          <p style={{ backgroundColor: '#126262 !important' }}><span>Due Amount: </span>₹ {data.totalDueAmount}</p>
        </div>
      </div>
      <div className='thankyouNote-Container'>

        <p>Thank you for your business</p>


      </div>
      <div className='TermsAndCondition-Container'>

        <h4>Terms and Condition:</h4>
        <p>For any questions or concerns regarding this invoice or the provided goods/services, please contact +91 80062 36800.</p>
        <p>Orders that are canceled after processing may be subject to a cancellation fee.</p>

      </div>
    </div>
    
   } 
 </div>
  )
}

export default PurchaseBill
