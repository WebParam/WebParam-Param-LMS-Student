'use client'

import { IChart } from "./lib/IChart";
import Chart from "react-apexcharts";

interface IAreaChartProps extends IChart {
    //additional props here
}
export default function AreaChart( chart:IAreaChartProps) {


    return (
        <>
            <div className="rbt-review-wrapper rbt-shadow-box review-wrapper mt--30" id="review">
            <Chart options={chart.options} series={chart.series} type="area" />
            </div>

        </>
    )
}