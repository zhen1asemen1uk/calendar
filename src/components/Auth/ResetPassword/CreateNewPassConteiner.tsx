import { authAPI } from "../../../API/authAPI";
import Loading from "../Loading/Loading";
import CreateNewPass from "./CreateNewPass";
import { useAppDispatch, useAppSelector } from "../../../hooks";

const CreateNewPassConteiner = () => {
	const dispatch = useAppDispatch();

	const passwordReset = useAppSelector(
		(state) => state.authState.passwordReset
	);
	const { isLoading } = useAppSelector((store) => store.authState);

	const password_reset = (newPass: string) => {
		dispatch(authAPI.password_reset_link(newPass));
	};

	return (
		<>
			{isLoading === true ? (
				<Loading />
			) : (
				<CreateNewPass
					password_reset={password_reset}
					passwordReset={passwordReset}
				/>
			)}
		</>
	);
};

export default CreateNewPassConteiner;
