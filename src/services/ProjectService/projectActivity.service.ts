import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { deserialize, serialize } from "serializr";
import { useState } from "react";
import { jsonToFormData } from "../../shared/utils/dataFormatConverter";
import { ProjectAttachment } from "../../models/Project/ProjectAttachment/projectAttachment.model";
import { generatePath } from "react-router-dom";
import { ProjectActivityModel } from "../../models/Project/ProjectActivity/projectActivity.model";

const ProjectActivityService = () => {

    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [activityList, setActivityList] = useState<ProjectActivityModel[]>([]);

    const createActivityAttachment = async (file: File) => {
        try {
            const payload = {
                project_blog_attachment: { attachment: file }
            }
            const formDataPayload = jsonToFormData(payload)
            const response = await axiosInstance.post(ApiRoutes.PROJECT_BLOG_ATTACHMENTS, formDataPayload);
            if (response.data) {
                return deserialize(ProjectAttachment, response.data['project_blog_attachment'])
            }
            return null
        } catch (error) {
            console.error("activity attachment create", error)
        } finally { }
    };

    const fetchProjectActivities = async (projectId: number) => {
        try {
            const response = await axiosInstance.get(
                generatePath(ApiRoutes.PROJECT_BLOGS, { projectId: projectId as any as string }));
            const activities: any = deserialize(ProjectActivityModel, response.data['project_blogs']);
            setActivityList(activities);
        } catch (error) {
            console.error("fetch activity list", error)
        } finally { }
    };

    const createProjectActivity = async (projectId: number, projectActivity: ProjectActivityModel) => {
        try {
            setButtonLoading(true);
            const payload = {
                project_blog: serialize(ProjectActivityModel, projectActivity)
            }
            const response = await axiosInstance.post(
                generatePath(ApiRoutes.PROJECT_BLOGS, { projectId: projectId as any as string }),
                payload);
            return response.data['project_blog']
        } catch (error) {
            console.error("create activity list", error)
        } finally {
            setButtonLoading(false);
        }
    };

    const updateProjectActivity = async (projectId: number, projectActivity: ProjectActivityModel, id?: number) => {
        try {
            setButtonLoading(true);
            const payload = {
                project_blog: serialize(ProjectActivityModel, projectActivity)
            }
            const response = await axiosInstance.put(
                generatePath(ApiRoutes.PROJECT_BLOGS, { projectId: projectId as any as string }) + `/${id}`,
                payload
            );
            return response.data['project_blog']
        } catch (error) {
            console.error("update activity list", error)
        } finally {
            setButtonLoading(false);
        }
    };

    return {
        buttonLoading,
        activityList,
        createActivityAttachment,
        fetchProjectActivities,
        createProjectActivity,
        updateProjectActivity,
    }
}

export default ProjectActivityService;