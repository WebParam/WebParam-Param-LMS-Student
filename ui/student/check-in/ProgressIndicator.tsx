import React from "react";
import styles from '@/app/(protected)/student/check-in/CheckIn.module.scss';

interface ProgressIndicatorProps {
    progressSteps: number[];
    currentProgressStep: number;
    setCurrentProgressStep: (value: number) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progressSteps, currentProgressStep, setCurrentProgressStep }) => {
    return (
        <div className={styles.progressContainer}>
            <div className={styles.progressIndicator}>
                {progressSteps.map((step, index) => (
                    <div
                        onClick={() => { setCurrentProgressStep(index + 1) }}
                        key={index}
                        className={`${styles.circle} ${index < currentProgressStep ? styles.active : ""}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ProgressIndicator;
