import { AGENT_USER_INFO } from '../../utility/constants.js';
import { RESET_STATE } from '../types/chat.js';
import { SET_CURRENT_USER } from '../types/current_user.js';

const INITIAL_STATE = {
    currentUserInfo: AGENT_USER_INFO
};

const currentUserReducer = function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case RESET_STATE:
            return INITIAL_STATE;
        case SET_CURRENT_USER:
            return { ...state, currentUserInfo: action.payload };
        default:
            return state;
    }
};

export default currentUserReducer;