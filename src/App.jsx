import Chat from './components/chat/chat.jsx';
import './App.css';
import { Box, Container, Grid2 } from '@mui/material';
import Assistant from './components/ai_assistant/ai_assistant.jsx';
import TemplateMessages from './components/templates/template_messages.jsx';
import Sentiment from './components/sentiment/sentiment.jsx';
import { userType } from './utility/constants.js';
import { useSelector } from 'react-redux';

function App() {
  const currentUser = useSelector((state) => state.currentUser.currentUserInfo);

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={1} columns={{ xs:4, sm: 12 }}>
          {currentUser.userType === userType.agent && (
            <Grid2 size={{ xs:4, sm: 5, md: "grow"}}>
              <TemplateMessages />
            </Grid2>
          )}
          <Grid2 size={{ xs:4, sm: 7, md: 5}}>
            <Chat />
          </Grid2>
          {currentUser.userType === userType.agent && (
            <Grid2 size={{ xs:4, sm: 12, md: "grow"}}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                height: '100%'
              }}>
                <Sentiment />
                <Assistant />
              </Box>
            </Grid2>
          )}
        </Grid2>
      </Box>
    </Container>
  );
}

export default App;
