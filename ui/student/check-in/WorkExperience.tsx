import { useState } from 'react';
import { Formik } from 'formik';
import styles from '@/app/(protected)/student/check-in//CheckIn.module.scss'
import ProgressBar from './ProgressBar';
import ProgressIndicator from './ProgressIndicator';
import Image from 'next/image';
import { StepProps } from '@/app/(protected)/student/check-in/page';
import BackIcon from '@/app/(protected)/student/check-in/svg/BackIcon';
import NextIcon from '@/app/(protected)/student/check-in/svg/NextIcon';

interface WorkExperienceProps {
    heading: string;
    stepTitle: string;
    step: number;
    goToStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export default function WorkExperience({ step, goToStep, nextStep, prevStep, stepTitle, heading }: WorkExperienceProps) {
    const [currentProgressStep, setCurrentProgressStep] = useState(4);
    const [hovered, setHovered] = useState({ happy: false, okay: false, unhappy: false });
    const totalSteps = 10;

    const initialValues = {
        workExperienceRating: '',
        jobDescriptionMatch: '',
        supervisorFeedback: 0,
        workloadStatement: '',
        additionalComments: '',
    };

    const handleSubmit = (values: typeof initialValues, actions: any, goToStep: (step: number) => void) => {
        values.supervisorFeedback = currentProgressStep;
        console.log(values, "valuesvalues")
        sessionStorage.setItem('experience', JSON.stringify(values));
        goToStep(3);
        actions.setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => handleSubmit(values, actions, goToStep)}
        >
            {({ isSubmitting, handleSubmit, setFieldValue, values }) => (
                <form onSubmit={handleSubmit}>
                    <div className={styles.detailsCard}>
                        <h3 className={styles.stepTitle}>{stepTitle}</h3>
                        <ProgressBar step={step} goToStep={goToStep} />
                        <div className={styles.formHeading}>
                            <h2 className={`${styles.steHeading} opacity-50}`}>{`Step ${step}:`}</h2>
                            <h2 className={styles.steHeading}>{heading}</h2>
                        </div>
                        <div className={styles.workExperienceBody}>
                            <div className={styles.questionSection}>
                                <div className={styles.questionNo}>
                                    1.
                                </div>
                                <div className={styles.questionSection}>
                                    Would you say you are happy with your work experience this month?
                                </div>
                            </div>
                            <div className={styles.feedbackReactSection}>
                                <button className={styles.feedbackReact}
                                    type="button"
                                    onClick={() => setFieldValue('workExperienceRating', 'happy')}
                                    onMouseEnter={() => setHovered({ ...hovered, happy: true })}
                                    onMouseLeave={() => setHovered({ ...hovered, happy: false })}
                                >
                                    <Image
                                        src={hovered.happy || values.workExperienceRating === 'happy' ? '/svg/happyActiveIcon.svg' : '/svg/happyDefaultIcon.svg'}
                                        alt="Happy Icon"
                                        width={40}
                                        height={40}
                                    />

                                    <div className={styles.title}>Happy</div>
                                </button>
                                <button
                                    className={styles.feedbackReact}
                                    type="button"
                                    onClick={() => setFieldValue('workExperienceRating', 'okay')}
                                    onMouseEnter={() => setHovered({ ...hovered, okay: true })}
                                    onMouseLeave={() => setHovered({ ...hovered, okay: false })}
                                >
                                    <Image
                                        src={hovered.okay || values.workExperienceRating === 'okay' ? '/svg/okayActiveIcon.svg' : '/svg/okayDefaultIcon.svg'}
                                        alt="Okay Icon"
                                        width={40}
                                        height={40}
                                    />
                                    <div className={styles.title}>Okay</div>
                                </button>
                                <button
                                    className={styles.feedbackReact}
                                    type="button"
                                    onClick={() => setFieldValue('workExperienceRating', 'unhappy')}
                                    onMouseEnter={() => setHovered({ ...hovered, unhappy: true })}
                                    onMouseLeave={() => setHovered({ ...hovered, unhappy: false })}
                                >
                                    <Image
                                        src={hovered.unhappy || values.workExperienceRating === 'unhappy' ? '/svg/unhappyAciveIcon.svg' : '/svg/unhappyDefaultIcon.svg'}
                                        alt="Unhappy Icon"
                                        width={40}
                                        height={40}
                                    />
                                    <div className={styles.title}>Unhappy</div>
                                </button>
                            </div>

                            <div className={styles.questionSection}>
                                <div className={styles.questionNo}>
                                    2.
                                </div>
                                <div className={styles.questionSection}>
                                    Does the work you do match your job description?
                                </div>
                            </div>

                            <div className={styles.matchYourJobSection}>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <div key={value} className={styles.matchYourJob}>
                                        <button
                                            type="button"
                                            className={
                                                `${styles.reactButton} ${values.jobDescriptionMatch === String(value) ? styles.reactButtonSelected : ''}`
                                            }
                                            onClick={() => setFieldValue('jobDescriptionMatch', value.toString())}
                                        >
                                            {value}
                                        </button>
                                        <div className={styles.title}>
                                            {value === 1 && 'Extremely Dissatisfied'}
                                            {value === 5 && 'Extremely Satisfied'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.questionSection}>
                                <div className={styles.questionNo}>
                                    3.
                                </div>
                                <div className={styles.questionSection}>
                                    On a scale how often does your supervisor listen and appreciate your suggestions?
                                </div>
                            </div>

                            <div className={styles.workLoadSection}>
                                {['Too little work is received', 'My workload is sufficient', 'I had nothing to do', 'My workload is overwhelming'].map((option) => (
                                    <div
                                        key={option}
                                        className={`${styles.workLoadButton} ${values.workloadStatement === option ? styles.workLoadButtonSelected : ''}`}
                                        onClick={() => setFieldValue('workloadStatement', option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>

                            <div className={styles.questionSection}>
                                <div className={styles.questionNo}>
                                    4.
                                </div>
                                <div className={styles.questionSection}>
                                    On a scale how often does your supervisor listen and appreciate your suggestions?
                                </div>
                            </div>
                            <ProgressIndicator progressSteps={Array.from({ length: totalSteps })} currentProgressStep={currentProgressStep} setCurrentProgressStep={setCurrentProgressStep} />
                            <div className={styles.mySuggestions}>
                                <h5 className={styles.suggestions}>
                                    My suggestions are ignored
                                </h5>
                                <h5 className={styles.suggestions}>
                                    My suggests are appreciated
                                </h5>
                                <h5 className={styles.suggestions}>
                                    My suggests are extremely appreciated
                                </h5>
                            </div>
                            <div className={styles.questionSection}>
                                <div className={styles.questionSection}>
                                    Any other compliments, unaddressed complaints or work related questions?
                                </div>
                            </div>
                            <div className={styles.questionSection}>
                                <div className={styles.questionSection}>
                                    (Optional)
                                </div>
                            </div>
                            <textarea
                                name="additionalComments"
                                id=""
                                rows={4}
                                placeholder='Type your Answer'
                                className={styles.textArea}
                                onChange={(e) => setFieldValue('additionalComments', e.target.value)}
                            />
                        </div>
                        <div className={styles.formFooter}>
                            <button
                                type="button"
                                className={`${styles.prevButton}`}
                                onClick={() => {
                                    if (prevStep) {
                                        prevStep()
                                    }
                                }}
                            >
                                <BackIcon />
                                {'BACK'}
                            </button>
                            <button
                                type="submit"
                                className={`${styles.nextButton}`}
                                disabled={isSubmitting}
                            >
                                {'NEXT'}
                                <NextIcon />
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
}

