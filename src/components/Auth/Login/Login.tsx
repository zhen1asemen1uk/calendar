import React, { FC, ReactNode, useState } from "react";

import ResetPasswordConteiner from "../ResetPassword/ResetPasswordConteiner";
import stl from "./Login.module.css";

interface ILogin {
	sendLoginData: (login: string, password: string) => void;
	authState: any;
	isModalSet: (set: boolean, child: ReactNode | null) => void;
}

const Login: FC<ILogin> = (props) => {
	const { sendLoginData, authState, isModalSet } = props;

	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");

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
					<button
						className={stl.btn}
						onClick={() => {
							isModalSet(true, <ResetPasswordConteiner />);
						}}>
						reset password?
					</button>
				</div>

				<button
					onClick={() => {
						sendLoginData(login, password);
					}}
					className={stl.btnSend}>
					Login
				</button>

				{typeof authState.user == "string" ? (
					<div className={stl.notification}>{authState.user}</div>
				) : (
					<></>
				)}
			</div>
		</>
	);
};

export default Login;
