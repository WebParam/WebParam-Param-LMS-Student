
import { useState } from 'react';
import styles from '@/app/(protected)/student/check-in/CheckIn.module.scss'
import ProgressBar from './ProgressBar';
import { StepProps } from '@/app/(protected)/student/check-in/page';

interface YouthDetailsProps extends StepProps {
    heading: string;
    stepTitle: string;
}

export default function YouthDetails({ step, goToStep, stepTitle, heading }: YouthDetailsProps) {
    const [formData, setFormData] = useState({
        name: '',
        monthReporting: '',
        email: '',
        hostPartner: ''
    });

    const handleOnSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        goToStep(2)
        console.log("Form Data Submitted: ", formData);
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className={styles.detailsCard}>
            <h3 className={styles.stepTitle}>{stepTitle}</h3>
            <ProgressBar step={step} goToStep={goToStep} />
            <div className={styles.formHeading}>
                <h2 className={`${styles.steHeading} opacity-50`}>{`Step ${step}:`}</h2>
                <h2 className={styles.steHeading}>{heading}</h2>
            </div>
            <form onSubmit={handleOnSubmit} className={styles.formContainer}>
                <div className={styles.formRow}>
                    <div className={styles.fields}>
                        <div className={styles.formGroup}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name & Surname"
                                className={styles.input}
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <select
                                name="monthReporting"
                                className={styles.input}
                                value={formData.monthReporting}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select Month Reporting</option>
                                <option value="january">January</option>
                                <option value="february">February</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.fields}>
                        <div className={styles.formGroup}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <select
                                name="hostPartner"
                                className={styles.input}
                                value={formData.hostPartner}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select Host Partner</option>
                                <option value="partner1">Host Partner 1</option>
                                <option value="partner2">Partner 2</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* <div className={styles.formFooter}>
                    <button type="submit" className={`active ${styles.nextButton}`}>
                        {'NEXT'}
                        <NextDefaultIcon />
                    </button>
                </div> */}
            </form>
        </div >
    );
}

