import styles from '@/app/(protected)/student/check-in/CheckIn.module.scss'
import { StepProps } from '@/app/(protected)/student/check-in/page';
import ProgressBar from './ProgressBar';

interface OverallReViewrops extends StepProps {
    heading: string;
    stepTitle: string;
}

export default function OverallReView({ step, goToStep, stepTitle, heading }: OverallReViewrops) {
    return (
        <div className={styles.detailsCard}>
            <h3 className={styles.stepTitle}>{stepTitle}</h3>
            <ProgressBar step={step} goToStep={goToStep} />
            <div className={styles.formHeading}>
                <h2 className={`${styles.steHeading} opacity-50`}>{`Step ${step}:`}</h2>
                <h2 className={styles.steHeading}>{heading}</h2>
            </div>
        </div>
    );
}