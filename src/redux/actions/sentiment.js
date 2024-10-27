import { SET_MESSAGE_SENTIMENT } from "../types/sentiment";

export const setSentiment = (payload) => {
    return {
        type: SET_MESSAGE_SENTIMENT,
        payload
    };
};