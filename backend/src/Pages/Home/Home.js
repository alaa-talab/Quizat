import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './Login'; 
import Signup from './Signup'; 

const Home = () => {
  const history = useHistory();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || { username: '', email: '' });
  

  const showLogin = () => setShowLoginModal(true);
  const hideLogin = () => setShowLoginModal(false);
  const showSignup = () => setShowSignupModal(true);
  const hideSignup = () => setShowSignupModal(false);

  const handleLoginSuccess = (userDetails) => {
    setIsLoggedIn(true);
    setUserData({ username: userDetails.username, email: userDetails.email });
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userData', JSON.stringify({ username: userDetails.username, email: userDetails.email }));
    hideLogin();
  };

  const navigateToQuiz = () => {
    if (isLoggedIn) history.push('/Body');
  };

  const navigateToRusme = () => {
    if (isLoggedIn) history.push('/Homepage');
  };

  const navigateToHome = () => history.push('/');
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ username: '', email: '' });
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    history.push('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
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
    <br/>
    <button onClick={handleLogout} className="btn btn-hover-effect" style={{ backgroundColor: '#0A78B8', color: 'white' }}>
      Logout
    </button>
  </div>
) : (
  <div className="btn-group"> {/* Wrap buttons in a btn-group for inline display */}
    <button onClick={showLogin} className="btn btn-hover-effect" style={{ backgroundColor: '#0A78B8', color: 'white', marginRight: '8px' }}>
      Login
    </button>
    <button onClick={showSignup} className="btn btn-hover-effect" style={{ backgroundColor: '#1E4387', color: 'white' }}>
      Sign Up
    </button>
  </div>
)}



        </div>
      </nav>

      <div className="container-fluid py-5" style={{ backgroundColor: '#FDB713' }}>
  <div className="row justify-content-center">
    <div className="col-12 col-lg-6 d-flex justify-content-center"> {/* Use 'col-lg-6' for large screens */}
      <img src="/quiz-01.png" alt="quiz app" className="img-fluid" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  </div>
  <div className="row">
    <div className="col px-4"> {/* 'px-4' adds padding on the left and right */}
      <h1 className="text-center text-white display-4"> {/* 'display-4' is a responsive heading size */}
        Welcome to the ultimate destination for knowledge and fun –
        <span style={{ color: '#1E4387', fontWeight: 'bold' }}>Quizat!</span>
      </h1>
    </div>
  </div>
  <div className="row">
    <div className="col px-4"> {/* 'px-4' adds padding on the left and right */}
      <p className="text-center text-white lead">
        Explore diverse topics, test your knowledge, and enjoy hours of fun. Whether solo or with friends, Quizat is your go-to destination. Join our community, unlock achievements, and start your journey of discovery today!
      </p>
    </div>
  </div>
</div>




      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="feature-box">
              <h2>Quizzes</h2>
              <p>Test your knowledge with a wide range of quizzes on various topics. Have fun while learning!</p>
              <div title={!isLoggedIn ? "Login to get access" : ""}>
              <button onClick={navigateToQuiz} className="btn btn-primary" disabled={!isLoggedIn}>
                Take a Quiz
              </button>
            </div>
          </div>
          </div>
          <div className="col-md-6">
            <div className="feature-box">
              <h2>Resume Builder</h2>
              <p>Create a professional resume that stands out. Land your dream job with our easy-to-use resume builder.</p>
              <div title={!isLoggedIn ? "Login to get access" : ""}>
              <button onClick={navigateToRusme} className="btn btn-primary" disabled={!isLoggedIn}>
                Build Resume
              </button>
            </div>
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
