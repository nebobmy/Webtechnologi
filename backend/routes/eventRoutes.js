const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Створення нової події
router.post('/events', async (req, res) => {
    try {
        const { title, description, date, userId } = req.body;
        const event = new Event({ title, description, date, userId });
        await event.save();
        res.status(201).send(event);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Отримання всіх подій користувача
router.get('/events/:userId', async (req, res) => {
    try {
        const events = await Event.find({ userId: req.params.userId });
        res.status(200).send(events);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Видалення події
router.delete('/events/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            res.status(404).send('Event not found');
        }
        res.status(200).send('Event deleted');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
