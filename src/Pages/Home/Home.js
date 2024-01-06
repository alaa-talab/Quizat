import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './Login';
import Signup from './Signup';
import { AuthContext } from './AuthContext';



const Home = () => {
  const history = useHistory();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const { userData,setUserData } = useContext(AuthContext);
  const [currentAvatar, setCurrentAvatar] = useState('/avatar male-01.png'); // Set to your default avatar path

  const showLogin = () => setShowLoginModal(true);
  const hideLogin = () => setShowLoginModal(false);
  const showSignup = () => setShowSignupModal(true);
  const hideSignup = () => setShowSignupModal(false);

  const handleLoginSuccess = (userDetails) => {
    setIsLoggedIn(true);
    setUserData({ // Update global user data
      username: userDetails.username,
      email: userDetails.email,
      id: userDetails.id,
    });
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userData', JSON.stringify({
      username: userDetails.username,
      email: userDetails.email,
      id: userDetails.id,
    }));
    hideLogin();
  };

  const [faqs, setFaqs] = useState([
    {
      question: 'How do I take a quiz?',
      answer: 'Just click on the "Take a Quiz" button after logging in, choose your subject, and start your quiz.',
      open: false,
      id: 'faq1'
    },
    {
      question: 'How can I access the Resume Builder?',
      answer: 'After logging in, navigate to the Resume Builder section and start creating your professional resume.',
      open: false,
      id: 'faq2'
    },
    {
      question: 'Is Quizat free to use?',
      answer: 'Yes, Quizat is completely free! You can take quizzes, use the resume builder, and access all other features without any cost.',
      open: false,
      id: 'faq3'
    },
    {
      question: 'How do I change my password?',
      answer: 'You can change your password from your profile settings. Simply log in, go to your profile, and select the option to change your password.',
      open: false,
      id: 'faq4'
    },
    {
      question: 'Can I create my own quizzes?',
      answer: 'Currently, Quizat offers a wide range of pre-made quizzes. Stay tuned for future updates where you might be able to create and share your own quizzes!',
      open: false,
      id: 'faq5'
    },
    // Add more FAQs as needed
  ]);

  const toggleFAQ = index => {
    setFaqs(faqs.map((faq, i) => {
      if (i === index) faq.open = !faq.open;
      else faq.open = false;
      return faq;
    }));
  };
  const navigateToQuiz = () => {
    if (isLoggedIn) history.push('/Body');
  };

  const navigateToRusme = () => {
    if (isLoggedIn) history.push('/Homepage');
  };
  // Handler for when an avatar is selected
  const handleAvatarSelect = (avatarName) => {
    let avatarPath = '';
    switch (avatarName) {
        case 'avatar1':
            avatarPath = '/avatar male-01.png';
            break;
        case 'avatar2':
            avatarPath = '/avatar female-01.png';
            break;
        // Add more cases if there are more avatars
        default:
            avatarPath = '/default-avatar.png'; // Fallback to default avatar
    }
    setCurrentAvatar(avatarPath);
    // Here you would also update the user's avatar in the backend
};

  const navigateToHome = () => history.push('/');
  const navigateToUserProfile = () => history.push('/UserProfile');
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ username: '', email: '', id: '' }); // Clear global user data
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
            <img src="/Quizat-01 x1.png"   className="banner" alt="quiz app" />
          </div>
          {isLoggedIn ? (
  <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic"  style={{backgroundColor: '#0a78b8' , borderRadius: '40%'}}>
      <img src={currentAvatar} alt="User Avatar" style={{ width: '30px', height: '30px' }} />
      <div></div>
      {userData.username}
     
  </Dropdown.Toggle>

  <Dropdown.Menu>
      <Dropdown.Item href="#/action-1" onClick={() => navigateToUserProfile()}>Profile</Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={() => handleLogout()}>Logout</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Header>Choose an Avatar</Dropdown.Header>
      <Dropdown.Item onClick={() => handleAvatarSelect('avatar1')}><img src="/avatar male-01.png" alt="Avatar 1" style={{ width: '30px', height: '30px' }} /></Dropdown.Item>
      <Dropdown.Item onClick={() => handleAvatarSelect('avatar2')}><img src="/avatar female-01.png" alt="Avatar 2" style={{ width: '30px', height: '30px' }} /></Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>


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

      <div className="container-fluid py-5" style={{ backgroundColor: '#fca311' }}>
  <div className="row justify-content-center">
    <div className="col-12 col-lg-6 d-flex justify-content-center"> {/* Use 'col-lg-6' for large screens */}
      <img src="/quiz-01.png" alt="quiz app" className="img-fluid" style={{ maxWidth: '70%', height: 'auto' }} />
    </div>
  </div>
  <div className="row">
    <div className="col px-4"> {/* 'px-4' adds padding on the left and right */}
      <h1 className="text-center text-white display-4"> {/* 'display-4' is a responsive heading size */}
        Welcome to the ultimate destination for knowledge and fun – 
        <span style={{ color: '#1E4387', fontWeight: 'bold' }}> Quizat!</span>
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
<br/>
<div className="top-image">
  <img src="/5188348_Mesa de trabajo 1 1.png" alt="Choose your subject" className="img-fluid"/>
</div>

<div className="container py-5">
  <div className="quiz-header">
    How to start your quiz
  </div>
  <div className="row g-4">
    <div className="col-md-4">
      <div className="card quiz-card">
        <img src="/quiz 2-01 1.png" className="card-img-top" alt="Choose your subject"/>
        <div className="card-body">
          <div className="quiz-step">1. Choose your subject</div>
          <p className="quiz-desc">from many basic and diverse topics</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card quiz-card">
        <img src="/quiz 3-01 1.png" className="card-img-top" alt="Start your quiz"/>
        <div className="card-body">
          <div className="quiz-step">2. Start your quiz</div>
          <p className="quiz-desc">quiz contain 10 questions evaluate your knowledge in selected subject</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card quiz-card">
        <img src="/quiz 4_Mesa de trabajo 1 1.png" className="card-img-top" alt="Receive your resource"/>
        <div className="card-body">
          <div className="quiz-step">3. Receive your resource</div>
          <p className="quiz-desc">after you finish your quiz you will receive a total points out of 10 and depending on these points, you will obtain your appropriate sources</p>
        </div>
      </div>
    </div>
  </div>
  <div  className="button-container" style={{ position: 'relative' }}>
  <button onClick={navigateToQuiz} className="quiz-button" disabled={!isLoggedIn}>Get Started</button>
  {!isLoggedIn && <div className="tooltip-message">Login to get access</div>}
</div>
</div>

<section className="cv-advice-section">
  <div className="container py-5">
    <div className="row align-items-center">
      <div className="col-lg-6">
        <img src="/resume make_Artboard 1.png" alt="Resume Tips" className="img-fluid"/>
      </div>
      <div className="col-lg-6">
        <h2>Resume Writing Tips & Best Practices</h2>
        <p>Writing a professional CV is crucial in landing your dream job. Keep these tips in mind:</p>
        <ul>
          <li>Keep it concise and not more than two pages.</li>
          <li>Highlight achievements with quantifiable results to show your impact.</li>
          <li>Tailor your resume for each job application with relevant keywords.</li>
          <li>Use a clean, professional layout with clear headings and bullet points.</li>
          <li>Focus on transferable skills, especially if you're changing industries.</li>
          <li>Proofread your resume multiple times to avoid grammatical errors.</li>
          <li>Include a personalized cover letter with each application.</li>
        </ul>
        <p>Or create your own resume with our Interactive Resume Builder Tool.</p>
        <div  className="button-container" style={{ position: 'absolute' }}>
        <button onClick={navigateToRusme} className="resume-btn" disabled={!isLoggedIn}>Build a resume</button>
        {!isLoggedIn && <div className="tooltip-message">Login to get access</div>}
        </div>

      </div>
    </div>
  </div>
</section>



<div className="faq-section container py-5">
  <h2 className="mb-5 text-center font-weight-bold text-uppercase">Frequently Asked Questions</h2>
  {faqs.map((faq, i) => (
    <div key={i} className="card mb-4 shadow" style={{ borderRadius: '15px' }}>
      <div
        className="card-header bg-primary text-white"
        id={'heading' + faq.id}
        style={{ cursor: 'pointer', borderRadius: '15px 15px 0 0' }}
      >
        <h5 className="mb-0 d-flex justify-content-between align-items-center">
          <button
            className="btn btn-link text-white text-left"
            onClick={() => toggleFAQ(i)}
            style={{ textDecoration: 'none', outline: 'none' }}
            data-toggle="collapse"
            data-target={'#' + faq.id}
            aria-expanded="true"
            aria-controls={faq.id}
          >
            {faq.question}
          </button>
          <i className={`fas ${faq.open ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </h5>
      </div>

      <div id={faq.id} className={`collapse ${faq.open ? 'show' : ''}`} aria-labelledby={'heading' + faq.id}>
        <div className="card-body" style={{ borderRadius: '0 0 15px 15px' }}>
          {faq.answer}
        </div>
      </div>
    </div>
  ))}
</div>

<section id="team" className="py-5">
  <div className="container">
    <h2 className="h3 mb-4 text-center text-primary font-weight-bold">Meet Our Quizat Team</h2>
    <p className="text-center text-secondary">Dedicated to enhancing your learning experience.</p>
    <div className="row text-center">

     
      <div className="col-lg-3 col-md-6 mb-4">
        <div className="card h-100 team-card">
          <img src="/moh.jpg" alt="Team Member" className="card-img-top team-img"/>
          <div className="card-body">
            <h5 className="card-title"> Mohamad AL Ramahi</h5>
            <p className="card-text"> software engineer</p>
            <p className="small text-muted"> technology professional applies engineering principles and programming languages.</p>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6 mb-4">
        <div className="card h-100 team-card">
          <img src="/tarek.jpg" alt="Team Member" className="card-img-top team-img"/>
          <div className="card-body">
            <h5 className="card-title">Tarek Ziad Taha</h5>
            <p className="card-text">front end developer</p>
            <p className="small text-muted">a Software Engineer with a passion to bring ideas to life through code.</p>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6 mb-4">
        <div className="card h-100 team-card">
          <img src="/alaa.jpeg" alt="Team Member" className="card-img-top team-img"/>
          <div className="card-body">
            <h5 className="card-title">Alaa Talab</h5>
            <p className="card-text">Full Stack Web Developer</p>
            <p className="small text-muted">experience and strong commitment 
to achieve the organization goals in the excellence field.</p>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6 mb-4">
        <div className="card h-100 team-card">
          <img src="/fares.jpg" alt="Team Member" className="card-img-top team-img"/>
          <div className="card-body">
            <h5 className="card-title">Faris Ta'an</h5>
            <p className="card-text">ui ux designer</p>
            <p className="small text-muted">ocus on understanding user behaviors, needs, and motivations through research.</p>
          </div>
        </div>
      </div>
      

    </div>
  </div>
</section>

<section id="about-us" className="py-5 text-center text-lg-left animated-background">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-lg-6 mb-4 mb-lg-0">
        <div className="image-container">
          <img src="/quizat 5-01.png" alt="About Us" className="img-fluid rounded"/>
        </div>
      </div>
      <div className="col-lg-6">
        <h2 className="h3 mb-3 font-weight-bold text-primary">Empower Your Career</h2>
        <p className="lead text-secondary">Join us on the road to professional excellence with our comprehensive quizzes and tailored resume builder designed to pave your way in the industry.</p>
        <p className="text-dark">Sharpen your skills with real-world simulations and stand out in the job market with a polished resume.</p>
        <p className="font-italic text-info">Step forward with confidence, utilizing tools crafted for your career success!</p>
        <small className="text-muted">*Reflecting feedback from industry professionals and successful users.</small>
      </div>
    </div>
  </div>
</section>




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
