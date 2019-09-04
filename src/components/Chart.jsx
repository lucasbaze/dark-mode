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
            <YAxis />
            <Tooltip />
        </LineChart>
    );
};

export class ReferenceAreaChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            left: 'dataMin',
            right: 'dataMax',
            refAreaLeft: '',
            refAreaRight: '',
            top: 'dataMax+1',
            bottom: 'dataMin-1',
            top2: 'dataMax+20',
            bottom2: 'dataMin-20',
            animation: true,
        };
    }

    componentDidMount() {
        let formattedData = this.props.sparklineData
            .map((price, idx) => {
                if (idx % 6 === 0) {
                    const timeToSubtract = 168 - idx;
                    const date = moment()
                        .subtract(timeToSubtract, 'hours')
                        .format('ddd h:mma');
                    return { value: price, date: date };
                } else if (idx === this.props.sparklineData.length - 1) {
                    const date = moment().format('ddd h:mma');
                    return { value: price, date: date };
                }
                return null;
            })
            .filter(data => data);

        this.setState({ data: formattedData });
    }

    getAxisYDomain(from, to, ref) {
        console.log(this.state.data);
        const refData = this.state.data.slice(from, to);
        console.log(refData);
        let [bottom, top] = [refData[0][ref], refData[0][ref]];
        refData.forEach(d => {
            if (d[ref] > top) top = d[ref];
            if (d[ref] < bottom) bottom = d[ref];
        });

        return [bottom | 0, top | 0];
    }

    zoom() {
        let { refAreaLeft, refAreaRight, data } = this.state;

        if (refAreaLeft === refAreaRight || refAreaRight === '') {
            this.setState(() => ({
                refAreaLeft: '',
                refAreaRight: '',
            }));
            return;
        }

        // xAxis domain
        if (refAreaLeft > refAreaRight)
            [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

        // yAxis domain
        const [bottom, top] = this.getAxisYDomain(
            refAreaLeft,
            refAreaRight,
            'value'
        );

        this.setState(() => ({
            refAreaLeft: '',
            refAreaRight: '',
            data: data.slice(),
            left: refAreaLeft,
            right: refAreaRight,
            // bottom,
            // top,
        }));
    }

    zoomOut() {
        const { data } = this.state;
        this.setState(() => ({
            data: data.slice(),
            refAreaLeft: '',
            refAreaRight: '',
            left: 'dataMin',
            right: 'dataMax',
            top: 'dataMax+1',
            bottom: 'dataMin',
            top2: 'dataMax+50',
            bottom: 'dataMin+50',
        }));
    }

    render() {
        const {
            data,
            barIndex,
            left,
            right,
            refAreaLeft,
            refAreaRight,
            top,
            bottom,
            top2,
            bottom2,
        } = this.state;

        return (
            <div className="highlight-bar-charts">
                <a
                    href="javascript: void(0);"
                    className="btn update"
                    onClick={this.zoomOut.bind(this)}
                >
                    Zoom Out
                </a>

                <p>Highlight / Zoom - able Line Chart</p>
                <LineChart
                    width={800}
                    height={400}
                    data={data}
                    onMouseDown={e => {
                        console.log(e);
                        this.setState({ refAreaLeft: e.activeLabel });
                    }}
                    onMouseMove={e =>
                        this.state.refAreaLeft &&
                        this.setState({ refAreaRight: e.activeLabel })
                    }
                    onMouseUp={this.zoom.bind(this)}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        allowDataOverflow={true}
                        dataKey="date"
                        domain={[left, right]}
                    />
                    <YAxis
                        allowDataOverflow={true}
                        domain={[bottom, top]}
                        type="number"
                        yAxisId="1"
                    />
                    <Tooltip />
                    <Line
                        yAxisId="1"
                        type="natural"
                        dataKey="value"
                        stroke="#8884d8"
                        animationDuration={300}
                    />

                    {refAreaLeft && refAreaRight ? (
                        <ReferenceArea
                            yAxisId="1"
                            x1={refAreaLeft}
                            x2={refAreaRight}
                            strokeOpacity={0.3}
                        />
                    ) : null}
                </LineChart>
            </div>
        );
    }
}
