import { useCallback, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Divider, Paper, Skeleton, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import openAiService from '../../utility/openia_service';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../redux/actions/chat';
import { generateNewMessage } from '../../utility/helpers';
import { openEditor, setEditorContent } from '../../redux/actions/editor';

function Assistant() {
    const [suggestedResponse, setSuggestedResponse] = useState('');
    const [newCustomerQuery, setNewCustomerQuery] = useState('');
    const [lastCustomerQuery, setLastCustomerQuery] = useState('');
    const currentUser = useSelector((state) => state.currentUser.currentUserInfo);
    const recipientInfo = useSelector((state) => state.chat.recipientInfo);
    const dispatch = useDispatch();

    const handleInputChange = useCallback((e) => {
        setNewCustomerQuery(e.target.value);
    }, []);

    const handleSendMessageToAssistant = useCallback(() => {
        openAiService.getSuggestedResponse(newCustomerQuery)
            .then((response) => {
                setSuggestedResponse(response);
            })
            .catch((error) => console.log(error));
        setLastCustomerQuery(newCustomerQuery);
        setNewCustomerQuery('');
    }, [newCustomerQuery]);

    const handleSendMessageToCustomer = useCallback(() => {
        dispatch(sendMessage(generateNewMessage(
            suggestedResponse,
            currentUser?.userId,
            recipientInfo?.userId)));
    }, [currentUser?.userId, dispatch, recipientInfo?.userId, suggestedResponse]);

    const handleEditSuggestion = useCallback(() => {
        dispatch(setEditorContent(suggestedResponse));
        dispatch(openEditor());
    }, [dispatch, suggestedResponse]);

    return (
        <Paper elevation={3} sx={{ height: '480px', minWidth: '350px' }}>
            <Box sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box sx={{ height: '320px', overflowY: 'scroll', p: 1 }}>
                    {lastCustomerQuery ? (
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <blockquote>
                                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14, fontStyle: 'italic' }}>
                                        {lastCustomerQuery}
                                    </Typography>
                                </blockquote>
                                <Typography variant="h6" component="div">
                                    Suggestion:
                                </Typography>
                                {suggestedResponse ? (
                                    <Typography sx={{ color: 'text.secondary', mb: 1.5, fontSize: 14 }}>
                                        {suggestedResponse}
                                    </Typography>
                                ) : (
                                    <Typography variant="h1">
                                        <Skeleton />
                                    </Typography>
                                )}
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={handleEditSuggestion}>EDIT</Button>
                                <Button size="small" onClick={handleSendMessageToCustomer}>SEND</Button>
                            </CardActions>
                        </Card>
                    ) : null}
                </Box>
                <Box>
                    <Divider orientation="horizontal" flexItem sx={{ m: 2 }} />
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 2
                    }}>
                        <TextField
                            sx={{ width: '80%' }}
                            id="outlined-textarea"
                            placeholder="Ask your assitant..."
                            value={newCustomerQuery}
                            onChange={handleInputChange}
                            multiline
                            maxRows={2}
                        />
                        <Button
                            color="primary"
                            variant="text"
                            aria-label="edit"
                            onClick={handleSendMessageToAssistant}>
                            <SendIcon />
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Paper >
    );
}

export default Assistant;