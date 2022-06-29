export const NavigationRoutes = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  HOME: "/",
}

export const AppRoutes = {
  AUTH: "/auth/*",
  REGISTER: "/register",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  HOME: "/",
  PROJECTS: "/projects",
  PROJECT_DETAILS: "/projects/:id",
  DASHBOARD:"/dashboard",
  DONORS:"/donors",
  DONOR_DETAILS:"/donors/:id",
  REPRESENTATIVE:"/representative",
  REPRESENTATIVE_DETAILS:"/representative/:id",
  PAYMENT:"/payment",
  ONE_TIME_PAYMENT:"/payment/one-time-payment",
  INTERNAL_USERS:"/internal-users",
  SUBSCRIPTION:"/subscription"
};
