'use client'
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function BarGraph() {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Completed',
        group: 'budget',
        data: [10, 12, 17, 14, 18, 22, 15, 16, 19, 22, 25, 28]
      },
      {
        name: 'Incomplete',
        group: 'budget',
        data: [5, 7, 10, 8, 12, 5, 9, 12, 5, 8, 2, 6]
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 6,
        }
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      },
      fill: {
        opacity: 1
      },
      title: {
        text: 'Assessments Analytics',
        style: {
          fontSize: '20px',
          color: '#333'
        }
      },
      colors: ['#008ffb', '#800080'],
      yaxis: {
        labels: {
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    }
  });

  return (
    <div>
      <div id="chart" className='p-2' >
        <ReactApexChart options={chartData.options as any} series={chartData.series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

