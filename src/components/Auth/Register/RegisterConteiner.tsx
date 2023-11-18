import { FC } from "react";
import { authAPI } from "../../../API/authAPI";
import Loading from "../Loading/Loading";
import Register from "./Register";
import { useAppDispatch, useAppSelector } from "../../../hooks";

const RegisterConteiner: FC = () => {
	const dispatch = useAppDispatch();

	const authState = useAppSelector((state) => state.authState);
	const isLoading = useAppSelector((store) => store.authState.isLoading);

	const sendRegisterData = (
		login: string,
		password: string,
		password_confirm: string,
		email: string
	) => {
		dispatch(authAPI.register(login, password, password_confirm, email));
	};

	return (
		<>
			{isLoading === true ? (
				<Loading />
			) : (
				<Register authState={authState} sendRegisterData={sendRegisterData} />
			)}
		</>
	);
};

export default RegisterConteiner;
