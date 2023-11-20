import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker'; // Assuming you have a date picker library
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { jwtDecode } from 'jwt-decode';

const CreateTaskPopup = ({ modal, toggle }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [status, setStatus] = useState('Incomplete');
  const [email, setMail] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setMail(decodedToken.userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'taskName') {
      setTaskName(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'status') {
      setStatus(value);
    }
  };

  const handleDeadlineChange = (date) => {
    setDeadline(date);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let taskObj = {};
    taskObj['taskname'] = taskName;
    taskObj['email'] = email;
    taskObj['description'] = description;
    taskObj['deadline'] = (new Date(new Date(deadline).getTime() + (5 * 60 + 30) * 60 * 1000));
    taskObj['status'] = status;
    await axios.post('https://task-tracker-deploy.onrender.com/task/createTask', taskObj);
    toggle();
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={handleChange}
            name="taskName"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={handleDeadlineChange}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            value={status}
            onChange={handleChange}
            name="status"
          >
            <option value="Incomplete">Incomplete</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Create
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTaskPopup;
