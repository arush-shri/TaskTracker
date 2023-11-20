import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkToken = () => {
    
    const token = localStorage.getItem('token');
    console.log(isAuthenticated)
    if (token !== null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkToken();
    const intervalId = setInterval(() => {
      checkToken();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg py-3 pt-lg-3 fixed-top">
      <div className="container d-flex">
        <Link className="navbar-brand" to="/">
         <h4><b> Task Tracker</b></h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">
                About
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Todo">
                    Todo
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/UserProfile">
                    User
                  </Link>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/Loginsignup">
                  SignUp/Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

