import styled from "styled-components";
import { type FlexProps } from "../types/resusable";

export const FlexBlock = styled.div<FlexProps>`
	${({ pos }) => pos && `position: ${pos}`};
	${({ posT }) => posT && `top: ${posT}`};
	${({ posL }) => posL && `left: ${posL}`};
	${({ posR }) => posR && `right: ${posR}`};
	${({ posB }) => posB && `bottom: ${posB}`};

	display: ${({ d }) => d ?? `flex`};
	flex-direction: ${({ fd }) => fd ?? `column`};
	${({ jc }) => jc && `justify-content:${jc}`};
	${({ ai }) => ai && `align-items:${ai}`};

	${({ p }) => p && `padding: ${p}`};
	${({ m }) => m && `margin: ${m}`};

	${({ w }) => w && `width: ${w}`};
	${({ minW }) => minW && `min-width: ${minW}`};
	${({ maxW }) => maxW && `max-width: ${maxW}`};

	${({ h }) => h && `height: ${h}`};
	${({ minH }) => minH && `min-height: ${minH}`};
	${({ maxH }) => maxH && `max-height: ${maxH}`};

	${({ c }) => c && `color: ${c}`};
	${({ bg }) => bg && `background: ${bg}`};
	${({ g }) => g && `gap: ${g}`};

	${({ cursor }) => (cursor ? `pointer` : `default`)};
`;

export const Wrapp = styled(FlexBlock)`
	flex-direction: ${({ fd }) => fd ?? `column`};
`;

export const Row = styled(FlexBlock)`
	flex-direction: ${({ fd }) => fd ?? `row`};
`;

export const Col = styled(FlexBlock)``;
