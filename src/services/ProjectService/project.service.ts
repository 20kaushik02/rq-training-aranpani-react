import { useState } from "react";
import { deserialize } from "serializr";
import { ProjectTypes } from "../../enums/projectTypes";
import axiosInstance from "../../interceptor/axiosInstance";
import { Project } from "../../models/Project/project.model";
import { PaginationModel } from './../../models/Pagination/pagination.model';
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";

const ProjectService = () => {
	const [projects, setProjects] = useState<Project[]>([]);

	const [projectPagination, setProjectPagination] = useState<PaginationModel>();

	const [error, setError] = useState<Error | unknown>();

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
		} catch (error) {
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
	};
};

export default ProjectService;
