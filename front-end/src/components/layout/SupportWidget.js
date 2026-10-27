import { useEffect, useRef, useState } from "react";
import { MdSupportAgent } from "react-icons/md";
import UserChat from "../../Portfolio/chats/userChat";
import AIAssistant from "../../Portfolio/AIAssistant/AIAssistant";

export default function SupportWidget() {
  const [supportMode, setSupportMode] = useState(null);
  const firstOpenRef = useRef(true);

  useEffect(() => {
    const delay = firstOpenRef.current ? 10 * 1000 : 60 * 1000;
    const timeoutId = setTimeout(() => {
      setSupportMode((currentMode) => {
        if (currentMode) return currentMode;
        firstOpenRef.current = false;
        return "menu";
      });
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [supportMode]);

  return (
    <>
    {supportMode === "menu" && (
      <div className="support-wrapper">
        <div className="support-menu">

          <div className="support-header">
            <div>
              <h5>How can I help?</h5>
              <small>Select an option</small>
            </div>

            <button
              className="support-close"
              onClick={() => setSupportMode(null)}
            >
              ✕
            </button>
          </div>

          <div
            className="support-item"
            onClick={() => setSupportMode("ai")}
          >
            <div className="support-icon ai">
              🤖
            </div>

            <div className="support-content">
              <h6>AI Assistant</h6>
              <p>Ask about my skills, projects & experience</p>
            </div>

            <span>›</span>
          </div>

          <div
            className="support-item"
            onClick={() => setSupportMode("chat")}
          >
            <div className="support-icon chat">
              💬
            </div>

            <div className="support-content">
              <h6>Live Chat</h6>
              <p>Chat directly with Ramana</p>
            </div>

            <span>›</span>
          </div>

        </div>
      </div>
    )}



    {!supportMode && (

      <div className="chat-wrapper">

        <div className="chat-attention">
          <span>👋</span>
          Need help?
        </div>

        <div
          className="chat-float-btn"
          onClick={() => {

            setSupportMode(prev =>
              prev === "menu" ? null : "menu"
            );

            const navbar =
              document.getElementById("navbarSupportedContent");

            if (navbar?.classList.contains("show")) {
              navbar.classList.remove("show");
            }
          }}
        >

          <span className="chat-glow"></span>

          <MdSupportAgent size={32} />

          <span className="chat-notification">!</span>

        </div>

      </div>

    )}

    {supportMode === "chat" && (
      <UserChat
        setIsChatOpen={() => setSupportMode(null)}
      />
    )}

    {supportMode === "ai" && (
      <AIAssistant
        onClose={() => setSupportMode(null)}
      />
    )}
    </>
  );
}
