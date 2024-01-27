
const Product = require('../models/Product');

const createProduct = async (req, res)=>{
    const body = req.body;
    try {
        const product = new Product(body);
        const result = await product.save();
        res.status(201)
            .json({'message':'Product Craeted', 'result': result});
    } catch (error) {
        res.status(500)
            .json({'message':'Internal Server Error', error});
    }
}

const getProducts = async (req, res)=>{
    try {
        const products = await Product.find();
        res.status(200)
            .json({'message':'Product List', 'data': products});

    } catch (error) {
        res.status(500)
            .json({'message':'Internal Server Error', error});
    }
}

const getProductsById = async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200)
            .json({'message':'Product Detail','data': product});
    } catch (error) {
        res.status(500)
            .json({'message':'Internal Server Error', error});
    }
}

const updateProductById = async (req, res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const updateData = {$set: {...body}};
        updateData.updatedAt = Date.now();
        const result = await Product.findByIdAndUpdate(id, updateData);
        res.status(200)
            .json({'message':'Product Details Updated'});
    } catch (error) {
        res.status(500)
            .json({'message':'Internal Server Error', error});
    }
}

const deleteProductById = async (req, res)=>{
    try {
        const id = req.params.id;
        const result = await Product.findByIdAndDelete(id);
        res.status(200)
            .json({'message':'Product Deleted Successfully'});
        
    } catch (error) {
        res.status(500)
            .json({'message':'Internal Server Error', error});
    }
}
module.exports = {
    createProduct,
    getProducts,
    getProductsById,
    updateProductById,
    deleteProductById
}