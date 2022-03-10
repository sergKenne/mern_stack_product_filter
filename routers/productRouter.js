const express = require("express")
const { postProductController, getProductController } = require("../controllers/postProductController")
const { check } = require('express-validator/check');
const uploadFile = require("../uploadFile");
const router = express.Router()

router.post(
    '/product',
    uploadFile.single("image"),
    [
        check('name').not().isEmpty().withMessage('Name is required and can not be empty'),
        check('brand', 'Brand is required and can not be empty and should be a string type')
            .not()
            .isEmpty(),
        check('price', 'price is required ').not().isEmpty(),
        check('ram', 'Your ram is not valid and should exect 5 caracter')
            .not()
            .isEmpty()
            .isLength({ max: 5 }),
        check('storage', 'Your storage must be at least 5 characters').not().isEmpty(),
        check('camera', 'camera is required and can not be empty').not().isEmpty(),
        check('quantity', 'Quantity is required and can not be empty and should be a number type')
            .not()
            .isEmpty(),
    ],

    postProductController
);

router.get("/product", getProductController)

module.exports = router