"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/logbook/logbook-login.module.css";
import { CheckIn, CheckOut } from "@/actions/logbook-actions/logbook-action";
import LogbookList from "@/ui/logbook/logbook-display/logbook-display";
import { useUser } from "@/context/user-context/user-context";
import { getLogbooks } from "@/actions/logbook-actions/logbook-action";
import { FiClock } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface LogbookEntry {
  date: string;
  title: string;
  description: string;
  status: string;
  createdTime?: string;
  timeRemaining?: string;
  id?: string;
}

interface Logbook {
  id: string;
  userId: string;
  classId: string;
  checkInTime: string;
  checkOutTime: string;
  feedback: string;
  rating: string;
}

const StudentLogbook = () => {
  const [studentEntry, setStudentEntry] = useState<LogbookEntry | null>(null);
  const [workEntry, setWorkEntry] = useState<LogbookEntry | null>(null);
  const [studentTimer, setStudentTimer] = useState<number | null>(null);
  const [workTimer, setWorkTimer] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("school");
  const [rating, setRating] = useState<string>("");
  const [disableAddEntry, setDisableAddEntry] = useState<boolean>(false);
  const [disableAddEntryUntil, setDisableAddEntryUntil] = useState<
    number | null
  >(null);
  const [logbooks, setLogbooks] = useState<LogbookEntry[]>([]);
  const [showLogbookList, setShowLogbookList] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingLogbooks, setLoadingLogbooks] = useState<boolean>(false);
  const { user } = useUser();
  const [selectedRating, setSelectedRating] = useState<string | null>(null);

  const userId: string | undefined = user?.data.id;

  const transformLogbook = (logbook: Logbook): LogbookEntry => {
    return {
      date: new Date(logbook.checkInTime).toLocaleDateString(),
      title: "",
      description: logbook.feedback,
      status: "Checked Out",
      createdTime: new Date(logbook.checkInTime).toLocaleTimeString(),
      timeRemaining: undefined,
      id: logbook.id,
    };
  };

  const getAllLogbooks = async (userId: string) => {
    if (!userId) {
      console.error("User ID is required");
      return;
    }

    try {
      const logbooks: Logbook[] = await getLogbooks(userId);

      const transformedLogbooks = logbooks.map(transformLogbook);
      setLogbooks(transformedLogbooks);
    } catch (error) {
      console.error("Error fetching logbooks:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getAllLogbooks(userId);
    }
  }, [userId]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (studentTimer !== null) {
        setStudentTimer((prevTimer) => {
          if (prevTimer && prevTimer > 0) {
            const newTimer = prevTimer - 1;
            const hours = Math.floor(newTimer / 3600);
            const minutes = Math.floor((newTimer % 3600) / 60);
            const seconds = newTimer % 60;
            const timeString = `${hours}h ${minutes}m ${seconds}s remaining`;

            if (studentEntry) {
              const newEntry = { ...studentEntry, timeRemaining: timeString };
              setStudentEntry(newEntry);
            }
            return newTimer;
          } else {
            handleCheckout(studentEntry, setStudentEntry, setStudentTimer);
            return null;
          }
        });
      }

      if (workTimer !== null) {
        setWorkTimer((prevTimer) => {
          if (prevTimer && prevTimer > 0) {
            const newTimer = prevTimer - 1;
            const hours = Math.floor(newTimer / 3600);
            const minutes = Math.floor((newTimer % 3600) / 60);
            const seconds = newTimer % 60;
            const timeString = `${hours}h ${minutes}m ${seconds}s remaining`;

            if (workEntry) {
              const newEntry = { ...workEntry, timeRemaining: timeString };
              setWorkEntry(newEntry);
            }
            return newTimer;
          } else {
            handleCheckout(workEntry, setWorkEntry, setWorkTimer);
            return null;
          }
        });
      }

      if (disableAddEntryUntil !== null) {
        const currentTime = Date.now();
        if (currentTime >= disableAddEntryUntil) {
          setDisableAddEntry(false);
          setDisableAddEntryUntil(null);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [studentTimer, workTimer, studentEntry, workEntry, disableAddEntryUntil]);

  const handleCheckin = async (
    entry: LogbookEntry | null,
    setEntry: React.Dispatch<React.SetStateAction<LogbookEntry | null>>,
    setTimer: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    if (entry && user) {
      try {
        setLoading(true); // Set loading to true
        const userId = user?.data.id;
        const classId = "4748596856387765";
        const response = await CheckIn(userId, classId);
        const newEntry = {
          ...entry,
          status: "Checked In",
          id: response.data.id,
        };
        setEntry(newEntry);
        setTimer(4 * 60 * 60);
      } catch (error) {
        console.error("Check-in failed", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCheckout = async (
    entry: LogbookEntry | null,
    setEntry: React.Dispatch<React.SetStateAction<LogbookEntry | null>>,
    setTimer: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    if (entry) {
      try {
        setLoading(true);
        const feedback = entry.description;
        const response = await CheckOut(
          entry.id!,
          feedback,
          rating,
          "47485968563874645438"
        );
        const newEntry = { ...entry, status: "Checked Out" };
        setEntry(newEntry);
        setLogbooks((prevLogbooks) => [newEntry, ...prevLogbooks]);
        setTimer(null);
        setDisableAddEntry(true);
        setDisableAddEntryUntil(Date.now() + 4 * 60 * 60 * 1000);
      } catch (error) {
        console.error("Check-out failed", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const addNewEntry = (
    setEntry: React.Dispatch<React.SetStateAction<LogbookEntry | null>>,
    entry: LogbookEntry | null
  ) => {
    const today = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (!entry || entry.date !== today) {
      const newEntry: LogbookEntry = {
        date: today,
        title: "",
        description: "",
        status: "Not Checked In",
        createdTime: currentTime,
      };
      setEntry(newEntry);
    }
  };

  const fetchMoreLogbooks = async () => {
    if (!userId) return;

    try {
      // setLoadingLogbooks(true);
      await getAllLogbooks(userId);
    } catch (error) {
      console.error("Error fetching more logbooks:", error);
    } finally {
      setLoadingLogbooks(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const renderForm = (
    entry: LogbookEntry | null,
    setEntry: React.Dispatch<React.SetStateAction<LogbookEntry | null>>,
    setTimer: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    if (!entry || entry.status === "Checked Out") {
      return null;
    }

    const isDisabled = entry.status !== "Checked In";

    const handleRatingClick = (rating: string) => {
      if (selectedRating === null) {
        setSelectedRating(rating);
        setRating(rating);
        AOS.refresh(); // Refresh AOS to trigger animation
      }
    };

    return (
      <div
        className={`logbook-entry p-4 mb-4 rounded border ${
          entry.status === "Checked Out" ? "bg-light" : "border-success"
        }`}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0" style={{ fontSize: '1.5rem' }}>
            {formatDate(entry.date)} {entry.title}
          </h6>
          {entry.timeRemaining && (
            <span className="text-muted">{entry.timeRemaining}</span>
          )}
          <span style={{ fontSize: '1.5rem', color: 'black' }}>
            <FiClock className="me-1" style={{ color: 'black' }} />
            {entry.createdTime}
          </span>
        </div>
        <div className="mt-3">
          <textarea
            className="form-control"
            style={{
              height: '110px',
              width: '90%',
              marginLeft: '0',
              borderRadius: '10px',
              resize: 'none',
              paddingTop: '10px',
              fontSize: '1.3rem',
              border: '1px solid lightgray',
            }}
            placeholder="What did you learn from today's lessons?"
            value={entry.description}
            onChange={(e) => {
              const newEntry = { ...entry, description: e.target.value };
              setEntry(newEntry);
            }}
            readOnly={entry.status !== "Checked In"}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex justify-content-center" style={{ flex: 1 }}>
            {(!selectedRating || selectedRating === "good") && (
              <button
                className="btn me-2"
                style={{
                  borderColor: selectedRating === "good" ? 'green' : 'rgb(36, 52, 92)',
                }}
                disabled={isDisabled}
                onClick={() => handleRatingClick("good")}
                data-aos={selectedRating === "good" ? "fade-down" : ""}
              >
                <i className="bi bi-emoji-smile" style={{ color: 'green' }}></i> Good
              </button>
            )}
            {(!selectedRating || selectedRating === "okay") && (
              <button
                className="btn me-2"
                style={{
                  borderColor: 'rgb(36, 52, 92)',
                }}
                disabled={isDisabled}
                onClick={() => handleRatingClick("okay")}
                data-aos={selectedRating === "okay" ? "fade-down" : ""}
              >
                <i className="bi bi-emoji-neutral" style={{ color: 'orange' }}></i> Okay
              </button>
            )}
            {(!selectedRating || selectedRating === "bad") && (
              <button
                className="btn"
                style={{
                  borderColor: 'rgb(36, 52, 92)',
                }}
                disabled={isDisabled}
                onClick={() => handleRatingClick("bad")}
                data-aos={selectedRating === "bad" ? "fade-down" : ""}
              >
                <i className="bi bi-emoji-frown" style={{ color: 'red' }}></i> Bad
              </button>
            )}
          </div>
          <div>
            {entry.status === "Checked Out" ? (
              <button className="btn btn-secondary" disabled>
                {entry.status}
              </button>
            ) : entry.status === "Checked In" ? (
              <button
                className="btn btn-success"
                onClick={() => handleCheckout(entry, setEntry, setTimer)}
                disabled={loading}
              >
                {loading ? (
                  <div className={styles.loaderButton}></div>
                ) : (
                  "Checkout"
                )}
              </button>
            ) : (
              <button
                className={`rbt-btn btn-gradient`}
                style={{ 
                  backgroundColor: `${showLogbookList ? 'white':'rgb(36, 52, 92)'}`, 
                  backgroundImage: 'none', 
                  color: `${showLogbookList ? 'black':'white'}`,
                  border: `${showLogbookList && '1px solid #25355c'}`,
                  padding: '0.3rem 1.2rem',  // Increased width
                  height: '38px',  // Slightly decreased height
                }}
                onClick={() => handleCheckin(entry, setEntry, setTimer)}
                disabled={loading}
              >
                {loading ? (
                  <div className={styles.loaderButton}></div>
                ) : (
                  <h6 style={{ color: 'white', fontSize: '0.8rem', textAlign: 'center', margin: '0' }}>Check-In</h6>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${styles.logbookContainer}`} style={{ margin: '0', padding: '20px' }}>
      <div className={styles.buttonContainer}>
        <button
          className="rbt-btn btn-gradient"
          style={{ backgroundColor: `${!showLogbookList ? 'white':'#25355c'} `, backgroundImage: 'none', color:`${!showLogbookList ? 'black':'white'}`,border:`${!showLogbookList && '1px solid #25355c'}` }}
          onClick={() => (
            
            setShowLogbookList(false),
            addNewEntry(
              activeTab === "school" ? setStudentEntry : setWorkEntry,
              activeTab === "school" ? studentEntry : workEntry
            )
          )
          }
          // disabled={disableAddEntry}
        >
          <i className="bi bi-plus"></i> Add Entry
        </button>
        <button
          className={`rbt-btn btn-gradient`}
          style={{ backgroundColor: `${showLogbookList ? 'white':'#25355c'} `, backgroundImage: 'none', color:`${showLogbookList ? 'black':'white'}`,border:`${showLogbookList && '1px solid #25355c'}` }}
          onClick={() => {
            setShowLogbookList(true);
            if (!showLogbookList) fetchMoreLogbooks();
          }}
        >
          <i className="bi bi-journal-bookmark-fill"></i>
          View All Logbooks
        </button>
      </div>

      {showLogbookList ? (
        loadingLogbooks ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          <div className={styles.logbookListContainer}>
            <LogbookList
              logbooks={logbooks}
              fetchMoreLogbooks={fetchMoreLogbooks}
              hasMore={hasMore}
            />
          </div>
        )
      ) : (
        <div className={`${styles.logbookCard}`}>
          {activeTab === "school" || activeTab === "work"
            ? renderForm(studentEntry, setStudentEntry, setStudentTimer)
            : renderForm(workEntry, setWorkEntry, setWorkTimer)
          }
        </div>
      )}
    </div>
  );
};

export default StudentLogbook;
