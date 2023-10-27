import React from 'react';
import { useHistory } from 'react-router-dom';
import "./Home.css";

const Home = () => {

    const history = useHistory();

    const navigateToQuiz = () => {
      history.push('/Body'); // Redirect to the '/Body' route (MainQuizPage)
    };
    const navigateToRusme = () => {
      history.push('/Homepage'); // Redirect to the '/Body' route (MainQuizPage)
    };

  return (
    <div>
      {/* Content for the Home component */}
      {/* Navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            Your Website Name
          </a>
        </div>
      </nav>

      {/* Hero section */}
      <div className="jumbotron text-center">
        <h1>Welcome to Your Website</h1>
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
        &copy; 2023 Your Website Name
      </footer>
    </div>
  );
};

export default Home;
