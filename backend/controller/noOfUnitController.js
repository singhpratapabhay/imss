const purchaseProductsModule = require("../moduls/productDetails");
const soldProductsModule = require("../moduls/invoiceModule");

const dataInfo = async (req, res) => {
    try {
        const purchaseProducts = await purchaseProductsModule.find({});
        const soldProducts = await soldProductsModule.find({});
        
        const purchaseProductsArray = purchaseProducts[0]?.arr || [];
        const soldProductsArray = soldProducts[0]?.arr || [];

        const sumpurchaseProducts = calculateSum(purchaseProductsArray);
        const sumsoldProducts = calculateSum(soldProductsArray);

        const differenceObject = calculateDifference(sumpurchaseProducts, sumsoldProducts);

        res.status(200).json({
            data: differenceObject,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Request failed',
        });
    }
};

const calculateSum = (productArray) => {
    const sumProducts = {};

    productArray.forEach((item) => {
        const { product_Name: productName, status, noOfUnit } = item;
        const quantity = parseInt(noOfUnit, 10);

        if (status === "approved") {
            sumProducts[productName] = (sumProducts[productName] || 0) + quantity;
        }
    });

    return sumProducts;
};

const calculateDifference = (sumpurchaseProducts, sumsoldProducts) => {
    const differenceObject = {};

    Object.keys(sumpurchaseProducts).forEach((key) => {
        differenceObject[key] = sumpurchaseProducts[key] - (sumsoldProducts[key] || 0);
    });

    return differenceObject;
};

module.exports = { dataInfo };
