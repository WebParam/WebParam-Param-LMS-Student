export interface CheckinResponse {
  data: {
    id: string;
    userId: string;
    classId: string;
    checkInTime: string;
  };
  message: string | null;
  error: boolean;
}

export interface CheckoutResponse {
  data: {
    id: string;
    userId: string;
    classId: string;
    checkInTime: string;
    checkOutTime: string;
    feedback: string;
    rating: string;
  };
  message: string | null;
  error: boolean;
}

export interface Logbook {
  id: string;
  userId: string;
  classId: string;
  checkInTime: string;
  checkOutTime: string;
  feedback: string;
  rating: string;
}

export interface ICourseLogbook {
  id: string;
  adminId: string;
  courseId: string;
  logBookFileUrl: string;
  dateCreated?: string;
  dateUpdated?: string;
}

export interface IStudentLogbook {
  id: string;
  studentId: string;
  courseId: string;
  logBookFileUrl: string;
  dateCreated?: string;
  dateUpdated?: string;
}
