import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import styles from './DayView.module.css';
import { POST } from '../../app/lib/api-client';
import {wLoogBookUrl} from '../../app/lib/endpoints';
import { useCourseId } from '@/context/courseId-context/courseId-context';

interface ClassSession {
  id: string;
  state: number;
  createdAt: string;
  modifiedAt: string;
  sessionType: number;
  classLink: string;
  date: string;
  title: string;
  courseId: string;
  moduleId: string;
  classDuration: string;
  startingTime: string;
  adminId: string;
  location: string;
}

interface DayViewProps {
  date: Date;
  onBackClick: () => void;
  classSessions: ClassSession[];
}

const DayView: React.FC<DayViewProps> = ({ date, onBackClick, classSessions }) => {
  const [events, setEvents] = useState<ClassSession[]>([]);
  const cookies = new Cookies();
  const userID = cookies.get('userID');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Adjust the date to UTC
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const formattedDate = utcDate.toISOString().split('T')[0];
        
        console.log('Formatted date for comparison:', formattedDate);
        
        const filteredEvents = classSessions.filter((session: ClassSession) => session.date === formattedDate);
        console.log('Filtered events:', filteredEvents);
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [date, classSessions]);

  const handleJoinClass = async (classId: string) => {
    try {
      const trackResponse = await POST({
        studentId: userID,
        classSessionId: classId
      }, `${wLoogBookUrl}/api/v1/ClassAttendance/TrackStudentLinkClick`);

      if (trackResponse) {
        console.log("Track Response:", trackResponse);
      }
    } catch (error) {
      console.error("Error handling join class:", error);
    }
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('en-ZA', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      timeZone: 'Africa/Johannesburg'
    });
  };

  const hours = Array.from({ length: 10 }, (_, i) => i + 8); // 8 AM to 5 PM

  const getEventForTime = (hour: number) => {
    return events.find(event => {
      const startHour = parseInt(event.startingTime.split(':')[0], 10);
      return startHour === hour;
    });
  };

  console.log('events', events);

  return (
    <div className={styles.dayViewWrapper}>
      <div className={styles.header}>
        <button onClick={onBackClick} className={styles.monthButton}>Month</button>
        <h2>{formatDisplayDate(date)}</h2>
      </div>
      <div className={styles.timeSlots}>
        {hours.map(hour => {
          const event = getEventForTime(hour);
          const eventDuration = event ? parseInt(event.classDuration.split(' ')[0], 10) : 0;

          console.log('event', event);
          return (
            <div key={hour} className={`${styles.timeSlot} ${event ? styles.hasEvent : ''}`} style={{ height: `${eventDuration * 60}px` }}>
              <div className={styles.time}>{`${hour}:00`}</div>
              <div className={styles.event}>
                {event && (
                  <div className={styles.eventContent}>
                    <h3>{event.title}</h3>
                    <p>{event.moduleId}</p>
                    <p>{`${event.startingTime} - ${eventDuration} hours`}</p>
                    <a href={event.classLink} target="_blank" rel="noopener noreferrer" onClick={() => handleJoinClass(event.id)}>Join Meeting</a>
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