const inVoiceDetailsModule = require("../moduls/invoiceModule");
const productModule = require("../moduls/productModule");
const customerModule = require("../moduls/customer")


const updateInvoiceStatus = async(req, res) => {
    const { id, status } = req.body;
    console.log("heloo",id, status)
   
    let oldPurchase = await inVoiceDetailsModule.find({});
    try {
        const oldDocumentId =  oldPurchase[0]._id
      
        
        const update = await inVoiceDetailsModule.findByIdAndUpdate(
            oldDocumentId,
            {
                $set: {
                    "arr.$[elem].status": status,
                },
            },
            {
                new: true,
                arrayFilters: [{ "elem.id": id }],
            }
        );

        console.log(update);

        if (update) {
            res.status(200).json({
                message: "Product details status is updated",
                updatedProduct: update
            });
        } else {
            res.status(404).json({
                message: "Product not found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Update request failed"
        });
    }

}
const updateInvoicePaidStatus = async(req, res) => {
 
    const {id} = req.params;
    const item = req.body
    console.log("heloo",id, item)
   
    let oldPurchase = await inVoiceDetailsModule.find({});
    try {
        const oldDocumentId =  oldPurchase[0]._id
      
        
        const update = await inVoiceDetailsModule.findByIdAndUpdate(
            oldDocumentId,
            {
                $set: {
                    "arr.$[elem].paidStatus": "paid",
                    "arr.$[elem].paidAmount": item.totalPrice,
                    "arr.$[elem].dueAmount": 0,
                },
            },
            {
                new: true,
                arrayFilters: [{ "elem.id": id }],
            }
        );

        console.log(update);

        if (update) {
            res.status(200).json({
                message: "Product details status is updated",
                updatedProduct: update
            });
        } else {
            res.status(404).json({
                message: "Product not found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Update request failed"
        });
    }
}
const allInvoices = async(req, res) => {

    try{
        const result = await inVoiceDetailsModule.find({})
        res.status(200).json({
            message : "response Received",
            result : result,
            count : result.length
        })
    } catch {
        res.status(500).json({
            message : "product details requist is faild"
        })
    }
}
const findProductList = async (req, res) => {
    const { startDate, endDate } = req.body;

    try {
        const findAll = await inVoiceDetailsModule.find({ });

        const filteredItems = await findAll[0].arr.filter((item) => {
            const itemDate = new Date(item.date);
            const start = new Date(startDate);
            const end = new Date(endDate);

            if(itemDate >= start && itemDate <= end && item.status==="approved"){
               return item;
            }
        });

        res.json({ data: filteredItems });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const sameInvoiceData = async (req, res)=>{
    try{
        const {purchase_no} = req.body;
      console.log(purchase_no)
        let oldPurchase = await inVoiceDetailsModule.find({});
        if(oldPurchase.length>0){
            const existingPurchase = oldPurchase[0].arr.filter((val)=>{
                return val.purchase_no ===purchase_no
            })
           res.status(200).json({
            message: "data found",
            data: existingPurchase
           })
        }else{
            res.status(404).json({
                message: "data not found"
            })
        }
    }catch(error){
        console.log(error)
    }
}

const invoiceDetails = async (req, res) => {
    try{
    const arr = req.body;
        console.log(arr)
 
        let oldPurchase = await inVoiceDetailsModule.find({});
    if(oldPurchase.length>0){
        const oldDocumentId =  oldPurchase[0]._id
        const purchase_no = arr[0].purchase_no;
        const existingPurchase = oldPurchase[0].arr.some((val)=>{
            return val.purchase_no ===purchase_no
        })
        console.log(existingPurchase)
       oldPurchase = [...oldPurchase[0].arr, ...arr]


     
        if (existingPurchase) {
            res.status(400).json({
                message: 'Purchase no. already exists',
            });
        } else {
      
           
           
            await inVoiceDetailsModule.updateOne(
                { _id: oldDocumentId },
                { $set: { arr: oldPurchase } }
            );

            res.status(201).json({
                message: 'Successfully saved',
                result: arr,
            });
        }
    } else{
        console.log("heelloo", arr)
        const newpurchaseItem = new inVoiceDetailsModule({
            arr
        });
      
        await newpurchaseItem.save();
        res.status(201).json({
            message: 'Successfully saved',
            result: newpurchaseItem,
        });
    }
    }catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Your request failed',
        });
    }
 



  
}



const findProduct = async (req, res) => {
    const { category_name } = req.body;

    try {
        if (category_name === "") {
            res.status(400).json({
                message: "plase select the category",
            })
        } else {
            const findSuplire = await productModule.find({ category_name: category_name })
            let product = []
            for (const val of findSuplire) {
                if (category_name === val.category_name) {
                    product.push(val.product_Name);
                }
            }
            res.status(200).json({
                message: "ok",
                result: product
            })
        }
    } catch {
        res.status(500).json({
            message: "your requist is faild"
        })
    }
}

const deleteInvoiceDetails = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    let oldPurchase = await inVoiceDetailsModule.find({});
        const oldDocumentId =  oldPurchase[0]._id  
    try {
        await inVoiceDetailsModule.updateOne(
            { _id: oldDocumentId },
            { $pull: { arr: { id: id } } }
        );
        res.status(200).json({
            message: "product details are deleted"
        })
    } catch {
        res.status(500).json({
            message: "your requist is faild"
        })
    }
}


module.exports = {
    invoiceDetails,
    deleteInvoiceDetails,
    findProduct,
    allInvoices,
    updateInvoiceStatus,
    updateInvoicePaidStatus,
    findProductList,sameInvoiceData
}