const mongoose=require("mongoose");

const adminLoginProtocol=new mongoose.Schema({
    // adminName:{
    //     type:String,
    //     required:true
    // },
    adminEmail:{
        type:String,
        required:true
    },
    adminPassword:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("adminLoginData",adminLoginProtocol)