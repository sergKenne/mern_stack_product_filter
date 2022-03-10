const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ram: {
        type: String,
        required: true,
        maxLength: 5
    }, 
    storage: {
        type: String,
        required: true
    }, 
    camera: {
        type: String,
        required: true
    }, 
    image: {
        type: String,
        required: true
    }, 
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["0", "1"],
        required: true,
        default: "0"
    } 
})

const product = mongoose.model("Product", productSchema)
module.exports = product