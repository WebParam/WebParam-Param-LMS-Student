import React from "react";
import styles from '../CheckIn.module.scss';

interface ProgressIndicatorProps {
    progressSteps: number[]; // Assuming each step is a number
    currentProgressStep: number;
    setCurrentProgressStep: (value: number) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progressSteps, currentProgressStep, setCurrentProgressStep }) => {
    console.log(currentProgressStep, "currentProgressStep");

    return (
        <div className={styles.progressContainer}>
            <div className={styles.progressIndicator}>
                {progressSteps.map((step, index) => (
                    <div
                        onClick={() => { setCurrentProgressStep(index + 1) }}
                        key={step}
                        className={`${styles.circle} ${index < currentProgressStep ? styles.active : ""}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ProgressIndicator;
