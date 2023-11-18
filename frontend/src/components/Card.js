import React, { useState } from 'react';
import EditTaskPopup from '../modals/EditTask';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Card.css';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);

  const colors = [
    { primaryColor: "#5D93E1", secondaryColor: "#ECF3FC" },
    { primaryColor: "#F9D288", secondaryColor: "#FEFAF1" },
    { primaryColor: "#5DC250", secondaryColor: "#F2FAF1" },
    { primaryColor: "#F48687", secondaryColor: "#FDF1F1" },
    { primaryColor: "#B964F7", secondaryColor: "#F3F0FD" },
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  const handleCheckboxChange = () => {
    const updatedTask = {
      ...taskObj,
      Status: taskObj.Status === 'Completed' ? 'Incomplete' : 'Completed',
    };
    updateTask(updatedTask);
  };

  return (
    <div className={`card-wrapper mr-5 ${taskObj.Status === 'Completed' ? 'completed' : ''}`}>
      <div className="card-top" style={{ backgroundColor: colors[index % 5].primaryColor }}></div>
      <div className="task-holder">
        <div className="title-wrapper">
          <span
            className="card-header"
            style={{
              backgroundColor: colors[index % 5].secondaryColor,
              borderRadius: "10px",
              textDecoration: taskObj.Status === 'Completed' ? 'line-through' : 'none',
            }}
          >
            {taskObj.Name}
          </span>
          
        </div>
        <p className="mt-3">{taskObj.Description}</p>

        {/* Updated styling for Deadline and Status */}
        <div className="task-info">
          <strong>Deadline:</strong>
          <span className="deadline">{taskObj.Deadline}</span>
        </div>
        <div className="task-info">
          <strong>Status:</strong>
          <span className="status">{taskObj.Status}</span>
        </div>

        <div className="icon-wrapper">
          <i className="far fa-edit mr-3" onClick={() => setModal(true)}></i>
          <i className="fas fa-trash-alt" onClick={handleDelete}></i>
        </div>
      </div>
      <EditTaskPopup modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
    </div>
  );
};

export default Card;
