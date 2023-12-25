function SignupValidation(signupData) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*?])[A-Za-z\d@#$!%^&*?]{12,}$/;

    if (signupData.username === "") {
        error.username = "Name should not be empty";
    } else {
        error.username = "";
    }

    if (signupData.email === "") {
        error.email = "Email should not be empty";
    } else if (!email_pattern.test(signupData.email)) {
        error.email = "Email didn't match";
    } else {
        error.email = "";
    }
    
    if (signupData.password === "") {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(signupData.password)) {
        error.password = "Password didn't match requirements";
    } else {
        error.password = "";
    }

    // Confirm Password Validation
    if (!signupData.confirmPassword) {
        error.confirmPassword = "Confirm password is required";
    } else if (signupData.password !== signupData.confirmPassword) {
        error.confirmPassword = "Passwords do not match";
    } else {
        error.confirmPassword = "";
    }
    
    return error;
}

export default SignupValidation;
