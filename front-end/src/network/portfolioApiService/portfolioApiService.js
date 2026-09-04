import {
    deleteRequest,
    getRequest,
    postRequest,
    patchRequest,
    aiStreamRequest
} from "../apiService";


// ========================================
// CONTACT
// ========================================

export const getUserContactMessagesCount =
    async () => {

        const res =
            await getRequest(
                "/user/contact-messages/count"
            );

        return res.data;
    };


export const postUserContact =
    async (data) => {

        const res =
            await postRequest(
                "/user/send-message",
                {
                    data
                }
            );

        return res.data;
    };


export const usersContactMessagesSearch =
    async (data) => {

        const res =
            await postRequest(
                "/user/contact-messages/search",
                {
                    data
                }
            );

        return res.data;
    };


export const deleteUserContactMessage =
    async (messageID) => {

        const res =
            await deleteRequest(
                `/user/contact-messages/delete/${messageID}`
            );

        return res.data;
    };


export const readUserContactMessage =
    async (messageID) => {

        const res =
            await patchRequest(
                `/user/contact-messages/read/${messageID}`
            );

        return res.data;
    };


// ========================================
// ADMIN AUTH
// ========================================

export const postAdminLogin =
    async (data) => {

        const res =
            await postRequest(
                "/admin/login",
                {
                    data
                }
            );

        return res.data;
    };


export const adminLogout =
    async () => {

        const res =
            await postRequest(
                "/admin/logout"
            );

        return res.data;
    };


export const sendOtp =
    async (data) => {

        const res =
            await postRequest(
                "/admin/send-login-otp",
                {
                    data
                }
            );

        return res.data;
    };


export const verifyOtp =
    async (data) => {

        const res =
            await postRequest(
                "/admin/verify-login-otp",
                {
                    data
                }
            );

        return res.data;
    };


// ========================================
// CHAT
// ========================================

export const usersChatList =
    async () => {

        const res =
            await getRequest(
                "/chat/users-list"
            );

        return res.data;
    };


export const usersChatMessages =
    async (userId) => {

        const res =
            await getRequest(
                `/chat/messages/${userId}`
            );

        return res.data;
    };


// ========================================
// AI
// ========================================

export const askAI =
    async (data) => {

        const res =
            await postRequest(
                "/ai/chat",
                {
                    data
                }
            );

        return res.data;
    };


export const askAIStream =
    (
        data,
        onChunk,
        onComplete,
        onError
    ) => {

        return aiStreamRequest(
            "/ai/chat",
            {
                data,
                onChunk,
                onComplete,
                onError
            }
        );
    };


export const getAIConversation =
    async (conversationId) => {

        const response =
            await getRequest(
                `/ai/chat/${conversationId}`
            );

        return response.data;
    };