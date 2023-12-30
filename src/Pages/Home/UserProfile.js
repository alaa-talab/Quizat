import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import './UserProfile.css';
import { useHistory } from 'react-router-dom';




const UserProfile = () => {
    const { userData } = useContext(AuthContext);
    const [profile, setProfile] = useState({ username: '', email: '', scores: [] });
    const [editValues, setEditValues] = useState({ username: '', email: '', currentPassword: '', newPassword: '', confirmPassword: '' });
    const [message, setMessage] = useState('');
    const history = useHistory();
    const navigateToHome = () => history.push('/');
    useEffect(() => {
        let isMounted = true;
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/userProfile/${userData.id}`);
                if (isMounted) {
                    const { username, email, scores } = formatProfileData(response.data);
                    setProfile({ username, email, scores });
                    setEditValues({ username, email, currentPassword: '', newPassword: '', confirmPassword: '' });
                }
            } catch (error) {
                if (isMounted) setMessage('Failed to fetch profile data');
            }
        };

        if (userData.id) fetchProfile();

        return () => { isMounted = false; };
    }, [userData.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditValues({ ...editValues, [name]: value });
    };

    const handleUpdateProfile = async () => {
        console.log('Sending request with data:', editValues);
        try {
            // Check if any of the password fields are filled
            const isPasswordChangeAttempted = editValues.currentPassword || editValues.newPassword || editValues.confirmPassword;
    
            // Prepare the data to send, excluding password fields if they're not filled
            const dataToSend = isPasswordChangeAttempted
                ? { ...editValues, userId: userData.id }
                : { username: editValues.username, email: editValues.email, userId: userData.id };
    
            const response = await axios.post('http://localhost:8081/updateUserProfile', dataToSend);
            // Handle success
            setMessage(response.data.message || 'Profile updated successfully!');
        } catch (error) {
            // Handle errors
            const errorData = error.response && error.response.data;
            if (typeof errorData === 'string') {
                setMessage(errorData);
            } else if (errorData && errorData.errors) {
                const errorMessages = Object.values(errorData.errors).join(", ");
                setMessage(`Update failed: ${errorMessages}`);
            } else {
                setMessage('Failed to update profile. Please try again.');
            }
        }
    };
    
    
    

    const formatProfileData = (data) => {
        // Transform the data from the API into the format the state expects
        // This is a placeholder, adjust according to actual data structure
        return {
            username: data[0]?.username || '',
            email: data[0]?.email || '',
            scores: data.map(row => ({ score: row.score, category: row.category }))
        };
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">User Profile</h2>
            {message && <p className="alert alert-info">{message}</p>}

            <div className="user-info mb-4">
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <div>
                    {profile.scores.length > 0 && <h4>Scores</h4>}
                    {profile.scores.map((score, index) => (
                        <p key={index}><strong>Score:</strong> {score.score}, <strong>Category:</strong> {score.category}</p>
                    ))}
                </div>
            </div>

            <div className="edit-form">
                <h4>Edit Profile</h4>
                <div className="form-group">
                    <input className="form-control" type="text" name="username" value={editValues.username} onChange={handleInputChange} placeholder="Username" />
                </div>
                <div className="form-group">
                    <input className="form-control" type="email" name="email" value={editValues.email} onChange={handleInputChange} placeholder="Email" />
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="currentPassword" value={editValues.currentPassword} onChange={handleInputChange} placeholder="Current Password" />
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="newPassword" value={editValues.newPassword} onChange={handleInputChange} placeholder="New Password" />
                </div>
                <div className="form-group">
                    <input className="form-control" type="password" name="confirmPassword" value={editValues.confirmPassword} onChange={handleInputChange} placeholder="Confirm New Password" />
                </div>
                <button className="btn btn-primary" onClick={handleUpdateProfile}>Update Profile</button>
                <h5 style={{textAlign: 'center'}}>Or</h5>
                <button className="btn btn-primary" onClick={navigateToHome}>Cancel</button>
            </div>
            
        </div>
    );
};

export default UserProfile;
