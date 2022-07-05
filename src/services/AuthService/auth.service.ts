import axiosInstance from "../../interceptor/axiosInstance";
import { deserialize, serialize } from "serializr";
import { User } from "../../models/User/user.model";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { useState } from "react";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AppRoutes, NavigationRoutes } from "../../routes/routeConstants/appRoutes";
import LocalStorage from "../../shared/components/LocalStorage";

const UserService = () => {
	const navigate = useNavigate();

	const [error, setError] = useState<Error>();

	const [loading, setLoading] = useState(false);

	const { setAuthenticated, setUnauthenticated } = AuthContext();

	const loginUser = async (data: User) => {
		try {
			setLoading(true);
			const UserJSON = {
				user: serialize(data),
			};
			const response = await axiosInstance.post(ApiRoutes.USER_LOGIN, UserJSON);
			const user = deserialize(User, response.data["user"]);
			setLoading(false);

			if (user) {
				LocalStorage.setItem("user", user);
			}
			LocalStorage.setItem("authHeaders", response.headers);

			Notification({
				message: "Login",
				description: "Logged in successfully",
				type: NotificationTypes.SUCCESS,
			});

			setAuthenticated(user);
			navigate(AppRoutes.DASHBOARD);
		} catch (error: any) {
			setLoading(false);
			setError(error);
		}
	};

	const setResetCode = async (user: User) => {
		try {
			setLoading(true);
			const forgotPasswordJSON = {
				admin: serialize(user),
			};
			const response = await axiosInstance.post(
				ApiRoutes.FORGOT_PASSWORD,
				forgotPasswordJSON
			);
			setLoading(false);
			return true;
		} catch (error: any) {
			setError(error);
			setLoading(false);
			return false;
		}
	};

	const resetPassword = async (user: User) => {
		try {
			setLoading(true);
			const forgotPasswordJSON = {
				admin: serialize(user),
			};
			const response = await axiosInstance.post(
				ApiRoutes.RESET_PASSWORD,
				forgotPasswordJSON
			);
			setLoading(false);
			return true;
		} catch (error: any) {
			setLoading(false);
			setError(error);
			return false;
		}
	}

	const logoutUser = async () => {
		try {
			setLoading(true);
			await axiosInstance.delete(
				ApiRoutes.USER_LOGOUT,
			);

			setLoading(false);
			setUnauthenticated();
			
			Notification({
				message: "Logout",
				description: "Logged out successfully",
				type: NotificationTypes.SUCCESS,
			});
			navigate(NavigationRoutes.LOGIN);
		} catch (error: any) {
			setLoading(false);
			setError(error);
			return false;
		}
	}

	return {
		error,
		loading,
		loginUser,
		setResetCode,
		resetPassword,
		logoutUser
	};
};

export default UserService;
