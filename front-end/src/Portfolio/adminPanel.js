import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import UserMessages from "./userMessages";
import "./admin.css"

const AdminHeaders = () => {
   return (<>
      <div className="header">
         <NavLink className="Header-nav" to="/"><b><i class="bi bi-house-fill"></i>Home</b></NavLink>
         <NavLink className="Header-nav" to="/admin-panel/user-messages"><b>Your Messages</b></NavLink>
         <NavLink className="Header-nav" to="/admin-panel/chat"><b>Chat</b></NavLink>
      </div>
      <Outlet />
   </>)
}

export default AdminHeaders