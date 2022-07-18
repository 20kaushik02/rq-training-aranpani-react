import { Progress, TablePaginationConfig } from "antd";
import React, { FC } from "react";
import { ProjectTypes } from "../../../enums/projectTypes";
import moment from "moment"
import { Project } from "../../../models/Project/project.model";
import AppTable from "../../../shared/components/AppTable";
import { PaginationModel } from "../../../models/Pagination/pagination.model";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../routes/routeConstants/appRoutes";

interface ProjectsTableProps {
    type: ProjectTypes;
    loading: boolean;
    projects: Array<Project>;
    fetchProjects: Function;
    pagination?: PaginationModel;
}

const columnsProposed = [
    {
        title: "Reg Number",
        dataIndex: "regNumber",
        key: "regNumber",
    },
    {
        title: "Temple Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Location",
        dataIndex: "location",
        key: "location",
    },
    {
        title: "Created On",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (date: string) => moment(date).format("DD/MM/YYYY")
    },
];

const columns = [
    {
        title: "Reg Number",
        dataIndex: "regNumber",
        key: "regNumber",
    },
    {
        title: "Temple Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Location",
        dataIndex: "location",
        key: "location",
    },
    {
        title: "Start Date",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (date: string) => date ? moment(date).format("DD/MM/YYYY") : null,
    },
    {
        title: "End Date",
        dataIndex: "endDate",
        key: "endDate",
        render: (date: string) => date ? moment(date).format("DD/MM/YYYY") : null,
    },
    {
        title: "Estimated Amount",
        dataIndex: "estimatedAmt",
        key: "estimatedAmt",
    },
    {
        title: "Expensed Amount",
        dataIndex: "expensedAmt",
        key: "expensedAmt",
    },
    {
        title: "Progress",
        dataIndex: "completion",
        key: "completion",
        render: (progress: string) => <Progress percent={Number(progress)} size="small" />
    },
];

const ProjectsTable: FC<ProjectsTableProps> = (props) => {
    const { type, loading, projects, fetchProjects, pagination } = props;

    const navigate = useNavigate();
    const location = useLocation();

    let tableColumns = type === 'Proposed' ? columnsProposed : columns;

    const searchProject = (search: string) => {
        const params = new URLSearchParams(location.search);
        if (search)
            params.set('search', search);
        else
            params.delete('search');
        params.set('page', '1');
        navigate(
            AppRoutes.PROJECTS + "?" + params.toString(),
            { replace: true },
        );
        fetchProjects(type, { search });
    }

    const redirectToProject = (project: Project) => ({
        onClick: () => {
            navigate(generatePath(AppRoutes.PROJECT_DETAILS, {
                id: project.id?.toString()
            }))
        },
    });

    const tableChangeHandler = (pagination: TablePaginationConfig) => {
        const params = new URLSearchParams(location.search);
        params.set('page', `${pagination?.current}`);
        navigate(
            AppRoutes.PROJECTS + "?" + params.toString(),
            { replace: true },
        );
        fetchProjects(type, {
            page: pagination.current,
        });
    }

    return (
        <div className="projects-table mt-5">
            <AppTable
                title={"Project"}
                handleSearch={searchProject}
                columns={tableColumns}
                loading={loading}
                projectType={type}
                onChange={tableChangeHandler}
                totalRecords={pagination?.totalCount || 0}
                pagination={{
                    pageSize: 50,
                    current: pagination?.currentPage || 1,
                    total: pagination?.totalCount || 0,
                    showTotal: (total: number, range: [number, number]) => <p>Showing <b>{` ${range[0]} - ${range[1]}`}</b> of <b>{total}</b></p>
                }}
                data={projects}
                handleRedirect={redirectToProject}
            />
        </div>
    );
};

export default ProjectsTable;