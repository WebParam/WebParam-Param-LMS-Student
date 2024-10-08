// components/KnowledgeModules.tsx
import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface Module {
  date: string;
  assessment: string;
  name: string;
  credits: string;
  achievement: string;
}

const KnowledgeModules: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([
    { date: '2023-01-01', assessment: '90%', name: 'Module 1', credits: '10', achievement: 'Competent' },
    { date: '2023-02-01', assessment: '85%', name: 'Module 2', credits: '8', achievement: 'Competent' },
  ]);

  const [show, setShow] = useState(false);
  const [newModule, setNewModule] = useState<Module>({
    date: '',
    assessment: '',
    name: '',
    credits: '',
    achievement: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewModule({ ...newModule, [name]: value });
  };

  const addModule = () => {
    setModules([...modules, newModule]);
    setNewModule({
      date: '',
      assessment: '',
      name: '',
      credits: '',
      achievement: '',
    });
    handleClose();
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-2 p-10 rbt-review-wrapper rbt-shadow-box">
        <div className="d-flex justify-content-between align-items-center w-100">
            <h5>Knowledge Modules</h5>
        </div>
      <table className="rbt-table table table-borderless">
        <thead className='thead-light'>
          <tr>
            <th>Date</th>
            <th>% Assessment</th>
            <th>Name of Module</th>
            <th>Credits</th>
            <th>Achievement</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module, index) => (
            <tr key={index}>
              <td>{module.date}</td>
              <td>{module.assessment}</td>
              <td>{module.name}</td>
              <td>{module.credits}</td>
              <td>{module.achievement}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default KnowledgeModules;
