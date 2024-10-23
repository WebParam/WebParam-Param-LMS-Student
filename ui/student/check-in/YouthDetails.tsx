import * as React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from '@/app/(protected)/student/check-in/CheckIn.module.scss';
import ProgressBar from './ProgressBar';
import { StepProps } from '@/app/(protected)/student/check-in/page';
import BackIcon from '@/app/(protected)/student/check-in/svg/BackIcon';
import NextIcon from '@/app/(protected)/student/check-in/svg/NextIcon';

interface YouthDetailsProps extends StepProps {
    heading: string;
    stepTitle: string;
    step: number;
    goToStep: (step: number) => void;
    prevStep: () => void;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    monthReporting: Yup.string().required('Month reporting is required'),
    emailAddress: Yup.string().email('Invalid emailAddress address').required('emailAddress is required'),
    hostPartner: Yup.string().required('Host partner is required'),
});

export default function YouthDetails({ step, goToStep, prevStep, stepTitle, heading }: YouthDetailsProps) {
    const surveyData = JSON.parse(sessionStorage.getItem('survey') || '{}');

    const initialValues = {
        name: surveyData.name || '',
        monthReporting: surveyData.monthReporting || '',
        emailAddress: surveyData.emailAddress || '',
        hostPartner: surveyData.hostPartner || '',
    };

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    async function handleSubmit(values: any, actions: any, goToStep: (step: number) => void) {
        sessionStorage.setItem('survey', JSON.stringify(values));
        goToStep(2);
        actions.setSubmitting(false);
    }

    return (
        <div className={styles.detailsCard}>
            <h3 className={styles.stepTitle}>{stepTitle}</h3>
            <ProgressBar step={step} goToStep={goToStep} />
            <div className={styles.formHeading}>
                <h2 className={`${styles.steHeading} opacity-50`}>{`Step ${step}:`}</h2>
                <h2 className={styles.steHeading}>{heading}</h2>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => handleSubmit(values, actions, goToStep)}
            >
                {({ isSubmitting }) => (
                    <Form className={styles.formContainer}>
                        <div className={styles.formRow}>
                            <div className={styles.fields}>
                                <div className={styles.formGroup}>
                                    <div className='flex flex-col w-100'>
                                        <Field
                                            type="text"
                                            name="name"
                                            placeholder="Name & Surname"
                                            className={styles.input}
                                        />
                                        <ErrorMessage name="name" component="div" className={styles.errorText} />
                                    </div>
                                    <div className='flex flex-col w-100'>
                                        <Field as="select" name="monthReporting" className={styles.input}>
                                            <option value="" disabled>Select Month Reporting</option>
                                            {months.map((month, index) => (
                                                <option key={index} value={month.toLowerCase()}>
                                                    {month}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="monthReporting" component="div" className={styles.errorText} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.fields}>
                                <div className={styles.formGroup}>
                                    <div className='flex flex-col w-100'>
                                        <Field
                                            type="email"
                                            name="emailAddress"
                                            placeholder="email Address"
                                            className={styles.input}
                                        />
                                        <ErrorMessage name="emailAddress" component="div" className={styles.errorText} />
                                    </div>
                                    <div className='flex flex-col w-100'>
                                        <Field as="select" name="hostPartner" className={styles.input}>
                                            <option value="" disabled>Select Host Partner</option>
                                            <option value="partner1">Host Partner 1</option>
                                            <option value="partner2">Partner 2</option>
                                        </Field>
                                        <ErrorMessage name="hostPartner" component="div" className={styles.errorText} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formFooter}>
                            <button
                                type="button"
                                className={`${styles.prevButton}`}
                                onClick={() => {
                                    if (prevStep) {
                                        prevStep();
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
                    </Form>
                )}
            </Formik>
        </div>
    );
}
