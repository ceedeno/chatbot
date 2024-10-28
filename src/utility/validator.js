import { UNSAFE_HTML_TAGS } from "./constants";
import { removeHTMLTags } from "./helpers";

export const isInputUnsafe = (content) => {
    return UNSAFE_HTML_TAGS.some((tag) => content.includes(tag));
};

export const isInputEmpty = (content) => {
    const isEmpty = removeHTMLTags(content) === '';
    return isEmpty;
};