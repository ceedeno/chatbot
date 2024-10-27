import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { sendMessage } from '../../../redux/actions/chat';
import { openEditor, setEditorContent } from '../../../redux/actions/editor';
import { generateNewMessage } from '../../../utility/helpers';
import { isInputUnsafe } from '../../../utility/validator';
import PropTypes from 'prop-types';

function InputBar({ message, setMessage}) {
    const currentUser = useSelector((state) => state.currentUser.currentUserInfo);
    const recipientInfo = useSelector((state) => state.chat.recipientInfo);
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        dispatch(sendMessage(generateNewMessage(
            message,
            currentUser?.userId,
            recipientInfo?.userId)));
        setMessage('');
    };

    const handleEdit = () => {
        dispatch(setEditorContent(message));
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