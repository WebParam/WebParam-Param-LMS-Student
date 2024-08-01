export enum DocumentType {
    Identity = 0,
    MatricQualification = 1,
    Cv = 2,
    LearnerAgreement = 3,
    SponsorshipForm = 4,
    Eea = 5,
    SARSConfirmationLetter = 6,
    DisabilityLetter = 7,
    BankStatement = 8,
}

export const documentsRequired = [
    {
        documentName: "Identification",
        Type: DocumentType.Identity
    },
    {
        documentName: "Cv",
        Type: DocumentType.Cv
    },
    {
        documentName: "Matric/Qualification",
        Type: DocumentType.MatricQualification
    },
    {
        documentName: "Learner Agreement",
        Type: DocumentType.LearnerAgreement
    },
    {
        documentName: "Sponsorship Form",
        Type: DocumentType.SponsorshipForm
    },
    {
        documentName: "Eea",
        Type: DocumentType.Eea
    },
    {
        documentName: "SARS Confirmation Letter",
        Type: DocumentType.SARSConfirmationLetter
    },
    {
        documentName: "Disability Letter (if applicable)",
        Type: DocumentType.DisabilityLetter
    },
    {
        documentName: "Bank Statement",
        Type: DocumentType.BankStatement
    }
];

