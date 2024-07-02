import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

function Register() {
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uniqueField, setUniqueField] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('/api/register', {
                fullName,
                gender,
                age,
                phoneNumber,
                email,
                country,
                password,
                uniqueField,
                'g-recaptcha-response': recaptchaToken,
            });
            alert('Registration successful!');
        } catch (error) {
            console.error('There was an error registering!', error);
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
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
            <label>
                <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                Show Password
            </label>
            <input type="text" value={uniqueField} onChange={(e) => setUniqueField(e.target.value)} placeholder="Unique Field" required />
            <ReCAPTCHA
                sitekey="your-recaptcha-site-key"
                onChange={(token) => setRecaptchaToken(token)}
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
