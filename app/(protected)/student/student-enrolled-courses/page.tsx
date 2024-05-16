import EnrolledCourses from "@/ui/student/student-enrolled-courses/enrolled-courses";
import StudentDashboardSidebar from "@/ui/student/student-enrolled-courses/student-sidebar";

const StudentCourse = () => {
    return (
        <>
          <div className="mt-1-mr">
            <div className="container">
              <div className="row">
                <div className="col-lg-16">
                  <div className="row g-5">
                    <div className="col-lg-3">
                      <StudentDashboardSidebar />
                    </div>

                    <div className="col-lg-9">
                      <EnrolledCourses/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}

export default StudentCourse;