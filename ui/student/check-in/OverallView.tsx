import styles from '@/app/(protected)/student/check-in/CheckIn.module.scss'
import { StepProps } from '@/app/(protected)/student/check-in/page';
import ProgressBar from './ProgressBar';
import SubmitIcon from './SubmitIcon';
import BackIcon from '@/app/(protected)/student/check-in/svg/BackIcon';
import { postCreateSurvey } from '@/app/api/check-in/checkin';

interface OverallReViewrops {
    heading: string;
    stepTitle: string;
    step: number;
    goToStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export default function OverallReView({ step, goToStep, nextStep, prevStep, stepTitle, heading }: OverallReViewrops) {

    const handleSubmit = async () => {
        const survey = JSON.parse(sessionStorage.getItem('survey') || '{}');
        const experience = JSON.parse(sessionStorage.getItem('experience') || '{}');
        const learning = JSON.parse(sessionStorage.getItem('learning') || '{}');
        const combinedSurvey = {
            ...survey,
            surname: '-',
            workExperience: experience,
            learningExperience: learning
        };

        console.log(combinedSurvey, 'combinedSurvey')

        try {
            const response = await postCreateSurvey(combinedSurvey);

            if (response.status >= 200 && response.status < 300) {
                goToStep(1);
            } else {
                console.error('Failed to create survey', response.data);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div className={styles.detailsCard}>
            <h3 className={styles.stepTitle}>{stepTitle}</h3>
            <ProgressBar step={step} goToStep={goToStep} />
            <div className={styles.formHeading}>
                <h2 className={`${styles.steHeading} opacity-50`}>{`Step ${step}:`}</h2>
                <h2 className={styles.steHeading}>{heading}</h2>
            </div>
            <div className={styles.formFooter}>
                <button
                    type="button"
                    className={`${styles.prevButton}`}
                    onClick={() => prevStep()}
                >
                    <BackIcon />
                    {'BACK'}
                </button>
                <button
                    type="submit"
                    className={`${styles.submitButton}`}
                    onClick={() => handleSubmit()}
                >
                    {'SUBMIT'}
                    <SubmitIcon />
                </button>
            </div>
        </div>
    );
}