import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Highlight from '@tiptap/extension-highlight';
import { EditorContent, useEditor } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Link from '@tiptap/extension-link';
import PropTypes from 'prop-types';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSelector } from 'react-redux';
import { removeHTMLTags } from '../../../../utility/helpers';
import { useCallback } from 'react';

const StyledLeftMessagePaper = styled(Paper)(({ theme }) => ({
    width: 300,
    padding: theme.spacing(1),
    ...theme.typography.body2,
    textAlign: 'initial',
    margin: 3,
    backgroundColor: theme.palette.action.hover,
}));

const StyledRightMessagePaper = styled(Paper)(({ theme }) => ({
    width: 300,
    padding: theme.spacing(1),
    ...theme.typography.body2,
    textAlign: 'initial',
    margin: 3,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
}));

function Message({ content, senderId }) {
    const currentUser = useSelector((state) => state.currentUser.currentUserInfo);
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Bold,
            Italic,
            Underline,
            Strike,
            Link.configure({
                openOnClick: true,
                autolink: true,
                defaultProtocol: 'https',
            }),
            Highlight.configure({ multicolor: true })
        ],
        content,
        editable: false
    });

    const handleCopy = useCallback(async () => {
        const pureStringContent = removeHTMLTags(content);
        await navigator.clipboard.writeText(pureStringContent);
    }, [content]);

    return (
        <Box sx={{ width: 1 }}>
            {currentUser.userId === senderId ? (
                <Box sx={{ width: 1, display: 'flex', justifyContent: 'end' }}>
                    <StyledRightMessagePaper square={false}>
                        <Box>
                            <EditorContent editor={editor} />
                        </Box>
                    </StyledRightMessagePaper>
                </Box>
            ) : (
                <Box sx={{ width: 1, display: 'flex', justifyContent: 'start' }}>
                    <StyledLeftMessagePaper square={false}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <EditorContent editor={editor} />
                            <Box>
                                <Button variant="text" size="sm" onClick={handleCopy}>
                                    <ContentCopyIcon />
                                </Button>
                            </Box>
                        </Box>
                    </StyledLeftMessagePaper>
                </Box>
            )}
        </Box>
    );
}

Message.propTypes = {
    content: PropTypes.string.isRequired,
    senderId: PropTypes.number.isRequired
};

export default Message;