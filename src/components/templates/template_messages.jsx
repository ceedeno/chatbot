import { Box, Button, Card, CardActions, CardContent, Paper, Tooltip, Typography } from '@mui/material';
import { MESSAGE_TEMPLATES, TEMPLATES_DESCRIPTION } from '../../utility/constants';
import { useDispatch } from 'react-redux';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { openEditor, setEditorContent } from '../../redux/actions/editor';
import { useCallback } from 'react';

function TemplateMessages() {
    const dispatch = useDispatch();

    const handleUseTemplate = useCallback((text) => {
        dispatch(setEditorContent(text));
        dispatch(openEditor());
    }, [dispatch]);

    return (
        <Paper elevation={3} sx={{ minWidth: '350px' }}>
            <Box sx={{ height: '100%', backgroundColor: 'action.hover' }}>
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        color="primary.main"
                    >
                        Templates
                    </Typography>
                    <Tooltip title={TEMPLATES_DESCRIPTION}>
                        <InfoOutlinedIcon sx={{ color: 'warning.light' }} />
                    </Tooltip>
                </Box>
                <Box
                    sx={{
                        p: 1,
                        height: '600px',
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
            </Box>
        </Paper>
    );
}

export default TemplateMessages;