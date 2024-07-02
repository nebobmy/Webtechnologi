import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventList({ userId }) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`/api/events/${userId}`);
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };
        fetchEvents();
    }, [userId]);

    const handleDelete = async (eventId) => {
        try {
            await axios.delete(`/api/events/${eventId}`);
            setEvents(events.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Error deleting event', error);
        }
    };

    return (
        <div>
            <h2>Ваші події</h2>
            <ul>
                {events.map(event => (
                    <li key={event._id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>{new Date(event.date).toLocaleDateString()}</p>
                        <button onClick={() => handleDelete(event._id)}>Видалити</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;
