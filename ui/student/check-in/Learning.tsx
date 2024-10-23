import { useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import styles from '@/app/(protected)/student/check-in/CheckIn.module.scss'
import { StepProps } from '@/app/(protected)/student/check-in/page';
import Image from 'next/image';
import ProgressBar from './ProgressBar';
import BackIcon from '@/app/(protected)/student/check-in/svg/BackIcon';
import NextIcon from '@/app/(protected)/student/check-in/svg/NextIcon';
import * as Yup from 'yup';

interface LearningProps {
    heading: string;
    stepTitle: string;
    step: number;
    goToStep: (step: number) => void;
    prevStep: () => void;
}

const validationSchema = Yup.object({
    monthlyWorkExperienceRating: Yup.string().required('Work experience rating is required'),
    jobDescriptionMatch: Yup.string().required('Job description match is required'),
    additionalComments: Yup.string().required('Additional comments is required'),
});

export default function Learning({ step, goToStep, prevStep, stepTitle, heading }: LearningProps) {
    const [hovered, setHovered] = useState({ happy: false, okay: false, unhappy: false });
    const learningData = JSON.parse(sessionStorage.getItem('learning') || '{}');

    const initialValues = {
        monthlyWorkExperienceRating: learningData.monthlyWorkExperienceRating || '',
        jobDescriptionMatch: learningData.jobDescriptionMatch || '',
        additionalComments: learningData.additionalComments || '',
    };

    const handleSubmit = (values: typeof initialValues, actions: any, goToStep: (step: number) => void) => {
        sessionStorage.setItem('learning', JSON.stringify(values));
        goToStep(4);
        actions.setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
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
                                    Would you say you are happy with your learning experience this month?
                                </div>
                            </div>
                            <div className={`${styles.feedbackReactSection} ${styles.feedbackReactStart}`}>
                                <button className={styles.feedbackReact}
                                    type="button"
                                    onClick={() => setFieldValue('monthlyWorkExperienceRating', 'happy')}
                                    onMouseEnter={() => setHovered({ ...hovered, happy: true })}
                                    onMouseLeave={() => setHovered({ ...hovered, happy: false })}
                                >
                                    <Image
                                        src={hovered.happy || values.monthlyWorkExperienceRating === 'happy' ? '/svg/happyActiveIcon.svg' : '/svg/happyDefaultIcon.svg'}
                                        alt="Happy Icon"
                                        width={40}
                                        height={40}
                                    />

                                    <div className={styles.title}>Happy</div>
                                </button>
                                <button
                                    className={styles.feedbackReact}
                                    type="button"
                                    onClick={() => setFieldValue('monthlyWorkExperienceRating', 'okay')}
                                    onMouseEnter={() => setHovered({ ...hovered, okay: true })}
                                    onMouseLeave={() => setHovered({ ...hovered, okay: false })}
                                >
                                    <Image
                                        src={hovered.okay || values.monthlyWorkExperienceRating === 'okay' ? '/svg/okayActiveIcon.svg' : '/svg/okayDefaultIcon.svg'}
                                        alt="Okay Icon"
                                        width={40}
                                        height={40}
                                    />
                                    <div className={styles.title}>Okay</div>
                                </button>
                                <button
                                    className={styles.feedbackReact}
                                    type="button"
                                    onClick={() => setFieldValue('monthlyWorkExperienceRating', 'unhappy')}
                                    onMouseEnter={() => setHovered({ ...hovered, unhappy: true })}
                                    onMouseLeave={() => setHovered({ ...hovered, unhappy: false })}
                                >
                                    <Image
                                        src={hovered.unhappy || values.monthlyWorkExperienceRating === 'unhappy' ? '/svg/unhappyAciveIcon.svg' : '/svg/unhappyDefaultIcon.svg'}
                                        alt="Unhappy Icon"
                                        width={40}
                                        height={40}
                                    />
                                    <div className={styles.title}>Unhappy</div>
                                </button>
                            </div>
                            <ErrorMessage name="monthlyWorkExperienceRating" component="div" className={styles.errorText} />

                            <div className={styles.questionSection}>
                                <div className={styles.questionNo}>
                                    2.
                                </div>
                                <div className={styles.questionSection}>
                                    Does the learning you do match your expectations?
                                </div>
                            </div>

                            <div className={`${styles.matchYourJobSection} ${styles.matchYourJobStart}`}>
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
                            <ErrorMessage name="jobDescriptionMatch" component="div" className={styles.errorText} />

                            <div className={styles.questionSection}>
                                <div className={styles.questionSection}>
                                    Any other compliments, unaddressed complaints or learning-related questions?
                                </div>
                            </div>
                            <textarea
                                name="additionalComments"
                                id=""
                                placeholder='Type your Answer'
                                rows={4}
                                className={styles.textArea}
                                onChange={(e) => setFieldValue('additionalComments', e.target.value)}
                            />
                            <ErrorMessage name="additionalComments" component="div" className={styles.errorText} />
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
