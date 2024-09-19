import React from 'react';
import "./admin.css";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ForgotPassword() {

    const[inputData,setInputdata]= useState({adminEmail:""})
    const[responceData,setResponceData] = useState()
    const[loginBtnstatus,setloginBtnstatus] = useState()

    const navigate=useNavigate()

    const handleChange=(field,value)=>{
      setResponceData()
        setInputdata({[field]:value})
    }

    const loginEvent=()=>{
            setloginBtnstatus(true)
            axios.post("https://my-portfolio-0vcb.onrender.com/emailforPassWordChange", inputData).then((res)=>{
              // console.log(res.data)
               if(res.data){
                  setloginBtnstatus()
                  if(res.data.Fail){
                     setResponceData(res.data.Fail)
                  }else{
                     setloginBtnstatus()
                   window.alert(`This Your Password "${res.data.adminResult.adminPassword}"`) 
                   navigate("/adminLogin")
                }
               }
               
            })
    }

  return (<>
     <div className='passWordContainer'>
        <div className="passWordForm">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"><b>Enter Email address:</b></label><br />
          <input
              onChange={(e)=>{handleChange("adminEmail",e.target.value)}}
            type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter Your Email" />
         </div>
         <div className="Login-btn">
            {loginBtnstatus ? <button class="btn btn-primary" type="button" disabled><span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Loading...</span></button>  
            :<button style={{width:"140px"}} onClick={() => { loginEvent() }} type="submit" class="btn btn-primary" id="submit">Get Password</button> }
        </div>
        <div>{responceData ? <b style={{ color: "red" }}>! {responceData}</b> : ""}</div>
        </div>
     </div>
  </>)
}

export default ForgotPassword;