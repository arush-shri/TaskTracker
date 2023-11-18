import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faCalendarAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Loginsignup.css';

const Loginsignup = () => {
    const [action, setAction] = useState("Sign up");

    return (
        <div>
            <div className="container login-signup">
                <div className="header-login">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    {action === 'Login' ? <div></div> : <div className="input">
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" placeholder=' Name' />
                    </div>}

                    <div className="input">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input type="email" placeholder=' Email' />
                    </div>

                    <div className="input">
                        <FontAwesomeIcon icon={faLock} />
                        <input type="password" placeholder=' Password' />
                    </div>

                    {action === 'Login' ? null : (
                        <div className="input">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <input type="text" placeholder=' Age' />
                        </div>
                    )}

                    {action === 'Login' ? null : (
                        <div className="input">
                            <FontAwesomeIcon icon={faPhone} />
                            <input type="tel" placeholder=' Phone Number' />
                        </div>
                    )}

                </div>
                {action === "Sign up" ? <div></div> : <div className="forgot-password">Lost password? <span>Click Here!</span></div>}

                <div className="submit-container">
                    <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction('Sign up') }}>Signup</div>
                    <div className={action === "Sign up" ? "submit gray" : "submit"} onClick={() => { setAction('Login') }}>Login</div>
                </div>
            </div>
        </div>
    );
};

export default Loginsignup;
