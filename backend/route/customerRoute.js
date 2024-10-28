
const express = require('express')
const customerRoute = express.Router()

const {
    createCustomer,
    allCustomer,
    deleteCustomer
}
 = require('../controller/customerController')

const {fileUploadMiddleware ,checkFileSize} = require('../middleware/multer');


customerRoute.post('/add_customer',fileUploadMiddleware,checkFileSize, createCustomer)
customerRoute.get('/allCustomer', allCustomer)
customerRoute.delete('/delete_Customer/:id', deleteCustomer)

module.exports = customerRoute
