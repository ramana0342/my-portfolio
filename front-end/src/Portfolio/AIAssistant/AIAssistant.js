import React, {
    useState,
    useEffect,
    useRef
} from "react";

import "./AIAssistant.scss";

import AIHeader from "./AIHeader";
import { welcomeMessage } from "./aiData";
import AIMessage from "./AIMessage";
import AIInput from "./AIInput";

import {
    askAI,
    getAIConversation
} from "../../network/portfolioApiService/portfolioApiService";

import { v4 as uuidv4 } from "uuid";

import useSpeechSynthesis
    from "./hooks/useSpeechSynthesis";


const AIAssistant = ({ onClose }) => {

    const [messages, setMessages] =
        useState([welcomeMessage]);

    const [loading, setLoading] =
        useState(false);

    const [isTyping, setIsTyping] =
        useState(false);

    const [isSpeaking, setIsSpeaking] =
        useState(false);

    const messagesRef =
        useRef(null);

    const {
        speak,
        stop
    } = useSpeechSynthesis();


    const [conversationId] =
        useState(() => {

            let id =
                localStorage.getItem(
                    "ai_conversation_id"
                );

            if (!id) {

                id = uuidv4();

                localStorage.setItem(
                    "ai_conversation_id",
                    id
                );
            }

            return id;
        });


    /*
     * Load previous conversation
     */
    useEffect(() => {

        const loadConversation = async () => {

            try {

                const response =
                    await getAIConversation(
                        conversationId
                    );

                if (
                    response.success &&
                    response.messages?.length > 0
                ) {

                    const previousMessages =
                        response.messages.map(
                            (item, index) => ({
                                id:
                                    `${conversationId}-${index}`,

                                sender:
                                    item.role === "user"
                                        ? "user"
                                        : "assistant",

                                text:
                                    item.message,
                            })
                        );

                    setMessages([
                        welcomeMessage,
                        ...previousMessages,
                    ]);
                }

            } catch (error) {

                console.error(
                    "Load AI Conversation Error:",
                    error
                );
            }

        };

        loadConversation();

    }, [conversationId]);


    /*
     * Auto scroll
     */
    useEffect(() => {

        if (!messagesRef.current)
            return;

        messagesRef.current.scrollTo({

            top:
                messagesRef.current
                    .scrollHeight,

            behavior: "smooth",
        });

    }, [messages]);


    /*
     * Send message
     */
    const handleSend = async (
        text,
        isVoiceInput = false
    ) => {

        if (!text.trim())
            return;


        const userMessage = {

            id: Date.now(),

            sender: "user",

            text,
        };


        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        setLoading(true);
        setIsTyping(true);


        try {

            const payload = {

                conversationId,

                message: text,
            };


            const response =
                await askAI(payload);


            setIsTyping(false);


            const aiMessage = {

                id:
                    Date.now() + 1,

                sender:
                    "assistant",

                text:
                    response.reply,
            };


            setMessages((prev) => [
                ...prev,
                aiMessage
            ]);


            /*
             * Speak only for voice input
             */
            if (isVoiceInput) {

                setIsSpeaking(true);

                speak(
                    response.reply,
                    () => {
                        setIsSpeaking(false);
                    }
                );
            }


        } catch (error) {

            console.log(
                "AI Error:",
                error
            );


            let errorMessage =
                "Sorry, something went wrong.";


            if (
                error?.response?.status === 429 &&
                error?.response?.data?.code ===
                "AI_DAILY_LIMIT_REACHED"
            ) {

                errorMessage =
                    "AI access limit reached. Please try again later.";
            }


            setMessages((prev) => [

                ...prev,

                {
                    id:
                        Date.now() + 1,

                    sender:
                        "assistant",

                    text:
                        errorMessage,
                }

            ]);

        } finally {

            setLoading(false);

            setIsTyping(false);
        }
    };


    /*
     * Stop speech
     */
    const handleStopAudio = () => {

        stop();

        setIsSpeaking(false);
    };


    return (

        <div className="ai-assistant">

            <AIHeader
                onClose={onClose}
            />


            <div
                className="ai-messages"
                ref={messagesRef}
            >

                {messages.map(
                    (message) => (

                        <AIMessage
                            key={message.id}
                            message={message}
                        />

                    )
                )}


                {isTyping && (

                    <AIMessage

                        message={{
                            sender:
                                "assistant",

                            text: "",
                        }}

                        typing={true}
                    />

                )}

            </div>


            {isSpeaking && (

                <button
                    type="button"
                    className="ai-stop-audio"
                    onClick={
                        handleStopAudio
                    }
                >
                    Stop Audio
                </button>

            )}


            <AIInput
                onSend={handleSend}
                loading={loading}
            />

        </div>
    );
};


export default AIAssistant;