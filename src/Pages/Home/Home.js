import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './Login'; // Import the Login component
import Signup from './Signup'; // Import the Signup component

const Home = () => {
  const history = useHistory();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ username: '', email: '' });

  const showLogin = () => setShowLoginModal(true);
  const hideLogin = () => setShowLoginModal(false);
  const showSignup = () => setShowSignupModal(true);
  const hideSignup = () => setShowSignupModal(false);

  const handleLoginSuccess = (userDetails) => {
    setIsLoggedIn(true);
    setUserData({ username: userDetails.username, email: userDetails.email });
    hideLogin();
  };

  const navigateToQuiz = () => {
    if (isLoggedIn) history.push('/Body');
  };

  const navigateToRusme = () => {
    if (isLoggedIn) history.push('/Homepage');
  };

  const navigateToHome = () => history.push('/');

  return (
    <div>
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
          {isLoggedIn ? (
            <div className="navbar-text">
              {userData.username} ({userData.email})
            </div>
          ) : (
            <>
              <button onClick={showLogin} className="btn btn-primary">
                Login
              </button>
              <button onClick={showSignup} className="btn btn-primary">
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="jumbotron text-center">
        <h1>Welcome to Quizat</h1>
        <p>Your one-stop destination for quizzes and resume building</p>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="feature-box">
              <h2>Quizzes</h2>
              <p>Test your knowledge with a wide range of quizzes on various topics. Have fun while learning!</p>
              <button onClick={navigateToQuiz} className="btn btn-primary" disabled={!isLoggedIn}>
                Take a Quiz
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="feature-box">
              <h2>Resume Builder</h2>
              <p>Create a professional resume that stands out. Land your dream job with our easy-to-use resume builder.</p>
              <button onClick={navigateToRusme} className="btn btn-primary" disabled={!isLoggedIn}>
                Build Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-dark text-light text-center py-3">
        &copy; 2023 Quizat Team
      </footer>

      {showLoginModal && (
        <div className="modal show fade-in" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login</h5>
                <button type="button" className="close" onClick={hideLogin} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <Login showSignup={showSignup} onLoginSuccess={handleLoginSuccess} />
              </div>
            </div>
          </div>
        </div>
      )}

      {showSignupModal && (
        <div className="modal show fade-in" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sign Up</h5>
                <button type="button" className="close" onClick={hideSignup} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <Signup showLogin={showLogin}  hideSignup={hideSignup}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
