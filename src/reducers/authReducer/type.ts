import { ReactNode } from "react";
import { IEvent } from "../eventReducer/type";

// Define a type for the slice state
export interface IAuthSlice {
	user: IUser | null;
	passwordReset: { data: string; error: string };
	isAuth: boolean;
	isLoading: boolean;
	isModal: boolean;
	modalChildren: ReactNode | null;
}

export interface IUser {
	id: string;
	login: string;
	password: string;
	email: string;
	avatar: string;
	activationLink: string;
	status: string;
	verify: boolean;
	createdAt: Date;
	events: IEvent[];
}
