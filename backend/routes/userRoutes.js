const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const User = require('../models/User');

const router = express.Router();

// Налаштування multer для завантаження зображень
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
};

const validatePhoneNumber = (phoneNumber) => {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phoneNumber);
};

const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return re.test(password);
};

router.post('/register', async (req, res) => {
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

        // Перевірка віку
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
});

router.put('/profile', upload.single('profilePicture'), async (req, res) => {
    try {
        const { fullName, gender, age, phoneNumber, email, country, password, uniqueField } = req.body;
        const profilePicture = req.file ? req.file.path : undefined;

        // Валідація полів
        if (email && !validateEmail(email)) {
            return res.status(400).send('Invalid email format');
        }
        if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
            return res.status(400).send('Invalid phone number format');
        }
        if (password && !validatePassword(password)) {
            return res.status(400).send('Password must be at least 8 characters long, include upper and lower case letters, a number, and a special character');
        }
        if (age && age < 18) {
            return res.status(400).send('Age must be at least 18');
        }

        // Оновлення користувача
        const updates = {
            fullName,
            gender,
            age,
            phoneNumber,
            email,
            country,
            uniqueField,
            profilePicture,
        };

        if (password) {
            updates.password = await bcrypt.hash(password, 10);
        }

        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('Error updating profile');
    }
});

module.exports = router;
