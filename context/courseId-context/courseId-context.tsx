"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CourseIdContextType {
  courseId: string | null;
  setCourseId: (courseId: string | null) => void;
}

const CourseIdContext = createContext<CourseIdContextType | undefined>(undefined);

interface CourseIdProviderProps {
  children: ReactNode;
}

export const CourseIdProvider = ({ children, }: CourseIdProviderProps) => {
  const [courseId, setCourseId] = useState<string | null>(null);

  useEffect(() => {
    const storedCourseId = localStorage.getItem("courseId");
    if (storedCourseId) {
      setCourseId(storedCourseId);
    }
  }, []);

  useEffect(() => {
    if (courseId) {
      localStorage.setItem("courseId", courseId);
    }
  }, [courseId]);

  return (
    <CourseIdContext.Provider value={{ courseId, setCourseId }}>
      {children}
    </CourseIdContext.Provider>
  );
};

export const useCourseId = (): CourseIdContextType => {
  const context = useContext(CourseIdContext);
  if (context === undefined) {
    throw new Error("useCourseId must be used within a CourseIdProvider");
  }
  return context;
};
