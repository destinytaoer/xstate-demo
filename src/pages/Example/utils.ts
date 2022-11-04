import moment from 'moment';
const convertMibToBytes = (value: number) => {
  return value * 1024 * 1024;
};
const convertBytesToGiB = (value: number) => {
  return value / 1024 / 1024 / 1024;
};
const convertBytesToGB = (value: number) => {
  return value / 1000 / 1000 / 1000;
};

export const convertMetricsValues = (value: number | null, name: string, unit: string) => {
  if (!value || isNaN(value)) return value;
  if (!name) return value;

  // util 为使用率 lepton__cci__container_cpu_util
  // 百分比需要 * 100
  if (name.includes('util')) {
    return value * 100;
  }

  let bytes = 0;
  // 使用量, MiB 单位 lepton__cci__gpu_memory_used__MiB
  if (name.includes('MiB')) {
    bytes = convertMibToBytes(value);
  }

  // bytes 单位 lepton__cci__container_memory_working_set_bytes
  if (name.includes('bytes')) {
    bytes = value;
  }

  switch (unit) {
    case 'GiB':
      value = convertBytesToGiB(bytes);
      break;
    case 'GB':
      value = convertBytesToGB(bytes);
      break;
    default:
  }

  return value;
};

/**
 * 添加时间戳、name、NaN转null
 * @returns
 */
export const transformToMetricsType = (metricsList: any[]): any[][] => {
  return metricsList.map((item) => {
    const valuesList = item?.values ?? [];
    const { __name__ = '' } = item?.metrics_attrs ?? {};
    return valuesList.map((val: any) => {
      const { metric_time, values } = val;
      const name = __name__;
      return {
        metric_time,
        name,
        time: moment(metric_time).valueOf(),
        values: typeof values === 'number' ? values : null,
      };
    });
  });
};

/**
 * 数据补全
 * @param name  指标名称
 * @param targetArr  目标数组
 * @param resourceArr  源数组
 */
/**
 const a = [{ metric_time: '2022-09-05 00:00', name: 'a', time: 1662307200000, values: 0 }]
 const b = [{ metric_time: '2022-09-04 00:00', name: 'b', tiem: 1662220800000, values: 0 }]
 补全
 const a = [
 { metric_time: '2022-09-05 00:00', name: 'a', time: 1662307200000, values: 0 },
 { metric_time: '2022-09-04 00:00', name: 'b', tiem: 1662220800000, values: null },
 ]
 const b = [
 { metric_time: '2022-09-04 00:00', name: 'b', tiem: 1662220800000, values: 0 },
 { metric_time: '2022-09-05 00:00', name: 'a', time: 1662307200000, values: null },
 ]
 */
// export const dataCompletion = (name: string, targetArr: MetricsType[], resourceArr: MetricsType[]) => {
//   targetArr.push(...resourceArr)
//   const res = new Map()
//   const data = targetArr.filter((item) => {
//     if (name !== item.name) {
//       item.values = null
//     }
//     return !res.has(item.metric_time) && res.set(item.metric_time, 1)
//   })
//   data.sort((n, p) => {
//     return n.time - p.time
//   })
//   return data
// }

/**
 * 数组拍平
 */
// const flattenArr = (arr: MetricsType[][] | MetricsType[]): MetricsType[] => {
//   return arr.reduce((prev: MetricsType[], cur: MetricsType[]) => {
//     return prev.concat(Array.isArray(cur) ? flattenArr(cur) : cur)
//   }, [])
// }

// 转换为绘图数据
export const processChartData = (metricsList: any[], unit: string) => {
  const data = transformToMetricsType(metricsList);

  // 只有一条数据, 不需要补全操作
  // const result = []
  // for (let i = 0; i < data.length; i++) {
  //   const name = data[i].length ? data[i][0]?.name : `${new Date().getTime()}${i}`
  //   const targetArr = JSON.parse(JSON.stringify(data[i]))
  //   const arr = data.filter((item, index) => index !== i)
  //   const resourceArr = JSON.parse(JSON.stringify(flattenArr(arr)))
  //   result.push(dataCompletion(name, targetArr, resourceArr))
  // }

  // console.log('processChartData', data);

  const format = 'YYYY-MM-DD HH:mm';

  // string[]
  const xData = data
      .map((item) => {
        if (!item) return item;
        return item.map((item) => moment(item.metric_time).format(format));
      })
      .flat(1)
      .filter((item) => item);

  // number|null[][]
  const lineData = data
      .map((item) => {
        if (!item) return item;
        return item.map((item) => convertMetricsValues(item.values, item.name, unit));
      })
      .filter((item) => item);

  return {
    lineData,
    xData,
  };
};
