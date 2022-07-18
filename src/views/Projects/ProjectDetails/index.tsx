import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectService from "../../../services/ProjectService/project.service";
import Back from "../../../shared/components/Back";
import "./projectDetails.scss";
import ProjectActivities from "./ProjectActivities";
import ProjectBasicInfo from "./ProjectBasicInfo";
import ProjectDocuments from "./ProjectDocuments";
import ProjectHeader from "./ProjectHeader";
import ProjectImages from "./ProjectImages";
import ProjectStatus from "./ProjectStatus";

const ProjectDetails = () => {
  const { id } = useParams();

  const { project, fetchProject } = ProjectService();

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
      <Row className="wrapper-row">
        <Col span={15}>
          <ProjectImages project={project} />
          <ProjectBasicInfo projectId={id as any}
            project={project}
            refreshProject={refreshProject}
          />
          {project?.status !== "proposed" && project?.status !== "planned" &&
            <ProjectActivities />
          }
        </Col>
        <Col span={8}>
          <ProjectStatus project={project}
            refreshProject={refreshProject}
          />
          <ProjectDocuments project={project} />
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetails;
