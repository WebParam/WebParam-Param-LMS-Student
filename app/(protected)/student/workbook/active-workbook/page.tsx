import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAssessmentContext } from '@/ui/assessments/(context)/AssessmentContext';
import { rAssessmentThootoUrl, rKnowledgeModuleUrl } from '@/app/lib/endpoints';
import { GET } from '@/app/Utils/methods';

enum AssessmentType {
  Summative = 0,
  Formative = 1,
}

interface Assessment {
  id: string;
  state: number;
  title: string;
  courseId: string;
  type: AssessmentType;
  dueDate: string;
  totalMarks: number;
}

interface Course {
  id: string;
  title: string;
}

export default function ActiveWorkbook() {
  const { assessmentType } = useAssessmentContext();
  const [data, setData] = useState<Assessment[]>([]);
  const [filteredData, setFilteredData] = useState<Assessment[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const courseId = process.env.NEXT_PUBLIC_COURSE_ID;
  const clientKey = process.env.NEXT_PUBLIC_CLIENTKEY;

  useEffect(() => {
    const fetchData = async () => {
      if (!clientKey) {
        console.error('Client key is not defined');
        return;
      }

      try {
        const res = await GET(`https://thooto-dev-be-workbooks-read.azurewebsites.net/api/v1/Workbook/GetWorkbooks/66c6f9fe0c2eeac80af3b590`);
        debugger;
        if (res) {
          console.log("res.data :", res.data);
          setData(res.data);
        }
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchData();
  }, [courseId, clientKey]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!clientKey) {
        console.error('Client key is not defined');
        return;
      }

      try {
        const url = `${rKnowledgeModuleUrl}/api/v1/Courses/GetCourseNew/${courseId}`;
        const response = await fetch(url, {
          headers: {
            'Client-Key': clientKey,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error(`Error fetching course: ${response.statusText}`);
          return;
        }

        const result = await response.json();
        console.log("Course fetched :", result)
        if (result && result.data) {
          setCourse(result.data);
        } else {
          console.error('API response does not contain course data:', result);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [courseId, clientKey]);


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  console.log("course :", data[0]);

  return (
    <table className="rbt-table table table-borderless" style={{ minWidth: '10px' }}>
      <thead>
        <tr>
          <th>Workbook Name</th>
          <th>Course</th>
          <th>Due Date</th>
          {/* <th>Total Marks</th> */}
          <th />
        </tr>
      </thead>
      <tbody>
        {data && data?.map((workbook:any, index) => (
          <tr key={index}>
            <th>
              <span className="h6 mb--5">{workbook?.description}</span>
            </th>
            <td>
              {<p className="b3">{course?.title}</p>}
            </td>
            <td>
              <p className="b3">{formatDate(workbook.dueDate)}</p>
            </td>
            <td>
              <div className="rbt-button-group justify-content-end">
                <Link
                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                  title="Start"
                  href={{
                    pathname: '/student/workbook/workbookId',
                    query: { id: `${workbook.id}`, title: `${workbook.description}`},
                  }}
                >
                  Start
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}