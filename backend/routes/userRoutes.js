const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { RecaptchaV2 } = require('express-recaptcha');
const { RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY } = require('../config');

const router = express.Router();
const recaptcha = new RecaptchaV2(RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY);

// Валідація електронної пошти
const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
};

// Валідація номера телефону
const validatePhoneNumber = (phoneNumber) => {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phoneNumber);
};

// Валідація пароля
const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return re.test(password);
};

// Маршрут для реєстрації
router.post('/register', recaptcha.middleware.verify, async (req, res) => {
    if (!req.recaptcha.error) {
        try {
            const { fullName, gender, age, phoneNumber, email, country, password, uniqueField } = req.body;

            // Валідація полів
            if (!validateEmail(email)) {
                return res.status(400).send('Invalid email format');
            }
            if (!validatePhoneNumber(phoneNumber)) {
                return res.status(400).send('Invalid phone number format');
            }
            if (!validatePassword(password)) {
                return res.status(400).send('Password must be at least 8 characters long, include upper and lower case letters, a number, and a special character');
            }
            if (age < 18) {
                return res.status(400).send('Age must be at least 18');
            }

            // Хешування пароля
            const hashedPassword = await bcrypt.hash(password, 10);

            // Створення нового користувача
            const user = new User({
                fullName,
                gender,
                age,
                phoneNumber,
                email,
                country,
                password: hashedPassword,
                uniqueField,
            });

            await user.save();
            res.status(201).send('User registered successfully!');
        } catch (error) {
            res.status(500).send('Error registering user');
        }
    } else {
        res.status(400).send('Recaptcha verification failed');
    }
});

// Маршрут для авторизації
router.post('/login', recaptcha.middleware.verify, async (req, res) => {
    if (!req.recaptcha.error) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).send('Invalid email or password');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send('Invalid email or password');
            }
            res.status(200).send('Login successful!');
        } catch (error) {
            res.status(500).send('Error logging in');
        }
    } else {
        res.status(400).send('Recaptcha verification failed');
    }
});

// Маршрут для отримання всіх користувачів
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

module.exports = router;
