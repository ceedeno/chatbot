import { useState } from 'react';
import ChatBody from './chat_body/chat_body.jsx';
import ConfigurationBar from './configuration_bar/configuration_bar.jsx';
import InputBar from './input_bar/input_bar.jsx';
import { Box, Paper } from '@mui/material';
import MessageEditor from './input_bar/message_editor/message_editor.jsx';

function Chat() {
    const [inputMessage, setInputMessage] = useState(''); // new message to send state

    return (
        <Paper elevation={3}>
            <Box style={{ minHeight: '700px', maxHeight: '800px', minWidth: '500px', maxWidth: '500px' }}>
                <ConfigurationBar />
                <ChatBody />
                <InputBar
                    setMessage={setInputMessage}
                    message={inputMessage}
                />
            </Box>
            <MessageEditor setInputMessage={setInputMessage}/>
        </Paper>
    );
}

export default Chat;
