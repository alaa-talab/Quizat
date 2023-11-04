import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import loginvalidation from "./LoginValidation.js";
import Signupvalidation from './SignupValidation.js';
import axios from 'axios';


const Home = () => {
  const history = useHistory();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
  });

  

  const showLogin = () => {
    setShowLoginModal(true);
  };

  const hideLogin = () => {
    setShowLoginModal(false);
  };

  const showSignup = () => {
    setShowSignupModal(true);
  };

  const hideSignup = () => {
    setShowSignupModal(false);
  };

  const [errors,setErrors] = useState({})

  const handleLogin = (event) => {

    event.preventDefault();
    setErrors(loginvalidation(loginData));
  
    console.log('Logging in with data:', loginData);
    
  };

  const handleSignup = (event) => {

    event.preventDefault();
    setErrors(Signupvalidation(signupData));
    console.log('Signing up with data:', signupData);
    if(errors.username === "" && errors.email === "" && errors.password ==="") {
      axios.post('http://localhost:8081/home', signupData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }
   
  };

  const navigateToQuiz = () => {
    history.push('/Body');
  };

  const navigateToRusme = () => {
    history.push('/Homepage');
  };
  const navigateToHome = () => {
    history.push('/');
  };
  return (
    <div>
      {/* Content for the Home component */}
      {/* Navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
        <div
  className="navbar-brand"
  onClick={navigateToHome}
  style={{ cursor: 'pointer' }}
  role="link"
>
<img src="/Quizat-01 1.png" className="banner" alt="quiz app" />
</div>
          {/* Login Button */}
          <button onClick={showLogin} className="btn btn-primary">
            Login
          </button>

          {/* Signup Button */}
          <button onClick={showSignup} className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero section */}
      <div className="jumbotron text-center">
        <h1>Welcome to Quizat</h1>
        <p>Your one-stop destination for quizzes and resume building</p>
      </div>

      {/* Features section */}
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="feature-box">
              <h2>Quizzes</h2>
              <p>
                Test your knowledge with a wide range of quizzes on various topics. Have fun while learning!
              </p>
              <button onClick={navigateToQuiz} className="btn btn-primary">
                Take a Quiz
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="feature-box">
              <h2>Resume Builder</h2>
              <p>
                Create a professional resume that stands out. Land your dream job with our easy-to-use resume builder.
              </p>
              <button onClick={navigateToRusme} className="btn btn-primary">
                Build Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3">
        &copy; 2023 Quizat Team
      </footer>

      {/* Login Modal */}
      <div className={`modal ${showLoginModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showLoginModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button type="button" className="close" onClick={hideLogin} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form action="" onSubmit={handleLogin}>
            <div className="modal-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username or email"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value , email: e.target.value })}
                />
                {errors.email && <span className='text-danger'> {errors.email}</span>}
              </div>
              <br/>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={loginData.password} 
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
                {errors.password && <span className='text-danger'> {errors.password}</span>}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={hideLogin}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <br/>
              <p> Dont have account ? </p>
              <button type="button" className="btn btn-primary" onClick={showSignup}>
                Sign up
              </button>
              
            </div>
            </form>
          </div>
        </div>
      </div>

   {/* Signup Modal */}
<div className={`modal ${showSignupModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showSignupModal ? 'block' : 'none' }}>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Sign Up</h5>
        <button type="button" className="close" onClick={hideSignup} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form action="" onSubmit={handleSignup}>
      <div className="modal-body">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={signupData.username}
            onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
          />
          {errors.username && <span className='text-danger'> {errors.username}</span>}
        </div>
        <br/>
        <div className="form-group">
          <input
            type="email"  
            className="form-control"
            placeholder="Email"
            value={signupData.email}
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
          />
          {errors.email && <span className='text-danger'> {errors.email}</span>}
        </div>
        <br/>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
          />
          {errors.password && <span className='text-danger'> {errors.password}</span>}
        </div>
        <br/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={hideSignup}>
          Close
        </button>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      </form>
    </div>
  </div>
</div>
    </div>
  );
};

export default Home;
