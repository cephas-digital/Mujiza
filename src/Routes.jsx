import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
	Header,
	Sidebar,
	DefaultHeader,
	Footer,
	SideHeader,
	ModalComponents,
} from "./Components";
import { GlobalState } from "./Data/Context";
import PageRender from "./PageRender";
import Home from "./Screens/home";
import Home2 from "./Pages/home";
import Home3 from "./Views/home";
import gif from "./Assets/images (1).mp4";

const Routers = () => {
	const { auth, success, restoreMsg } = useContext(GlobalState);
	return (
		<>
			<ToastContainer />
			{auth?.user?.privilege === "user" || auth?.user?.privilege === "agent" ? (
				<>
					<Sidebar />
					<SideHeader noLogo />
				</>
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
			<ModalComponents
				isOpen={success?.msg}
				title="Success"
				size={"sm"}
				success
				borderNone={"borderNone"}
				toggle={() => restoreMsg()}>
				<div className="downH2 d-flex flex-column">
					<div className="mx-auto">
						<video className="" autoPlay muted loop id="myVideo">
							<source src={gif} type="video/mp4" />
						</video>
					</div>
					<p className="fw-bold Lexend text-center w-100">{success?.msg}</p>
					<button
						onClick={() => restoreMsg()}
						className="btn btn-success2 py-2 py-md-3 text-capitalize mx-auto my-3 px-3 px-md-5">
						close
					</button>
				</div>
			</ModalComponents>
		</>
	);
};

export default Routers;
