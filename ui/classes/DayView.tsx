import React, { useEffect, useState } from 'react';
import styles from './DayView.module.css';

interface Event {
  title: string;
  session: string;
  startTime: string;
  endTime: string;
  link: string;
  date: string;
}

interface DayViewProps {
  date: Date;
  onBackClick: () => void;
}

const DayView: React.FC<DayViewProps> = ({ date, onBackClick }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/calendar/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        const formattedDate = date.toISOString().split('T')[0];
        console.log('Formatted date:', formattedDate);
        const filteredEvents = data.events.filter((event: Event) => event.date === formattedDate);
        console.log('Filtered events:', filteredEvents);
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [date]);

  const hours = Array.from({ length: 10 }, (_, i) => i + 8); // 8 AM to 5 PM

  const getEventForTime = (hour: number) => {
    return events.find(event => {
      const startHour = parseInt(event.startTime.split(':')[0]);
      return startHour === hour;
    });
  };

  return (
    <div className={styles.dayViewWrapper}>
      <div className={styles.header}>
        <button onClick={onBackClick} className={styles.monthButton}>Month</button>
        <h2>{date.toDateString()}</h2>
      </div>
      <div className={styles.timeSlots}>
        {hours.map(hour => {
          const event = getEventForTime(hour);
          return (
            <div key={hour} className={styles.timeSlot}>
              <div className={styles.time}>{`${hour}:00`}</div>
              <div className={styles.event}>
                {event && (
                  <div className={styles.eventContent}>
                    <h3>{event.title}</h3>
                    <p>{event.session}</p>
                    <p>{`${event.startTime} - ${event.endTime}`}</p>
                    <a href={event.link} target="_blank" rel="noopener noreferrer">Join Meeting</a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;