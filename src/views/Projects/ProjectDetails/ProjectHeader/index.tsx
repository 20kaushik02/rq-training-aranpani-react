import React, { FC, useEffect, useState } from 'react'
import "./projectHeader.scss"
import { Form, Formik, FormikValues } from "formik";
import InputField from "../../../../shared/components/InputField";
import { Button, Popover } from "antd";
import ProjectService from "../../../../services/ProjectService/project.service";
import { Project } from "../../../../models/Project/project.model";
import ProjectScrapDeleteModal from './ProjectScrapDeleteModal';

interface ProjectHeaderProps {
    projectId?: number;
    refreshProject: Function;
    project?: Project;
}

const ProjectHeader: FC<ProjectHeaderProps> = (props) => {
    const { projectId, refreshProject, project } = props;

    const { editProject } = ProjectService();

    const [titleEditable, setTitleEditable] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<Project>({
        name: "",
        templeNameTamil: ""
    });


    useEffect(() => {
        if (projectId)
            refreshProject()
    }, [projectId])

    useEffect(() => {
        if (project)
            setInitialValues({
                name: project.name,
                templeNameTamil: project.templeNameTamil
            })
    }, [project]);

    const editHeader = async (values: FormikValues) => {
        if (projectId) {
            await editProject(projectId, values);
            refreshProject(projectId);
        }
        setTitleEditable(!titleEditable);
    }
    const formikProps = {
        initialValues,
        onSubmit: editHeader,
        enableReinitialize: true,
    };

    const handleCancel = (setFieldValue: Function) => {
        setTitleEditable(!titleEditable);
        setFieldValue("name", project?.name)
        setFieldValue("templeNameTamil", project?.templeNameTamil)
    }

    return (
        <div className="project-header">
            <ProjectScrapDeleteModal
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
                refreshProject={refreshProject}
                project={project}
            />
            <div className="title">
                <Formik {...formikProps}>
                    {({ values, setFieldValue }) =>
                        <Form>
                            <div className="project-name__fields">
                                <div className="project-name__field__inputs">
                                    <InputField
                                        type="text"
                                        name="name"
                                        placeholder=""
                                        className={"input-field " + (titleEditable ? "editable" : null)}
                                    />
                                    <InputField
                                        type="text"
                                        name="templeNameTamil"
                                        placeholder=""
                                        className={"input-field " + (titleEditable ? "editable" : null)}
                                    />
                                </div>
                                {!titleEditable &&
                                    <i className="icon-edit" onClick={() => setTitleEditable(!titleEditable)} />}
                            </div>

                            {titleEditable &&
                                <div className="edit-controls">
                                    <Button htmlType="submit">
                                        <i className="icon-done" />
                                    </Button>
                                    <Button onClick={() => handleCancel(setFieldValue)}>
                                        <i className="icon-close" />
                                    </Button>
                                </div>
                            }
                        </Form>
                    }
                </Formik>
            </div>
            <div className="controls">
                <Popover placement="bottomRight"
                    content={
                        <div className="popover-content project-controls-popover" onClick={() => {
                            setShowDeleteModal(true)
                        }}>
                            <i className={`${project?.status !== 'scrapped' ?
                                'icon-delete' : 'icon-delete-forever'}`} />
                            {project?.status !== 'scrapped' ? 'Scrap ' : 'Delete '}project
                        </div>
                    }
                    trigger="click"
                >
                    <Button>
                        <i className="icon-more" />
                    </Button>
                </Popover>
            </div>
        </div>
    )
}

export default ProjectHeader;