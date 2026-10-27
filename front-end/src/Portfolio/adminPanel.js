import {
   NavLink,
   Outlet,
   useNavigate
} from "react-router-dom";
import { useState } from "react";

import "./admin.scss";

import {
   adminLogout
} from "../network/portfolioApiService/portfolioApiService";


const AdminHeaders = () => {

   const navigate = useNavigate();
   const [isNavbarOpen, setIsNavbarOpen] = useState(false);


   const handleAdminLogout = async () => {

      try {

         const res = await adminLogout();

         if (res?.status?.code === 200) {

            localStorage.removeItem("accesstoken");

            navigate("/admin-login");
         }

      } catch (err) {

         console.log(err);
      }
   };


   return (
      <>
         <div className="row admin-navbar-container">

            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">

               <div className="container-fluid">

                  <NavLink
                     className="navbar-brand"
                     to="/"
                  >
                     Portfolio
                  </NavLink>


                  <button
                     className="navbar-toggler"
                     type="button"
                     aria-controls="adminNavbarContent"
                     aria-expanded={isNavbarOpen}
                     aria-label={isNavbarOpen ? "Close admin menu" : "Open admin menu"}
                     onClick={() => setIsNavbarOpen((open) => !open)}
                  >
                     <span className="navbar-toggler-icon" aria-hidden="true"></span>
                  </button>


                  <div
                     className={`collapse navbar-collapse${isNavbarOpen ? " show" : ""}`}
                     id="adminNavbarContent"
                  >

                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-1">

                        <li className="nav-item">

                           <NavLink
                              className="nav-link"
                              to="/admin-panel/user-messages"
                              onClick={() => setIsNavbarOpen(false)}
                           >
                              Your Messages
                           </NavLink>

                        </li>


                        <li className="nav-item">

                           <NavLink
                              className="nav-link"
                              to="/admin-panel/chat"
                              onClick={() => setIsNavbarOpen(false)}
                           >
                              Chat
                           </NavLink>

                        </li>


                        <li className="nav-item">

                           <button
                              type="button"
                              className="nav-link admin-logout"
                              onClick={handleAdminLogout}
                           >
                              Log Out
                           </button>

                        </li>

                     </ul>

                  </div>

               </div>

            </nav>

         </div>

         <Outlet />
      </>
   );
};


export default AdminHeaders;
