function loginvalidation(loginData) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*?])[A-Za-z\d@#$!%^&*?]{12,}$/
    if (loginData.email === "") {
        error.email = "Name or email should not be empty"
    }
    else if (!email_pattern.test(loginData.email)) {
        error.email = "Email didn't match" 
        
    }else {
        error.email = ""
    }
    
    if(loginData.password === "") {
        error.password = "password should not be empty"
    
    }else if (!password_pattern.test(loginData.password)) {
        error.password = "password didn't match"
    
    }else{
        error.password = ""
    }

    return error;
}

export default loginvalidation;