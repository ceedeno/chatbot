import { Box, Paper, Tooltip, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';
import { MESSAGE_SENTIMENT_DESCRIPTION } from '../../utility/constants';

function Sentiment() {
    const sentiment = useSelector((state) => state.sentiment.sentimentRate);

    return (
        <Paper elevation={3} sx={{ p: 2, height: '200px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    color="primary.main"
                >
                    Sentiment
                </Typography>
                <Tooltip title={MESSAGE_SENTIMENT_DESCRIPTION}>
                    <InfoOutlinedIcon sx={{ color: 'warning.light' }} />
                </Tooltip>
            </Box>
            <Box sx={{ height: '130px' }}>
                <Gauge
                    value={sentiment}
                    startAngle={-110}
                    endAngle={110}
                    valueMin={0}
                    valueMax={10}
                    sx={{
                        [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 40,
                            transform: 'translate(0px, 0px)',
                        },
                    }}
                    text={
                        ({ value, valueMax }) => `${value} / ${valueMax}`
                    }
                />
                {sentiment < 4 && sentiment >= 1 && (
                    <Box sx={{ color: 'error.light' }}>
                        <SentimentDissatisfiedOutlinedIcon fontSize="large" />
                    </Box>
                )}
                {sentiment >= 4 && sentiment <= 7 && (
                    <Box sx={{ color: 'warning.light' }}>
                        <SentimentNeutralOutlinedIcon fontSize="large" />
                    </Box>
                )}
                {sentiment > 7 && (
                    <Box sx={{ color: 'success.light' }}>
                        <SentimentSatisfiedOutlinedIcon fontSize="large" />
                    </Box>
                )}
            </Box>
        </Paper>
    );
}

export default Sentiment;