import { FC, useState } from "react";

import stl from "./Login.module.css";
import Modal from "../../Modal/Modal";
import ResetPasswordConteiner from "../ResetPassword/ResetPasswordConteiner";

interface ILogin {
	sendLoginData: (login: string, password: string) => void;
	authState: any;
}

const Login: FC<ILogin> = (props) => {
	const { sendLoginData, authState } = props;

	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [modal, setModal] = useState(false);
	return (
		<>
			<h1>Login 🚪</h1>
			<div className={stl.wrappFormLog}>
				<input
					type='text'
					name='login'
					id={stl.login}
					placeholder='Login'
					autoFocus
					required={true}
					maxLength={40}
					pattern={"[A-Za-z]+"}
					value={login}
					onChange={(e) => setLogin(e.target.value)}
					className={`${stl.log} ${stl.inp}`}
				/>

				<input
					type='password'
					name='password'
					id={stl.password}
					placeholder='Password'
					minLength={8}
					required={true}
					maxLength={18}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className={`${stl.pass} ${stl.inp}`}
				/>

				<div className={stl.resetPass}>
					<button className={stl.btn} onClick={() => setModal(true)}>
						Reset password?
					</button>

					<Modal handleClose={() => setModal(false)} show={modal}>
						<ResetPasswordConteiner closeModal={() => setModal(false)} />
					</Modal>
				</div>

				<button
					onClick={() => {
						sendLoginData(login, password);
					}}
					className={stl.btnSend}>
					Login
				</button>

				{typeof authState.user == "string" && (
					<div className={stl.notification}>{authState.user}</div>
				)}
			</div>
		</>
	);
};

export default Login;
