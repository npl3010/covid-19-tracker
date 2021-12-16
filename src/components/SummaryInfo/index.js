import React from 'react';

// Packages:
import { Grid } from '@mui/material';

// Components:
import LineGraph from '../Charts/LineGraph';
import CountryMap from '../Charts/CountryMap';

function SummaryInfo(props) {
    return (
        <div className='summary-info-wrapper'>
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <LineGraph data={props.report}></LineGraph>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <CountryMap></CountryMap>
                </Grid>
            </Grid>
        </div>
    );
}

export default SummaryInfo;