import "./index.scss";
import "aos/dist/aos.css";
import { useCallback, useContext, useEffect, useState } from "react";
import AOS from "aos";
import { store } from "./mainHeader";
import { getUserContactMessagesCount } from "../network/portfolioApiService/portfolioApiService";
import Navbar from "../components/layout/Navbar";
import SupportWidget from "../components/layout/SupportWidget";
import Home from "../components/sections/Home";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Services from "../components/sections/Services";
import Academics from "../components/sections/Academics";
import Contact from "../components/sections/Contact";
import Footer from "./Footer/footer";

export default function Index() {
  const [count, setCount] = useContext(store);
  const [adminView, setAdminView] = useState(() => {
    const savedValue = localStorage.getItem("portfolio_admin_view");
    return savedValue ? JSON.parse(savedValue) : false;
  });

  useEffect(() => {
    AOS.init({ duration: 1500, once: false, mirror: true });
    AOS.refresh();
  }, []);

  const getUsersMessagesCount = useCallback(async () => {
    try {
      const data = await getUserContactMessagesCount();
      if (data.status.code === 200 && data?.response?.totalMessages) {
        setCount(data.response.totalMessages);
      }
    } catch (err) {
      console.log(err);
    }
  }, [setCount]);

  useEffect(() => {
    getUsersMessagesCount();
  }, [getUsersMessagesCount]);

  return (
    <>
      <div className="container-fluid">
        <Navbar adminView={adminView} count={count} />
        <div className="row"><Home /></div>
        <div className="row"><About /></div>
        <div className="row"><Experience /></div>
        <div className="row"><Skills /></div>
        <div className="row"><Projects /></div>
        <div className="row"><Services /></div>
        {/* <div className="row"><Academics /></div> */}
        <div className="row"><Contact onMessageSent={getUsersMessagesCount} /></div>
        <div className="row">
          <Footer adminView={adminView} setAdminView={setAdminView} />
        </div>
      </div>
      <SupportWidget />
    </>
  );
}
