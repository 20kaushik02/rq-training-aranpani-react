import React, { useState, useEffect } from 'react'
import "./projectActivities.scss"
import { Steps } from "antd";
import Card from "../../../../shared/components/Card";
import moment from "moment";
import ProjectActivityService from "../../../../services/ProjectService/projectActivity.service";
import ProjectActivityForm from "./ProjectActivityForm";
import { useParams } from "react-router-dom";
import { ProjectActivityModel } from "../../../../models/Project/ProjectActivity/projectActivity.model";

const { Step } = Steps;

const ProjectActivities = () => {
    const { id } = useParams();

    const { fetchProjectActivities, activityList } = ProjectActivityService();

    const [currentActivity, setCurrentActivity] = useState<ProjectActivityModel | null>();
    const [showNewForm, setShowNewForm] = useState<boolean>(false);

    useEffect(() => {
        if (id)
            refreshProjectActivities();
    }, [id])

    const refreshProjectActivities = async () => await fetchProjectActivities(id as any);

    return (
        <div className="project-activities">
            <div className="title">
                <h3 className="mt-4 mb-4"><b>Activity</b></h3>
                <span>
                    <i className="icon-add mt-1 cursor-pointer"
                        style={{ color: "blue" }}
                        onClick={() => {
                            setShowNewForm(true)
                            setCurrentActivity(null)
                        }}
                    />
                </span>
            </div>
            <Steps progressDot current={activityList?.length} direction="vertical">
                {showNewForm &&
                    <Step title={moment().format("DD/MM/YYYY")} description={
                        <Card>
                            <ProjectActivityForm handleCancel={() => setShowNewForm(false)}
                                refreshList={refreshProjectActivities}
                            />
                        </Card>
                    } />
                }

                {activityList?.map(activity =>
                    <Step title={moment(activity?.createdAt).format("DD MMM,YYYY")} description={
                        <Card>
                            {currentActivity?.id === activity?.id ?
                                <ProjectActivityForm currentActivity={currentActivity}
                                    handleCancel={() => setCurrentActivity(null)}
                                    refreshList={refreshProjectActivities}
                                />
                                :
                                <>
                                    <i className="icon-edit project-activities__edit" onClick={() => {
                                        setCurrentActivity(activity)
                                        setShowNewForm(false)
                                    }} />
                                    <div>
                                        {activity.attachments?.map(attachment =>
                                            <div className="project-activities__image" key={`image-${attachment.id}`}>
                                                <img src={attachment.imageUrl} alt={''} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="sub-title mt-4 mb-2">
                                        Description (English)
                                    </div>
                                    <div className="">
                                        {activity.contentEnglish}
                                    </div>
                                    <div className="sub-title mt-4 mb-2">
                                        விளக்கம் (தமிழ்)
                                    </div>
                                    <div className="">
                                        {activity.contentTamil}
                                    </div>
                                </>
                            }
                        </Card>
                    } />
                )}
            </Steps>
        </div>
    )
}

export default ProjectActivities;