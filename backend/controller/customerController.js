
const { cloudinaryFileUploder, removeCloudinaryImage, uplodeImagesCloudinary } = require('../utils/cloudinary')
const customerModule = require('../moduls/customer')

// create a customre -------
const createCustomer = async (req, res, next) => {

    const { customer_name, customer_address, customer_email, customer_contact_no, customer_gst } = req.body;

    if (customer_name === "" || customer_address === "" || customer_email === "" || customer_contact_no === "", customer_gst==="") {
        res.status(400).json({
            message: "fil the all input fild"
        })
    } else {
        const file = req.file;
       
        const cloudinaryFile = await cloudinaryFileUploder(file.path)
       
        if (cloudinaryFile === undefined || cloudinaryFile === null) {
            res.status(400).json({
                message: "image size is large"
            })
        } else {
            const newCustomer = new customerModule({
                customer_image: {
                    public_id: cloudinaryFile.public_id, // Make sure you set this when uploading
                    url: cloudinaryFile.url,
                },
                customer_address: req.body.customer_address,
                customer_contact_no: req.body.customer_contact_no,
                customer_email: req.body.customer_email,
                customer_name: req.body.customer_name,
                customer_gst: req.body.customer_gst
            })

            try {
                const findCustomer = await customerModule.findOne({ customer_email: customer_email })

                if (!findCustomer) {
                    await newCustomer.save()
                    res.status(201).json({
                        message: "ok",
                        result: newCustomer
                    })
                } else {
                    res.status(400).json({
                        message: "customer email is alredy exits"
                    })
                }

            } catch {
                res.status(500).json({
                    message: "create customer requist is faild"
                })
            }
        }
    }


}

// find the all data in customer ---------


// delete the customer details ----------
const deleteCustomer = async (req, res) => {
    const id = req.params.id;

    try {
        const customer = await customerModule.findById(id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        // Delete image from Cloudinary
        const imagePublicId = customer.customer_image.public_id;
        await deleteFromCloudinary(imagePublicId);

        // Delete customer from the database
        await customerModule.findByIdAndDelete(id);

        res.status(200).json({
            message: "Customer details and image deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({
            message: "Customer delete request failed"
        });
    }
}
const allCustomer = async (req, res) => {

    try {
        const allCustomer = await customerModule.find({})
        res.status(200).json({
            message: "find all data",
            result: allCustomer,
            count: allCustomer.length
        })
    } catch {
        res.status(400).json({
            message: "your requist is faild"
        })
    }
}

module.exports = {
    createCustomer,
    allCustomer,
    deleteCustomer
}

