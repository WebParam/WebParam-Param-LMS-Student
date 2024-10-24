import React from "react";
import styles from "./ListView.module.css";
import MiniCalendar from "../components/MiniCalendar";

interface ListViewProps {
  activeView: "list" | "calendar";
  setActiveView: (view: "list" | "calendar") => void;
  events: any[]; // Replace 'any' with your actual event type
}

interface Event {
  id: string;
  title: string;
  date: string;
  startingTime: string;
  description: string;
}

const ListView: React.FC<ListViewProps> = ({
  activeView,
  setActiveView,
  events,
}) => {
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);

  const today = new Date();
  const todayEvents = events.filter(
    (event) => new Date(event.date).toDateString() === today.toDateString()
  );
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    console.log(eventDate.toDateString());
    console.log(today.toDateString());
    return (
      eventDate > today && eventDate.toDateString() !== today.toDateString()
    );
  });

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(selectedEvent?.id === event.id ? null : event);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const renderEventTile = (event: Event) => (
    <div key={event.id} className={styles.eventTile}>
      <h3 className={styles.eventTitle}>{event.title}</h3>
      <p className={styles.eventTime}>
        {event.startingTime} - {formatDate(event.date)}
      </p>
      <button
        className={`${styles.viewDetailsButton} ${
          selectedEvent?.id === event.id ? styles.activeButton : ""
        }`}
        onClick={() => handleViewDetails(event)}
      >
        View Details
      </button>
    </div>
  );

  return (
    <div className={styles.listViewContainer}>
      <h1 className={styles.mainTitle}>Events & Inductions</h1>
      <div className={styles.contentContainer}>
        <div className={styles.leftSection}>
          {/* Assume MiniCalendar component exists */}
          <MiniCalendar />
          {selectedEvent && (
            <div className={styles.eventDetails}>
              <h2 className={styles.detailsTitle}>{selectedEvent.title}</h2>
              <p className={styles.detailsDate}>
                {selectedEvent.startingTime} - {formatDate(selectedEvent.date)}
              </p>
              <p className={styles.detailsDescription}>
                {selectedEvent.description}
              </p>
            </div>
          )}
        </div>
        <div className={styles.rightSection}>
          <div className={styles.viewSelector}>
            <button
              onClick={() => setActiveView("list")}
              className={activeView === "list" ? styles.activeView : ""}
            >
              List View
            </button>
            <span>|</span>
            <button
              onClick={() => setActiveView("calendar")}
              className={activeView === "calendar" ? styles.activeView : ""}
            >
              Calendar View
            </button>
          </div>
          <h2 className={styles.sectionTitle}>Today</h2>
          <div className={styles.eventTiles}>
            {todayEvents.map(renderEventTile)}
          </div>
          <h2 className={styles.sectionTitle}>Upcoming</h2>
          <div className={styles.eventTiles}>
            {upcomingEvents.map(renderEventTile)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;
