import { useState } from 'react';
import styles from '../CheckIn.module.scss'
import { StepProps } from '../page';
import ProgressBar from './ProgressBar';
import Image from 'next/image';

interface LearningProps extends StepProps {
    heading: string;
    stepTitle: string;
}

export default function Learning({ step, goToStep, stepTitle, heading }: LearningProps) {
    const [hovered, setHovered] = useState({ happy: false, okay: false, unhappy: false });
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
                    <button className={styles.feedbackReact}
                        onMouseEnter={() => setHovered({ ...hovered, happy: true })}
                        onMouseLeave={() => setHovered({ ...hovered, happy: false })}
                    >
                        <Image
                            src={hovered.happy ? '/svg/happyActiveIcon.svg' : '/svg/happyDefaultIcon.svg'}
                            alt="Happy Icon"
                            width={40}
                            height={40}
                        />

                        <div className={styles.title}>Happy</div>
                    </button>
                    <button
                        className={styles.feedbackReact}
                        onMouseEnter={() => setHovered({ ...hovered, okay: true })}
                        onMouseLeave={() => setHovered({ ...hovered, okay: false })}
                    >
                        <Image
                            src={hovered.okay ? '/svg/okayActiveIcon.svg' : '/svg/okayDefaultIcon.svg'}
                            alt="Okay Icon"
                            width={40}
                            height={40}
                        />
                        <div className={styles.title}>Okay</div>
                    </button>
                    <button
                        className={styles.feedbackReact}
                        onMouseEnter={() => setHovered({ ...hovered, unhappy: true })}
                        onMouseLeave={() => setHovered({ ...hovered, unhappy: false })}
                    >
                        <Image
                            src={hovered.unhappy ? '/svg/unhappyAciveIcon.svg' : '/svg/unhappyDefaultIcon.svg'}
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
                <textarea name="" id="" placeholder='Type your Answer' rows={4} className={styles.textArea} />
            </div>
        </div >
    );
}