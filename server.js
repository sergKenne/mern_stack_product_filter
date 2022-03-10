require("dotenv").config()
const express = require("express")
const path = require('path')
const cors = require("cors")
const app = express()

const dbConnect = require("./dbConnect")
const productRouter = require("./routers/productRouter")

//connect to db 
dbConnect();

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
//static Images Folder
app.use('/uploads', express.static('./uploads'))


//ROUTER
app.use("/api", productRouter)

const PORT = process.env.PORT || 6000
app.listen(PORT, () => {
    console.log(`server run on port ${PORT}`);
})
