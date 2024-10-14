'use client';
import React from 'react';
import BarChart from '../../../../../ui/analytics/graphs/BarChart';
import { useAssessmentContext } from '../../../../../ui/assessments/(context)/AssessmentContext';
import ChartWrapper from '@/ui/analytics/graphs/ChartWrapper';
import LineChart from '@/ui/charts/lineGraph';
import BarGraph from '@/ui/charts/barGraph';

export default function Statistics() {
  const { assessmentType } = useAssessmentContext();

  const completedAssessmentData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Completed Assessments',
        data: [12, 19, 15, 25, 22, 30, 35, 40, 45, 50, 55, 60],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const outstandingAssessmentData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Outstanding Assessments',
        data: [5, 10, 8, 15, 12, 18, 20, 25, 30, 35, 40, 45],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const summativeTrendData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Summative Average Percentage',
        data: [75, 78, 80, 82, 85, 87, 90, 92, 95, 97, 100, 102],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const formativeTrendData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Formative Average Percentage',
        data: [65, 68, 70, 72, 75, 77, 80, 82, 85, 87, 90, 92],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const barDescriptions = [
    { description: 'Completed Assessments', color: 'rgba(75, 192, 192, 1)' },
    { description: 'Outstanding Assessments', color: 'rgba(255, 99, 132, 1)' },
    { description: 'Summative Average Percentage', color: 'rgba(54, 162, 235, 1)' },
    { description: 'Formative Average Percentage', color: 'rgba(153, 102, 255, 1)' },
  ];

  return (
    <div className="row card-group-row mt-3">
      {assessmentType === 'summative' && (
        <>
          <div className="col-lg-6 col-md-12 card-group-row__col">
           <LineChart/>
          </div>

          <div className="col-lg-6 col-md-12 card-group-row__col">
          <BarGraph/>
          </div>

          <div className="col-lg-6 col-md-12 card-group-row__col">
           
          {/* <BarGraph/> */}
          </div>
        </>
      )}

      {assessmentType === 'formative' && (
        <>
          <div className="col-lg-6 col-md-12 card-group-row__col">
          <BarGraph/>
          </div>

          <div className="col-lg-6 col-md-12 card-group-row__col">
        <LineChart/>
          </div>

          {/* <div className="col-lg-6 col-md-12 card-group-row__col">
           <LineChart/>
          </div> */}
        </>
      )}
    </div>
  );
}