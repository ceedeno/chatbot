import Chat from './components/chat/chat.jsx';
import './App.css';
import { Box, Container } from '@mui/material';
import Assistant from './components/ai_assistant/ai_assistant.jsx';
import TemplateMessages from './components/templates/template_messages.jsx';
import Sentiment from './components/sentiment/sentiment.jsx';
import { userType } from './utility/constants.js';
import { useSelector } from 'react-redux';

function App() {
  const currentUser = useSelector((state) => state.currentUser.currentUserInfo);

  return (
    <Container>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px'
      }}>
        {currentUser.userType === userType.agent && (
          <TemplateMessages />
        )}
        <Chat />
        {currentUser.userType === userType.agent && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            height: '100%'
          }}>
            <Sentiment />
            <Assistant />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
