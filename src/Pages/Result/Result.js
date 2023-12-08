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
    let resourceContent;

    switch(category) {
        case 'General Knowledge':
            resourceContent = score <= 5 ? 
                'Beginner General Knowledge Resources' : 
                (score < 9 ? 'Intermediate General Knowledge Resources' : 'Advanced General Knowledge Certification Courses');
            break;
        case 'Science and Nature':
            resourceContent = score <= 5 ? 
                'Beginner Science and Nature Resources' : 
                (score < 9 ? 'Intermediate Science and Nature Resources' : 'Advanced Science and Nature Certification Courses');
            break;
        case 'Science: Computers': 
            resourceContent = score <= 5 ? 
                'Beginner Computer Resources' : 
                (score < 9 ? 'Intermediate Computer Resources' : 'Advanced Computer Certification Courses');
            break;
        case 'SCIENCE: MATHEMATICS':
            resourceContent = score <= 5 ? 
                'Beginner Mathematics Resources' : 
                (score < 9 ? 'Intermediate Mathematics Resources' : 'Advanced Mathematics Certification Courses');
            break;
        case 'Mythology':
            resourceContent = score <= 5 ? 
                'Beginner Mythology Resources' : 
                (score < 9 ? 'Intermediate Mythology Resources' : 'Advanced Mythology Certification Courses');
            break;
        case 'SPORTS':
            resourceContent = score <= 5 ? 
                'Beginner Mythology Resources' : 
                (score < 9 ? 'Intermediate Mythology Resources' : 'Advanced Mythology Certification Courses');
            break;
        case 'GEOGRAPHY':
              resourceContent = score <= 5 ? 
                  'Beginner Mythology Resources' : 
                  (score < 9 ? 'Intermediate Mythology Resources' : 'Advanced Mythology Certification Courses');
              break;
        case 'HISTORY':
              resourceContent = score <= 5 ? 
                  'Beginner Mythology Resources' : 
                  (score < 9 ? 'Intermediate Mythology Resources' : 'Advanced Mythology Certification Courses');
              break;
        case 'POLITICS':
                resourceContent = score <= 5 ? 
                    'Beginner Mythology Resources' : 
                    (score < 9 ? 'Intermediate Mythology Resources' : 'Advanced Mythology Certification Courses');
                break;
        case 'ANIMALS':
                  resourceContent = score <= 5 ? 
                      'Beginner Mythology Resources' : 
                      (score < 9 ? 'Intermediate Mythology Resources' : 'Advanced Mythology Certification Courses');
                  break; 
        case 'VEHICLES':
                    resourceContent = score <= 5 ? 
                        'Beginner Mythology Resources' : 
                        (score < 9 ? 'Intermediate Mythology Resources' : 'Advanced Mythology Certification Courses');
                    break;    
        case 'Gadgets':
                      resourceContent = score <= 5 ? 
                          'Beginner Mythology Resources' : 
                          (score < 9 ? 'Intermediate Mythology Resources' : 'Advanced Mythology Certification Courses');
                      break;                                      
        // ... continue for each category
        default:
            resourceContent = 'General Learning Resources';
    }

    return <div className="resource-info">{resourceContent} to {score <= 5 ? 'start learning' : (score < 9 ? 'learn more' : 'take a certificate')} about {category}</div>;
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
