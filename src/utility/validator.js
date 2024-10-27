import { UNSAFE_HTML_TAGS } from "./constants";

export const isInputUnsafe = (content) => {
    return UNSAFE_HTML_TAGS.some((tag) => content.includes(tag));
};