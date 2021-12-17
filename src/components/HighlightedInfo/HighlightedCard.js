import React from 'react';

// Packages:
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import CountUp from 'react-countup';

function HighlightedCard(props) {
    const generateClassName = (params) => {
        if (params.type === 'confirmed') return 'pessimistic-red'
        else if (params.type === 'recovered') return 'positive-green'
        else if (params.type === 'deaths') return 'pessimistic-dark'
        else return '';
    }

    return (
        <div>
            <Card sx={{ minWidth: 275 }} variant="outlined" className={generateClassName({ type: props.type })}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} component='p' variant='body2' gutterBottom>{props.title}</Typography>
                    <Typography sx={{ fontSize: 25 }} component='span' variant='body2' gutterBottom>
                        <CountUp end={props.count || 0} duration={3} separator='.'></CountUp>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default HighlightedCard;