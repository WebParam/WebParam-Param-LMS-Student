import React, { useState } from 'react';
import styles from './Calendar.module.css';
import DayView from './DayView';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'day'>('month');

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isToday = i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
      const isSelected = selectedDate && i === selectedDate.getDate() && currentDate.getMonth() === selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear();
      days.push(
        <div 
          key={i} 
          className={`${styles.day} ${isSelected ? styles.selected : ''}`}
          onClick={() => handleDateClick(date)}
        >
          <span style={{ 
            color: isSelected ? 'red' : isToday ? 'white' : 'inherit',
            backgroundColor: isToday ? 'rgb(36, 52, 92)' : 'transparent',
            padding: isToday ? '2px 6px' : '0',
            borderRadius: isToday ? '50%' : '0',
            display: 'inline-block'
          }}>
            {i}
          </span>
          <div className={styles.content}></div>
        </div>
      );
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setView('day');
  };

  const handleBackToMonth = () => {
    setView('month');
  };

  if (view === 'day' && selectedDate) {
    console.log('Rendering DayView with selectedDate:', selectedDate);
    return <DayView date={selectedDate} onBackClick={handleBackToMonth} />;
  }

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.header}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{monthNames[currentDate.getMonth()]} <span>{currentDate.getFullYear()}</span></h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className={styles.calendar}>
        <div className={styles.weekdays}>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className={styles.days}>
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;