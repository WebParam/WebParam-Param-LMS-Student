import { useState } from 'react';
import styles from '../CheckIn.module.scss'
import { StepProps } from '../page';
import HappyDefaultIcon from '../svg/HappyDefaultIcon';
import OkayDefualtIcon from '../svg/OkayDefualtIcon';
import UnhappyDefaultIcon from '../svg/UnhappyDefaultIcon';
import ProgressBar from './ProgressBar';
import ProgressIndicator from './ProgressIndicator';

interface WorkExperienceProps extends StepProps {
    heading: string;
    stepTitle: string;
}

export default function WorkExperience({ step, goToStep, stepTitle, heading }: WorkExperienceProps) {
    const [currentProgressStep, setCurrentProgressStep] = useState(4);
    const totalSteps = 10;
    return (
        <div className={styles.detailsCard}>
            <h3 className={styles.stepTitle}>{stepTitle}</h3>
            <ProgressBar step={step} goToStep={goToStep} />
            <div className={styles.formHeading}>
                <h2 className={`${styles.steHeading} opacity-50`}>{`Step ${step}:`}</h2>
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
                    <div className={styles.feedbackReact}>
                        <div className={styles.reactIcon}>
                            <HappyDefaultIcon />
                        </div>
                        <div className={styles.title}>Happy</div>
                    </div>
                    <div className={styles.feedbackReact}>
                        <div className={styles.reactIcon}>
                            <OkayDefualtIcon />
                        </div>
                        <div className={styles.title}>Okay</div>
                    </div>
                    <div className={styles.feedbackReact}>
                        <UnhappyDefaultIcon />
                        <div className={styles.title}>Unhappy</div>
                    </div>
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
                    <div className={styles.matchYourJob}>
                        <button className={styles.reactButton}>
                            1
                        </button>
                        <div className={styles.title}>Extremely Dissatisfied</div>
                    </div>
                    <div className={styles.matchYourJob}>
                        <button className={styles.reactButton}>
                            2
                        </button>
                        <div className={styles.title}></div>
                    </div>
                    <div className={styles.matchYourJob}>
                        <button className={styles.reactButton}>
                            3
                        </button>
                        <div className={styles.title}></div>
                    </div>
                    <div className={styles.matchYourJob}>
                        <button className={styles.reactButton}>
                            4
                        </button>
                        <div className={styles.title}></div>
                    </div>
                    <div className={styles.matchYourJob}>
                        <button className={styles.reactButton}>
                            1
                        </button>
                        <div className={styles.title}>Extremely Satisfied</div>
                    </div>
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
                    <div className={styles.workLoadButton}>
                        Too little work is received
                    </div>
                    <div className={styles.workLoadButton}>
                        My workload is sufficient
                    </div>
                    <div className={styles.workLoadButton}>
                        I had nothing to do
                    </div>
                    <div className={styles.workLoadButton}>
                        My workload is overwhelming
                    </div>
                </div>

                <div className={styles.questionSection}>
                    <div className={styles.questionNo}>
                        4.
                    </div>
                    <div className={styles.questionSection}>
                        On a scale how often does your supervisor listen and appreciate your suggestions?
                    </div>
                </div>
                <ProgressIndicator progressSteps={Array.from({ length: totalSteps })} currentProgressStep={currentProgressStep} />


            </div>
        </div>
    );
}