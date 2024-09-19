import {  Routes, Route, NavLink, Outlet } from "react-router-dom";
import UserMessages from "./userMessages";
import ChatWithUsers from "./chatWithUsers";
import "./admin.css"



const AdminHeaders=()=>{
    return(<>
     
  
       <div className="header">
         <NavLink className="Header-nav" to = "/"><b><i class="bi bi-house-fill"></i>Home</b></NavLink> 
          <NavLink  className="Header-nav" to ="/adminPanel/UserMessage"><b>Your Messages</b></NavLink>
          {/* <NavLink  className="Header-nav" to ="/adminPanel/ChatWithUsers"><b>Chat With Users</b></NavLink> */}
       </div>

        

    <Outlet/>


    </>)
}

export default AdminHeaders