import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', {
                email,
                password,
                'g-recaptcha-response': recaptchaToken
            });
            alert('Login successful!');
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <label>
                <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                Show Password
            </label>
            <ReCAPTCHA
                sitekey="your-recaptcha-site-key"
                onChange={(token) => setRecaptchaToken(token)}
            />
            <button type="submit">Login</button>
            <button type="button" onClick={() => window.location.href='/forgot-password'}>Forgot Password?</button>
        </form>
    );
}

export default Login;
