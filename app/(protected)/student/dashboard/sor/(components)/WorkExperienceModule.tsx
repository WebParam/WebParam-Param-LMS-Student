// components/WorkExperienceModules.tsx
import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface Module {
  date: string;
  signedOff: string;
  name: string;
  credits: string;
  achievement: string;
}

const WorkExperienceModules: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([
    { date: '2023-01-01', signedOff: '100%', name: 'Work Module 1', credits: '10', achievement: '' },
    { date: '2023-02-01', signedOff: '95%', name: 'Work Module 2', credits: '8', achievement: '' },
  ]);

  const [show, setShow] = useState(false);
  const [newModule, setNewModule] = useState<Module>({
    date: '',
    signedOff: '',
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
      signedOff: '',
      name: '',
      credits: '',
      achievement: '',
    });
    handleClose();
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-2 p-10 mt-5 rbt-review-wrapper rbt-shadow-box">
      <div className="d-flex justify-content-between align-items-center w-100 p-2">
        <h5>Work Experience Modules</h5>
      </div>
      
      <table className="table mb-0 thead-border-top-0 table-nowrap">
        <thead>
          <tr>
            <th>Date</th>
            <th>% Signed off</th>
            <th>Name of Module</th>
            <th>Credits</th>
            <th>Achievement</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module, index) => (
            <tr key={index}>
              <td>{module.date}</td>
              <td>{module.signedOff}</td>
              <td>{module.name}</td>
              <td>{module.credits}</td>
              <td>{module.achievement}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Work Experience Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                name="date"
                value={newModule.date}
                onChange={handleChange}
                placeholder="Enter date"
              />
            </Form.Group>
            <Form.Group controlId="formSignedOff">
              <Form.Label>% Signed off</Form.Label>
              <Form.Control
                type="text"
                name="signedOff"
                value={newModule.signedOff}
                onChange={handleChange}
                placeholder="Enter signed off"
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name of Module</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newModule.name}
                onChange={handleChange}
                placeholder="Enter name of module"
              />
            </Form.Group>
            <Form.Group controlId="formCredits">
              <Form.Label>Credits</Form.Label>
              <Form.Control
                type="text"
                name="credits"
                value={newModule.credits}
                onChange={handleChange}
                placeholder="Enter credits"
              />
            </Form.Group>
            <Form.Group controlId="formAchievement">
              <Form.Label>Achievement</Form.Label>
              <Form.Control
                type="text"
                name="achievement"
                value={newModule.achievement}
                onChange={handleChange}
                placeholder="Enter achievement"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary btn-dark" onClick={addModule}>
            Add Module
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkExperienceModules;
