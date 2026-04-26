import React, { createContext } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./index";
import { useState, useEffect } from "react";
import Login from "./adminLogin";
import AdminHeaders from "./adminPanel";
import UserMessages from "./userMessages";
import Project1 from "./project1";
import Project2 from "./project2";
import Project3 from "./project3";
import ForgotPassword from "./forgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserChat from "./chats/userChat";
import AdminChat from "./chats/adminChat";

export const store = createContext()

const MainHeader = () => {


    const [adminActivity, setAdminActivity] = useState(null)

    return (<>

        <store.Provider value={[adminActivity, setAdminActivity]}>
            <BrowserRouter>

                <Routes>
                    <Route path="/" element={<Index />}></Route>
                    <Route path="/admin-login" element={<Login />}></Route>
                    <Route path="/project1" element={<Project1 />} />
                    <Route path="/project2" element={<Project2 />} />
                    <Route path="/project3" element={<Project3 />} />
                    <Route path="/admin-panel" element={<AdminHeaders />}>
                        <Route path="user-messages" element={<UserMessages />} />
                        <Route path="chat" element={<AdminChat />} />

                    </Route>
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    {/* <Route path="/user-chat" element={<UserChat />} /> */}

                </Routes>
            </BrowserRouter>
        </store.Provider>
        <ToastContainer />

    </>)
}


export default MainHeader;