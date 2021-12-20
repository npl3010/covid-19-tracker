import React, { useEffect, useState } from 'react';

// Packages:
import { Grid } from '@mui/material';

// Components:
import LineGraph from '../Charts/LineGraph';
import CountryMap from '../Charts/CountryMap';

function SummaryInfo(props) {
    const [mapData, setMapData] = useState({});

    useEffect(() => {
        if (props.selectedCountryID) {
            // PROBLEM: THIS LINE OF CODE DOES NOT WORK:
            import(`@highcharts/map-collection/countries/${props.selectedCountryID}/${props.selectedCountryID}-all.geo.json`)
                .then((response) => {
                    setMapData(response);
                });
        }
    }, [props.selectedCountryID]);

    return (
        <div className='summary-info-wrapper'>
            <Grid container spacing={3}>
                <Grid item sm={8} xs={12}>
                    <LineGraph data={props.report}></LineGraph>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <CountryMap mapData={mapData}></CountryMap>
                </Grid>
            </Grid>
        </div>
    );
}

export default SummaryInfo;