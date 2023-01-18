import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header, Sidebar, DefaultHeader, Footer } from "./Components";
import { GlobalState } from "./Data/Context";
import PageRender from "./PageRender";
import Home from "./Screens/home";
import Home2 from "./Pages/home";
import Home3 from "./Views/home";

const Routers = () => {
	const { auth } = useContext(GlobalState);
	return (
		<>
			<ToastContainer />
			{auth?.user?.privilege === "user" || auth?.user?.privilege === "agent" ? (
				<Sidebar />
			) : (
				<Header />
			)}
			<div
				className={
					auth?.user?.privilege === "user" || auth?.user?.privilege === "agent"
						? "home"
						: ""
				}>
				{auth?.user?.privilege === "user" ||
				auth?.user?.privilege === "agent" ? (
					<DefaultHeader />
				) : (
					<></>
				)}
				<Routes>
					<Route
						path="/"
						element={
							auth?.user?.privilege === "user" ? (
								<Home2 />
							) : auth?.user?.privilege === "agent" ? (
								<Home3 />
							) : (
								<Home />
							)
						}
					/>
					<Route path="/:page" element={<PageRender />} />
					<Route path="/:page/:id" element={<PageRender />} />
					<Route path="/:page/:id/:step" element={<PageRender />} />
				</Routes>
			</div>
			{auth?.user?.privilege === "user" || auth?.user?.privilege === "agent" ? (
				<></>
			) : (
				<Footer />
			)}
		</>
	);
};

export default Routers;
