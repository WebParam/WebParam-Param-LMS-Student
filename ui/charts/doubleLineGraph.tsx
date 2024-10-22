
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ApexChart = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: 'My Total Questions Asked',
        data: [31, 40, 28, 51, 42, 109, 100, 120, 190, 120, 134, 20]
      },
      {
        name: 'Average Total Questions Asked',
        data: [11, 32, 45, 32, 34, 52, 35, 82, 150, 40, 80, 50]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
      },
      title: {
          text: 'Questions Asked',
          style: {
            fontSize: '20px',
            color: '#333'
          }
        },
        colors: ['#008ffb', '#800080'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'string',
        categories: [
          "Jan", 
          "Feb", 
          "Mar", 
          "Apr", 
          "May", 
          "Jun", 
          "Jul", 
          "Aug", 
          "Sep", 
          "Oct", 
          "Nov", 
          "Dec"
        ]
      },
      tooltip: {
        x: {
          format: ''
        },
      },
    }
  });

  return (
    <div>
      <div id="chart" className='card m-2 mt-0 p-2' >
        <ReactApexChart 
          options={chartOptions.options as any} 
          series={chartOptions.series} 
          type="area" 
          height={365} 
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
