"use client";
import React, { useEffect, useRef, useState } from "react";
import { TiTick } from "react-icons/ti";
import styles from "./Stepper.module.css";

interface StepperProps {
  title: string;
  completedSteps: number;
}

const Stepper: React.FC<StepperProps> = ({ title, completedSteps }) => {
  const steps: string[] = [
    "Application Submitted",
    "Application Received by HR",
    "Application in Review",
    "Application Feedback",
  ];
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [complete, setComplete] = useState<boolean>(false);
  const [margins, setMargins] = useState({ left: 0, right: 0 });
  const stepRef = useRef<(HTMLDivElement | null)[]>([]);
  const calculateProgressBarWidth = () => {
    return (currentStep / steps.length) * 100;
  };

  useEffect(() => {
    setMargins({
      left: stepRef.current[0]?.offsetWidth
        ? stepRef.current[0].offsetWidth / 2
        : 0,
      right:
        (stepRef.current[stepRef.current.length - 1]?.offsetWidth ?? 0) / 2,
    });
  }, [stepRef]);

  return (
    <>
      <h6>{title}</h6>
      <div className={styles.stepper}>
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => {
              stepRef.current[i] = el;
            }}
            className={`${styles.step} ${
              i + 1 <= completedSteps && styles.complete
            }`}
          >
            <div className={styles.stepNumber}></div>
            <p className={styles.stepLabel}>{step}</p>
          </div>
        ))}
        <div
          className={styles.progressBar}
          style={{
            width: `calc(100% - ${margins.left + margins.right}px)`,
            marginLeft: margins.left,
            marginRight: margins.right,
          }}
        >
          <div
            className={styles.progress}
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Stepper;
