import { Button } from "@material-ui/core";
import { useEffect} from "react";
import { useHistory } from "react-router-dom"; 
import { useLocation } from 'react-router-dom';
import "./Result.css";

const Result = ({ score }) => {
  const history = useHistory();
  const location = useLocation();
  const category = location.state?.category;

  const linkStyle = {
    color: 'blue', // Example link color
    textDecoration: 'underline', // Example text decoration
    margin: '5px 0', // Spacing for better readability
};

 

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
                (<a href="https://www.khanacademy.org/search?referer=%2Fsearch&page_search_query=General+Knowledge" style={linkStyle}>Beginner General Knowledge Resources</a>) : 
                (score < 9 ? (<a href="https://www.coursera.org" style={linkStyle}>Intermediate General Knowledge Resources</a>) : (<a href="https://www.udemy.com" style={linkStyle}>Advanced General Knowledge Certification Courses</a>));
            break;
        case 'Science &amp; Nature':
            resourceContent = score <= 5 ? 
                (<a href="https://kids.nationalgeographic.com" style={linkStyle}>Beginner Science and Nature Resources</a>) : 
                (score < 9 ? (<a href="https://www.bbcearth.com" style={linkStyle}>Intermediate Science and Nature Resources</a>) : (<a href="https://ocw.mit.edu" style={linkStyle}>Advanced Science and Nature Certification Courses</a>));
            break;
        case 'Science: Computers': 
            resourceContent = score <= 5 ? 
                (<a href="https://www.codecademy.com" style={linkStyle}>Beginner Computer Resources</a>) : 
                (score < 9 ? (<a href="https://docs.microsoft.com/en-us/learn" style={linkStyle}>Intermediate Computer Resources</a>) : (<a href="https://www.udacity.com" style={linkStyle}>Advanced Computer Certification Courses</a>));
            break;
        case 'Science: Mathematics':
            resourceContent = score <= 5 ? 
                (<a href="https://www.khanacademy.org/search?referer=%2F&page_search_query=math" style={linkStyle}>Beginner Mathematics Resources</a>) : 
                (score < 9 ? (<a href="https://www.edx.org" style={linkStyle}>Intermediate Mathematics Resources</a>) : (<a href="https://www.wolfram.com/u" style={linkStyle}>Advanced Mathematics Certification Courses</a>));
            break;
        case 'Mythology':
            resourceContent = score <= 5 ? 
                (<a href="https://www.udemy.com/course/introduction-to-the-study-of-myth/" style={linkStyle}>Beginner Mythology Resources</a>) : 
                (score < 9 ? (<a href="https://www.thegreatcourses.com" style={linkStyle}>Intermediate Mythology Resources</a>) : (<a href="https://extension.harvard.edu" style={linkStyle}>Advanced Mythology Certification Courses</a>));
            break;
        case 'Sports':
            resourceContent = score <= 5 ? 
                (<a href="https://www.coursera.org/search?query=sports&" style={linkStyle}>Beginner Sports Resources</a>) : 
                (score < 9 ? (<a href="https://www.universalclass.com" style={linkStyle}>Intermediate Sports Resources</a>) : (<a href="https://www.issaonline.com" style={linkStyle}>Advanced Sports Certification Courses</a>));
            break;
        case 'Geography':
            resourceContent = score <= 5 ? 
                (<a href="https://www.nationalgeographic.com" style={linkStyle}>Beginner Geography Resources</a>) : 
                (score < 9 ? (<a href="https://www.coursera.org" style={linkStyle}>Intermediate Geography Resources</a>) : (<a href="https://www.esri.com/en-us/training/certification" style={linkStyle}>Advanced Geography Certification Courses</a>));
            break;
        case 'History':
            resourceContent = score <= 5 ? 
                (<a href="https://www.khanacademy.org/search?referer=%2Fsearch&page_search_query=HISTORY" style={linkStyle}>Beginner History Resources</a>) : 
                (score < 9 ? (<a href="https://www.thegreatcourses.com" style={linkStyle}>Intermediate History Resources</a>) : (<a href="https://extension.harvard.edu" style={linkStyle}>Advanced History Certification Courses</a>));
            break;
        case 'Politics':
            resourceContent = score <= 5 ? 
                (<a href="https://www.khanacademy.org/search?referer=%2Fsearch&page_search_query=POLITICS" style={linkStyle}>Beginner Politics Resources</a>) : 
                (score < 9 ? (<a href="https://www.coursera.org" style={linkStyle}>Intermediate Politics Resources</a>) : (<a href="https://extension.harvard.edu" style={linkStyle}>Advanced Politics Certification Courses</a>));
            break;
        case 'Animals':
            resourceContent = score <= 5 ? 
                (<a href="https://kids.nationalgeographic.com" style={linkStyle}>Beginner Animal Resources</a>) : 
                (score < 9 ? (<a href="https://www.coursera.org" style={linkStyle}>Intermediate Animal Resources</a>) : (<a href="https://www.acs.edu.au" style={linkStyle}>Advanced Animal Certification Courses</a>));
            break; 
        case 'Vehicles':
            resourceContent = score <= 5 ? 
                (<a href="https://www.udemy.com/courses/search/?src=ukw&q=VEHICLES" style={linkStyle}>Beginner Vehicle Resources</a>) : 
                (score < 9 ? (<a href="https://www.coursera.org" style={linkStyle}>Intermediate Vehicle Resources</a>) : (<a href="https://www.ase.com" style={linkStyle}>Advanced Vehicle Certification Courses</a>));
            break;    
        case 'Science: Gadgets':
            resourceContent = score <= 5 ? 
                (<a href="https://www.khanacademy.org/search?referer=%2Fsearch&page_search_query=gadgets" style={linkStyle}>Beginner Gadget Resources</a>) : 
                (score < 9 ? (<a href="https://www.coursera.org" style={linkStyle}>Intermediate Gadget Resources</a>) : (<a href="https://www.linkedin.com/learning" style={linkStyle}>Advanced Gadget Certification Courses</a>));
            break;                                      
        default:
            resourceContent = (<a href="https://www.numberchampions.org.uk/general-learning-resources/" style={linkStyle}>General Learning Resources</a>);
    }

    return (
        <div className="resource-info" style={{ margin: '20px 0', fontSize: '18px' }}>
            {resourceContent} to {score <= 5 ? 'start learning' : (score < 9 ? 'learn more' : 'take a certificate')} about {category}
        </div>
    );

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
