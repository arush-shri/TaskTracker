// TodoList.js
import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card';
import './Todolist.css';
import EditTaskPopup from '../modals/EditTask';
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showUpcomingTasks, setShowUpcomingTasks] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    let arr = localStorage.getItem('taskList');

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = [...taskList];
    tempList.splice(index, 1);
    updateTaskList(tempList);
  };

  const updateTaskList = (newList) => {
    localStorage.setItem('taskList', JSON.stringify(newList));
    setTaskList(newList);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const saveTask = (taskObj) => {
    let tempList = [...taskList];
    tempList.push(taskObj);
    updateTaskList(tempList);
    setModal(false);
  };

  const editTask = (index) => {
    setSelectedTask(taskList[index]);
    toggleEditModal();
  };

  const updateTask = (updatedTask) => {
    const updatedList = taskList.map((task) =>
      task === selectedTask ? { ...task, ...updatedTask } : task
    );

    updateTaskList(updatedList);
    setEditModal(false);
  };

  const greetUser = () => {
    const today = new Date().toDateString();
    const incompleteTasks = taskList.filter(
      (task) =>
        task.Status === 'Incomplete' && new Date(task.Deadline).toDateString() === today
    );

    const logout = ()=>{
      localStorage.removeItem('token')
      return navigate('/Loginsignup')
    }

    if (incompleteTasks.length > 0) {
      return (
        <>
          <div className=" container heading">
          <h3>Looks like you have some tasks left for today!</h3>
        </div>
          <div className="task">
            {incompleteTasks.map((task, index) => (
              <Card
                key={index}
                taskObj={task}
                index={index}
                deleteTask={deleteTask}
                updateTaskList={updateTaskList}
                editTask={editTask}
              />
            ))}
          </div>
          <div className=" container heading">
          <h3>See Upcoming Tasks</h3>
        </div>
          <div className='seetasks'>
            <button className="btn btn-secondary mt-2" onClick={() => setShowAllTasks(true)}>
              See All Tasks
            </button>
          </div>
          {/* Separate div for Create Task button */}
         
          <div className='create'>
            <button className="btn btn-primary  mt-2" onClick={() => setModal(true)}>
              Create Task
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
         <div className=" container heading">
          <h3>You have no tasks left for today!</h3>
        </div>
          
          

          <div className='seetasks'>
            <button
              className="btn btn-secondary mt-2"
              onClick={() => setShowUpcomingTasks(true)}
            >
              See Upcoming Tasks
            </button>
          </div>
          {/* Separate div for Create Task button */}
          <div className='create'>
            <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
              Create Task
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="header text-center">
        <h2>Welcome to Your Todo App!</h2>
        {greetUser()}

        {showUpcomingTasks && (
          <div className="task">
            {taskList.map((obj, index) => (
              <Card
                key={index}
                taskObj={obj}
                index={index}
                deleteTask={deleteTask}
                updateTaskList={updateTaskList}
                editTask={editTask}
              />
            ))}
          </div>
        )}

        {showAllTasks && (
          <div className="task">
            {taskList.map((obj, index) => (
              <Card
                key={index}
                taskObj={obj}
                index={index}
                deleteTask={deleteTask}
                updateTaskList={updateTaskList}
                editTask={editTask}
              />
            ))}
          </div>
        )}
      </div>

      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
      {editModal && (
        <EditTaskPopup
          modal={editModal}
          toggle={toggleEditModal}
          updateTask={updateTask}
          taskObj={selectedTask}
        />
      )}
    </>
  );
};

export default TodoList;
