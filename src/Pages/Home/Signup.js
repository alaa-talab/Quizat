import React, { useState } from 'react';
import SignupValidation from './SignupValidation';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = ({ showLogin }) => {
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleSignup = (event) => {
    event.preventDefault();
    setErrors(SignupValidation(signupData));

    if (errors.username === "" && errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/signup', signupData)
        .then((res) => {
         console.log(res);
         
            showLogin();
          
        })
        .catch((err) => console.log(err));
    }
  };

 

  return (
    
    
      
          <form onSubmit={handleSignup} className="signup-form">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={signupData.username}
                onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
              />
              {errors.username && <small className='text-danger'>{errors.username}</small>}
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              />
              {errors.email && <small className='text-danger'>{errors.email}</small>}
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              />
              {errors.password && <small className='text-danger'>{errors.password}</small>}
            </div>
            <button type="submit" className="btn btn-primary signup-button w-100 rounded-3">Sign Up</button>
          </form>
       
    
    
  
  
  );
};

export default Signup;
