import { RESET_STATE } from '../types/chat.js';
import { CLOSE_EDITOR, OPEN_EDITOR, SET_EDITOR_CONTENT } from '../types/editor.js';

const INITIAL_STATE = {
    open: false,
    content: null
};

const editorReducer = function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case RESET_STATE:
            return INITIAL_STATE;
        case SET_EDITOR_CONTENT:
            return { ...state, content: action.payload };
        case OPEN_EDITOR:
            return { ...state, open: true };
        case CLOSE_EDITOR:
            return { ...state, open: false };
        default:
            return state;
    }
};

export default editorReducer;