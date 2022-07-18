import React, { FC, useEffect, useRef, useState } from 'react'
import "./projectActivityForm.scss"
import { projectActivitiesValidation } from "./projectActivitiesValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Col, Row } from "antd";
import ImageUpload from "../../../../../shared/components/ImageUpload";
import ProjectActivityService from "../../../../../services/ProjectService/projectActivity.service";
import { ProjectActivityModel } from "../../../../../models/Project/ProjectActivity/projectActivity.model";
import Error from "../../../../../shared/components/Error";
import { useParams } from "react-router-dom";

interface ProjectActivityFormProps {
    currentActivity?: any;
    handleCancel: Function;
    refreshList: Function;
}

const ProjectActivityForm: FC<ProjectActivityFormProps> = (props) => {
    const { currentActivity, handleCancel, refreshList } = props;

    const { id } = useParams();

    const formRef = useRef<any>();

    const { createActivityAttachment, createProjectActivity,
        updateProjectActivity, buttonLoading } = ProjectActivityService();

    const [initialValues, setInitialValues] = useState<ProjectActivityModel>({
        ...new ProjectActivityModel(),
        attachments: [
            {
                id: "" as any,
                imageUrl: ""
            }
        ]
    });

    useEffect(() => {
        currentActivity && setInitialValues({
            ...currentActivity,
            attachments: [
                ...currentActivity?.attachments,
                {
                    id: "",
                    imageUrl: ""
                }
            ]
        })
    }, [currentActivity])

    const handleUpload = async (file: File) => {
        const { attachments }: any = formRef?.current?.values;
        attachments[attachments.length - 1] = true;
        formRef?.current?.setFieldValue("attachments", attachments);
        const uploadResponse = await createActivityAttachment(file);
        if (uploadResponse) {
            attachments[attachments.length - 1] = uploadResponse;
            formRef?.current?.setFieldValue("attachments", [...attachments, undefined]);
        }
    };

    const handleBlogSubmit = async (values: ProjectActivityModel) => {
        values.attachmentIds = values.attachments?.
            map(attachment => attachment?.id as any as string ?? '') ?? [];
        let response: any;
        if (currentActivity) {
            response = await updateProjectActivity(id as any, values, currentActivity?.id)
        } else {
            response = await createProjectActivity(id as any, values);
        }
        if (response) {
            refreshList();
            handleCancel()
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleBlogSubmit}
            enableReinitialize
            validationSchema={projectActivitiesValidation}
            innerRef={formRef}
        >
            {({ values, setFieldValue }) => {
                return (
                    <Form className="project-activity-form">
                        <Row>
                            <Col span={16}>
                                <Row gutter={[0, 10]}>
                                    {values?.attachments?.map((value, index) => (
                                        <Col span={8}>
                                            <ImageUpload placeholderText={"Upload image"}
                                                value={value?.imageUrl}
                                                onUpload={handleUpload}
                                                onDelete={() => {
                                                    setFieldValue("attachments",
                                                        values?.attachments?.filter((value, i) => i !== index)
                                                    )
                                                }}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                        <div className="sub-title mt-4 mb-2">
                            Description (English)
                        </div>
                        <Field name="contentEnglish">
                            {({ field }: { field: any }) =>
                                <>
                                    <textarea className="w-100 desc"
                                        placeholder="Type here..."
                                        {...field}
                                    />
                                    <ErrorMessage name="contentEnglish">
                                        {(message: string) => <Error message={message} />}
                                    </ErrorMessage>
                                </>
                            }
                        </Field>
                        <div className="sub-title mt-4 mb-2">
                            விளக்கம் (தமிழ்)
                        </div>
                        <Field name="contentTamil">
                            {({ field }: { field: any }) =>
                                <>
                                    <textarea className="w-100 desc"
                                        placeholder="இங்கே தட்டச்சு செய்க..."
                                        {...field}
                                    />
                                    <ErrorMessage name="contentEnglish">
                                        {(message: string) => <Error message={message} />}
                                    </ErrorMessage>
                                </>
                            }
                        </Field>
                        <Button type="text"
                            className="save-btn activity-cancel-btn"
                            onClick={() => handleCancel()}
                        >
                            Cancel
                        </Button>
                        <Button type="primary"
                            className="save-btn activity-save-btn"
                            htmlType="submit"
                            loading={buttonLoading}
                        >
                            {currentActivity ? 'Update' : 'Save'}
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default ProjectActivityForm;