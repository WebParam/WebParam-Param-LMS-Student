"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Interface for context
interface ProgressContextType {
  biographyPercentage: number;
  setBiographyPercentage: (biographyPercentage: number) => void;
  contactInformationPercentage: number;
  setContactInformationPercentage: (contactInformationPercentage: number) => void;
  demographicLegalPercentage: number;
  setDemographicLegalPercentage: (demographicLegalPercentage: number) => void;
  employmentPercentage: number;
  setEmploymentPercentage: (employmentPercentage: number) => void;
  documentsPercentage: number;
  setDocumentsPercentage: (documentsPercentage: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressContextProvider = ({ children }: ProgressProviderProps) => {
  const [biographyPercentage, setBiographyPercentage] = useState<number>(0);
  const [contactInformationPercentage, setContactInformationPercentage] = useState<number>(0);
  const [employmentPercentage, setEmploymentPercentage] = useState<number>(0);
  const [documentsPercentage, setDocumentsPercentage] = useState<number>(0);
  const [demographicLegalPercentage, setDemographicLegalPercentage] = useState<number>(0);

  useEffect(() => {
    // Retrieve and set initial values from localStorage on the client side
    const biography = localStorage.getItem("Biography");
    const contactInformation = localStorage.getItem("contactInformationPercentage");
    const demographicLegal = localStorage.getItem("demographicLegalPercentage");
    const employment = localStorage.getItem("employmentPercentage");
    const documents = localStorage.getItem("documentsPercentage");

    if (biography) setBiographyPercentage(Number(biography));
    if (contactInformation) setContactInformationPercentage(Number(contactInformation));
    if (demographicLegal) setDemographicLegalPercentage(Number(demographicLegal));
    if (employment) setEmploymentPercentage(Number(employment));
    if (documents) setDocumentsPercentage(Number(documents));
  }, []);

  // Effect to persist values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("Biography", biographyPercentage.toString());
  }, [biographyPercentage]);

  useEffect(() => {
    localStorage.setItem("contactInformationPercentage", contactInformationPercentage.toString());
  }, [contactInformationPercentage]);

  useEffect(() => {
    localStorage.setItem("employmentPercentage", employmentPercentage.toString());
  }, [employmentPercentage]);

  useEffect(() => {
    localStorage.setItem("documentsPercentage", documentsPercentage.toString());
  }, [documentsPercentage]);

  useEffect(() => {
    localStorage.setItem("demographicLegalPercentage", demographicLegalPercentage.toString());
  }, [demographicLegalPercentage]);

  return (
    <ProgressContext.Provider
      value={{
        biographyPercentage,
        setBiographyPercentage,
        contactInformationPercentage,
        setContactInformationPercentage,
        demographicLegalPercentage,
        setDemographicLegalPercentage,
        employmentPercentage,
        setEmploymentPercentage,
        documentsPercentage,
        setDocumentsPercentage
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgressContext = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgressContext must be used within a ProgressProvider");
  }
  return context;
};
