import { memo, useEffect, useState } from 'react';

// Packages:
import moment from 'moment';
import { Button, ButtonGroup } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const generateChartOptions = (data, dateFormat = 'DD/MM/YYYY') => {
    let categories = [];
    let infectedPatients = [], recoveredPatients = [], deadPatients = [];
    // const yearFrom = 2016;
    // const yearTo = 2021;

    if (data) {
        categories = data.map((element) => moment(element.Date).format(dateFormat));
        infectedPatients = data.map((element) => element.Confirmed);
        recoveredPatients = data.map((element) => element.Recovered);
        deadPatients = data.map((element) => element.Deaths);
    }

    return {
        chart: {
            height: 500,
        },
        title: {
            text: 'Thống kê bệnh nhân nhiễm Covid-19'
        },
        subtitle: {
            text: 'Source: api.covid19api.com'
        },
        colors: ['#bb0a1e', '#228B22', '#152238'],
        xAxis: {
            categories: categories,
            crosshair: true,
            title: {
                text: `Số liệu thống kê theo thời gian`
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Số bệnh nhân'
            },
            labels: {
                formatter: function () {
                    if (this.value >= 1000 && this.value < 1000000) return parseInt(this.value) / 1000 + 'k';
                    else if (this.value >= 1000000 && this.value < 1000000000) return parseInt(this.value) / 1000000 + 'm';
                    else if (this.value >= 1000000000) return parseInt(this.value) / 1000000000 + 'b';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            useHTML: true,
            headerFormat: '<b>Năm {point.x}</b><br />',
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                },
                series: {
                    animation: true
                }
            }
        },
        series: [{
            name: 'Số ca nhiễm',
            marker: {
                symbol: 'diamond'
            },
            data: infectedPatients.map((item) => item),

        }, {
            name: 'Số ca khỏi',
            marker: {
                symbol: 'circle'
            },
            data: recoveredPatients.map((item) => item),
        }, {
            name: 'Số ca tử vong',
            marker: {
                symbol: 'square'
            },
            data: deadPatients.map((item) => item),
        }]
    };
}

function LineGraph(props) {
    const [options, setOptions] = useState({});
    const [reportScope, setReportScope] = useState('');

    useEffect(() => {
        let dataToBeReported = [];
        switch (reportScope) {
            case 'all':
                dataToBeReported = props.data.slice(props.data.length - 180);
                break;
            case 'the-last-30-days':
                dataToBeReported = props.data.slice(props.data.length - 30);
                break;
            case 'the-last-7-days':
                dataToBeReported = props.data.slice(props.data.length - 7);
                break;
            default:
                dataToBeReported = props.data.slice(props.data.length - 180);
                break;
        }
        setOptions(generateChartOptions(dataToBeReported));
    }, [props.data, reportScope]);

    return (
        <div>
            <div className='button-group'>
                <ButtonGroup>
                    <Button
                        color={reportScope === '' || reportScope === 'all' ? 'secondary' : 'primary'}
                        // disabled={reportScope === 'all'}
                        // variant="contained"
                        onClick={() => setReportScope('all')}
                    >
                        Tất cả
                    </Button>
                    <Button
                        color={reportScope === 'the-last-30-days' ? 'secondary' : 'primary'}
                        // disabled={reportScope === 'the-last-30-days'}
                        // variant="contained"
                        onClick={() => setReportScope('the-last-30-days')}
                    >
                        30 ngày gần nhất
                    </Button>
                    <Button
                        color={reportScope === 'the-last-7-days' ? 'secondary' : 'primary'}
                        // disabled={reportScope === 'the-last-7-days'}
                        // variant="contained"
                        onClick={() => setReportScope('the-last-7-days')}
                    >
                        7 ngày gần nhất
                    </Button>
                </ButtonGroup>
            </div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            ></HighchartsReact>
        </div>
    );
}

export default memo(LineGraph);