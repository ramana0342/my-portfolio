import { useEffect, useState } from "react"
import 'aos/dist/aos.css';
import AOS from 'aos';
import { store } from "./mainHeader";
import { useContext } from "react";
import { toast } from "react-toastify";
import { usersContactMessagesSearch, deleteUserContactMessage } from "../network/portfolioApiService/portfolioApiService";
import { useNavigate } from "react-router-dom";


const UserMessages = () => {

  const [messages, setmessages] = useState([])
  const [error, setError] = useState()
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    getAllUsersContactMessagesData()
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
    AOS.refresh();
  }, []);



  const handleDeleteUserContactMessages = async (messageID) => {
    setDeletingId(messageID);
    try {
      const search = {}
      const data = await deleteUserContactMessage(messageID);
      if (data.status.code === 200) {
        toast.success(data?.status?.message);
        getAllUsersContactMessagesData()
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDeletingId(null);
    }
  };

  const getAllUsersContactMessagesData = async () => {
    try {
      const search = {};
      const data = await usersContactMessagesSearch(search);

      if (data.status.code === 200) {
        setmessages(data.response);
      }

    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/");
      } else {
        console.log(err);
      }
    }
  };

  if (!error) {
    return (<>
      <div className="container-fluid userMessagesContainer " style={{ border: "6px solid black" }}>
        <div className="container" style={{ marginTop: "80px" }}>
          <div className="row user-messages-cards g-4">

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
                      <button
                        onClick={() => handleDeleteUserContactMessages(item.id)}
                        type="button"
                        className="btn btn-info"
                        disabled={deletingId === item.id}
                      >
                        {deletingId === item.id ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            {" "}Deleting...
                          </>
                        ) : (
                          "Delete Message"
                        )}
                      </button>
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