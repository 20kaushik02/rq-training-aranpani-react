import { AppRoutes } from "../../../routes/routeConstants/appRoutes";

export const sidemenu = [
  {
    label: "Dashboard",
    icon: "icon-dashboard",
    path: AppRoutes.DASHBOARD,
    disabled: false,
  },
  {
    label: "Projects",
    icon: "icon-project",
    path: AppRoutes.PROJECTS,
    disabled: false,
  },
  {
    label: "Donors",
    icon: "icon-donor",
    path: AppRoutes.DONORS,
    disabled: false,
  },
  {
    label: "Representative",
    icon: "icon-rep",
    path: AppRoutes.REPRESENTATIVE,
    disabled: false,
  },
  {
    label: "Payment",
    icon: "icon-payment",
    path: AppRoutes.PAYMENT,
    disabled: false,
  },
  {
    label: "Internal users",
    icon: "icon-internal-users",
    path: AppRoutes.INTERNAL_USERS,
    disabled: false,
  },
  {
    label: "Subscription",
    icon: "icon-subscription",
    path: AppRoutes.SUBSCRIPTION,
    disabled: false,
  }
];
