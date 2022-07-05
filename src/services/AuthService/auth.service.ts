import axiosInstance from "../../interceptor/axiosInstance";
import { deserialize, serialize } from "serializr";
import { User } from "../../models/user.model";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { useState } from "react";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AppRoutes, NavigationRoutes } from "../../routes/routeConstants/appRoutes";

const UserService = () => {
	const navigate = useNavigate();

	const [error, setError] = useState<Error>();

	const [loading, setLoading] = useState(false);

	const { setAuthenticated } = AuthContext();

	const loginUser = async (data: User) => {
		try {
			setLoading(true);
			const UserJSON = {
				user: serialize(data),
			};
			try {
				const response = await axiosInstance.post(ApiRoutes.USER_LOGIN, UserJSON);
				const user = deserialize(User, response.data["user"]);

				if (user) {
					localStorage.setItem("user", JSON.stringify(user));
				}
				localStorage.setItem("authHeaders", JSON.stringify(response.headers));

				Notification({
					message: "Login",
					description: "Logged in successfully",
					type: NotificationTypes.SUCCESS,
				});

				setAuthenticated(user);
				navigate(AppRoutes.DASHBOARD);
			} catch (error: any) {
				setError(error);
			}
		} finally {
			setLoading(false);
		};
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
			return true;
		} catch (error: any) {
			setError(error);
			return false;
		} finally {
			setLoading(false);
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
			return true;
		} catch (error: any) {
			setError(error);
			return false;
		} finally {
			setLoading(false);
		}
	}

	const logoutUser = async () => {
		try {
			setLoading(true);
			await axiosInstance.delete(
				ApiRoutes.USER_LOGOUT,
			);

			localStorage.clear();
			Notification({
				message: "Logout",
				description: "Logged out successfully",
				type: NotificationTypes.SUCCESS,
			});
			setAuthenticated();
			navigate(NavigationRoutes.LOGIN);
		} catch (error: any) {
			setError(error);
			return false;
		} finally {
			setLoading(false);
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
