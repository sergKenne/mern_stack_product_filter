
const mongoose = require("mongoose")

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("database connect successfully....!");
        }).catch(err => {
            console.log("err.message");
        })
} 

module.exports = dbConnect