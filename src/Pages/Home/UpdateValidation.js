// UpdateValidation.js
function UpdateValidation(currentPassword, newPassword, confirmPassword) {
    let errors = {};
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*?])[A-Za-z\d@#$!%^&*?]{8,}$/;

    if (!currentPassword) {
        errors.currentPassword = "Current password is required";
    }
    // Check if the new password is provided
    if (newPassword) {
        if (!passwordPattern.test(newPassword)) {
            errors.newPassword = "New password doesn't meet requirements";
        } else if (newPassword !== confirmPassword) {
            // Only add a mismatch error if both newPassword and confirmPassword are provided
            if (confirmPassword) {
                errors.confirmPassword = "New passwords do not match";
            }
        }
    }

    // Check if confirmPassword is provided without a newPassword
    if (confirmPassword && !newPassword) {
        errors.newPassword = "New password is required if confirming new password";
    }

    return errors;
}

module.exports = UpdateValidation;
