import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import Question from "../../components/Question/Question";
import "./Quiz.css";

const Quiz = ({ name, questions, score, setScore, setQuestions }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    console.log("Current Question Index:", currQues);
    console.log("Questions:", questions);
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [currQues, questions]);

  console.log(questions);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>

      {questions && questions.length > 0 ? (
        <>
          <div className="quizInfo">
            <span>{questions[currQues].category}</span>
            <span>{questions[currQues].difficulty}</span>
                 <span>
              Score : {score}
            </span>
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
            category={questions[currQues]?.category}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;