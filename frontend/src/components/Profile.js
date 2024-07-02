import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uniqueField, setUniqueField] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Завантаження даних профілю
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/profile');
                const { fullName, gender, age, phoneNumber, email, country, uniqueField, profilePicture } = response.data;
                setFullName(fullName);
                setGender(gender);
                setAge(age);
                setPhoneNumber(phoneNumber);
                setEmail(email);
                setCountry(country);
                setUniqueField(uniqueField);
                setProfilePicture(profilePicture);
            } catch (error) {
                console.error('There was an error fetching the profile!', error);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('gender', gender);
        formData.append('age', age);
        formData.append('phoneNumber', phoneNumber);
        formData.append('email', email);
        formData.append('country', country);
        formData.append('password', password);
        formData.append('uniqueField', uniqueField);
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }

        try {
            const response = await axios.put('/api/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('There was an error updating the profile!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" required />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <select value={country} onChange={(e) => setCountry(e.target.value)} required>
                <option value="" disabled>Select Country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="Ukraine">Ukraine</option>
                <option value="Other">Other</option>
            </select>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
            <label>
                <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                Show Password
            </label>
            <input type="text" value={uniqueField} onChange={(e) => setUniqueField(e.target.value)} placeholder="Unique Field" required />
            <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} />
            <button type="submit">Update Profile</button>
        </form>
    );
}

export default Profile;
