"use client";

import { useState, useEffect } from "react";
import Loader from "@/ui/loader/loader";
import { getProgrammeProjects, getProjectsId } from "@/actions/projects/project-action";
import ProjectWidget from "@/ui/project/Project";
import { IProject } from "@/interfaces/project/project";
import Cookies from "universal-cookie";

export default function Enrolled() {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loggedInUser = cookies.get("loggedInUser");
  console.log("loggedInUserId: ", loggedInUser);

  const getStudentProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProjectsId(loggedInUser?.data?.id||loggedInUser?.userId);
      console.log("get data: ", data);

      if (data) {
        const projects: IProject[]|any = await getProgrammeProjects(data?.data);
        console.log("projects: ", projects?.data);
        setProjects(projects?.data);
        setLoading(false);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };


  useEffect(() => {
    
    getStudentProjects();
  }, []);

  if (loading) {
    return <Loader />;
  } 

  console.log("projects: ", projects);

    return (
        <div
              className="tab-pane fade active show"
              id="home-4"
              role="tabpanel"
              aria-labelledby="home-tab-4"
            >
              <div className="row g-5">
                {projects.length > 0 ? projects.map((project, index) => (
                  <div
                    className="col-lg-4 col-md-6 col-12"
                    key={`unit-standard-completed-${index}`}
                  >
                    <ProjectWidget
                      project={project}
                      index={index}
                    />
                  </div>
                )) : <div className="text-center text-muted">No projects found</div>}
              </div>
            </div>
    )
}