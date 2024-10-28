import React, {useEffect, useState} from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { base_Url } from '../pages/api';
import { v4 as uuidv4 } from 'uuid';
import "./purchaseForm.css"
import { RiDeleteBinLine } from "react-icons/ri";
import axios from 'axios';

const PurchaseForm = ({setFormToggle,allPurchase }) => {
const generate = uuidv4();

  const [data, setData] = useState({
    id: generate,
    date: "",
    purchase_no: "",
    product_Name: "",
    suplire_Email : "",
    supplierDetail: "",
    category_name: "",
    hsn: "",
    taxName: "",
    noOfUnit: "",
    perUnitPrice: "",
    totalPrice: 0,
    status: "pending"
});
useEffect(()=>{
  let arr = [];
  console.log(arr)
  localStorage.setItem("purchase", JSON.stringify(arr));
},[])


const [supplierDetails, setSupplierDetails] = useState("");
const [categoryDetails, setCategoryDetails] = useState("");
const [productDetails, setProductDetails] = useState("");
const [supplierData, setSupplierData] = useState("")
const [hsnDetails, setHsnDetails] = useState(null)
const [tax, setTax] =useState(null)
const addListHandler =()=>{
  if( data.date &&
    data.purchase_no &&
    data.product_Name &&
    data.suplire_Email &&
    data.noOfUnit &&
    data.hsn && 
    data.perUnitPrice &&
    
    data.category_name){
  let arr = JSON.parse(localStorage.getItem("purchase"));
  arr.push(data);
  localStorage.setItem("purchase", JSON.stringify(arr));
  setData(
    {
      id: generate,
      date: data.date,
      purchase_no: data.purchase_no,
      product_Name: "",
      suplire_Email : data.suplire_Email,
      supplierDetail: data.supplierDetail,
      category_name: "",
      noOfUnit: "",
      hsn: "",
      taxName: "",
      perUnitPrice: "",
      totalPrice: 0,
      status: "pending"
  }
  )
}else {
  if (!data.date) {
    alert('Please select date');
  } else if (!data.purchase_no) {
    alert('Please enter the purchase no.');
  } else if (!data.suplire_Email) {
    alert('Please enter a Supplier Name');
  }else if (!data.category_name) {
    alert('Please enter the category Name');
  }else if(!data.product_Name){
    alert('Please enter a Product Name');
  } else if (!data.noOfUnit) {
    alert('Please enter no. of unit');
  }else if (!data.perUnitPrice) {
    alert('Please enter the per unit price');
  }
} 
}


const purchaseFormHandler=async ()=>{
  try{
    let arr = JSON.parse(localStorage.getItem("purchase"));
    console.log(arr)

        const response = await axios.post(`${base_Url}/product_details/product`, arr);
        console.log(response);
        alert("purchase Request done Successfully");
        setFormToggle(false);
        allPurchase();
        localStorage.removeItem("purchase");
      
  
   
    
  }catch(error){
    alert(error.response.data.message)
  }
 
}

const supplierDetailsHandler = async()=>{
   
  try{
    const response = await   axios.get(`${base_Url}/product/category_Supplire`);


    setSupplierDetails(response.data.suppliers);
 
    console.log(response.data.suppliers)
  }catch(error){
      console.log(error)
  }
}
const categoryDetailsHandler = async(mail)=>{
  console.log(mail)
 

  try{
  
    const response = await axios.post(`${base_Url}/product_details/category`, {suplierEmail: mail});
 setCategoryDetails(response.data.result)
 let supplierInfo= supplierData.filter((val)=>{
  return val.suplierEmail=== mail;
});
 setData((prev)=>({...prev, supplierDetail: supplierInfo }));
console.log(supplierInfo)
  }catch(error){
    console.log(error)
  }
}

const productDetailsHandler = async ()=>{
  try{
    const response = await axios.post(`${base_Url}/product_details/productsDetails`, data);
    setProductDetails(response.data.result)

  }catch(error){
    console.log(error)

  }
 
}
const allSupplier = async () => {
  try {
      const response = await axios.get(`${base_Url}/supplier/find_supplire`);
 
      setSupplierData(response.data.product)
  } catch (error) {
      console.log(error);
  }
}
const allTax = async () => {
  try {
      const response = await axios.get(`${base_Url}/tax/find_tax`);
     
      setTax(response.data.product);
      console.log(tax)
  
  } catch (error) {
      console.log(error);
  }
}
const calculateTotalPrice = () => {
  const price = (+data.noOfUnit * +data.perUnitPrice);
  console.log(tax)
if(tax){
  const taxDetail = tax.find(item => item.taxName === data.taxName);
  if (taxDetail) {
    const totalPrice = Math.floor(price + (price * (+taxDetail.taxPer) / 100));
    setData((prev) => ({ ...prev, totalPrice }));
  } else {

    setData((prev) => ({ ...prev, totalPrice: 0 }));
  }
}

 
};

useEffect(() => {
  calculateTotalPrice();
}, [data.perUnitPrice, data.noOfUnit, data.taxName]);
useEffect(()=>{
  supplierDetailsHandler();
  allSupplier();
  hsnDetailsHandler();
  allTax();
},[])
const taxHandler =(val)=>{
    
  const detail = tax.filter((item)=>{
     return val=== item.taxName
   });
   console.log(detail[0].taxPer)
  let price = (+data.noOfUnit*+data.perUnitPrice)
  setData((prev)=>({...prev, totalPrice: Math.floor(price+ (price)*(+detail[0].taxPer)/100)}))
 }
const purchaseHandler = ()=>{
  let arr = JSON.parse(localStorage.getItem("purchase"));


  if (
   arr.length>0
  ) {
   console.log(arr)
    purchaseFormHandler();

    
    setData({
      id: "",
      date: "",
      purchase_no: "",
      product_Name: "",
      suplire_Email : "",
      category_name: "",
      noOfUnit: "",
      hsn: "",
      taxName: "",
      perUnitPrice: "",
      totalPrice: 0,
      supplierDetail: "",
      status: "pending"
  })
  } 
}
const hsnDetailsHandler = async()=>{
  try{
    const response = await axios.get(`${base_Url}/hsn/findall_hsn`, data);
 setHsnDetails(response.data.data)

  }catch(error){
    console.log(error)
  }

 
 
}
const deleteHandler=(index)=>{
  let arr = JSON.parse(localStorage.getItem("purchase"));
  arr.splice(index, 1);
  localStorage.setItem("purchase", JSON.stringify(arr));
  setData(
    {
      id: generate,
      date: data.date,
      purchase_no: data.purchase_no,
      product_Name: "",
      suplire_Email : data.suplire_Email,
      supplierDetail: data.supplierDetail,
      category_name: "",
      noOfUnit: "",
      hsn: "",
      taxName: "",
      perUnitPrice: "",
      totalPrice: 0,
      status: "pending"
  }
  )
}

let arr = JSON.parse(localStorage.getItem("purchase"));

  return (
   
      <div className='purchase_form-container'>
         <div className='purchase_form'>
           <div className='suplierform-heading'>
                <h4>Add  Product</h4>
                <div className='suplierform-closing'>
                    <IoCloseOutline onClick={()=>{setFormToggle(false); }}/>
                </div>
            </div>
           <div className='purchase-form-inputs_container'>
            <label htmlFor='date'>Date</label>
            <input type='date' id='date' disabled = {arr && arr.length ?true: false} value={data.date} onChange={(e)=>setData((prev)=>({...prev, date:e.target.value}))}/>
            <label htmlFor='Purchase'>Purchase No.</label>
            <input type='text' id='Purchase' placeholder='Purchase No.' disabled = {arr && arr.length ?true: false} value={data.purchase_no} onChange={(e)=>setData((prev)=>({...prev, purchase_no:e.target.value}))}/>
            <label htmlFor='supplierName'>Supplier Email</label>
           
           <select id='supplierName' value={data.suplire_Email}  disabled = {arr && arr.length ?true: false}  onChange={(e)=>setData((prev)=>({...prev, suplire_Email:e.target.value}))} onBlur={(e)=>categoryDetailsHandler(e.target.value)}>
              <option value="" disabled>Supplier Name</option>
              {supplierDetails && supplierDetails.map((val, i)=>{
                    return(<option key={val._id} value={val}>{val}</option>)
                   
                  })}
              
            </select>
            <label htmlFor='categoryName'>Category Name</label>
            <select id='categoryName' value={data.category_name} onChange={(e)=>setData((prev)=>({...prev, category_name:e.target.value}))} onBlur={productDetailsHandler}>
              <option value="" disabled>Category Name</option>
              {categoryDetails && categoryDetails.map((val,i)=>{
                return(<option key={i} value={val}>{val}</option>)
               
              })}
              
            </select>
           
            <label htmlFor="productName">Product Name</label>
            <select id='productName' value={data.product_Name} onChange={(e)=>setData((prev)=>({...prev, product_Name: e.target.value}))}>
              <option value="" disabled>Product Name</option>
              {productDetails && productDetails.map((val,i)=>{
                return(<option key={i} value={val}>{val}</option>)
              })}
              
            </select>
            <label htmlFor='hsnName'>Hsn Name</label>
            <select id='hsnName' value={data.hsn} onChange={(e)=>setData((prev)=>({...prev, hsn:e.target.value}))}>
              <option value="" disabled>Hsn Name</option>
              {hsnDetails && hsnDetails.map((val,i)=>{
                return(<option key={i} value={val.hsn}>{val.hsn}</option>)
               
              })}
              
            </select>
            <label htmlFor='noOfUnit'>No of Unit</label>
            <input type='number' placeholder='No of Unit' id='noOfUnit' value={data.noOfUnit} onChange={(e) => {setData((prev) => ({ ...prev, noOfUnit: e.target.value, totalPrice: e.target.value * data.perUnitPrice }))}}/>
            <label htmlFor='UnitPerPrice'>unit Per Price</label>
            <input type='number' placeholder='unit per Price' id='UnitPerPrice'  value={data.perUnitPrice} onChange={(e) => {setData((prev) => ({ ...prev, perUnitPrice: e.target.value, totalPrice: data.noOfUnit * e.target.value }))}}/>
            <label htmlFor="tax">Tax</label>
            <select
  id="tax"
  value={data.taxName || ''}  
  onChange={(e) => setData((prev) => ({ ...prev, taxName: e.target.value }))
  } onBlur={(e)=>taxHandler(e.target.value)}
>
  <option value="" disabled>
    Tax
  </option>
  {tax &&
    tax.map((val, i) => {
      return (
        <option key={i} value={val.taxName}>
          {val.taxName}
        </option>
      );
    })}
</select>
            <label htmlFor='totalPrice'>Total Price</label>
            <input type='number' placeholder='Total Price' disabled id='totalPrice' value={data.totalPrice} />
           </div>
           <button type='button' onClick={addListHandler}>add</button>
          
           
           <div className='managersuplier-table'>
                    <table>
                        <thead>
                            <tr>
                            <th style={{ width: '20px' }}>S No.</th>
                                <th style={{ width: '20px' }}>Purchase No.</th>
                                <th style={{ width: '100px' }}>Date</th>
                                <th style={{ width: '150px' }}>Supplier Name </th>
                                <th style={{ width: '80px' }}>category</th>
                                <th style={{ width: '50px' }}>QTY</th>
                                <th style={{ width: '130px' }}>Product Name</th>
                                <th style={{ width: '100px' }}>Status</th>
                                <th style={{ width: '80px' }}>Action</th>



                            </tr>
                        </thead>
                        <tbody>
                            {
                              arr && arr.map((val, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{val.purchase_no}</td>
                                        <td>{val.date}</td>
                                        <td>{val.suplire_Email}</td>
                                        <td>{val.category_name }</td>
                                        <td>{val.noOfUnit }</td>
                                        <td>{val.product_Name }</td>
                                        <td><b>{(val.status).toUpperCase()}</b></td>
                                       
                                       {val.status==="pending" || val.status==="rejected"? <td><RiDeleteBinLine onClick={() => deleteHandler(i)} /></td>:<td></td>}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                 <button type='button' onClick={purchaseHandler}>Purchase</button>
         </div>
        
    </div>
  )
}

export default PurchaseForm
