import { ADD_MESSAGE, SET_RECIPIENT_INFO } from "../types/chat";

export const sendMessage = (payload) => {
    return {
        type: ADD_MESSAGE,
        payload
    };
};

export const setRecipientInfo = (payload) => {
    return {
        type: SET_RECIPIENT_INFO,
        payload
    };
};