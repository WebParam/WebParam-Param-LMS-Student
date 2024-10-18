import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface WorkBook {
  name: string;
  date: string;
  totalMarks: number;
}

const WorkBooks: React.FC = () => {
    const router = useRouter();

  const [workBooks, setWorkBooks] = useState<WorkBook[]>([
    { name: 'Workbook_KM01', date: '2024-08-15', totalMarks: 100 },
    { name: 'Workbook_KM03', date: '2024-08-16', totalMarks: 90 },
  ]);

  const handleViewWorkbook = (name: string) => {
    router.push(`/student/assignments/workbook-details?workbookName=${name}`);
  };

  return (
      <table className="rbt-table table table-borderless" style={{minWidth:'10px'}}>
        <thead className='thead-light'>
          <tr>
            <th scope="col">WorkBooks</th>
            <th scope="col">Date</th>
            <th scope="col">Total Marks</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workBooks.map((workBook, index) => (
            <tr key={index}>
              <td><span style={{ fontWeight: '600' }}>{workBook.name}</span></td>
              <td>{workBook.date}</td>
              <td>{workBook.totalMarks}</td>
              <td>
                <div style={{ cursor: 'pointer' }} className="rbt-btn btn-xs bg-primary-opacity radius-round" onClick={() => handleViewWorkbook(workBook.name)} >View</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default WorkBooks;
