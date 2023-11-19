import React, { FC } from "react";

import { authAPI } from "../../../API/authAPI";
import Loading from "../Loading/Loading";

import ResetPassword from "./ResetPassword";
import { useAppDispatch, useAppSelector } from "../../../hooks";

const ResetPasswordConteiner: FC<{ closeModal: () => void }> = ({
	closeModal,
}) => {
	const dispatch = useAppDispatch();

	const authState = useAppSelector((state) => state.authState);
	const isLoading = useAppSelector((store) => store.authState.isLoading);

	const password_reset = (login: string) => {
		dispatch(authAPI.password_reset(login));
		closeModal();
	};

	return (
		<>
			{isLoading === true ? (
				<Loading />
			) : (
				<ResetPassword password_reset={password_reset} authState={authState} />
			)}
		</>
	);
};

export default ResetPasswordConteiner;
