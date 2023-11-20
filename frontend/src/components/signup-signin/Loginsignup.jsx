
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faCalendarAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Loginsignup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Loginsignup = () => {
  const [action, setAction] = useState('Sign up');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    uname: '',
    email: '',
    password: '',
    age: '',
    phoneNum: '',
  });


  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('https://task-tracker-deploy.onrender.com/signinup/signup', userData);
      if (typeof response.data === 'string') {
        setErrorMessage('User already exists. Please choose a different email.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 1800);
      } else {
        localStorage.setItem('token', response.data.token);
        return navigate("/Todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://task-tracker-deploy.onrender.com/signinup/login', userData);
      if (typeof response.data === 'string') {
        setErrorMessage('User does not exist.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 1500);
      } else if (response.data === false) {
        setErrorMessage('Wrong password');
        setTimeout(() => {
          setErrorMessage(null);
        }, 1800);
      } else {
        localStorage.setItem('token', response.data.token);
        return navigate("/Todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container login-signup">
        {errorMessage && (
          <div className="alert alert-warning" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="header-login">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === 'Login' ? <div></div> : <div className="input">
            <FontAwesomeIcon icon={faUser} />
            <input className='inputTaker' type="text" placeholder=' Name' name='uname' value={userData.uname} onChange={handleChange} />
          </div>}

          <div className="input">
            <FontAwesomeIcon icon={faEnvelope} />
            <input className='inputTaker' type="email" placeholder=' Email' name="email" value={userData.email} onChange={handleChange} />
          </div>

          <div className="input">
            <FontAwesomeIcon icon={faLock} />
            <input className='inputTaker' type="password" placeholder=' Password' name="password" value={userData.password} onChange={handleChange} />
          </div>

          {action === 'Login' ? null : (
            <div className="input">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <input className='inputTaker' type="number" placeholder=' Age' name="age" value={userData.age} onChange={handleChange} />
            </div>
          )}

          {action === 'Login' ? null : (
            <div className="input">
              <FontAwesomeIcon icon={faPhone} />
              <input className='inputTaker' type="tel" placeholder=' Phone Number' name="phoneNum" value={userData.phoneNum} onChange={handleChange} />
            </div>
          )}

        </div>
        {action === "Sign up" ? <div></div> : <div className="forgot-password">Lost password? <span>Click Here!</span></div>}

        <div className="submit-container">
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => {
            action === 'Sign up' ? handleSignup() : setAction('Sign up')
          }}>Signup</div>
          <div className={action === "Sign up" ? "submit gray" : "submit"} onClick={() => {
            action === 'Login' ? handleLogin() : setAction('Login')
          }}>Login</div>
        </div>
      </div>
    </div>
  );
};

export default Loginsignup;

