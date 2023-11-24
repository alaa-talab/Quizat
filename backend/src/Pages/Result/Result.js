import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; 
import "./Result.css";

const Result = ({ score, location }) => {
  const history = useHistory();
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!score) {
      history.push("/");
    }
    // Extract category from location state
    if (location && location.state) {
      setCategory(location.state.category);
      
    }

  
  }, [score, history, location]);

  const navigateToHome = () => {
    history.push('/');
  };

  // Function to determine and display resources based on score and category
  const displayResources = () => {
    if (score <= 5) {
      return <div>Resource to start learning about {category}</div>;
    } else if (score > 5 && score < 9) { 
      return <div>Resource to learn more about {category}</div>;
    } else if (score >= 9) {
      return <div>Resource to take a certificate about {category}</div>;
    }
  };

  return (
    <div className="result">
      <span className="title">Final Score : {score}</span>
      {displayResources()}
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        onClick={navigateToHome}
      >
        Go to homepage
      </Button>
    </div>
  );
};

export default Result;
