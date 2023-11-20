
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './UserProfile.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const UserProfile = () => {

  const [email, setMail] = useState('');
  
  const navigate = useNavigate();
  const [userData, setUser] = useState([]);
  async function getUser(mailId){
      
    const result = await axios.get(`http://localhost:4000/user/getUserDetails/${mailId}`)
    if(result.status===200){
      setUser(result.data)
      console.log(result.data)
    }
  };

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setMail(decodedToken.userId);
        getUser(decodedToken.userId)
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };
    
  }, []);

  const logout = ()=>{
      localStorage.removeItem('token')
      return navigate('/Loginsignup')
  }
  return (
    <div className="container pt-5">

      <h2>Welcome, {userData.username}!</h2>
      <p>Email: {email}</p>
      <p>Age: {userData.userAge}</p>
      <p>Phone Number: {userData.phoneNumber}</p>

      <button className="logout-button" onClick={logout}>Log Out</button>
    </div>
  );
};

export default UserProfile;
