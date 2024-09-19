const express=require("express")
const router=express.Router()
const userScheema=require("../SCHEEMA/userScheema");
const adminScheema=require("../SCHEEMA/adminScheema");
const chatShema=require("../SCHEEMA/chatMessages");
const jwt=require("jsonwebtoken")
const auth=require("../Middleware/globalMiddleware")


router.post("/userinputdata", async(req,res)=>{
    let {name,Email,mobileNumber,Message}=req.body;
if(name&&Email&&mobileNumber&&Message){
   // console.log(name, Email , mobileNumber ,Message)
    let userInformation=new userScheema(req.body);
    let result=await userInformation.save();

    return res.json({
        Success:"Your Data Sent To The Admin",
        result
    })
}else{
        return res.json({
            Fail:"Enter All Details"
        })
}
});

router.post("/adminlogin",async(req,res)=>{
    let {adminEmail,adminPassword} = req.body;
      //console.log(adminEmail,adminPassword)
      
      const adminresult=await adminScheema.findOne({adminEmail:adminEmail})
    //console.log(adminresult._id)
    if(adminresult!=null){

       if(adminresult.adminPassword===adminPassword){
           const serverToken=jwt.sign({id:adminresult._id},"Shh")
           //console.log(serverToken)
            return res.json({
                Success:"Login Successfully",
                serverToken
            })
       }else{
           return res.json({
                Fail:"Wrong Password"
           })
       }

    }
    else{
       return res.json({
              Fail:"Invalid Crediantials"
       })
    }
    
});

router.get("/getusersmessage" ,auth, async(req,res)=>{
         let userMessages= await userScheema.find({})
         res.json({
            userMessages
         })
})

router.get("/getNoOfMessages",async(req,res)=>{
    let userMessages= await userScheema.find({})
    const count = userMessages.length
         res.json(count)
})

router.delete("/deletemessage/:id", async(req,res)=>{
         const MessageId= req.params.id;
         await userScheema.findByIdAndDelete(MessageId);
         return res.json({
            Success:"Message Delete Successfully"
         })

               
})

router.post("/emailforPassWordChange",async(req,res)=>{
         

    let {adminEmail} = req.body;
     if(adminEmail){
        let adminResult=await adminScheema.findOne({adminEmail:adminEmail})
        if(adminResult!=null){
            return res.json({
               adminResult
            })
       }else{
           return res.json({
                 Fail:"Invalid Email"
           })
       }
     }else{
        return res.json({
               Fail:"Enter Email"
        })
     }
        
        
        
        // res.json({
        //     adminResult
        // })
      

})







module.exports=router;