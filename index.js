const express = require("express")
require("dotenv").config()
const cors = require("cors")

const {user}=require("./routes/userRoute")
const {order}=require("./routes/orderRoute")
const {restaurant}=require("./routes/restaurantRoute")
const {connection}=require("./configs/db")
const {authentic}=require("./middleware/authorization")

const app = express()
app.use(cors())
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/api",user,order,restaurant)



app.listen((process.env.port),async()=>{
    try {
        await connection
        console.log("db is connected")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running")
})