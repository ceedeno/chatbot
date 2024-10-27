import { v4 as uuidv4 } from 'uuid';
import DOMPurify from 'dompurify';

// This function could be used before sending the message to the server, so the html must be sanitized.
export const generateNewMessage = (content, senderId, recipientId) => {
    return {
        id: uuidv4(),
        content: DOMPurify.sanitize(content),
        senderId,
        recipientId
    };
};

export const removeHTMLTags = (htmlString) => {
    // Create a new DOMParser instance
    const parser = new DOMParser();
    // Parse the HTML string
    const doc = parser.parseFromString(htmlString, 'text/html');
    // Extract text content
    const textContent = doc.body.textContent || "";
    // Trim whitespace
    return textContent.trim();
};