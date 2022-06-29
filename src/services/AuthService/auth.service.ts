import axiosInstance from "../../interceptor/axiosInstance";
import { deserialize, serialize } from "serializr";
import { User } from "../../models/user.model";
import Notification from "../../shared/components/Notification";
import { NotificationTypes } from "../../enums/notificationTypes";
import { useState } from "react";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes/routeConstants/appRoutes";

const UserService = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState<User>()

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

				setUser(user);
				setAuthenticated(user);
				// navigate(AppRoutes.DASHBOARD);
			} catch (error: any) {
				Notification({
					message: "Login failed",
					description: "incorrect email or password",
					type: NotificationTypes.ERROR,
				});
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

	return {
		user,
		error,
		loading,
		loginUser,
		setResetCode,
		resetPassword,
	};
};

export default UserService;
