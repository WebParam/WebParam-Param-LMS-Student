// context/lesson-context/lesson-context.tsx
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface LessonContextProps {
  id: string | null;
  setId: (id: string) => void;
  navigateToLesson: () => void;
}

const LessonContext = createContext<LessonContextProps | undefined>(undefined);

export const LessonProvider = ({ children }: { children: ReactNode }) => {
  const [id, setIdState] = useState<string | null>(null);

  useEffect(() => {
    const savedId = localStorage.getItem("lessonId");
    if (savedId) {
      setIdState(savedId);
    }
  }, []);

  const setId = (id: string) => {
    setIdState(id);
    localStorage.setItem("lessonId", id);
  };

  const navigateToLesson = () => {
    window.location.href = "/lesson";
  };

  return (
    <LessonContext.Provider value={{ id, setId, navigateToLesson }}>
      {children}
    </LessonContext.Provider>
  );
};

export const useLessonContext = () => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error("useLessonContext must be used within a LessonProvider");
  }
  return context;
};
