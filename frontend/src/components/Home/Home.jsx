import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Display a toast notification when the component is mounted
    toast.info('Welcome to Task Tracker!', {
      position: 'top-right',
      autoClose: 1500, // 7 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []); 
    return (
     
        <div>
            <section class="bg-main bg-color hero-section">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-md-12 col-lg-6 d-flex flex-column justify-content-center align-items-right">
                            <h1 class="text-uppercase fw-bolder text-white">Task Tracker</h1>
                            <p class=" fw-bolder text-white">Your Personal Productivity Assistant</p>
                            <p class="mt-3 mb-3 para-width text-light-grey">
                            "Task Tracker is your go-to web app for managing your daily tasks and boosting your productivity. Designed with simplicity and efficiency in mind, Task Tracker empowers you to organize your tasks, set priorities, and achieve your goals with ease."
                            </p>
                            <div class="text-center w-100 text-md-start">
                                <button class="text-uppercase btn btn-primary px-5 py-3" data-bs-toggle="tooltip" 
                                title="Make Todo-List" onClick={()=>navigate('/Todo')}>Todo</button>
                            </div>
                        </div>

                        <div class="col-12 col-md-12 col-lg-6">
                            <div class="text-center text-lg-end">
                                <video src="./images/laptop.mp4" loop muted autoPlay class="hero--video--section"></video>
                            </div>
                        </div>
                    </div>
                    {/* <div class="custom-shape-divider-bottom-1700028699">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
                    </div>           */}
                </div>
            </section>


 
 <section className="combined-section">
        <div className="container serv1">
          <h1>Organize Tasks, Organize Life</h1>
        </div>

        {/* Features Section */}
        <div className="container features-section">
          <div className="common-heading">
            <h2>Features</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-item">
              <i className="fas fa-tasks fa-3x feature-icon"></i>
              <h3>Task Management</h3>
              <p>Effortlessly manage your tasks with our intuitive task management system.</p>
            </div>
            <div className="feature-item">
              <i className="fas fa-sort-amount-up fa-3x feature-icon"></i>
              <h3>Prioritization</h3>
              <p>Set priorities and focus on what matters most to achieve your goals.</p>
            </div>
            <div className="feature-item">
              <i className="fas fa-calendar-alt fa-3x feature-icon"></i>
              <h3>Calendar Integration</h3>
              <p>Synchronize your tasks with your calendar for better organization.</p>
            </div>
            <div className="feature-item">
              <i className="fas fa-check-circle fa-3x feature-icon"></i>
              <h3>Goal Achievement</h3>
              <p>Track your progress and achieve your goals with our goal-oriented features.</p>
            </div>
            {/* Add more feature items as needed */}
          </div>
   
        </div> 
      </section>
            
{/* Contact Us Section */}
<section className="contact-section">
        <div className="container">
          <div className="common-heading ">
            <h1 class="text-uppercase fw-bolder text-white">Contact Us </h1>
          </div>
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form">
              <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Your name" />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Your email" />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" placeholder="Your message"></textarea>

                <button type="submit">Submit</button>
              </form>
            </div>

            {/* Contact Image */}
            <footer className="footer-section">
      
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column ">
              <h3 className= "text-white">Contact Information</h3>
              <p className="text-white">Email: info@example.com</p>
              <p className="text-white">Phone: +1 (123) 456-7890</p>
            </div>
            <div className="footer-column">
              <h3 className= "text-white" >Follow Us</h3>
              <div className="social-icons">
                <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
          </div>
          
        </div>
      </section>

      <ToastContainer />
     {/* Footer Section */}
          
</div>
        
    );
};

export default Home;
