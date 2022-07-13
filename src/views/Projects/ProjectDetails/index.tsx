import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectService from "../../../services/ProjectService/project.service";
import Back from "../../../shared/components/Back";
import "./projectDetails.scss";
import ProjectHeader from "./ProjectHeader";

interface ProjectDetailsProps { }

const ProjectDetails: FC<ProjectDetailsProps> = () => {
  const { id } = useParams();  
  
  const { fetchProject, project } = ProjectService();

  const refreshProject = async () => {
    await fetchProject(id as any);
  }

  useEffect(() => {
    if (id)
      refreshProject();
  }, []);

  return (
    <div className="project-details mt-5">
      <Back name="Projects" />
      <div className="header mt-5">
        <ProjectHeader {...{
          projectId: id as any,
          refreshProject,
          project
        }}
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
