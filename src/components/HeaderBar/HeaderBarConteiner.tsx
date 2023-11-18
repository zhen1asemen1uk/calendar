import { ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { authAPI } from "../../API/authAPI";
import {
	isModal as setIsModal,
	modalChildren as setModalChildren,
} from "../../reducers/authReducer/authSlice";

import HeaderBar from "./HeaderBar";

const HeaderBarConteiner = () => {
	const dispatch = useAppDispatch();

	const { isAuth, user, isModal, modalChildren } = useAppSelector(
		(state) => state.authState
	);

	const [search, setSearch] = useState("");

	const logout = () => {
		dispatch(authAPI.logout());
	};

	const isModalSet = (set: boolean, child: ReactNode | null) => {
		dispatch(setIsModal(set));
		dispatch(setModalChildren(child));
	};

	return (
		<HeaderBar
			isModal={isModal}
			isModalSet={isModalSet}
			search={search}
			setSearch={setSearch}
			modalChildren={modalChildren}
			isAuth={isAuth}
			logout={logout}
			user={user!}
		/>
	);
};

export default HeaderBarConteiner;
