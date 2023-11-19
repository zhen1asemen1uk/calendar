import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { authAPI } from "../../API/authAPI";

import HeaderBar from "./HeaderBar";

const HeaderBarConteiner = () => {
	const dispatch = useAppDispatch();

	const { isAuth, user } = useAppSelector((state) => state.authState);

	const [search, setSearch] = useState("");

	const logout = () => {
		dispatch(authAPI.logout());
	};

	return (
		<HeaderBar
			search={search}
			setSearch={setSearch}
			isAuth={isAuth}
			logout={logout}
			user={user!}
		/>
	);
};

export default HeaderBarConteiner;
