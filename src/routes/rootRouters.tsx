import { RouteObject, createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/Layout";

import CalendarMonthConteiner from "../components/CalendarMonth/CalendarMonthConteiner";
import CreateNewPassConteiner from "../components/Auth/ResetPassword/CreateNewPassConteiner";
import CalendarDayConteiner from "../components/CalendarDay/CalendarDayConteiner";
import CalendarWeekConteiner from "../components/CalendarWeek/CalendarWeekConteiner";
import CalendarYearConteiner from "../components/CalendarYear/CalendarYearConteiner";

import ErrorPage from "../pages/ErrorPage";

const routes: RouteObject[] = [
	{ path: "/", element: <CalendarMonthConteiner /> },
	{ path: "/day", element: <CalendarDayConteiner /> },
	{ path: "/week", element: <CalendarWeekConteiner /> },
	{ path: "/month", element: <CalendarMonthConteiner /> },
	{ path: "/year", element: <CalendarYearConteiner /> },
	{
		path: "/createNewPassword",
		element: <CreateNewPassConteiner />,
	},
	{ path: `/error`, element: <ErrorPage /> },
];

export const router = createBrowserRouter(
	routes.map((el) => ({
		path: el.path,
		element: <MainLayout>{el.element}</MainLayout>,
		errorElement: <ErrorPage />,
	}))
);
