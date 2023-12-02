import { Button } from "@material-ui/core";
import { useEffect} from "react";
import { useHistory } from "react-router-dom"; 
import { useLocation } from 'react-router-dom';
import "./Result.css";

const Result = ({ score }) => {
  const history = useHistory();
  const location = useLocation();
  const category = location.state?.category;

 
 

  useEffect(() => {
    if (!score) {
      history.push("/");
    }
    
  }, [score, history, location]);

  const navigateToHome = () => {
    history.push('/');
  };

  
  const displayResources = () => {
    if (score <= 5) {
      return <div className="resource-info">Resource to start learning about {category}</div>;
    } else if (score > 5 && score < 9) {
      return <div className="resource-info">Resource to learn more about {category}</div>;
    } else if (score >= 9) {
      return <div className="resource-info">Resource to take a certificate about {category}</div>;
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
