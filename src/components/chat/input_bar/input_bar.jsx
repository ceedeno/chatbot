import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { sendMessage } from '../../../redux/actions/chat';
import { openEditor, setEditorContent } from '../../../redux/actions/editor';
import { generateNewMessage, parseToParagraph, tryParseInt } from '../../../utility/helpers';
import { isInputUnsafe } from '../../../utility/validator';
import PropTypes from 'prop-types';
import { userType } from '../../../utility/constants';
import openAiService from '../../../utility/openia_service';
import { setSentiment } from '../../../redux/actions/sentiment';

function InputBar({ message, setMessage }) {
    const currentUser = useSelector((state) => state.currentUser.currentUserInfo);
    const recipientInfo = useSelector((state) => state.chat.recipientInfo);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        dispatch(sendMessage(generateNewMessage(
            parseToParagraph(message),
            currentUser?.userId,
            recipientInfo?.userId)));

        if (currentUser.userType === userType.customer) {
            openAiService.getCustomerSentiment(message)
                .then((response) => {
                    dispatch(setSentiment(tryParseInt(response)));
                })
                .catch((error) => console.log(error));
        }
        setMessage('');

    };

    const handleEdit = () => {
        dispatch(setEditorContent(parseToParagraph(message)));
        dispatch(openEditor());
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 2
            }}>
                <Button
                    color="secondary"
                    variant="text"
                    aria-label="edit"
                    onClick={handleEdit}>
                    <EditIcon />
                </Button>
                <TextField
                    sx={{ width: '80%' }}
                    id="outlined-textarea"
                    placeholder="Reply to customer..."
                    value={message}
                    onChange={handleInputChange}
                    multiline
                    maxRows={2}
                />
                <Button
                    color="primary"
                    variant="text"
                    aria-label="edit"
                    onClick={handleSendMessage}
                    disabled={isInputUnsafe(message)}>
                    <SendIcon />
                </Button>
            </Box>
        </Box>
    );
}

InputBar.propTypes = {
    message: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired
};

export default InputBar;