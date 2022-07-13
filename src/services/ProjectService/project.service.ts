import { useState } from "react";
import { deserialize, serialize } from "serializr";
import { ProjectTypes } from "../../enums/projectTypes";
import axiosInstance from "../../interceptor/axiosInstance";
import { Project } from "../../models/Project/project.model";
import { PaginationModel } from './../../models/Pagination/pagination.model';
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";

const ProjectService = () => {
	const [project, setProject] = useState<Project>();

	const [projects, setProjects] = useState<Project[]>([]);

	const [projectPagination, setProjectPagination] = useState<PaginationModel>();

	const [error, setError] = useState<Error>();

	const [loading, setLoading] = useState(false);

	const fetchProjects = async (type: ProjectTypes, params?: {
		search?: string,
		page?: number,
	}) => {
		try {
			setLoading(true);
			const { data } = await axiosInstance.get(ApiRoutes.PROJECTS, {
				params: {
					status: type?.toLowerCase(),
					...(params || {}),
					limit: 50
				},
			});

			const projects = deserialize(Project, data?.projects as any[]);
			const pagination = deserialize(PaginationModel, data)
			setProjects(projects);
			setProjectPagination(pagination);
		} catch (error: any) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const createProject = async (data: Project) => {
		try {
			setLoading(true);
			const project = serialize(Project, data)
			await axiosInstance.post(ApiRoutes.PROJECTS, project);
		} catch (error: any) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const fetchProject = async (id: number | undefined) => {
		try {
			setLoading(true);
			const { data } = await axiosInstance.get(ApiRoutes.PROJECTS + `/${id}`);
			const project = deserialize(Project, data?.project);
			setProject(project);
		} catch (error: any) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	const editProject = async (id: number, data: Project) => {
		try {
			const _project = serialize(Project, data)
			setLoading(true);
			const response = await axiosInstance.put(ApiRoutes.PROJECTS + `/${id}`, _project);
			const project = deserialize(Project, response.data["project"])
			Notification({
				message: "Project updated successfully",
				type: NotificationTypes.SUCCESS,
				description: ""
			})
			return project;
		} catch (error: any) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	const deleteProject = async (id: number) => {
		try {
			setLoading(true);
			const response = await axiosInstance.delete(ApiRoutes.PROJECTS + `/${id}`);
			Notification({
				message: "Project scrapped successfully",
				type: NotificationTypes.SUCCESS,
				description: ""
			})
		} catch (error: any) {
			setError(error);
		} finally {
			setLoading(false);
		}
	}

	return {
		project,
		projects,
		projectPagination,
		error,
		loading,
		fetchProjects,
		createProject,
		fetchProject,
		editProject,
		deleteProject,
	};
};

export default ProjectService;
