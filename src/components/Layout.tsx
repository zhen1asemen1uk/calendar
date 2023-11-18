import React, { FC, ReactNode } from "react";
import styled from "styled-components";

import { Col } from "../components/styles";
import HeaderBarConteiner from "./HeaderBar/HeaderBarConteiner";

interface IMainLayout {
	children: React.ReactNode | ReactNode;
	title?: string;
	description?: string;
	robots?: string;
	keywords?: string;
}

const Main = styled.div`
	flex: 1 1 auto;
`;

const Layout: FC<IMainLayout> = ({ children }) => {
	return (
		<Col>
			<HeaderBarConteiner />
			<Main>{children}</Main>
		</Col>
	);
};

export default Layout;
