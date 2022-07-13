import React, { FC, useState } from 'react'
import "./projectScrapDeleteModal.scss"
import { Button, Modal, Input } from "antd";
import { Project } from "../../../../../models/Project/project.model";
import ProjectService from "../../../../../services/ProjectService/project.service";
import { AppRoutes } from "../../../../../routes/routeConstants/appRoutes"
import { useNavigate } from 'react-router-dom';

interface ProjectScrapDeleteModalProps {
    showModal: boolean;
    setShowModal: Function;
    project?: Project;
    refreshProject?: Function;
}

const { TextArea } = Input;

const ProjectScrapDeleteModal: FC<ProjectScrapDeleteModalProps> = (props) => {
    const { showModal, setShowModal, project, refreshProject } = props;

    const navigate = useNavigate();

    const { editProject, loading, deleteProject } = ProjectService();

    const [scrapReason, setScrapReason] = useState<string>('');

    const handleScrap = async () => {
        if (project?.id) {
            try {
                await editProject(project?.id, { status: "scrapped", reason: scrapReason });
                if (refreshProject)
                    await refreshProject();
                setShowModal(false);
            } catch (error) { }
        }
    }

    const handleDelete = async () => {
        try {
            if (project?.id) {
                await deleteProject(project?.id);
                navigate(AppRoutes.PROJECTS);
            }
        } catch (error) { }
    }

    return (
        <div className="project-scrap-delete-modal">
            <Modal title={
                <div className="modal-title">
                    <div>
                        <h2>
                            <i className={`${project?.status !== 'scrapped' ?
                                'icon-delete' : 'icon-delete-forever'}`} />
                            {project?.status !== 'scrapped' ? ' Scrap ' : ' Delete '}  Project
                        </h2>
                        <div className="sub-title">
                            {project?.status !== 'scrapped' ?
                                `Are you sure to scrap the project? the project will be temporarily removed from the platform`
                                : 'Are you sure to delete the project? the project will be permanently removed from the platform'
                            }
                        </div>
                    </div>
                    <div className="modal-controls">
                        <i className="icon-close" onClick={() => setShowModal(false)} />
                    </div>
                </div>
            }
                visible={showModal}
                onCancel={() => setShowModal(false)}
                className="project-complete-modal__body"
            >
                <div className="project-complete-modal__details">
                    <div className="project-complete-modal__name">{project?.name}</div>
                    <div className="project-complete-modal__location">{project?.location}</div>
                </div>
                {project?.status !== 'scrapped' && <div>
                    <div className="label">Reason</div>
                    <TextArea rows={3}
                        value={scrapReason}
                        onChange={(e) => setScrapReason(e.target.value)}
                    />
                </div>}
                <Button type="primary"
                    loading={loading}
                    onClick={project?.status !== 'scrapped' ? handleScrap : handleDelete}
                    className={"project-scrap-delete-modal__action"}
                >
                    {project?.status !== 'scrapped' ? 'Scrap ' : 'Delete '} project
                </Button>
            </Modal>
        </div>
    )
}

export default ProjectScrapDeleteModal;