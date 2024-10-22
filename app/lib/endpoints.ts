
const test = "testing";
const env = process.env.NEXT_PUBLIC_API_ENV == "production" ? "prod" : process.env.NEXT_PUBLIC_API_ENV;


// const env = process.env.NEXT_PUBLIC_API_URL;

// const env = "prod"

export const writeUserData = `https://thooto-${env}-be-user-write.azurewebsites.net`;

export const readUserData = `https://thooto-${env}-be-user-read.azurewebsites.net`;

export const wCourseUrl = `https://thooto-${env}-be-newcourse-write.azurewebsites.net`;

export const rCourseUrl = `https://thooto-${env}-be-newcourse-read.azurewebsites.net`;

export const wDocumentUrl = `https://thooto-${env}-be-document-write.azurewebsites.net`;

export const rDocumentUrl = `https://thooto-${env}-be-document-read.azurewebsites.net`;

export const rDocumentParaphraseUrl = `https://thooto-${env}-be-document-parser.azurewebsites.net`;

export const wGenerateVideoScriptUrl = `https://thooto-${env}-be-document-parser.azurewebsites.net`;

export const wQuizGenerateUrl = `https://thooto-${env}-be-quiz-generate.azurewebsites.net`;

export const rQuizUrl = `https://thooto-${env}-be-quiz-read.azurewebsites.net`;

export const wAudioGenerateUrl = `https://thooto-${env}-be-audio-generate.azurewebsites.net`;

export const wAssessmentUrl =  "https://thooto-development-assessment-write.azurewebsites.net";

export const twAssessmentUrl = `https://thooto-${test}-assessment-write.azurewebsites.net`;

export const rAssessmentUrl = `https://thooto-${env}-be-assessment-read.azurewebsites.net`;

export const wQuestionUrl = `https://thooto-${env}-be-assessment-write.azurewebsites.net/api/Questions`;

export const rAggregatorUrl = `https://thooto-${env}-be-api-aggregator.azurewebsites.ne1`;

export const rAggregator = `https://thooto-${test}-aggregator.azurewebsites.net`;

export const wRubricUrl = `https://thooto-${env}-be-assessment-write.azurewebsites.net/api/Rubrics`;

export const rRubricUrl = `https://thooto-${env}-be-assessment-read.azurewebsites.net/api/v1/Rubrics`;

export const wOptionUrl = `https://thooto-${env}-be-assessment-write.azurewebsites.net/api/Options`;

export const rOptionUrl = `https://thooto-${env}-be-assessment-read.azurewebsites.net/api/v1/Options`;

export const rKnowledgeModuleUrl = `https://thooto-${env}-be-newcourse-read.azurewebsites.net`;

export const rAnalyticUrl = `https://thooto-${env}-be-activity-read.azurewebsites.net`;

export const getCodesUrl = `https://thooto-${env}-be-user-read.azurewebsites.net`;

export const rNotificationUrl = `https://thooto-${env}-be-notification-read.azurewebsites.net`;

export const wNotificationUrl = `https://thooto-${env}-be-notification-write.azurewebsites.net`;

export const wLoogBookUrl = `https://thooto-${env}-be-logbook-write.azurewebsites.net`;

export const rLoogBookUrl = `https://thooto-${env}-be-logbook-read.azurewebsites.net`;


// New endpoints
export const rAssessmentThootoUrl = `https://thooto-dev-be-assessment-read.azurewebsites.net`;
export const wAssessmentThootoUrl = `https://thooto-dev-be-assessment-write.azurewebsites.net`;
export const rQuestionsThootoUrl = `https://thooto-dev-be-assessment-read.azurewebsites.net/api/v1/Questions`;
export const rOptionsThootoUrl = `https://thooto-dev-be-assessment-read.azurewebsites.net/api/v1/Options`;
export const wStudentAnswersThootoUrl = `https://thooto-dev-be-assessment-write.azurewebsites.net/api/v1/StudentAnswers`;