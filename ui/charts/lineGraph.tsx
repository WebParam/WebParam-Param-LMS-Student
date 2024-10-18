'use client'
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function LineChart() {
  const [chartData, setChartData] = useState({
    series: [{
      name: "Quiz Attempts",
      data: [10, 41, 35, 51, 49, 62, 40, 91, 48, 53, 73, 40]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
            sparkline: {
              enabled: true,
          }
        },
        zoom: {
          enabled: false
        }
      },
      colors:['#800080'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Quiz Attempts',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      }
    }
  });

  return (
    <div>
      <div id="chart" className='card p-2'>
        <ReactApexChart options={chartData.options as any} series={chartData.series} type={chartData.options.chart.type as any} height={chartData.options.chart.height} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}