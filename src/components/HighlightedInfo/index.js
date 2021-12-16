import React from 'react';

// Packages:
import { Grid } from '@mui/material';

// Components:
import HighlightedCard from './HighlightedCard';

function HighlightedInfo(props) {
    const data = props.report && props.report.length ? props.report[props.report.length - 1] : [];

    const info = [
        {
            title: 'Số ca nhiễm',
            count: data.Confirmed,
            type: 'confirmed'
        }, {
            title: 'Số ca khỏi',
            count: data.Recovered,
            type: 'recovered'
        }, {
            title: 'Số ca tử vong',
            count: data.Deaths,
            type: 'deaths'
        }
    ]

    return (
        <div className='highlighted-info-wrapper'>
            <Grid container spacing={3}>
                {
                    info.map((item, index) => {
                        return (
                            <Grid item sm={4} xs={12} key={index}>
                                <HighlightedCard title={item.title} count={item.count} type={item.type}></HighlightedCard>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </div>
    );
}

export default HighlightedInfo;