import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { ProjectTypes } from "../../../enums/projectTypes";
import "./listProjects.scss";
import ProjectService from "../../../services/ProjectService/project.service";
import HeaderWithCreate from "../../../shared/components/HeaderWithCreate";
import ProjectsTable from "../ProjectsTable";
import ProjectForm from "../ProjectForm";

const { TabPane } = Tabs;

const projectTabs = [
  ProjectTypes.PROPOSED,
  ProjectTypes.PLANNED,
  ProjectTypes.ACTIVE,
  ProjectTypes.COMPLETED,
  ProjectTypes.SCRAPPED,
];

const ListProjects = () => {
  const { projects, projectPagination, loading, fetchProjects } = ProjectService();

  const [tab, setTab] = useState("1");

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const handleChange = (activeKey: string) => {
    setTab(activeKey);
  };

  const refreshProjectList = (type: ProjectTypes, params?: any) => {
    fetchProjects(type, params);
  }

  useEffect(() => {
    fetchProjects(projectTabs[parseInt(tab) - 1], {
      page: 1,
      search: '',
    })
  }, [tab])


  return (
    <div className="list-projects">
      <div className="header">
        <HeaderWithCreate title={'Project'} setFormVisible={setCreateModalVisible} />
      </div>
      <Tabs
        defaultActiveKey={tab}
        onChange={handleChange}
      >
        {projectTabs.map((projectType, index) => (
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
      <ProjectForm showModal={createModalVisible}
        setShowModal={setCreateModalVisible}
        refreshProjectList={refreshProjectList}
      />
    </div>
  );
};

export default ListProjects;
