export interface UnitStandardData {
  id: string;
  title: string;
  moduleCode: string;
  description: string;
  status: number;
  lengthOfParagraph: string;
  documentTone: string;
  audioVoice: string | null;
  createdAt: string;
  updatedAt: string | null;
  queryPrompt: string | null;
  noOfDocuments: number;
}

export interface ApiResponse {
  data: UnitStandardData[];
  message: string | null;
  error: boolean;
}
