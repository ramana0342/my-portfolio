const jwt=require("jsonwebtoken")

const authentication=async(req,res,next)=>{
     try{ 
        let token = req.headers.authorization;
       
        if(!token){
            return res.json({
            message: 'Token is missing'
            })
        }

        let tokenResult = jwt.verify(token, "Shh");
        next()


     }catch(err){
          res.json({
           message: 'Invalid or expired token'
          })
     }
  
   // console.log(tokenResult)
    
   

}

module.exports = authentication;