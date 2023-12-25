import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useCallback } from "react";
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  category,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [time, setTime] = useState(30);
  const history = useHistory();

  const handleNext = useCallback(() => {
    if (currQues > 8) {
      history.push('/result', { score, category });
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setCurrQues(currQues + 1);
  }, [currQues, history, selected, score, category, setCurrQues, setSelected]);

  useEffect(() => {

    setTime(30);
    // Start the timer for the current question
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    // Clear the interval when moving to the next question or when the component unmounts
    return () => clearInterval(interval);
  }, [currQues]);

  useEffect(() => {
    // When time is up for the current question
    if (time === 0) {
      // Handle the end of the time for the current question
      setTime(30); // Reset the timer for the next question
      handleNext(); // Move to the next question or end the quiz
    }
  }, [time, handleNext]);


  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };
  
  


  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };



  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };

  return (
    <div className="question">
      <h1>Question {currQues + 1} :</h1>
      <div className="controls">
        <span>Time Remaining: {time}s</span> {/* Display remaining time */}
        {/* ...existing buttons... */}
      </div>
      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options &&
            options.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
          className="button"
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href='\'
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
          className="button"
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 290 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
