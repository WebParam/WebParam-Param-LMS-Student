'use client'
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Sparkline() {
  const [chartData, setChartData] = useState({
    series: [{
      name: "Quiz Attempts",
      data: [10, 41, 35, 51, 49, 62, 40, 91, 48, 53, 73, 40]
    }],
    options: {
      chart: {
         background: '0',
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.1,
      },
      yaxis: {
        min: 0
      },
      colors: ['#DCE6EC'],
      title: {
        text: '178',
        offsetX: 0,
        style: {
          fontSize: '24px',
        }
      },
      
      subtitle: {
        text: 'Quiz Attempts',
        offsetX: 0,
        style: {
          fontSize: '14px',
        }
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