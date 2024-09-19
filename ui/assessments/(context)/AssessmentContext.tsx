import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface AssessmentContextProps {
  assessmentType: string;
  activeTab: string;
  setAssessmentType: (type: string) => void;
  setActiveTab: (tab: string) => void;
}

const AssessmentContext = createContext<AssessmentContextProps | undefined>(undefined);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const searchParams = useSearchParams();
  const [assessmentType, setAssessmentType] = useState(searchParams.get("type") || "summative");
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "active");

  useEffect(() => {
    const type = searchParams.get("type") || "summative";
    const tab = searchParams.get("tab") || "active";
    setAssessmentType(type);
    setActiveTab(tab);
  }, [searchParams]);

  return (
    <AssessmentContext.Provider value={{ assessmentType, activeTab, setAssessmentType, setActiveTab }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessmentContext = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error("useAssessmentContext must be used within an AssessmentProvider");
  }
  return context;
};