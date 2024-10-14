import React from "react";
import styles from '../CheckIn.module.scss';

// Define types for the props
interface ProgressIndicatorProps {
  progressSteps: any[]; // If you know the type of the items in progressSteps, replace `any` with the actual type
  currentProgressStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progressSteps, currentProgressStep }) => {
  console.log(currentProgressStep, "currentProgressStep");

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressIndicator}>
        {progressSteps.map((step) => (
          <div
            key={step}
            className={` ${styles.circle} ${step < currentProgressStep ? styles.active : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;

