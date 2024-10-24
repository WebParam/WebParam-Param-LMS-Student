import styles from '@/app/(protected)/student/check-in/CheckIn.module.scss'
import ProgressBar from './ProgressBar';
import SubmitIcon from './SubmitIcon';
import BackIcon from '@/app/(protected)/student/check-in/svg/BackIcon';
import { postCreateSurvey } from '@/app/api/check-in/checkin';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

interface OverallReViewrops {
    heading: string;
    stepTitle: string;
    step: number;
    goToStep: (step: number) => void;
    prevStep: () => void;
}

export default function  OverallReView({ step, goToStep, prevStep, stepTitle, heading }: OverallReViewrops) {
    const userId = Cookies.get('userID');
    const handleSubmit = async () => {
        try {
            const survey = JSON.parse(sessionStorage.getItem('survey') || '{}');
            const experience = JSON.parse(sessionStorage.getItem('experience') || '{}');
            const learning = JSON.parse(sessionStorage.getItem('learning') || '{}');

            const combinedSurvey = {
                survey: {
                    ...survey,
                    surname: survey.name.split[0],
                    "userId": userId,
                    workExperience: experience,
                    learningExperience: learning,
                }
            };
            const response = await postCreateSurvey(combinedSurvey);

            if (response.status >= 200 && response.status < 300) {
                sessionStorage.removeItem('survey');
                sessionStorage.removeItem('experience');
                sessionStorage.removeItem('learning');
                toast.success('Create survey successfully');
                goToStep(0);
            } else {
                toast.error('Failed to create survey!');
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('Something went wrong!');
            }
        }
    };

    return (
        <div className={styles.detailsCard}>
            <h3 className={styles.stepTitle}>{stepTitle}</h3>
            <ProgressBar step={step} goToStep={goToStep} />
            <div className={styles.formHeading}>
                <h2 className={`${styles.steHeading} opacity-50`}>{`Step ${step}:`}</h2>
                <h2 className={styles.steHeading}>{heading}</h2>
            </div>
            <div className={`${styles.formFooter}`} style={{ marginTop: '30px' }}>
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