import React, { FC } from 'react'
import "./projectForm.scss"
import { Form, Formik } from "formik";
import { createProjectValidationSchema } from "./createProjectValidation";
import InputField from "../../../shared/components/InputField";
import { Button, Modal } from "antd";
import { Project } from "../../../models/Project/project.model";
import ProjectService from "../../../services/ProjectService/project.service";
import { ProjectTypes } from "../../../enums/projectTypes";
import PhoneNumberInput from '../../../shared/components/PhoneNumberInput';

interface ProjectFormProps {
    showModal: boolean;
    setShowModal: Function;
    refreshProjectList: Function;
}

const ProjectForm: FC<ProjectFormProps> = ({ showModal, setShowModal, refreshProjectList }) => {

    const { createProject, loading } = ProjectService();

    const handleSubmit = (values: Project) => {
        values.status = ProjectTypes.PROPOSED.toLowerCase();
        createProject(values);
        refreshProjectList(ProjectTypes.PROPOSED);
        setShowModal(false);
    }

    const formikProps = {
        initialValues: new Project(),
        onSubmit: handleSubmit,
        validationSchema: createProjectValidationSchema
    }
    return (
        <Modal
            title={
                <div className="modal-title">
                    <h2>New Project</h2>
                    <i className="icon-close" onClick={() => setShowModal(false)} />
                </div>
            }
            visible={showModal}
            onCancel={() => setShowModal(false)}
            className="create-project-modal"
        >
            <Formik {...formikProps}>
                {({ values, setFieldValue }) => {
                    return (
                        <Form className="create-project-form">
                            <InputField
                                type="text"
                                name="name"
                                placeholder="Type name"
                                title="Temple Name"
                            />
                            <InputField
                                type="text"
                                name="templeNameTamil"
                                placeholder="Type name"
                                title="கோவில் பெயர்"
                            />
                            <InputField
                                type="text"
                                name="inchargeName"
                                placeholder="Type name"
                                title="Temple Incharge Name"
                            />
                            <InputField
                                type="text"
                                name="templeInchargeNameTamil"
                                placeholder="Type name"
                                title="கோவில் பொறுப்பாளர் பெயர்"
                            />
                            <PhoneNumberInput
                                title='Phone Number'
                                name={'inchargeMobileNumber'}
                                value={values.inchargeMobileNumber}
                                onChange={(value: any) => setFieldValue("inchargeMobileNumber", value)}
                            />
                            <InputField
                                type="text"
                                name="location"
                                placeholder="Type location"
                                title="Location"
                            />
                            <InputField
                                type="text"
                                name="locationNameTamil"
                                placeholder="Type name"
                                title="இடம்"
                            />
                            <Button type="primary"
                                htmlType="submit"
                                loading={loading}
                            >
                                Create project
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </Modal>
    )
}

export default ProjectForm;