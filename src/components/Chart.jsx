import React from 'react';
import moment from 'moment';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceArea,
    Label,
} from 'recharts';

export const Chart = ({ sparklineData }) => {
    const formattedData = sparklineData
        .map((price, idx) => {
            if (idx % 6 === 0) {
                const timeToSubtract = 168 - idx;
                const date = moment()
                    .subtract(timeToSubtract, 'hours')
                    .format('ddd h:mma');
                return { value: price, date };
            } else if (idx === sparklineData.length - 1) {
                const date = moment().format('ddd h:mma');
                return { value: price, date };
            }
            return null;
        })
        .filter(data => data);

    return (
        <LineChart width={1100} height={300} data={formattedData}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" interval={3} />
            <YAxis domain={['dataMin', 'dataMax']} />
            <Tooltip />
        </LineChart>
    );
};

export const CoinChart = ({ sparklineData }) => {
    const formattedData = sparklineData
        .map(([num, price], idx) => {
            if (idx % 13 === 0) {
                const date = moment(num).format('l');
                return { value: price, date: date };
            } else if (idx === sparklineData.length - 1) {
                const date = moment(num).format('l');
                return { value: price, date: date };
            }
            return null;
        })
        .filter(data => data);

    return (
        <LineChart width={1100} height={300} data={formattedData}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="date" interval={3} />
            <YAxis domain={['dataMin', 'dataMax']} />
            <Tooltip />
        </LineChart>
    );
};
