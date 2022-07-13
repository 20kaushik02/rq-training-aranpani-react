import React, { FC, useEffect, useRef, useState } from 'react'
import "./projectImages.scss"
import { Form, Formik, FormikProps, FormikValues } from "formik";
import { Col, Row } from "antd";
import ImageUpload from "../../../../shared/components/ImageUpload";
import Card from "../../../../shared/components/Card";
import ProjectService from '../../../../services/ProjectService/project.service';
import { Project } from '../../../../models/Project/project.model';

interface ProjectImagesProps {
    project?: Project;
}

const ProjectImages: FC<ProjectImagesProps> = (props) => {
    const { project } = props;

    const { createProjectAttachment, deleteProjectAttachment } = ProjectService();

    const [initialValues, setInitialValues] = useState<any>({
        mainImage: {
            id: "",
            imageUrl: ""
        },
        images: [{
            id: "",
            imageUrl: ""
        }]
    })

    const formRef = useRef<FormikProps<typeof initialValues>>(null);

    const handleUpload = async (file: File, mainImage?: boolean) => {
        const data = {
            image: file,
            projectId: project?.id
        };

        if (mainImage) {
            const projectAttachment = await createProjectAttachment(data);
            formRef?.current?.setFieldValue("mainImage", projectAttachment);
            return;
        }

        //other images
        const { images }: any = formRef?.current?.values;
        const projectAttachment = await createProjectAttachment(data);
        images[images.length - 1] = projectAttachment;
        formRef?.current?.setFieldValue("images", images.length < 8 ? [...images, undefined] : images);
    }

    const handleDelete = async (imageId: string, mainImage?: boolean) => {
        await deleteProjectAttachment(imageId);
        if (mainImage) {
            formRef?.current?.setFieldValue("mainImage", {
                id: "",
                imageUrl: ""
            });
            return;
        }

        const { images }: any = formRef?.current?.values;
        formRef?.current?.setFieldValue("images",
            images.length === 8 ?
                [...images.filter((image: { id: string, imageUrl: string }) =>
                    image?.id !== imageId
                ), undefined
                ] : images.filter((image: { id: string, imageUrl: string }) =>
                    image?.id !== imageId
                )
        )

    }

    useEffect(() => {
        if (project?.projectAttachments?.length) {
            setInitialValues({
                mainImage: {
                    id: project?.projectAttachments[0]?.id,
                    imageUrl: project?.projectAttachments[0]?.imageUrl,
                },
                images: project?.projectAttachments?.length < 9 ? [
                    ...project?.projectAttachments?.slice(1, 8),
                    {
                        id: "",
                        imageUrl: ""
                    }
                ] : [...project?.projectAttachments?.slice(1, 9)]
            })
        }
        console.log(project?.projectAttachments?.slice(1, 8));

    }, [project])

    const formikProps = {
        initialValues: initialValues,
        onSubmit: (values: FormikValues) => { },
        enableReinitialize: true,
        innerRef: formRef
    }

    return (
        <div className="project-images">
            <Card>
                <Formik {...formikProps}>
                    {({ values, setFieldValue }) =>
                        <Form>
                            <Row>
                                <Col span={8}>
                                    <ImageUpload
                                        placeholderText="Main Image"
                                        large={true}
                                        value={values?.mainImage?.imageUrl}
                                        onUpload={(file) => {
                                            handleUpload(file, true)
                                        }}
                                        onDelete={() => {
                                            handleDelete(values?.mainImage?.id, true)
                                        }}
                                    />
                                </Col>
                                <Col span={16}>
                                    <Row>
                                        {values.images?.map(
                                            (value: {
                                                id: string,
                                                imageUrl: string
                                            }) =>
                                                <Col span={6}>
                                                    <ImageUpload
                                                        value={value?.imageUrl}
                                                        onUpload={handleUpload}
                                                        onDelete={() => handleDelete(value?.id)}
                                                    />
                                                </Col>
                                        )}
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    }
                </Formik>
            </Card>
        </div>
    )
}

export default ProjectImages