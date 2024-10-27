import { Box, Button, Card, CardActions, CardContent, Paper, Typography } from '@mui/material';
import { MESSAGE_TEMPLATES } from '../../utility/constants';
import { useDispatch } from 'react-redux';
import { openEditor, setEditorContent } from '../../redux/actions/editor';

function TemplateMessages() {
    const dispatch = useDispatch();

    const handleUseTemplate = (text) => {
        dispatch(setEditorContent(text));
        dispatch(openEditor());
    };

    return (
        <Paper elevation={3} sx={{ minWidth: '350px' }}>
            <Box
                sx={{
                    p: 1,
                    height: '700px',
                    overflowY: 'scroll'
                }}>
                {MESSAGE_TEMPLATES.map((template) => (
                    <Card key={template.id} sx={{ m: 1 }}>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {template.title}
                            </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5, fontSize: 14 }}>
                                    {template.text}
                                </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => handleUseTemplate(template.text)}>USE TEMPLATE</Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Paper>
    );
}

export default TemplateMessages;