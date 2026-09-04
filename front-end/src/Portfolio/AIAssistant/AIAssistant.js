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
    askAIStream,
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

    const [isLoadingConversation, setIsLoadingConversation] =
        useState(true);

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

    useEffect(() => {

        const loadConversation = async () => {

            setIsLoadingConversation(true);

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

            } finally {

                setIsLoadingConversation(false);

            }

        };

        loadConversation();

    }, [conversationId]);

    useEffect(() => {

        if (!messagesRef.current)
            return;


        messagesRef.current.scrollTop =
            messagesRef.current.scrollHeight;

    }, [messages]);


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



        const assistantMessageId =
            Date.now() + 1;



        let assistantMessageCreated = false;
        try {

            const payload = {
                conversationId,
                message: text,
            };



            let completeText = "";



            let characterQueue = "";



            let isTypingCharacters = false;


            const createAssistantMessage = () => {

                if (assistantMessageCreated)
                    return;


                assistantMessageCreated = true;


                setMessages((prev) => [
                    ...prev,
                    {
                        id: assistantMessageId,
                        sender: "assistant",
                        text: "",
                    }
                ]);
            };



            const typeNextCharacter = () => {


                if (!characterQueue.length) {

                    isTypingCharacters = false;

                    return;
                }


                isTypingCharacters = true;

                createAssistantMessage();



                const character =
                    characterQueue.charAt(0);

                characterQueue =
                    characterQueue.slice(1);

                completeText += character;



                setMessages((prev) =>
                    prev.map((message) =>
                        message.id ===
                            assistantMessageId

                            ? {
                                ...message,
                                text: completeText,
                            }

                            : message
                    )
                );



                const typingDelay =
                    Math.floor(Math.random() * 16) + 35;

                setTimeout(
                    typeNextCharacter,
                    typingDelay
                );
            };


            await askAIStream(

                payload,

                (chunk) => {

                    console.log(
                        "Received stream chunk:",
                        JSON.stringify(chunk)
                    );

                    setIsTyping(false);

                    characterQueue += chunk;

                    if (!isTypingCharacters) {

                        typeNextCharacter();
                    }
                },

                () => {

                    console.log(
                        "Backend streaming completed"
                    );

                    const waitForTyping =
                        () => {

                            if (
                                characterQueue.length > 0 ||
                                isTypingCharacters
                            ) {

                                setTimeout(
                                    waitForTyping,
                                    50
                                );

                                return;
                            }


                            setLoading(false);
                            setIsTyping(false);

                            if (
                                isVoiceInput &&
                                completeText
                            ) {

                                setIsSpeaking(true);


                                speak(
                                    completeText,
                                    () => {
                                        setIsSpeaking(false);
                                    }
                                );
                            }
                        };


                    waitForTyping();
                },

                (error) => {

                    console.error(
                        "AI Stream Error:",
                        error
                    );


                    setMessages((prev) => {


                        if (
                            !assistantMessageCreated
                        ) {

                            return [
                                ...prev,
                                {
                                    id:
                                        assistantMessageId,

                                    sender:
                                        "assistant",

                                    text:
                                        "Sorry, something went wrong.",
                                }
                            ];
                        }


                        return prev.map(
                            (message) =>
                                message.id ===
                                    assistantMessageId

                                    ? {
                                        ...message,

                                        text:
                                            "Sorry, something went wrong.",
                                    }

                                    : message
                        );
                    });


                    setLoading(false);
                    setIsTyping(false);
                }
            );


        } catch (error) {

            console.error(
                "AI Error:",
                error
            );


            setMessages((prev) => {

                if (
                    !assistantMessageCreated
                ) {

                    return [
                        ...prev,
                        {
                            id:
                                assistantMessageId,

                            sender:
                                "assistant",

                            text:
                                "Sorry, something went wrong.",
                        }
                    ];
                }


                return prev.map(
                    (message) =>
                        message.id ===
                            assistantMessageId

                            ? {
                                ...message,

                                text:
                                    "Sorry, something went wrong.",
                            }

                            : message
                );
            });


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

                {isLoadingConversation ? (

                    <div className="ai-chat-loading">

                        <div className="ai-loader"></div>

                        <p>Loading conversation...</p>

                    </div>

                ) : (

                    <>
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
                                    sender: "assistant",
                                    text: "",
                                }}
                                typing={true}
                            />

                        )}
                    </>

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