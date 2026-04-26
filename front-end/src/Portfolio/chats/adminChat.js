import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { getSocketURL } from "../../network/ApiConfig";
import { usersChatList, usersChatMessages } from "../../network/portfolioApiService/portfolioApiService";


const AdminChat = () => {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [unread, setUnread] = useState({});
    const [typing, setTyping] = useState("");
    const chatRef = useRef(null);
    const isAtBottomRef = useRef(true);
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
    const [activeChatUser, setActiveChatUser] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(getSocketURL(), {
            transports: ["websocket"], // 🔥 important for production
        });
        setSocket(newSocket);
        return () => {
            newSocket.disconnect(); // 🔥 IMPORTANT
        };
    }, []);



    const handleScroll = () => {
        const el = chatRef.current;
        if (!el) return;

        const isBottom =
            el.scrollHeight - el.scrollTop <= el.clientHeight + 50;

        isAtBottomRef.current = isBottom;
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const el = chatRef.current;
        if (!el) return;

        el.addEventListener("scroll", handleScroll);

        return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    // ---------------- ADMIN JOIN ----------------
    useEffect(() => {
        if (!socket) return;
        socket.emit("join_admin");
    }, [socket]);

    // ---------------- LOAD USERS ----------------
    const fetchUsers = async () => {
        try {
            let res = await usersChatList()

            const data = res.response;
            setUsers(data);

            // ✅ ONLY DESKTOP AUTO SELECT
            if (!isMobile && !activeChatUser && data.length > 0) {
                setActiveChatUser(data[0]);
            }

        } catch (err) {
            console.log(err)
        }
    };

    // ---------------- GLOBAL SOCKET EVENTS ----------------
    useEffect(() => {
        if (!socket) return;
        fetchUsers();

        socket.on("update_user_list", fetchUsers);
        socket.on("online_users", (data) => {
            setOnlineUsers(data.users || []);
        });

        socket.on("new_message_alert", (data) => {
            const user_id = data?.user_id;
            const sender_type = data?.sender_type;

            if (!user_id) return;
            if (sender_type !== "user") return;

            setUnread((prev) => ({
                ...prev,
                [user_id]: (prev[user_id] || 0) + 1,
            }));
        });

        return () => {
            socket.off("update_user_list");
            socket.off("online_users");
            socket.off("new_message_alert");
        };
    }, [activeChatUser, socket]);

    // ---------------- LOAD MESSAGES ----------------
    useEffect(() => {
        if (!socket || !activeChatUser) return;

        getUserChatMessages()

        socket.emit("join_room", activeChatUser.user_id);

        setUnread((prev) => ({
            ...prev,
            [activeChatUser.user_id]: 0,
        }));
    }, [activeChatUser, socket]);

    const getUserChatMessages = async () => {
        try {
            const data = await usersChatMessages(activeChatUser.user_id)
            setMessages(data?.response)
        } catch (err) {
            console.log(err)
        }
    }

    // ---------------- SOCKET MESSAGE LISTENER (FIXED - NO DUPLICATES) ----------------
    useEffect(() => {
        if (!socket) return;
        const handler = (data) => {
            if (!activeChatUser) return;
            if (activeChatUser.user_id !== data.user_id) return;

            setMessages((prev) => {
                const exists = prev.some(
                    (m) =>
                        m.message === data.message &&
                        m.created_at === data.created_at
                );

                if (exists) return prev;

                return [...prev, data];
            });
        };

        socket.on("receive_message", handler);

        return () => socket.off("receive_message", handler);
    }, [activeChatUser, socket]);

    // ---------------- TYPING ----------------
    useEffect(() => {
        if (!socket) return;
        const handler = ({ user_id, sender }) => {
            if (activeChatUser?.user_id === user_id) {
                setTyping(sender);
                setTimeout(() => setTyping(""), 1500);
            }
        };

        socket.on("typing", handler);

        return () => socket.off("typing", handler);
    }, [activeChatUser, socket]);

    // ---------------- SEND MESSAGE ----------------


    const sendMessage = () => {
        if (!socket || !message.trim()) return;

        socket.emit("send_message", {
            user_id: activeChatUser.user_id,
            sender_type: "admin",
            name: "Admin",
            message,
        });

        setMessage("");

        // 🔥 FORCE SCROLL TO BOTTOM ON SEND
        scrollToBottom();

    };

    // ---------------- AUTO SCROLL ----------------
    useEffect(() => {
        if (!messages.length) return;

        if (isMobile) {
            scrollToBottom(); // smooth mobile scroll
        } else if (isAtBottomRef.current) {
            scrollToBottom(); // desktop only if at bottom
        }
    }, [messages, activeChatUser]);

    const scrollToBottom = () => {
        const el = chatRef.current;
        if (!el) return;

        requestAnimationFrame(() => {
            el.scrollTo({
                top: el.scrollHeight,
                behavior: "smooth",
            });
        });
    };

    return (
        <div className="chat-container">

            {/* SIDEBAR */}
            <div className={`chat-sidebar ${activeChatUser ? "hide-on-mobile" : ""}`}>
                <div className="users-header">Users</div>

                {users.map((user) => {
                    const isOnline = onlineUsers.includes(user.user_id);

                    return (
                        <div
                            key={user.user_id}
                            onClick={() => {
                                setActiveChatUser(user);
                                setUnread((prev) => ({ ...prev, [user.user_id]: 0 }));
                            }}
                            className={`user-item ${activeChatUser?.user_id === user.user_id ? "active" : ""
                                }`}
                        >
                            <div className="user-top">
                                <span>{user.name || user.user_id}</span>

                                {unread[user.user_id] > 0 && (
                                    <span className="unread-badge">
                                        {unread[user.user_id]}
                                    </span>
                                )}
                            </div>

                            <div className={`status ${isOnline ? "online" : "offline"}`}>
                                {isOnline ? "Online" : "Offline"}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CHAT */}
            <div className={`chat-main ${!activeChatUser ? "hide-on-mobile" : ""}`}>

                {activeChatUser ? (
                    <>
                        {/* HEADER */}
                        <div className="chat-header">
                            <button
                                className="back-btn"
                                onClick={() => setActiveChatUser(null)}
                            >
                                ←
                            </button>

                            Chat with {activeChatUser.name}
                        </div>

                        {/* MESSAGES */}
                        <div className="chat-messages" ref={chatRef}>
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`message ${msg.sender_type === "admin" ? "admin-msg" : "user-msg"
                                        }`}
                                >
                                    <div>{msg.message}</div>
                                    <small>
                                        {msg.created_at &&
                                            new Date(msg.created_at).toLocaleTimeString()}
                                    </small>
                                </div>
                            ))}

                            {typing && (
                                <div className="message user-msg typing-bubble">
                                    {typing} typing...
                                </div>
                            )}
                        </div>

                        {/* INPUT */}
                        <div className="chat-input">
                            <input
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                    socket.emit("typing", {
                                        user_id: activeChatUser.user_id,
                                        sender: "Admin",
                                    });
                                }}
                                placeholder="Type message..."
                            />

                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </>
                ) : (
                    <div className="no-chat">Select a user</div>
                )}
            </div>
        </div>
    );
};

export default AdminChat;