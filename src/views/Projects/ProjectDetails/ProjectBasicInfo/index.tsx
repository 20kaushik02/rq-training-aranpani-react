import React, { FC, useEffect, useState } from 'react'
import "./projectBasicInfo.scss"
import { Form, Formik, FormikValues } from "formik";
import { Button, Col, Progress, Row } from "antd";
import InputField from "../../../../shared/components/InputField";
import Card from "../../../../shared/components/Card";
import ProjectService from "../../../../services/ProjectService/project.service";
import { Project } from "../../../../models/Project/project.model";
import DatepickerField from "../../../../shared/components/DatepickerField";
import moment from "moment";
import PhoneNumberInput from '../../../../shared/components/PhoneNumberInput';

interface ProjectBasicInfoProps {
    projectId: number;
    project?: Project;
    refreshProject: Function;
}

const ProjectBasicInfo: FC<ProjectBasicInfoProps> = (props) => {
    const { projectId, project, refreshProject } = props;

    const { editProject } = ProjectService();

    const [projectDetailsEditable, setProjectDetailsEditable] = useState(false);
    const [initialValues, setInitialValues] = useState<Project>({
        regNumber: "",
        startDate: "",
        endDate: "",
        estimatedAmt: undefined,
        expensedAmt: undefined,
        inchargeName: "",
        templeInchargeNameTamil: "",
        inchargeMobileNumber: "",
    })

    useEffect(() => {
        refreshProject();
    }, [projectId])

    const dateStringFormatter = (date?: string, format?: string) =>
        date ? moment(date).format(format ?? 'DD/MM/YYYY') : undefined

    useEffect(() => {
        setInitialValues({
            regNumber: project?.regNumber,
            startDate: dateStringFormatter(project?.startDate),
            endDate: dateStringFormatter(project?.endDate),
            estimatedAmt: project?.estimatedAmt,
            expensedAmt: project?.expensedAmt,
            inchargeName: project?.inchargeName,
            templeInchargeNameTamil: project?.templeInchargeNameTamil,
            inchargeMobileNumber: project?.inchargeMobileNumber,
        })
    }, [project])

    const handleCancel = (setFieldValue: Function) => {
        setProjectDetailsEditable(!projectDetailsEditable)
        setFieldValue("startDate", dateStringFormatter(project?.startDate))
        setFieldValue("endDate", dateStringFormatter(project?.endDate))
        setFieldValue("estimatedAmt", project?.estimatedAmt)
        setFieldValue("expensedAmt", project?.expensedAmt)
        setFieldValue("inchargeName", project?.inchargeName)
        setFieldValue("templeInchargeNameTamil", project?.templeInchargeNameTamil)
        setFieldValue("inchargeMobileNumber", project?.inchargeMobileNumber)
    }

    const formikProps = {
        initialValues: initialValues,
        onSubmit: async (values: FormikValues) => {
            await editProject(projectId, values);
            await refreshProject();
            setProjectDetailsEditable(!projectDetailsEditable);
        },
        enableReinitialize: true,
    }

    return (
        <div className="project-basic-info">
            <Card>
                <Formik {...formikProps}
                >
                    {({ values, setFieldValue }) =>
                        <Form>
                            <div className="title">
                                <h3 className="mr-5 mb-0">Project Details</h3>
                                {projectDetailsEditable ?
                                    <div className="edit-controls">
                                        <Button htmlType="submit">
                                            <i className="icon-done" />
                                        </Button>
                                        <Button
                                            onClick={() => handleCancel(setFieldValue)}>
                                            <i className="icon-close" />
                                        </Button>
                                    </div>
                                    :
                                    <span>
                                        <i className="icon-edit"
                                            onClick={() => setProjectDetailsEditable(!projectDetailsEditable)}
                                        />
                                    </span>
                                }
                            </div>
                            <Row className="labels">
                                <Col span={7}>
                                    Registration Number
                                </Col>
                                <Col span={7} offset={1}>
                                    Planned Start Date
                                </Col>
                                <Col span={7} offset={1}>
                                    Planned End Date
                                </Col>
                            </Row>
                            <Row className="inputs">
                                <Col span={7}>
                                    <InputField
                                        className="input-field"
                                        placeholder=""
                                        name="regNumber"
                                        type="text"
                                        disabled
                                    />
                                </Col>
                                <Col span={7} offset={1}>
                                    <DatepickerField
                                        name="startDate"
                                        placeholder="Select start date"
                                        value={values?.startDate ?
                                            moment(values?.startDate, 'DD/MM/YYYY') : ''
                                        }
                                        onChange={(_value, dateString) => {
                                            setFieldValue("startDate", dateString)
                                        }}
                                        disabled={!projectDetailsEditable || project?.status === "proposed"}
                                        className="project-details__date"
                                    />
                                </Col>
                                <Col span={7} offset={1}>
                                    <DatepickerField name="endDate"
                                        placeholder="Select end date"
                                        value={values?.endDate ?
                                            moment(values?.endDate, 'DD/MM/YYYY') : ''
                                        }
                                        onChange={(_value, dateString) => {
                                            setFieldValue("endDate", dateString)
                                        }}
                                        disabled={!projectDetailsEditable || project?.status === "proposed"}
                                        className="project-details__date"
                                    />
                                </Col>
                            </Row>
                            <Row className="labels">
                                <Col span={7}>Estimate Amount</Col>
                                <Col span={7} offset={1}>Expensed Amount</Col>
                            </Row>
                            <Row className="inputs">
                                <Col span={7}>
                                    <InputField
                                        className={"input-field " + (projectDetailsEditable ? "editable" : null)}
                                        placeholder="-"
                                        name="estimatedAmt"
                                        type="text"
                                    />
                                </Col>
                                <Col span={7} offset={1}>
                                    <InputField
                                        className={"input-field " + (projectDetailsEditable ? "editable" : null)}
                                        placeholder="-"
                                        name="expensedAmt"
                                        type="text"
                                    />
                                </Col>
                                {project?.status !== 'proposed' &&
                                    <Col span={9}>
                                        <Card>
                                            <span className="title">{project?.completion ?? 0}% Completion<br />
                                                <span>last update on {dateStringFormatter(project?.updatedAt, 'DD MMM,YYYY')}</span>
                                            </span>
                                            <Progress percent={project?.completion || 0} size="small" />
                                        </Card>
                                    </Col>}
                            </Row>
                            <Row className="labels">
                                <Col span={7} className="mt-5">
                                    Temple Incharge
                                </Col>
                                <Col span={7}>
                                    <InputField
                                        type="text"
                                        name="inchargeName"
                                        placeholder="-"
                                        className={"input-field " + (projectDetailsEditable ? "editable" : null)}
                                        prefix={<i className="icon-profile" />}
                                    />
                                    <InputField
                                        type="text"
                                        name="templeInchargeNameTamil"
                                        placeholder="-"
                                        className={"input-field tamil-incharge-name " + (projectDetailsEditable ? "editable" : null)}
                                    />
                                </Col>
                                <Col span={7} offset={1}>
                                    <PhoneNumberInput
                                        name={'inchargeMobileNumber'}
                                        value={values.inchargeMobileNumber}
                                        disabled={!projectDetailsEditable}
                                        onChange={(value) => setFieldValue("inchargeMobileNumber", value)}
                                        prefix={<i className="icon-phone" />}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    }
                </Formik>
            </Card>
        </div>
    )
}

export default ProjectBasicInfo;