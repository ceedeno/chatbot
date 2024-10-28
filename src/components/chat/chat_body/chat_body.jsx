import { useSelector } from "react-redux";
import Message from './message/message.jsx';
import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

function ChatBody() {
    const messages = useSelector((state) => state.chat.messages);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Box
            ref={scrollRef}
            sx={{
                height: '540px',
                p: 1,
                border: 1,
                borderColor: 'grey.500',
                overflowY: 'scroll'
            }}>
            {messages.map((message) => (
                <Message key={message.id} content={message.content} senderId={message.senderId} />
            ))}
        </Box>
    );
}

export default ChatBody;