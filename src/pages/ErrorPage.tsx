import { FC } from "react";
import { Link, useRouteError } from "react-router-dom";

import Loander from "../components/Auth/Loading/Loading";
import { Col, FlexBlock } from "../components/styles";

interface RouteError {
	status: string;
	message: string;
	location: string;
}

const ErrorPage: FC = () => {
	const error = useRouteError() as RouteError;
	console.error(error && error);

	return (
		<Col ai='center' jc='space-between' h='100vh'>
			<h1>Oops!</h1>

			<Loander />

			<p>Sorry, an unexpected error has occurred.</p>
			<FlexBlock c='red'>
				{error ? error?.status || error?.message : ``}
			</FlexBlock>
			<p>
				<Link to={`/`}>Go main</Link>
			</p>
		</Col>
	);
};

export default ErrorPage;
