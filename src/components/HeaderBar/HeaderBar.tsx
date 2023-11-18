import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import AddEventConteiner from "../Event/AddEvent/AddEventConteiner";
import LoginConteiner from "../Auth/Login/LoginConteiner";
import RegisterConteiner from "../Auth/Register/RegisterConteiner";

import Modal from "../Modal/Modal";
import stl from "./HeaderBar.module.css";
import { IUser } from "../../reducers/authReducer/type";

interface IHeaderBar {
	isModal: boolean;
	isModalSet: (set: boolean, child: ReactNode | null) => void;
	search: string;
	setSearch: (search: string) => void;
	modalChildren: ReactNode | null;
	isAuth: boolean;
	logout: () => void;
	user: IUser;
}

const API_URL = process.env.REACT_APP_HOST;

const HeaderBar: FC<IHeaderBar> = (props) => {
	const navigate = useNavigate();
	const {
		isModal,
		isModalSet,
		search,
		setSearch,
		modalChildren,
		isAuth,
		logout,
		user,
	} = props;

	return (
		<div className={stl.wrapp}>
			<Modal isModal={isModal} isModalSet={isModalSet}>
				{modalChildren}
			</Modal>

			<div className={stl.oneBTN}>
				<button
					className={stl.btn}
					onClick={() => {
						isModalSet(true, <AddEventConteiner />);
					}}>
					+
				</button>
			</div>

			<div className={stl.fourBTN}>
				<div className={stl.fourBTN}>
					<button onClick={() => navigate("/day")} className={stl.btn}>
						Day
					</button>
					<button onClick={() => navigate("/week")} className={stl.btn}>
						Week
					</button>
					<button onClick={() => navigate("/month")} className={stl.btn}>
						Month
					</button>
					<button onClick={() => navigate("/year")} className={stl.btn}>
						Year
					</button>
				</div>
			</div>
			<div className={stl.HEIGHT}></div>
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
					<button
						className={stl.btn}
						onClick={() => {
							isModalSet(true, <RegisterConteiner />);
						}}>
						register
					</button>
					<button
						className={stl.btn}
						onClick={() => {
							isModalSet(true, <LoginConteiner />);
						}}>
						login
					</button>
				</div>
			)}
		</div>
	);
};

export default HeaderBar;
