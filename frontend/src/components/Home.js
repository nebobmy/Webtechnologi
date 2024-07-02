import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Map from './Map';
import MyCalendar from './Calendar';
import CreateEvent from './CreateEvent';
import EventList from './EventList';

function Home() {
    const userId = "user_id"; // Замініть на реальний userId з вашої системи аутентифікації
    const [events, setEvents] = useState([]);

    const handleEventCreated = (event) => {
        setEvents([...events, event]);
    };

    return (
        <div>
            <h1>Welcome to Our Web Application</h1>
            <nav>
                <ul>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/upload">Upload File</Link></li>
                    <li><Link to="/users">User Table</Link></li>
                </ul>
            </nav>
            <Map />
            <MyCalendar />
            <CreateEvent userId={userId} onEventCreated={handleEventCreated} />
            <EventList userId={userId} events={events} />
        </div>
    );
}

export default Home;
