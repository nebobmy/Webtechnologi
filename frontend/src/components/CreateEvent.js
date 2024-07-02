import React, { useState } from 'react';
import axios from 'axios';

function CreateEvent({ userId, onEventCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/events', { title, description, date, userId });
            onEventCreated(response.data);
            setTitle('');
            setDescription('');
            setDate('');
        } catch (error) {
            console.error('Error creating event', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Створити подію</h2>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Назва події" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Опис події" />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <button type="submit">Створити</button>
        </form>
    );
}

export default CreateEvent;
