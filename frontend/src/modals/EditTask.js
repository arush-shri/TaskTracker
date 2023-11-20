import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO, sub, add } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

const EditTaskPopup = ({ modal, toggle, taskObj }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [status, setStatus] = useState('');
  const [Olddeadline, setOld] = useState('');
  const [oldName, setname] = useState('');
  const [mailid, setMail] = useState('');

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

  useEffect(() => {
    setTaskName(taskObj.taskname);
    setDescription(taskObj.description);
    setDeadline(sub(parseISO(`${taskObj.date}T${taskObj.time}Z`), { hours: 5, minutes: 30 }));
    setOld((new Date(`${taskObj.date}T${taskObj.time}Z`)).toISOString());
    setStatus(taskObj.status);
    setname(taskObj.taskname);

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

  const handleUpdate = async () => {
    let tempObj = {
      taskname: taskName,
      Oldtaskname: oldName,
      description: description,
      Olddeadline: Olddeadline,
      Newdeadline: add(deadline, { hours: 5, minutes: 30 }),
      status: status,
    };
    toggle();
    await axios.post(`http://localhost:4000/task/updateTask/${mailid}`, tempObj);
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Task</ModalHeader>
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
            onChange={(date) => setDeadline(date)}
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
        <Button color="primary" onClick={()=>handleUpdate()}>
          Update
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTaskPopup;
