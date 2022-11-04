import moment from 'moment'
import Big from 'big.js'

type MetricsType = {
    metric_time: moment.MomentInput
    values: number | null
    time: number
    name: string
}

// const convertMibToBytes = (value: number) => {
//     return Big(value).times(1024).times(1024).toNumber()
// }
// const convertBytesToGiB = (value: number) => {
//     return Big(value).div(1024).div(1024).toNumber()
// }
// const convertBytesToGB = (value: number) => {
//     return Big(value).div(1000).div(1000).div(1000).toNumber()
// }

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
    if (!value || isNaN(value)) return value
    if (!name) return value

    // util 为使用率 lepton__cci__container_cpu_util
    // 百分比需要 * 100
    if (name.includes('util')) {
        // 百分比保留两位小数
        return value * 100
    }

    let bytes = 0
    // 使用量, MiB 单位 lepton__cci__gpu_memory_used__MiB
    if (name.includes('MiB')) {
        bytes = convertMibToBytes(value)
    }

    // bytes 单位 lepton__cci__container_memory_working_set_bytes
    if (name.includes('bytes')) {
        bytes = value
    }

    switch (unit) {
        case 'GiB':
            value = convertBytesToGiB(bytes)
            break
        case 'GB':
            value = convertBytesToGB(bytes)
            break
        default:
    }

    // 其他保留四位小数
    return value
}
export const processChartData = (metricsList: any[], unit: string) => {
    const metrics = metricsList[0]

    const valuesList = metrics?.values ?? []
    const { __name__ = '' } = metrics?.metrics_attrs ?? {}

    const xData: string[] = valuesList.map((value: any) => {
        return moment(new Date(value.metric_time).valueOf()).format('YYYY-MM-DD HH:mm:ss')
    })
    const lineData: (number | null)[] = valuesList.map((value: any) => {
        return convertMetricsValues(value.values, __name__, unit)
    })

    return {
        lineData,
        xData,
    }
}
