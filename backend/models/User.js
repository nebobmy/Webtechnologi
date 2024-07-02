const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    password: { type: String, required: true },
    uniqueField: { type: String, required: true, unique: true },
    profilePicture: { type: String }, // Додаємо поле для фото профілю
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

module.exports = mongoose.model('User', UserSchema);
