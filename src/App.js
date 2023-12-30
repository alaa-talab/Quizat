import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { AuthProvider } from './Pages/Home/AuthContext';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainQuizPage from "./Pages/Body/Main_quiz_page";
import Home from "./Pages/Home/Home";
import Quiz from "./Pages/Quiz/Quiz";
import Result from "./Pages/Result/Result";
import Homepage from "./components/Homepage";
import UserProfile from "./Pages/Home/UserProfile";


function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  };

  return (
    <AuthProvider>
    <BrowserRouter>
    <Switch>
      <Route path="/Body">
        <Header /> {/* Display Header on Body route */}
        <MainQuizPage
          name={name}
          setName={setName}
          fetchQuestions={fetchQuestions}
        />
        <Footer /> {/* Display Footer on Body route */}
      </Route>
      <Route path="/quiz">
        <Header /> {/* Display Header on quiz route */}
        <Quiz
          name={name}
          questions={questions}
          score={score}
          setScore={setScore}
          setQuestions={setQuestions}
        />
        <Footer /> {/* Display Footer on quiz route */}
      </Route>
      <Route path="/result">
        <Header /> {/* Display Header on result route */}
        <Result name={name} score={score} />
        <Footer /> {/* Display Footer on result route */}
      </Route>

      {/* Route for the home page */}
      <Route path="/" exact>
        <Home />
      </Route>
      {/* Route for the homepage */}
      <Route path="/Homepage" >
        <Homepage />
      </Route>
      <Route path="/UserProfile" >
        <UserProfile />
      </Route>
    </Switch>
  </BrowserRouter>
  </AuthProvider>
  );
}

export default App;
