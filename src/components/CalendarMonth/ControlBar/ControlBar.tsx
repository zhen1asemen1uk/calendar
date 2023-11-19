import { FC } from "react";
import moment from "moment";
import styled from "styled-components";

import stl from "./ControlBar.module.css";

import CalendarSvg from "../../svg/CalendarSvg";
import { Row } from "../../styles";

const CalendarStyled = styled.input`
	opacity: 0;
	width: 20px;
	position: absolute;
	right: 10px;
`;

interface IControlBar {
	date: string;
	prevHandler: () => void;
	todayHandler: () => void;
	nextHandler: () => void;
	changeDateHandler: (date: string) => void;
}

const ControlBar: FC<IControlBar> = (props) => {
	const { date, prevHandler, todayHandler, nextHandler, changeDateHandler } =
		props;

	const navBTN = [
		{ fn: prevHandler, name: String.fromCharCode(8678) }, // for correct display of the arrows
		{ fn: todayHandler, name: "Today" },
		{ fn: nextHandler, name: String.fromCharCode(8680) },
	];

	return (
		<div className={stl.wrapp}>
			<div className={stl.infoBar}>
				<span className={stl.month}>{moment.unix(+date).format("MMMM")}</span>
				<span className={stl.year}>{moment.unix(+date).format("YYYY")}</span>
			</div>

			<Row g='15px'>
				<div className={stl.btnBar}>
					{navBTN.map((btn) => (
						<button key={btn.name} className={stl.btn} onClick={btn.fn}>
							{btn.name}
						</button>
					))}
				</div>

				<label htmlFor='date'>
					<CalendarSvg />
					<CalendarStyled
						type='date'
						id='date'
						name='date'
						value={moment.unix(+date).format("YYYY-MM-DD")}
						onChange={(e) => changeDateHandler(e.target.value)}
					/>
				</label>
			</Row>
		</div>
	);
};

export default ControlBar;
