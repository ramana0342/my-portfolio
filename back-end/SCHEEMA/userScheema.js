
const mongoose=require("mongoose")

const userInputDataProtocol=new mongoose.Schema({
          name:{
            type:String,
            required:true
          },

          Email:{
            type:String,
            required:true
          },

          mobileNumber:{
              type:Number,
              required:true
          },

          Message:{
            type:String,
            required:true
          }
})


module.exports = mongoose.model("UserInputDataScheema",userInputDataProtocol);