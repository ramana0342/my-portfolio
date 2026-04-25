import { deleteRequest, getRequest , postRequest } from "../apiService";

export const getUserContactMessagesCount = async()=>{
    let res = await getRequest("/user/contact-messages/count");
    return res.data;
}

export const postUserContact = async(data)=>{
    let res = await postRequest("/user/send-message",  {data: data});
    return res.data;
}

export const postAdminLogin = async(data)=>{
    let res = await postRequest("/admin/login",  {data: data});
    return res.data;
}

export const usersContactMessagesSearch = async(data)=>{
    let res = await postRequest("/user/contact-messages/search",  {data: data});
    return res.data;
}

export const deleteUserContactMessage = async(messageID)=>{
    let res = await deleteRequest(`/user/contact-messages/delete/${messageID}`);
    return res.data;
}