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

export const tryParseInt = (str, defaultValue = 0) => {
    try {
      const num = parseInt(str, 10);
      if (isNaN(num)) {
        console.log('NaN while tryParseInt()');
        return defaultValue;
      }
      return num;
    } catch (error) {
        console.log('Error while tryParseInt()', error);
      return defaultValue;
    }
  };

  // TO-DO: research a better way to parse strings to html <p> strings
  export const parseToParagraph = (text) => {
    const splitText = text.split('\n\n');
    console.log(splitText);
    const paragraphArray = splitText.map((text) => '<p>' + text + '</p>');
    return paragraphArray.join('');
  };