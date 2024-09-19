const mongoose=require("mongoose");
const express=require("express")
const port=8080;
const Routers = require("./APIViews/userData")
const cors=require("cors")
const app=express();




app.use(cors());
app.use(express.json());
app.use(Routers)


mongoose.connect("mongodb+srv://ramanareddym0342:Ramana799@cluster0.nqrq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("DB connected")
})


app.listen(port, ()=>{
    console.log(`server started running in ${port}`)
})




