import { StepProps } from "../page";
import styles from "../CheckIn.module.scss";
import CurvedCornerIcon from "../svg/CurvedCornerIcon";

export default function ProgressBar({ step, goToStep }: StepProps) {
    return (
        <div className={styles.progressBar}>
            <div
                className={`${styles.step} ${step === 1 ? styles.active : ""}`}
                onClick={() => goToStep(1)}
            ></div>
            <div
                className={`${styles.step} ${step === 2 ? styles.active : ""}`}
                onClick={() => goToStep(2)}
            ></div>
            <div
                className={`${styles.step} ${step === 3 ? styles.active : ""}`}
                onClick={() => goToStep(3)}
            ></div>
            <div
                className={`${styles.step} ${step === 4 ? styles.active : ""}`}
                onClick={() => goToStep(4)}
            ></div>
            {step > 1 &&

                <div className={styles.iconPosition}>
                    <div className={styles.curvedIcon}><CurvedCornerIcon /></div>
                </div>

            }
        </div>
    );
}