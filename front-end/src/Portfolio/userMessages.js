import {
  useEffect,
  useRef,
  useState
} from "react";

import "aos/dist/aos.css";
import AOS from "aos";

import { toast } from "react-toastify";

import {
  usersContactMessagesSearch,
  deleteUserContactMessage,
  readUserContactMessage
} from "../network/portfolioApiService/portfolioApiService";

import { useNavigate } from "react-router-dom";


const UserMessages = () => {

  const [messages, setmessages] = useState([]);
  const [error, setError] = useState();
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  /*
   * Store each message card DOM element
   */
  const messageRefs = useRef(new Map());

  /*
   * Store IntersectionObserver
   */
  const observerRef = useRef(null);


  /*
   * Get messages
   */
  useEffect(() => {

    getAllUsersContactMessagesData();

  }, []);


  /*
   * Initialize AOS
   */
  useEffect(() => {

    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });

    AOS.refresh();

  }, []);


  /*
   * Observe message cards
   *
   * A message becomes READ when
   * 50% or more of that particular
   * card is visible on the screen.
   */
  useEffect(() => {

    if (!messages.length) {
      return;
    }


    /*
     * Remove previous observer
     */
    if (observerRef.current) {
      observerRef.current.disconnect();
    }


    /*
     * Create new observer
     */
    observerRef.current = new IntersectionObserver(

      async (entries) => {

        for (const entry of entries) {

          /*
           * Card is not visible
           */
          if (!entry.isIntersecting) {
            continue;
          }


          /*
           * Get message ID from card
           */
          const messageId =
            entry.target.dataset.messageId;


          /*
           * Find message
           */
          const message =
            messages.find(
              (item) => item.id === messageId
            );


          /*
           * Message not found
           */
          if (!message) {
            continue;
          }


          /*
           * Already read
           */
          if (message.is_admin_read) {

            observerRef.current?.unobserve(
              entry.target
            );

            continue;
          }


          /*
           * Stop observing immediately.
           *
           * This prevents multiple PATCH
           * requests for the same message.
           */
          observerRef.current?.unobserve(
            entry.target
          );


          try {

            const data =
              await readUserContactMessage(
                messageId
              );


            if (data.status.code === 200) {

              /*
               * Update local state immediately
               *
               * No need to reload all messages.
               */
              setmessages((prevMessages) =>
                prevMessages.map((item) =>
                  item.id === messageId
                    ? {
                      ...item,
                      is_admin_read: true
                    }
                    : item
                )
              );

            }

          } catch (err) {

            console.log(
              "Error marking message as read:",
              err
            );

          }

        }

      },

      {
        /*
         * 50% of the card must be visible
         */
        threshold: 0.5
      }

    );


    /*
     * Observe all currently rendered cards
     */
    messageRefs.current.forEach(
      (element) => {

        if (element) {

          observerRef.current.observe(
            element
          );

        }

      }
    );


    /*
     * Cleanup observer
     */
    return () => {

      observerRef.current?.disconnect();

    };

  }, [messages]);


  /*
   * Ref callback for each message card
   */
  const setMessageRef = (
    element,
    messageId
  ) => {

    if (element) {

      messageRefs.current.set(
        messageId,
        element
      );

    } else {

      messageRefs.current.delete(
        messageId
      );

    }

  };


  /*
   * Delete message
   */
  const handleDeleteUserContactMessages =
    async (messageID) => {

      setDeletingId(messageID);

      try {

        const data =
          await deleteUserContactMessage(
            messageID
          );


        if (data.status.code === 200) {

          toast.success(
            data?.status?.message
          );


          /*
           * Remove deleted message from
           * local state instead of fetching
           * everything again.
           */
          setmessages((prevMessages) =>
            prevMessages.filter(
              (item) => item.id !== messageID
            )
          );

        }

      } catch (err) {

        console.log(err);

      } finally {

        setDeletingId(null);

      }

    };


  /*
   * Get all messages
   */
  const getAllUsersContactMessagesData =
    async () => {

      try {

        const search = {};

        const data =
          await usersContactMessagesSearch(
            search
          );


        if (data.status.code === 200) {

          setmessages(
            data.response
          );

        }

      } catch (err) {

        if (
          err.response?.status === 401
        ) {

          navigate("/");

        } else {

          console.log(err);

        }

      }

    };


  /*
   * Protected route
   */
  if (error) {

    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          color: "red"
        }}
      >
        <b>
          This is Protected Route
        </b>
      </div>
    );

  }


  return (

    <div
      className="container-fluid userMessagesContainer"
      style={{
        border: "6px solid black"
      }}
    >

      <div
        className="container"
        style={{
          marginTop: "80px"
        }}
      >

        <div
          className="row user-messages-cards g-4"
        >

          {messages.length !== 0 ? (

            messages.map((item) => (

              <div
                key={item.id}
                className="col-sm-12 col-md-12 col-lg-6"
              >

                <div
                  ref={(element) =>
                    setMessageRef(
                      element,
                      item.id
                    )
                  }
                  data-message-id={item.id}
                  className="card"
                  data-aos="zoom-in-up"
                >

                  <div className="card-header">

                    <h3>
                      Recruiter Name :{" "}
                      {item.name}
                    </h3>

                  </div>


                  <div className="card-body">

                    <h5>
                      <b>Message</b>:
                    </h5>

                    <p className="card-text">
                      {item.message}
                    </p>


                    <h5>
                      <b>Contact Details</b> :
                    </h5>


                    <p
                      style={{
                        margin: "0px",
                        padding: "0px"
                      }}
                      className="card-text"
                    >
                      <b>Email Id</b> :{" "}
                      {item.email}
                    </p>


                    <p className="card-text">
                      <b>Mobile No</b> :{" "}
                      {item.mobile}
                    </p>


                    <button
                      onClick={() =>
                        handleDeleteUserContactMessages(
                          item.id
                        )
                      }
                      type="button"
                      className="btn btn-info"
                      disabled={
                        deletingId === item.id
                      }
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

            ))

          ) : (

            <div
              style={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                color: "red"
              }}
            >
              <b>
                Empty Messages
              </b>
            </div>

          )}

        </div>

      </div>

    </div>

  );

};


export default UserMessages;