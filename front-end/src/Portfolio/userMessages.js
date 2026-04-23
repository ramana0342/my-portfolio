import { useEffect, useState } from "react"

import axios from "axios";
import 'aos/dist/aos.css';
import AOS from 'aos';

import { store } from "./mainHeader";
import { useContext } from "react";
import { toast } from "react-toastify";


const UserMessages = () => {

  const [count, setCount] = useContext(store)

  const [messages, setmessages] = useState([])
  const [DeleteStatus, setDeleteStatus] = useState()
  const [error, setError] = useState()

  let token = JSON.parse(sessionStorage.getItem("token"))

  let headers = {
    "Authorization": `${token}`,
  }

  useEffect(() => {
    getAllUsersContactMessagesData()
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 1000, // duration of the animation in milliseconds
      once: false, // whether animation should happen only once - while scrolling down
      mirror: true,
    });
    AOS.refresh();
  }, []);



    const handleDeleteUserContactMessages = async (messageID) => {
    try {
      const search = {}
      const { data } = await axios.delete(`http://localhost:5000/my-portfolio/api/user/contact-messages/delete/${messageID}`);

      if (data.status.code === 200) {
        toast.success(data?.status?.message);
        getAllUsersContactMessagesData()
      }
    } catch (err) {

      console.log(err);
    }
  };

  const getAllUsersContactMessagesData = async () => {
    try {
      const search = {}
      const { data } = await axios.post(
        "http://localhost:5000/my-portfolio/api/user/contact-messages/search", search
      );

      if (data.status.code === 200) {
        setmessages(data.response);
      }
    } catch (err) {

      console.log(err);
    }
  };

  if (!error) {
    return (<>
      <div className="container-fluid userMessagesContainer " style={{ border: "6px solid black" }}>
        <div className="container" style={{ marginTop: "80px" }}>
          <div className="row">

            {messages.length !== 0 ? messages.map((item, index) => {
              return (<>


                <div class="col-sm-12 col-md-12 col-lg-6">
                  <div class="card" data-aos="zoom-in-up">
                    <div class="card-header">
                      <h3>Recruiter Name : {item.name}</h3>
                    </div>
                    <div class="card-body">
                      <h5><b>Message</b>: </h5>
                      <p className="card-text">{item.message}</p>

                      <h5><b>Contact Details</b> : </h5>
                      <p style={{ margin: "0px", padding: "0px" }} className="card-text"><b>Email Id </b>: {item.email}</p>
                      <p className="card-text"><b>Mobile No </b> : {item.mobile}</p>
                      <button onClick={() => { handleDeleteUserContactMessages(item.id) }} type="button" class="btn btn-info">Delete Message</button>
                    </div>
                  </div>
                </div>
              </>)
            }) : <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", color: "red" }}><b> Empty Messages</b></div>

            }

          </div>
        </div>
      </div>
    </>)
  }
  else {
    return <>
      <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", color: "red" }}><b> This is Protected Route</b></div>
    </>
  }
}

export default UserMessages