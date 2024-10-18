export const DocumentType = {
    Identity: 0,
    MatricQualification: 1,
    Cv: 2,
    LearnerAgreement: 3,
    SponsorshipForm: 4,
    Eea: 5,
    SARSConfirmationLetter: 6,
    DisabilityLetter: 7,
    BankStatement: 8,
    
    CertifiedID: 9,
    EEAForm: 10,
    BankConfirmation: 11,
    SARSConfirmation: 12,
    CodeOfConductForm: 13,
    HighestQualification: 14,
    YesAffidavit: 15,
    IndemnityForm: 16,
    SupervisorForm: 17,
    MedicalCertificate: 18,
    PayrollForm: 19
};



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


export const yesProgramme = [
    {
        documentName: "Certified ID",
        Type: DocumentType.CertifiedID
    },
    {
        documentName: "EEA(1) Form",
        Type: DocumentType.EEAForm
    },
    {
        documentName: "Bank Confirmation",
        Type: DocumentType.BankConfirmation
    },
    {
        documentName: "SARS Tax Confirmation",
        Type: DocumentType.SARSConfirmation
    },
    {
        documentName: "Code of Conduct Form",
        Type: DocumentType.CodeOfConductForm
    },
    {
        documentName: "Highest Qualification",
        Type: DocumentType.HighestQualification
    },
    {
        documentName: "Yes Affidavit",
        Type: DocumentType.YesAffidavit
    },
    {
        documentName: "Indemnity Form (Criminal)",
        Type: DocumentType.IndemnityForm
    },
    {
        documentName: "Supervisor Form",
        Type: DocumentType.SupervisorForm
    },
    {
        documentName: "Medical Certificate(Disability)",
        Type: DocumentType.MedicalCertificate
    },
    {
        documentName: "Payroll Form",
        Type: DocumentType.PayrollForm
    },
    {
        documentName: "CV",
        Type: DocumentType.Cv
    }
];
