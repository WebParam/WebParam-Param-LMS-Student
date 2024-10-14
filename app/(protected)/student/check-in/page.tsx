"use client";

import React, { useState } from "react";
import styles from "./CheckIn.module.scss";
import CheckInIcon from "./svg/CheckInIcon";
import StepsAndForm from "./components/StepsAndForm";
import YouthDetails from "./components/YouthDetails";
import StepComponent from "./components/StepComponent";
import WorkExperience from "./components/WorkExperience";
import NextDefaultIcon from "./svg/NextDefaultIcon";

export interface StepProps {
  step: number;
  goToStep: (step: number) => void;
};

export default function CheckIn() {
  const [step, setStep] = useState<number>(0);

  const nextStep = () => {
    if (step < 3) setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep((prevStep) => prevStep - 1);
  };

  const goToStep = (selectedStep: number) => {
    setStep(selectedStep);
  };

  return (
    <div className={styles.pageContainer} style={{ backgroundColor: step === 0 ? '#3c3f48' : '#F2F2F2' }}>
      <div className={styles.cardContainer}>
        <div className={styles.cardHeader}>
          <div className="d-flex flex-column">
            <h1>Youth Programme Monthly Check-in 2023</h1>
            <p>This survey will take approximately 8 minutes to complete</p>
          </div>
          <button className={styles.closeButton}>✕</button>
          <div className={styles.iconContainer}>
            <CheckInIcon />
          </div>
        </div>

        <div className={styles.bodyContainer}>
          {step === 0 && <StepsAndForm step={step} goToStep={goToStep} />}
          {step === 1 && <YouthDetails step={step} goToStep={goToStep} stepTitle={'Let’s Start...'} heading={'Youth Details'} />}
          {step === 2 && <WorkExperience step={step} goToStep={goToStep} stepTitle={'Tell us about work...'} heading={'Work Experience'} />}
          {step > 2 && <StepComponent step={step} />}
          <div className={styles.formFooter}>
            {step > 0 && (
              <button type="submit" className={`${styles.prevButton}`} onClick={() => prevStep()}>
                {'PREVIOUS'}
                <NextDefaultIcon />
              </button>
            )}
            {step < 3 && (
              <button type="submit" className={`${styles.nextButton}`} onClick={() => nextStep()}>
                {'NEXT'}
                <NextDefaultIcon />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}






