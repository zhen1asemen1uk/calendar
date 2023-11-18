import styled, { keyframes } from "styled-components";

const spin = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);

}
`;

const LoadWrapp = styled.div`
	display: flex;
	width: 100%;
	height: 500px;
	justify-content: center;
	align-items: center;
	align-self: center;
`;

const Loader = styled.div`
	border: 16px solid #f3f3f3;
	/* Light grey */

	border-top: 16px solid black;
	/* Blue */
	border-radius: 50%;
	width: 120px;
	height: 120px;
	animation: ${spin} 1s linear infinite;
`;

const Loading = () => {
	return (
		<LoadWrapp>
			<Loader />
		</LoadWrapp>
	);
};

export default Loading;
