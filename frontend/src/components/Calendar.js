import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

function MyCalendar() {
    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date);
        alert(`Вибрана дата: ${date.toLocaleDateString()}`);
    };

    return (
        <div className="calendar-container">
            <h2>Календар</h2>
            <Calendar onChange={onChange} value={date} />
        </div>
    );
}

export default MyCalendar;
