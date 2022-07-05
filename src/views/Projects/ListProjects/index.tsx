import { Tabs } from "antd";
import React, { useState } from "react";
import { ProjectTypes } from "../../../enums/projectTypes";
import "./listProjects.scss";
import ProjectService from "../../../services/ProjectService/project.service";
import HeaderWithCreate from "../../../shared/components/HeaderWithCreate";

const { TabPane } = Tabs;

const projectTabs = [
  { projectType: ProjectTypes.PROPOSED },
  { projectType: ProjectTypes.PLANNED },
  { projectType: ProjectTypes.ACTIVE },
  { projectType: ProjectTypes.COMPLETED },
  { projectType: ProjectTypes.SCRAPPED },
];

const ListProjects = () => {
  const { loading, projects, fetchProjects } = ProjectService()

  const [tab, setTab] = useState("1");

  const handleChange = (activeKey: string) => {
    setTab(activeKey);
  };


  return (
    <div className="list-projects">
    <div className="header">
      <HeaderWithCreate title={'Project'} setFormVisible={() => {}} />
    </div>
      <Tabs
        defaultActiveKey={tab}
        onChange={handleChange}
      >
        {projectTabs.map(({ projectType }, i) => (
          <TabPane tab={projectType}
            key={i + 1}
          >
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default ListProjects;
