import styles from '@/app/(protected)/student/check-in/CheckIn.module.scss'
import NextIcon from '@/app/(protected)/student/check-in/svg/NextIcon';

interface StepsFormProps {
    nextStep: () => void;
}

export default function StepsAndForm({ nextStep }: StepsFormProps) {
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
            <div className={styles.formFooter}>
                <button
                    type="button"
                    className={`${styles.nextButton}`}
                    onClick={() => {
                        if (nextStep) {
                            nextStep()
                        }
                    }}
                >
                    {'NEXT'}
                    <NextIcon />
                </button>
            </div>
        </div>
    );
}