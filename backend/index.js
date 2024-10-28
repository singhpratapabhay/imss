
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
require('dotenv').config()

app.use(bodyParser.json({ extended : true, limit : '5mb' }))
app.use(bodyParser.urlencoded({ extended : true, limit : '5mb' }))
app.use(cors())

const employer = require('./route/userRoute')
const supplier = require('./route/supplierRoute')
const userTime = require('./route/userActiveTimeRoute')
const category = require('./route/categoryRoutes')
const product = require('./route/productRoute')
const productDetails = require('./route/productDetailsRoute')
const customer = require('./route/customerRoute')
const invoice = require('./route/invoiceRoute')
const hsn = require("./route/hsnRoute");
const noOfUnit = require("./route/noOfRoute")
const tax = require("./route/taxRoutes")
// connection to the database 
mongoose.connect(process.env.DB_URL).then(() => {
    console.log('database is connected');
}).catch(() => {
    console.log('database in faild');
})

app.use('/user', employer)
app.use('/supplier', supplier)

app.use('/product', product)
 app.use('/userTime', userTime)
app.use("/client", customer)
 app.use('/product_details', productDetails)
app.use('/category', category)
app.use('/invoice', invoice)
app.use('/hsn', hsn)
app.use('/noOfUnit', noOfUnit)
app.use("/tax", tax)
// create a server 
const Port = process.env.Port;
app.listen(Port, function() {
    console.log('server is created', Port);
})