import React, { useState, useEffect } from 'react';
import "./login.css";
import { FaAllergies } from "react-icons/fa";
import { Link } from 'react-router-dom';
// import axios from 'axios';
// import jwtDecode from 'jwt-decode';
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from 'react-router-dom';
// import { setProfile } from '../redux/slice/profileSlice';
// import { UseDispatch, useDispatch } from 'react-redux';
const Login = () => {
//   const navigate =useNavigate()
  // State variables for form fields and errors
//   const dispatch=useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Function to handle form submission
  const handleSubmit = async () => {
    // Validate email
    if (!email) {
      setEmailError('Email is required');
    } else {
      setEmailError('');
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }

  
  };

  // useEffect to clear errors when the user types in the input fields
  useEffect(() => {
    setEmailError('');
    setPasswordError('');
  }, [email, password]);

  return (
    <div className='main'>
      <div className='main_div'>
        <div className='flex_main'>
          <div className='flex'>
            <div className='flex_first'>
              <div>
                <h1>Login <FaAllergies color='#5138ee' /></h1>

                <p>How do I get started from</p>

                <label>Email
                  <br />
                  <input type='text' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <div className='error'>{emailError}</div>

                <div className='mt-2'>
                  <label>Password
                    <br />
                    <input type='password' className='input' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </label>
                  <div className='error'>{passwordError}</div>
                </div>

                <div>
                  <button className='button' onClick={handleSubmit}>Submit</button>
                </div>
              </div>
              <div>
                <Link to="/signup">
                  <h6> Signup</h6>
                </Link>
              </div>
            </div>
            <div className='flex_second'>
              <img src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D' alt='login-image' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
