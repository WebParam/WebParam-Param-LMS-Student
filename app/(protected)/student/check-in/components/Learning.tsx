import styles from '../CheckIn.module.scss'
import { StepProps } from '../page';
import HappyDefaultIcon from '../svg/HappyDefaultIcon';
import OkayDefualtIcon from '../svg/OkayDefualtIcon';
import UnhappyDefaultIcon from '../svg/UnhappyDefaultIcon';
import ProgressBar from './ProgressBar';

interface LearningProps extends StepProps {
    heading: string;
    stepTitle: string;
}

export default function Learning({ step, goToStep, stepTitle, heading }: LearningProps) {
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
                <div className={`${styles.feedbackReactSection} ${styles.feedbackReactStart}`}>
                    <div className={`${styles.feedbackReact}`}>
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


                <div className={`${styles.matchYourJobSection} ${styles.matchYourJobStart}`}>
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
                    <div className={styles.questionSection}>
                        Any other compliments, unaddressed complaints or work related questions?
                    </div>
                </div>
                <textarea name="" id="" rows={4} className={styles.textArea} />
            </div>
        </div >
    );
}