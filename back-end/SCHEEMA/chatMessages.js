const mongoose = require("mongoose");



const chatShema= new mongoose.Schema({
    
    Text:{
        type:String,
        required:true,
    },
    Date:{
        type:Date,
        default:Date.now 
    }
})


module.exports = mongoose.model("chat",chatShema)

