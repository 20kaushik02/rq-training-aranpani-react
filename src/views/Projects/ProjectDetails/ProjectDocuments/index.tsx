import React, { FC, useEffect, useRef, useState } from 'react'
import "./projectDocuments.scss"
import { Form, Formik, FormikProps } from "formik";
import { Col, Row } from "antd";
import DocumentUpload from "../../../../shared/components/DocumentUpload";
import Card from "../../../../shared/components/Card";
import { Project } from "../../../../models/Project/project.model";
import ProjectService from "../../../../services/ProjectService/project.service";

interface ProjectDocumentsProps {
    project?: Project;
}

const ProjectDocuments: FC<ProjectDocumentsProps> = (props) => {
    const { project } = props;

    const { createProjectDocument, deleteProjectDocument } = ProjectService();

    const [initialValues, setInitialValues] = useState({
        documents: [{
            id: "",
            documentUrl: ""
        }]
    })

    const formRef = useRef<FormikProps<typeof initialValues>>(null);

    const handleUploadDoc = async (file: File) => {
        const data = {
            document: file,
            projectId: project?.id
        }

        const { documents }: any = formRef?.current?.values;
        const response = await createProjectDocument(data);
        documents[documents.length - 1] = response;
        formRef?.current?.setFieldValue("documents", [...documents, undefined]);
    };

    const handleDeleteDoc = async (deletedDocId: string) => {
        const { documents }: any = formRef?.current?.values;
        await deleteProjectDocument(deletedDocId);
        formRef?.current?.setFieldValue("documents",
            documents.filter((document: { id: string, documentUrl: string }) =>
                document?.id !== deletedDocId
            )
        )
    }

    useEffect(() => {
        if (project?.projectDocuments?.length)
            setInitialValues({
                documents: [...project?.projectDocuments, {
                    id: "",
                    documentUrl: ""
                }]
            })
    }, [project])

    return (
        <div className="project-documents">
            <Card>
                <div className="status">
                    <h3 className="title">Documents</h3>
                    <div className="sub-title">Add documents related to project</div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={() => { }}
                        enableReinitialize
                        innerRef={formRef}
                    >
                        {({ values }) => {
                            return (
                                <Form>
                                    <Row>
                                        {values.documents?.map((value) => (
                                            <Col className="mb-2 mt-2" span={24}>
                                                <DocumentUpload
                                                    placeholderText="Upload Document here"
                                                    value={value?.documentUrl}
                                                    onUpload={handleUploadDoc}
                                                    onDelete={() => { handleDeleteDoc(value?.id) }}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </Card>
        </div>
    )
}

export default ProjectDocuments;