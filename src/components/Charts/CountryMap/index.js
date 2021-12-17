import React, { memo, useEffect, useRef, useState } from 'react';

// Packages:
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from "highcharts/modules/map";

highchartsMap(Highcharts);

const generateMapOptions = (mapData = null, data = []) => {
    return {
        chart: {
            height: '500',
            map: 'countries/ie/ie-all'
        },
        title: {
            text: 'Thống kê theo tỉnh thành<br><i>Chưa có dữ liệu</i>'
        },
        credits: {
            enabled: false
        },
        mapNavigation: {
            enabled: true
        },
        tooltip: {
            headerFormat: '',
        },
        colorAxis: {
            min: 0,
            stops: [
                [0.2, '#FFC4AA'],
                [0.4, '#FF8A66'],
                [0.6, '#FF392B'],
                [0.8, '#B71525'],
                [1, '	#7A0826'],
            ],
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'bottom',
        },
        series: [{
            name: 'Basemap',
            mapData: mapData,
            joinBy: ['hc-key', 'key'],
            borderColor: '#A0A0A0',
            nullColor: 'rgba(200, 200, 200, 0.3)',
            showInLegend: false,
            data: data,
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                        console.log(this);
                    }
                }
            }
        }]
    };
}

function CountryMap(props) {
    const [mapOptions, setMapOptions] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        if (Object.keys(props.mapData).length > 0) {
            const fakeData = props.mapData.features.map((feature, index) => {
                return ({
                    key: feature.properties['hc-key'],
                    value: index
                })
            });
            setMapOptions(generateMapOptions(props.mapData, fakeData));

            if (isLoaded === false) {
                setIsLoaded(true);
            }
        }
    }, [props.mapData, isLoaded]);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            chartRef.current.chart.series[0].update({
                mapData: props.mapData,
            })
        }
    }, [props.mapData]);

    return (
        <div>
            {
                isLoaded === true ? (
                    <HighchartsReact
                        constructorType={'mapChart'}
                        highcharts={Highcharts}
                        options={(mapOptions)}
                        ref={chartRef}
                    />
                ) : (
                    <>Loading...</>
                )
            }

        </div>
    );
}

export default memo(CountryMap);