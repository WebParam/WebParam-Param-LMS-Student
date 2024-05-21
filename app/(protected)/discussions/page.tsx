import StudentDiscussions from "@/ui/discussions/student-discussion.tsx/discussions";
import DiscussionDashboardSidebar from "./dustent-discussion/page";

const StudentCourse = () => {
  return (
    <>
      <div className="mt-1-mr">
        <div className="container">
          <div className="row">
            <div className="col-lg-16">
              <div className="row g-5">
                <div className="col-lg-3">
                  <DiscussionDashboardSidebar />
                </div>

                <div className="col-lg-9">
                  <StudentDiscussions />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentCourse;
