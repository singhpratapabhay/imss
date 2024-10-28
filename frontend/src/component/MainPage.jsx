import React from 'react';
import { VscGraph } from "react-icons/vsc";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { GiHandTruck } from "react-icons/gi";
import Chart from "react-apexcharts";
import { FaLongArrowAltRight } from "react-icons/fa";

import "./mainpage.css"
import { Link } from 'react-router-dom';


const MainPage = () => {
  
    const data = {
        options: {
          chart: {
            id: "area",
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
            labels: {
              style: {
                fontSize: "14px", 
              },
            },
            
          },
          yaxis:{
            labels: {
                style: {
                  fontSize: "14px", 
                },
              },
          },
          dataLabels: {
            enabled: false,
     
          },
          zoom: {
            enabled: false,
          },
          stroke: {
            curve: "straight", 
            width: 3,
            colors: ["#5932EA"], 
          },
          markers: {
            colors: '#5932EA',
            hover: {
                size: 6,
                sizeOffset: 2,
                colors: '#5932EA', 
              }, 
          },
          fill: {
            type: 'gradient',
            colors: "#5932EA",
            gradient: {
                shadeIntensity: 0,
                opacityFrom: 1,
                opacityTo: 0.6,
                stops: [0, 100],
            },
        },
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
          },
          
        ],
       
      };

      const data1 = {
        series: [{
          name: 'Net Profit',
          data: [30, 45, 57, 50, 65, 58, 63],
        }],
        options: {
          chart: {
            type: 'bar',
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '40%',
              endingShape: 'rounded',
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thru', 'Fri', 'Sat', 'Sun'],
          },
          fill: {
            opacity: 1,
            colors: ["#5932EA"], // Change bar colors
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$ " + val + " thousands";
              },
            },
            markers: {
              colors: "yellow",
            },
          },
        },
      };
    
  

      
   
    
 
  return (
    <div className='mainPage'>
        <div className='cards-container'>
            <div className='dashboard-card'>
                <div className='dashboard-card-icon'>
                    <VscGraph/>
                </div>
                <div className='dashboard-card-stats'>
                   
                    <p>78+</p>
                    <h6>Total Sales</h6>
                </div>
            </div>
            <div className='dashboard-card purple'>
                <div className='dashboard-card-icon'>
                    <IoPeople/>
                </div>
                <div className='dashboard-card-stats'>
                   
                    <p>1008+</p>
                    <h6>Total customer</h6>
                </div>
            </div>
            <div className='dashboard-card green'>
                <div className='dashboard-card-icon'>
                    <MdProductionQuantityLimits/>
                </div>
                <div className='dashboard-card-stats'>
                   
                    <p>708+</p>
                    <h6>Total Product</h6>
                </div>
            </div>
            <div className='dashboard-card pink'>
                <div className='dashboard-card-icon'>
                    <GiHandTruck/>
                </div>
                <div className='dashboard-card-stats'>
                   
                    <p>10+</p>
                    <h6>Total Supplier</h6>
                </div>
            </div>
           
        </div>
        <div className='dashboard-transcation'>
           
            
            <div className='dashboard-table-container'>
            <div className='dashboard-table-left'>
            <h5>Last Transcations</h5>
            <Chart  options={data1.options}  type="bar" series={data1.series}   height="85%"/>
            </div>  
           
            <div className='dashboard-table-right'>
            <h5>Progress Report</h5>
            <Chart  options={data.options}  type="area" series={data.series} height="85%"/>
            </div>
            </div>
            <div className='dashboard-table'>
            <div className='dashboard-order'>
                <h5>Recent Orders</h5>
                <p><Link to="/allInvoice">Go to All Orders<FaLongArrowAltRight/></Link></p>
            </div>
                <table>
                    <thead>
                        <tr>
                            <th >ID</th>
                            <th >Item</th>
                            <th >Qty</th>
                            <th >Date </th>
                            <th >Transaction Amount</th>
                            <th >Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{color:"#03022980"}}>1</td>
                            <td style={{color:"black"}}>Abhay pratap Singh</td>
                            <td style={{color:"black"}}>1324</td>
                            <td style={{color:"#03022980"}}>24-11-2023</td>
                            <td style={{color:"#3C3C3C"}}>2500</td>
                          
                            <td ><p style={{backgroundColor: "#FFF3E8" , color: "#D1A941"}}>Pending</p></td>
                        </tr>
                        <tr>
                            <td style={{color:"#03022980"}}>2</td>
                            <td style={{color:"black"}}>mohan</td>
                            <td style={{color:"black"}}>1324</td>
                            <td style={{color:"#03022980"}}>24-11-2023</td>
                            <td style={{color:"#3C3C3C"}}>2500</td>
                            <td ><p style={{backgroundColor: "#DBF4DC" , color: "#6FB75D"}}>Approved</p></td>
                        </tr>
                        <tr>
                            <td style={{color:"#03022980"}}>3</td>
                            <td style={{color:"black"}}>chandra</td>
                            <td style={{color:"black"}}>1324</td>
                            <td style={{color:"#03022980"}}>24-11-2023</td>
                            <td style={{color:"#3C3C3C"}}>2500</td>
                            <td ><p style={{backgroundColor: "#DBF4DC" , color: "#6FB75D"}}>Approved</p></td>
                        </tr>
                       
                    </tbody>
                </table>
            </div>
        </div>
      
    </div>
  )
}

export default MainPage
