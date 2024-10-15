export interface IProject {
  id: string;
  createdDate: string;
  modifiedDate: string;
  modifyingUser: string | null;
  status: number;
  rejectionReason: string;
  userId: string;
  organizationProgramId: string;
  creatingUser: string;
}