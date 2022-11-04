import {FC, memo} from 'react';
import {Link} from 'react-router-dom';
import {metrics} from './data';
import moment from 'moment';
import dayjs from 'dayjs';
import {processChartData} from './utils';
import {processChartData as processChartData1} from './utils1';
import {processChartData as processChartData2} from './utils2';
import {processChartData as processChartData3} from './utils3';
import {processChartData as processChartData4} from './utils4';
import {processChartData as processChartData5} from './utils5';

interface IExampleProps {
}

const mockData = (num: number, dimensions: boolean = true) => {
    let time = '2022-10-14T08:20:19Z';
    const count = dimensions ? 5 : 1
    return new Array(count).fill({
        metrics_attrs: {
            __name__: 'lepton__acp__compute_pool_gpu_memory_allocated__MiB',
            resource__native_id: 'df83d4fc-e03c-4467-b402-54e2bb70eb6e',
            resource__resourcemanager_id: '64f1c4f6-4894-11ed-b229-0660eeed1243',
            resource__type: 'compute.acp.v1.compute_pool',
        },
        values: new Array(num / count).fill({
            metric_time: time,
            values: 687194800000,
        }),
    });
};
const typeMap: ('/' | '-t' | '-')[] = ['-t'];
const totalMap = [200, 700, 1000, 5000, 10000, 20000, 40000, 100000];

// const metricsMap = new Map([
//   [200, mockData(200)],
//   [700, mockData(700)],
//   [1000, mockData(1000)],
//   [3000, mockData(3000)],
//   [5000, mockData(5000)],
//   [10000, mockData(10000)],
//   [20000, mockData(20000)],
//   [40000, mockData(40000)],
// ]);

// typeMap.forEach((type) => {
totalMap.forEach((total) => {
    const data = mockData(total);
    const data1 = mockData(total, false);
    console.group(total + "");
    // console.time(`优化前`);
    // processChartData(data, 'GB');
    // console.timeEnd(`优化前`);
    console.time(`优化时间格式化后`);
    processChartData1(data, 'GB');
    console.timeEnd(`优化时间格式化后`);
    console.time(`添加 big 后`);
    processChartData2(data, 'GB');
    console.timeEnd(`添加 big 后`);
    console.time(`一层数据`);
    processChartData3(data1, 'GB');
    console.timeEnd(`一层数据`);
    console.time(`减少一次遍历`);
    processChartData4(data1, 'GB');
    console.timeEnd(`减少一次遍历`);
    console.time(`添加 big 后`);
    processChartData5(data1, 'GB');
    console.timeEnd(`添加 big 后`);
    console.groupEnd();
});

// });

// console.log(
//   'metrics length:',
//   metrics.reduce((prev, cur) => prev + cur.values.length, 0)
// );
// console.time('metrics');
// processChartData(metrics, '%');
// console.timeEnd('metrics');

const Example: FC<IExampleProps> = (props) => {
    return (
        <div>
            <h2>Example</h2>
            <Link to="/example/light">light demo</Link> <br/>
            <Link to="/example/counter">counter demo</Link> <br/>
            <Link to="/example/temperature">temperature demo</Link> <br/>
            <Link to="/example/flightbook">flightbook demo</Link> <br/>
        </div>
    );
};

export default memo(Example);
