"use client";

import React, { useState } from "react";
import styles from "./CheckIn.module.scss";
import CheckInIcon from "./svg/CheckInIcon";
import StepsAndForm from "./components/StepsAndForm";
import YouthDetails from "./components/YouthDetails";
import StepComponent from "./components/StepComponent";
import WorkExperience from "./components/WorkExperience";
import UnderLineIcon from "./svg/UnderLineIcon";
import Learning from "./components/Learning";
import OverallReView from "./components/OverallView";
import SubmitIcon from "./components/SubmitIcon";
import BackIcon from "./svg/BackIcon";
import NextIcon from "./svg/NextIcon";

export interface StepProps {
  step: number;
  goToStep: (step: number) => void;
};

export default function CheckIn() {
  const [step, setStep] = useState<number>(0);

  const nextStep = () => {
    if (step < 4) setStep((prevStep) => prevStep + 1);
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
            <h1 className={styles.heading}>
              Youth Programme Monthly Check-in 2024
              {(step === 2 || step === 3) &&
                <div className={styles.underLineIcon}>
                  <UnderLineIcon />
                </div>
              }
            </h1>

            {!(step === 2 || step === 3) && <p>This survey will take approximately 8 minutes to complete</p>}
          </div>
          <button className={styles.closeButton}>✕</button>
          <div className={(step == 2 || step === 3) ? styles.iconContainerHalf : styles.iconContainer}>
            <CheckInIcon />
          </div>
        </div>

        <div className={styles.bodyContainer}>
          {step === 0 && <StepsAndForm step={step} goToStep={goToStep} />}
          {step === 1 && <YouthDetails step={step} goToStep={goToStep} stepTitle={'Let’s Start...'} heading={'Youth Details'} />}
          {step === 2 && <WorkExperience step={step} goToStep={goToStep} stepTitle={'Tell us about work...'} heading={'Work Experience'} />}
          {step === 3 && <Learning step={step} goToStep={goToStep} stepTitle={'One more...'} heading={'Learning'} />}
          {step === 4 && <OverallReView step={step} goToStep={goToStep} stepTitle={'And we are done...'} heading={'Overall View'} />}
          {step > 4 && <StepComponent step={step} />}
          <div className={styles.formFooter}>
            {step > 0 && (
              <button
                type="button"
                className={`${styles.prevButton}`}
                onClick={() => prevStep()}
              >
                <BackIcon />
                {'BACK'}
              </button>
            )}
            {step < 4 && (
              <button
                type="button"
                className={`${styles.nextButton}`}
                onClick={() => nextStep()}
              >
                {'NEXT'}
                <NextIcon />
              </button>
            )}
            {step === 4 && (
              <button
                type="submit"
                className={`${styles.submitButton}`}
                onClick={() => nextStep()}
              >
                {'SUBMIT'}
                <SubmitIcon />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}






