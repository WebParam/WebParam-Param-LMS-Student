import styles from '../CheckIn.module.scss'
import { StepProps } from '../page';
import NextDefaultIcon from '../svg/NextDefaultIcon';

export default function StepsAndForm({ step, goToStep }: StepProps) {
    return (
        <div>
            <div className={styles.stepsContainer}>
                <div className={styles.stepItem}>
                    <span>STEP 2</span>
                    <span className={styles.stepHeading}>Work Experience</span>
                </div>
                <div className={styles.stepItem}>
                    <span>STEP 3</span>
                    <span className={styles.stepHeading}>Learning</span>
                </div>
                <div className={styles.stepItem}>
                    <span>STEP 4</span>
                    <span className={styles.stepHeading}>Overall Review</span>
                </div>
            </div>
            <div className={styles.listContainer}>
                <ul className={styles.list}>
                    <li>Name & Surname</li>
                    <li>Reporting for Month</li>
                    <li>Email Address</li>
                    <li>Host Partner</li>
                    <li>My work experience matches the job description</li>
                    <li>Why do you believe so?</li>
                    <li>My workload is sufficient?</li>
                    <li>Why do you believe so?</li>
                    <li>My supervisor listens and appreciates suggestions?</li>
                    <li>Why do you believe so?</li>
                    <li>Any other questions or queries?</li>
                </ul>
            </div>
        </div>
    );
}