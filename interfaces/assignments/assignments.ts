export interface IAssignment {
    id: string;
    knowledgeId: string;
    title: string;
    description: string;
    blobUrl: string;
    rubrics: Rubric[];
    scheduledDate: string;
    isPublished: boolean;
  }
  
  interface Rubric {
    label: string;
    description: string;
    questionId: string;
    id: string;
    facilitatorScore: number;
    moderatorScore: number;
    facilitatorId: string;
    moderatorId: string;
    facilitatorMarkDate: string;
    moderatorMarkDate: string;
    moderatorFeedBack: string;
  }

  export interface ISubmittedAssignment {
    id: string;
    knowledgeId: string;
    title: string;
    description: string;
    scheduledDate: string;
    isPublished: boolean;
    blobUrl: string;
    creatingUserId: string;
    createdAt: string;
    modifiedAt: string;
  }

  export interface IMarkedAssignment {
    mark: number;
    studentAssignment: {
      id: string;
      assignmentId: string;
      title: string;
      description: string;
      submissionDate: string;
      dueDate: string;
      updatedAt: string;
      userId: string;
      facilitatorId: string;
      fileUrl: string;
    };
  }