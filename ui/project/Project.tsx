import Image from "next/image";
import "@/ui/student/enrolled/course.module.css";
import projectImage from "./projectImage.jpeg";
import "@/styles/css/plugins/mainstyle.css";
import { IProject } from "@/interfaces/project/project";

interface Props {
  project: IProject | any;
  index: number;
}

const ProjectWidget: React.FC<Props> = ({ project, index }) => {
  return (
    <>
      <div className="rbt-card variation-01 rbt-hover">
        <div className="rbt-card-img">
          <span>
            <Image
              width={330}
              height={227}
              src={projectImage.src}
              alt={project.programTitle}
            />
          </span>
        </div>
        <div className="rbt-card-body">
          <div className="rbt-card-top"></div>
          <h4
            className="rbt-card-title"
            style={{ fontSize: "1.2em", margin: "5px 0" }}
          >
            <span>{project.programTitle}</span>
          </h4>

          <ul className="rbt-meta mt-3">
            <li>
              <i className="feather-book" />
              Status :{" "}
              {project.enrollmentStatus == 0
                ? "Enrolled"
                : project.enrollmentStatus == 1
                ? "Deleted"
                : project.enrollmentStatus == 2
                ? "Completed"
                : project.enrollmentStatus == 3
                ? "Pending"
                : "Unknown"}
            </li>
            {project.rejectionReason && (
              <li>
                <i className="bi bi-play-circle-fill" />
                Reason : {project.rejectionReason}
              </li>
            )}
          </ul>
        </div>

        <div className="rbt-card-bottom"></div>
        <h6 className="rbt-title-style-2 mb--10"></h6>
      </div>
    </>
  );
};

export default ProjectWidget;
