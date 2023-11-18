import moment from "moment";

import stl from "./WeekBar.module.css";

const WeekBar = () => {
	const arrDay = [...Array(7)].map((item, index) => {
		return moment()
			.day(index + 1)
			.format("ddd");
	});

	return (
		<div className={stl.wrapp}>
			{arrDay.map((item, index) => {
				return (
					<div key={index} className={stl.weekDay}>
						{item}
					</div>
				);
			})}
		</div>
	);
};

export default WeekBar;
