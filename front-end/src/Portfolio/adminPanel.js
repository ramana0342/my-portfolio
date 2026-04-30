import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import UserMessages from "./userMessages";
import "./admin.css"
import { adminLogout } from "../network/portfolioApiService/portfolioApiService";
import { useNavigate } from "react-router-dom";

const AdminHeaders = () => {
   const navigate = useNavigate()

   const handleAdminLogout = async () => {
      try {
         let res = await adminLogout()
         if (res?.status?.code === 200) {
            localStorage.removeItem("accesstoken")
            navigate("/admin-login")
         }
      } catch (err) {
         console.log(err)
      }
   }
   return (<>
      <div className="header">
         <NavLink className="Header-nav" to="/"><b><i class="bi bi-house-fill"></i>Home</b></NavLink>
         <NavLink className="Header-nav" to="/admin-panel/user-messages"><b>Your Messages</b></NavLink>
         <NavLink className="Header-nav" to="/admin-panel/chat"><b>Chat</b></NavLink>
         <div className="Header-nav log-out-item"   onClick={() => { handleAdminLogout() }}><b>Log Out</b></div>
      </div>
      <Outlet />
   </>)
}

export default AdminHeaders