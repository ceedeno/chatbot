import { RESET_STATE } from '../types/chat.js';
import { SET_MESSAGE_SENTIMENT } from '../types/sentiment.js';

const INITIAL_STATE = {
    sentimentRate: 0
};

const sentimentReducer = function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case RESET_STATE:
            return INITIAL_STATE;
        case SET_MESSAGE_SENTIMENT:
            return { ...state, sentimentRate: action.payload };
        default:
            return state;
    }
};

export default sentimentReducer;