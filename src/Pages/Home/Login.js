import React, { useState } from 'react';
import loginValidation from './LoginValidation';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Login = ({ showSignup, onLoginSuccess }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleLogin = (event) => {
    event.preventDefault();
    const validationErrors = loginValidation(loginData);
    setErrors(validationErrors);
    axios.post('http://localhost:8081/login', loginData)
    .then((res) => {
      if (res.data.message === "Success") {
        onLoginSuccess({ username: res.data.username, email: res.data.email });
      } else {
        alert("Login failed: " + res.data.message);
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      // Check if the error response has data and a message
      if (err.response && err.response.data && err.response.data.message) {
        alert("Login failed: " + err.response.data.message);
      } else {
        alert("An error occurred during login. Please try again later.");
      }
    });
};

  return (
    <div>
  <form onSubmit={handleLogin} >
    <div className="form-group">
    <label className="form-label">Email</label>
      <input
        type="text"
        placeholder="Email"
        className="form-control"
        value={loginData.email}
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
      />
      {errors.email && <small className="text-danger">{errors.email}</small>}
    </div>
    <br/>
    <div className="form-group">
    <label className="form-label">Password</label>
      <input
        type="password"
        placeholder="Password"
        className="form-control"
        value={loginData.password}
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
      />
      {errors.password && <small className="text-danger">{errors.password}</small>}
    </div>
    <div className="form-check">
  
  <label className="form-check-label" htmlFor="rememberMe">
    <div>
    <input type="checkbox" className="form-check-input" id="rememberMe" /> Remember Me
    </div>
  </label>
</div>
   
    <small className="form-text text-muted">
          Don't have an account?{' '}
          <button type="button" className="btn btn-link p-0" onClick={showSignup}>
            Sign up
          </button>
        </small>
        <br/>
        <button type="submit" className="btn btn-primary w-100 rounded-3">Login</button>

  </form>
</div>

  
  );
};

export default Login;