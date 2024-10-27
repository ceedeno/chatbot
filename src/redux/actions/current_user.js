import { SET_CURRENT_USER } from "../types/current_user";

export const setCurrentUser = (payload) => {
    return {
        type: SET_CURRENT_USER,
        payload
    };
};