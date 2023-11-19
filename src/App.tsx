import React from "react";
import { RouterProvider } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

import { router } from "./routes/rootRouters";

// import { authAPI } from "./API/authAPI";
// import { useAppSelector } from "./hooks";

moment.updateLocale("en", { week: { dow: 1 } }); // for start week from monday

const Conteiner = styled.div`
	display: flex;
	flex-direction: column;
	align-self: center;
	align-items: center;

	width: 100vw;
	height: 100vh;

	color: rgb(155, 150, 155);
	background-color: #404040;
`;

const Wrapp = styled.div`
	display: flex;
	flex-direction: column;

	width: 100vw;
	padding: 5px;

	border-radius: 8px;
	border: 1px solid #464648;
	border-bottom: 2px solid #464648;

	background-color: rgb(41, 36, 41);
	overflow: auto;
`;

const App: React.FC = () => {
	// const { authState } = useAppSelector((store) => store);

	// //for true auth status
	// if (
	// 	localStorage.getItem(`token`) &&
	// 	localStorage.getItem(`token`) !== "undefined"
	// ) {
	// 	authState.isAuth = true;
	// }

	// //for save avatar after refresh page
	// if (
	// 	localStorage.getItem(`userData`) &&
	// 	localStorage.getItem(`userData`) !== "undefined"
	// ) {
	// 	const obj = JSON.parse(localStorage.getItem(`userData`) || "{}");
	// 	authState.user = obj;
	// }

	// useEffect(() => {
	// 	if (localStorage.getItem(`token`)) {
	// 		authAPI.checkAuth();
	// 	}
	// }, [authState]);

	return (
		<Conteiner>
			<h1>Hello calendar</h1>
			<Wrapp>
				<RouterProvider router={router} />
			</Wrapp>
		</Conteiner>
	);
};

export default App;
