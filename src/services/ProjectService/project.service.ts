import { useState } from "react";
import { deserialize, serialize } from "serializr";
import { ProjectTypes } from "../../enums/projectTypes";
import axiosInstance from "../../interceptor/axiosInstance";
import { Project } from "../../models/Project/project.model";
import { PaginationModel } from './../../models/Pagination/pagination.model';
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";

const ProjectService = () => {
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

	return {
		projects,
		projectPagination,
		error,
		loading,
		fetchProjects,
		createProject,
	};
};

export default ProjectService;
