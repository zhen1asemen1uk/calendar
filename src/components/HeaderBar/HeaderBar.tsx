import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import stl from "./HeaderBar.module.css";
import { IUser } from "../../reducers/authReducer/type";
import Modal from "../Modal/Modal";
import RegisterConteiner from "../Auth/Register/RegisterConteiner";
import LoginConteiner from "../Auth/Login/LoginConteiner";
import AddEventConteiner from "../Event/AddEvent/AddEventConteiner";

interface IHeaderBar {
	search: string;
	setSearch: (search: string) => void;
	isAuth: boolean;
	logout: () => void;
	user: IUser;
}

const API_URL = process.env.REACT_APP_HOST;

const typeOfCalendar = [
	{ path: "/day", name: "Day" },
	{ path: "/week", name: "Week" },
	{ path: "/month", name: "Month" },
	{ path: "/year", name: "Year" },
];

const authBTN = [
	{ path: "/register", name: "Register" },
	{ path: "/login", name: "Login" },
];

const HeaderBar: FC<IHeaderBar> = (props) => {
	const { search, setSearch, isAuth, logout, user } = props;
	const navigate = useNavigate();

	const [modals, setModals] = useState<boolean[]>(authBTN.map(() => false));
	const [addEventModal, setAddEventModal] = useState<boolean>(false);

	return (
		<div className={stl.wrapp}>
			<div className={stl.oneBTN}>
				<button className={stl.btn} onClick={() => setAddEventModal(true)}>
					+
				</button>
				<Modal
					handleClose={() => {
						setAddEventModal(false);
					}}
					show={addEventModal}>
					<AddEventConteiner closeModal={() => setAddEventModal(false)} />
				</Modal>
			</div>

			<div className={stl.fourBTN}>
				<div className={stl.fourBTN}>
					{typeOfCalendar.map((link) => (
						<button
							key={link.name}
							onClick={() => navigate(link.path)}
							className={stl.btn}>
							{link.name}
						</button>
					))}
				</div>
			</div>

			<div className={stl.HEIGHT} />

			<div className={stl.wrappINP}>
				<input
					type='search'
					className={stl.searchINP}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
					value={search}
					placeholder='Search'
				/>
			</div>

			{isAuth ? (
				<div className={stl.myIcon}>
					<button onClick={() => navigate("/user")} id={stl.NavlinkForAvatar}>
						<img
							src={`${API_URL}/avatar/${user.avatar}`}
							alt='avatar'
							className={stl.myAvatar}
						/>
					</button>

					<div className={stl.dropDown}>
						<button
							onClick={() => {
								logout();
								navigate("/");
							}}>
							logout
						</button>
					</div>
				</div>
			) : (
				<div className={`${stl.auth} ${stl.oneBTN}`}>
					{authBTN.map((link, i) => (
						<button
							key={link.name}
							onClick={() => {
								const newModals = modals.map((_, idx) =>
									i === idx ? (modals[i] = true) : (modals[i] = false)
								);

								setModals(newModals);
							}}
							className={stl.btn}>
							{link.name}
						</button>
					))}

					<Modal
						handleClose={() => {
							setModals(modals.map(() => false));
						}}
						show={modals[0]}>
						<RegisterConteiner />
					</Modal>

					<Modal
						handleClose={() => {
							setModals(modals.map(() => false));
						}}
						show={modals[1]}>
						<LoginConteiner />
					</Modal>
				</div>
			)}
		</div>
	);
};

export default HeaderBar;
