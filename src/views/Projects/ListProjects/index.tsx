import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { ProjectTypes } from "../../../enums/projectTypes";
import "./listProjects.scss";
import ProjectService from "../../../services/ProjectService/project.service";
import HeaderWithCreate from "../../../shared/components/HeaderWithCreate";
import ProjectsTable from "../ProjectsTable";

const { TabPane } = Tabs;

const projectTabs = [
  { projectType: ProjectTypes.PROPOSED },
  { projectType: ProjectTypes.PLANNED },
  { projectType: ProjectTypes.ACTIVE },
  { projectType: ProjectTypes.COMPLETED },
  { projectType: ProjectTypes.SCRAPPED },
];

const ListProjects = () => {
  const { projects, projectPagination, loading, fetchProjects } = ProjectService()

  const [tab, setTab] = useState("1");

  const handleChange = (activeKey: string) => {
    setTab(activeKey);
  };

  const refreshProjectList = (type: ProjectTypes, params?: any) => {
    fetchProjects(type, params)
  }

  useEffect(() => {
    fetchProjects(projectTabs[parseInt(tab) - 1].projectType, {
      page: 1,
      search: '',
    })
  }, [tab])


  return (
    <div className="list-projects">
      <div className="header">
        <HeaderWithCreate title={'Project'} setFormVisible={() => { }} />
      </div>
      <Tabs
        defaultActiveKey={tab}
        onChange={handleChange}
      >
        {projectTabs.map(({ projectType }, index) => (
          <TabPane tab={projectType}
            key={index + 1}
          >
            <ProjectsTable type={projectType}
              projects={projects}
              fetchProjects={refreshProjectList}
              loading={loading}
              pagination={projectPagination}
            />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default ListProjects;
