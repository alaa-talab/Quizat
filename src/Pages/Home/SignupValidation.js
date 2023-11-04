function Signupvalidation(signupData) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*?])[A-Za-z\d@#$!%^&*?]{12,}$/
    if (signupData.username === "") {
        error.username = "Name should not be empty"
    }
    else {
        error.username= ""
    }

    if (signupData.email === "") {
        error.email = "email should not be empty"
    }
    else if (!email_pattern.test(signupData.email)) {
        error.email = "Email didn't match" 
        
    } else {
        error.email = ""
    }
    
    if(signupData.password === "") {
        error.password = "password should not be empty"
    
    } else if (!password_pattern.test(signupData.password)) {
        error.password = "password didn't match"
    
    } else{
        error.password = ""
    }

    return error;
}

export default Signupvalidation;