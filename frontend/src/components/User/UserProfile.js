
import React from 'react';
import './UserProfile.css';

const UserProfile = ({ userData }) => {
  return (
    <div className="container">
      
      <img src="./images/user.jpg" alt="Profile" className="profile-picture" />

      <h2>Welcome, {userData.uname}!</h2>
      <p>Email: {userData.email}</p>
      <p>Age: {userData.age}</p>
      <p>Phone Number: {userData.phoneNum}</p>
     

     
      <a href="#" className="edit-profile-link">Edit Profile</a>
      <button className="logout-button">Log Out</button>
    </div>
  );
};

export default UserProfile;
