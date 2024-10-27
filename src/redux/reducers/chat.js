import { CUSTOMER_USER_INFO } from '../../utility/constants.js';
import { RESET_STATE, ADD_MESSAGE, SET_RECIPIENT_INFO } from '../types/chat.js';

const INITIAL_STATE = {
    recipientInfo: CUSTOMER_USER_INFO,
    messages: []
};

const chatReducer = function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case RESET_STATE:
            return INITIAL_STATE;
        case ADD_MESSAGE:
            return { ...state, messages: [...state.messages, action.payload] };
        case SET_RECIPIENT_INFO:
            return { ...state, recipientInfo: action.payload };
        default:
            return state;
    }
};

export default chatReducer;