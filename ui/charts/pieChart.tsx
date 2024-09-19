import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function PieChart() {
  const rawData = [44, 55, 90, 81, 22, 80, 50, 40, 40, 50, 60, 70];
  const total = rawData.reduce((acc, value) => acc + value, 0);
  const percentageData = rawData.map(value => Math.round((value / total) * 100));

  const [chartOptions, setChartOptions] = useState({
    series: percentageData,
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      title: {
        text: 'Student Activity',
        style: {
          fontSize: '14px',
          textAlign: 'center',
          margin: '0 auto',
          color: '#333'
        }
      },
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      colors: ['#FF4560', '#00E396', '#008FFB', '#FEB019', '#775DD0', '#FF66C4', '#D10CE8', '#00D9E9', '#FFC300', '#32D9CB', '#546E7A', '#D4526E'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 320,
            margin: 0,
          },
          title: {
            style: {
              fontSize: '14px',
              textAlign: 'center',
            }
          },
        },
      }]
    }
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart 
          options={chartOptions.options as any} 
          series={chartOptions.series} 
          type="pie" 
          width={380} 
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
