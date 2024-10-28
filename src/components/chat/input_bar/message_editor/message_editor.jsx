import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { closeEditor, setEditorContent } from '../../../../redux/actions/editor';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Highlight from '@tiptap/extension-highlight';
import { EditorContent, useEditor } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import FormatBoldOutlinedIcon from '@mui/icons-material/FormatBoldOutlined';
import FormatUnderlinedOutlinedIcon from '@mui/icons-material/FormatUnderlinedOutlined';
import FormatItalicOutlinedIcon from '@mui/icons-material/FormatItalicOutlined';
import StrikethroughSOutlinedIcon from '@mui/icons-material/StrikethroughSOutlined';
import HighlightOutlinedIcon from '@mui/icons-material/HighlightOutlined';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { sendMessage } from '../../../../redux/actions/chat';
import Link from '@tiptap/extension-link';
import { generateNewMessage } from '../../../../utility/helpers';
import { useCallback } from 'react';
import { isInputEmpty, isInputUnsafe } from '../../../../utility/validator';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Editor = ({ onEditorUpdate, content }) => {
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
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
            }),
            Highlight.configure({ multicolor: true }),
        ],
        content,
        onUpdate({ editor }) {
            onEditorUpdate(editor.getHTML());
        }
    });

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="control-group">
            <div className="button-group">
                <Button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <FormatBoldOutlinedIcon />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <FormatItalicOutlinedIcon />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                    <FormatUnderlinedOutlinedIcon />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <StrikethroughSOutlinedIcon />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                >
                    <HighlightOutlinedIcon />
                </Button>
                <Button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                    <AddLinkIcon />
                </Button>
                <Box sx={{ minHeight: '30px', border: 1, borderColor: 'grey[500]' }}>
                    <EditorContent editor={editor} />
                </Box>
            </div>
        </div>
    );
};

Editor.propTypes = {
    content: PropTypes.string.isRequired,
    onEditorUpdate: PropTypes.func.isRequired
};

const MessageEditor = ({ setInputMessage }) => {
    const currentUser = useSelector((state) => state.currentUser.currentUserInfo);
    const recipientInfo = useSelector((state) => state.chat.recipientInfo);
    const openEditor = useSelector((state) => state.editor.open);
    const editorContent = useSelector((state) => state.editor.content);
    const dispatch = useDispatch();

    const handleClose = useCallback(() => {
        dispatch(closeEditor());
    }, [dispatch]);

    const handleEditorUpdate = useCallback((newContent) => {
        dispatch(setEditorContent(newContent));
    }, [dispatch]);

    const handleSendToCustomer = useCallback(() => {
        dispatch(sendMessage(generateNewMessage(
            editorContent,
            currentUser?.userId,
            recipientInfo?.userId)));
        setInputMessage('');
        dispatch(setEditorContent(''));
        handleClose();
    }, [currentUser?.userId, dispatch, editorContent, handleClose, recipientInfo?.userId, setInputMessage]);

    if (!openEditor) {
        return null;
    }

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openEditor}
                fullWidth={true}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Editor
                </DialogTitle>
                <DialogContent dividers>
                    <Editor
                        onEditorUpdate={handleEditorUpdate}
                        content={editorContent}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        CANCEL
                    </Button>
                    <Button
                        onClick={handleSendToCustomer}
                        disabled={isInputUnsafe(editorContent) || isInputEmpty(editorContent)}>
                        SEND
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
};

MessageEditor.propTypes = {
    setInputMessage: PropTypes.func.isRequired
};

export default MessageEditor;