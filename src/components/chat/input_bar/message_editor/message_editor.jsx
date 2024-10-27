import { Button, Dialog, DialogActions, DialogContent, DialogTitle, styled } from '@mui/material';
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
import { sendMessage } from '../../../../redux/actions/chat';
import { generateNewMessage } from '../../../../utility/helpers';
import { useCallback } from 'react';

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
            Highlight.configure({ multicolor: true }),
        ],
        content,
        onUpdate({ editor }) {
            onEditorUpdate(editor.getHTML());
        }
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="control-group">
            <div className="button-group">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'is-active' : ''}
                >
                    Underline
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    Strike
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={editor.isActive('highlight') ? 'is-active' : ''}
                >
                    Highlight
                </button>
                <EditorContent editor={editor} />
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
                    <Button autoFocus onClick={handleSendToCustomer}>
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