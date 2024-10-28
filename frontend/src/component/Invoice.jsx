import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { SlPrinter } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";
import './Invoice.css'; // Import your CSS styles
import companyLogo from "../images/logo.png";
const Invoice = ({editData, setViewToggle}) => {
  const [orginalCopy, setOriginalCopy] = useState(true);
  console.log(editData)
  const downloadPDF = () => {
    const capture = document.querySelector('.invoice');
    if (capture) {
  
      html2canvas(capture).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = canvas.width * 0.95; 
       const pdfHeight = canvas.height ;
        const pdf = new jsPDF('l', 'pt', [pdfWidth, pdfHeight]);
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
        pdf.save('invoice.pdf');
      });
    }
  };
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
            <p><span>Purchase Date: </span>{editData.date}</p>
          </div>
        </div>
        <div className='invoice-address'>
          <div className='invoice-address-left'>
            <p><span>Office Address:</span><br /> Office Number 214, Tower B, The iThum Towers, Sector 62, Noida, Uttar Pradesh 201301</p>
            <p><span>Phone No: </span>+91 80062 36800</p>
            <p><span>CIN: </span>2222 80062 36800</p>
            <p><span>GST: </span>2222 80062 36800</p>
          </div>
          <div className='invoice-address-right'>
            <p><span>Invoice ID: </span>{editData.purchase_no}</p>
            <p><span>To: </span>{editData.customerDetail.custmerName.toUpperCase()}</p>
            <p><span>Add: </span>{editData.customerDetail.custmerAdd}</p>
            <p><span>Email: </span>{editData.customerDetail.custmerMail}</p>
            <p><span>GST No: </span>{editData.customerDetail.customerGst}</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>HSN/SAC code</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Discount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h4>{editData.product_Name}</h4>
              </td>
              <td>
                <h4>{editData.hsn}</h4>
              </td>
              <td>₹ {editData.perUnitPrice}</td>
              <td>{editData.noOfUnit}</td>
              <td>{editData.discount}</td>


            </tr>
          </tbody>
        </table>
        <div className='totalAmount-container'>
          <div className='totalAmount'>
            <p><span>Total Amount: </span>₹ {editData.totalPrice}</p>
            <p><span>Paid Amount: </span>₹ {editData.paidAmount}</p>
            <p style={{ backgroundColor: '#126262 !important' }}><span>Due Amount: </span>₹ {editData.dueAmount}</p>
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
  );
};

export default Invoice;