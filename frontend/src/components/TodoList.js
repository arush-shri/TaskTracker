// TodoList.js
import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card';
import './Todolist.css';
import EditTaskPopup from '../modals/EditTask';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [notify, setNotify] = useState(true);
  const [taskList, setTaskList] = useState([]);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showUpcomingTasks, setShowUpcomingTasks] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`https://task-tracker-deploy.onrender.com/task/getAllTasks/${email}`);
        const tasks = response.data.tasks;
        if (tasks.length > 0) {
          setTaskList(tasks);
        } else {
          console.log('No tasks found for the user');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const fetchDataInterval = setInterval(() => {
      fetchTasks();
    }, 1000);
    return () => clearInterval(fetchDataInterval);
  }, [email]);

  const deleteTask = async (task) => {
    await axios.post(`https://task-tracker-deploy.onrender.com/task/deleteTask/${email}`, taskList[task]);
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

  const greetUser = () => {
    const today = new Date().toDateString();
    const incompleteTasks = Array.isArray(taskList)
      ? taskList.filter((task) => {
          const taskDate = new Date(task.date).toDateString();
          return task.status === 'Incomplete' && taskDate === today;
        })
      : [];

    const deleteTaskToday = async (task) => {
      await axios.post(`https://task-tracker-deploy.onrender.com/task/deleteTask/${email}`, incompleteTasks[task]);
    };

    if(incompleteTasks.length > 0 && notify){
      setNotify(false);
      toast.info('Looks like you have some tasks left for today!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    if (incompleteTasks.length > 0) {
      return (
        <>
          <div className="container heading">
            <h3>Looks like you have some tasks left for today!</h3>
          </div>
          <div className="task">
            {incompleteTasks.map((task, index) => (
              <Card
                key={index}
                taskObj={task}
                index={index}
                deleteTask={deleteTaskToday}
                updateTaskList={updateTaskList}
                editTask={editTask}
              />
            ))}
          </div>
          <div className="container heading">
            <h3>See Upcoming Tasks</h3>
          </div>
          <div className="seetasks">
            <button className="btn btn-secondary mt-2" onClick={() => setShowAllTasks(true)}>
              See All Tasks
            </button>
          </div>
          <div className="create">
            <button className="btn btn-primary  mt-2" onClick={() => setModal(true)}>
              Create Task
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="container heading">
            <h3>You have no tasks left for today!</h3>
          </div>

          <div className="seetasks">
            <button
              className="btn btn-secondary mt-2"
              onClick={() => setShowUpcomingTasks(true)}
            >
              See Upcoming Tasks
            </button>
          </div>
          <div className="create">
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
        <EditTaskPopup modal={editModal} toggle={toggleEditModal} taskObj={selectedTask} />
      )}
      <ToastContainer />
    </>
  );
};

export default TodoList;
