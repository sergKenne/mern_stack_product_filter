const Product = require("../models/productModel")
const { validationResult } = require('express-validator');

const postProductController = (req, res) => {
    
    const { name, brand, price, ram, storage, camera, quantity } = req.body
    const image = req.file.path;
    const product = {
        name,
        brand,
        price,
        ram,
        storage,
        camera,
        quantity,
        image  //: req.file.path
    };

    req.body.image = req.file.path;
    const file = req.file
    console.log("file:", file);


    const errors = validationResult(req)
    console.log(req.body);
    console.log("errors:", errors);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    } else {
        Product.create(product, (err, product) => {
        if (err) {
            return res.status(400).json({
                success: false,
                msg: err.message
            })
        }
            res.status(201).json({
                success: true,
                msg: "product created successfully ",
                product
            })
        })
    }
}

const getProductController = async (req, res) => {
   
    try {
        await Product.find({})
            .then (result => res.status(200).json(result))
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: "fail to fetch data"
        })
    }
}

const getProductByFilter =  async (req, res) => {
    const filter = req.params.filtering;
    try {
        const prods = await Product.aggregate([{
            $match: {brand: {$in: filter}}
        }])

        res.status(200).json(prods)
        
    } catch (err) {
        res.status(400).json({
            success: false,
            msg: 'fail to fetch data',
        });
    }
}


module.exports = { postProductController, getProductController, getProductByFilter };