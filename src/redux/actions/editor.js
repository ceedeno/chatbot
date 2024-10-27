import { CLOSE_EDITOR, OPEN_EDITOR, SET_EDITOR_CONTENT } from "../types/editor";

export const setEditorContent = (payload) => {
    return {
        type: SET_EDITOR_CONTENT,
        payload
    };
};

export const openEditor = () => {
    return {
        type: OPEN_EDITOR
    };
};

export const closeEditor = () => {
    return {
        type: CLOSE_EDITOR
    };
};