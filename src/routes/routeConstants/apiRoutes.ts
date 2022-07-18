export const ApiRoutes = {
    BASE_URL: process.env.REACT_APP_API_BASE_URL,
    USER_LOGIN: "users/sign_in",
    USER_LOGOUT: "users/sign_out",
    FORGOT_PASSWORD: "/forgot_password",
    RESET_PASSWORD: "/reset_password",
    PROJECTS: "admin/projects",
    PROJECT_ATTACHMENTS: "admin/project_attachments",
    PROJECT_DOCUMENTS: "admin/project_documents",
    PROJECT_BLOGS: "admin/projects/:projectId/project_blogs",
    PROJECT_BLOG_ATTACHMENTS: "admin/project_blog_attachments",
    AREA_REPRESENTATIVES: "admin/area_representatives",
}
