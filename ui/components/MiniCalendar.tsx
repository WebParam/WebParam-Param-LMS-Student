import React, { useState } from "react";
import styles from "./MiniCalendar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const MiniCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date(); // Add this line to store the actual current date

  const changeMonth = (increment: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1)
    );
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className={styles.miniCalendar}>
      <div className={styles.header}>
        <span className={styles.chevron} onClick={() => changeMonth(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <span className={styles.monthYear}>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </span>
        <span className={styles.chevron} onClick={() => changeMonth(1)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.weekdays}>
        {weekdays.map((day) => (
          <div key={day} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className={styles.emptyDay}></div>
          ))}
        {days.map((day) => (
          <div
            key={day}
            className={`${styles.day} ${isToday(day) ? styles.today : ""}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;
