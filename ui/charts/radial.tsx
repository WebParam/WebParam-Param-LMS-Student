'use client'

import { IChart } from "./lib/IChart";
import Chart from "react-apexcharts";

interface IRadialChartProps extends IChart {
    //additional props here
}
export default function RadialChart( chart:IRadialChartProps) {

    return (
        <>
            <Chart options={chart.options} series={chart.series&& chart.series[0]?.data} type="radialBar" />
        </>
    )
}