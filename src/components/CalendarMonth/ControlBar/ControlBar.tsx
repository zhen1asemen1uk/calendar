import { FC } from "react";
import stl from "./ControlBar.module.css";
import moment from "moment";

interface IControlBar {
	date: moment.Moment;
	prevHandler: () => void;
	todayHandler: () => void;
	nextHandler: () => void;
}

const ControlBar: FC<IControlBar> = (props) => {
	const { date, prevHandler, todayHandler, nextHandler } = props;

	return (
		<div className={stl.wrapp}>
			<div className={stl.infoBar}>
				<span className={stl.month}>{date.format("MMMM")}</span>
				<span className={stl.year}>{date.format("YYYY")}</span>
			</div>

			<div className={stl.btnBar}>
				<button
					className={stl.btn}
					onClick={() => {
						prevHandler();
					}}>
					&#8678;
				</button>
				<button
					className={stl.btn}
					onClick={() => {
						todayHandler();
					}}>
					Today
				</button>
				<button
					className={stl.btn}
					onClick={() => {
						nextHandler();
					}}>
					&#8680;
				</button>
			</div>
		</div>
	);
};

export default ControlBar;
