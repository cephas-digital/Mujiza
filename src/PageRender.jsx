import React, { createElement, useEffect } from "react";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ErrorPage } from "./Components";
import { GlobalState } from "./Data/Context";
import { Loader } from "./Utils";

const generatePage = (pageName, folder) => {
	const component = () => require(`./${folder}/${pageName}`).default;

	try {
		return createElement(component());
	} catch (error) {
		return <ErrorPage />;
	}
};

const PageRender = () => {
	const { auth, errors, clearErrors } = useContext(GlobalState);
	const { page, id, step } = useParams(),
		navigate = useNavigate(),
		escapeUsers = ["agents"],
		escape = ["add"],
		escapeProducts = [
			"airtime",
			"data",
			"tv-subscriptions",
			"data-pin",
			"electricity-bills",
		],
		escapeAdmin = ["admins", "employees", "billers"],
		escapeWallet = ["bonus", "commissions"],
		escapeControl = ["bills", "broadcasts", "tv-subscriptions"];

	useEffect(() => {
		if (!auth?.isAuth) {
			if (errors?.errorText?.includes("jwt")) {
				navigate("/login");
				clearErrors();
			}}
		if (auth?.isAuth) {
			if (page === "login" || page === "register") {
				navigate("/");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, auth?.isAuth, navigate, errors?.errorText]);

	if (auth.token && auth.loading) return <Loader />;

	let pageName = "";
	if (step) {
		pageName = `${page}/${id}/${"[id]"}`;
	} else if (id) {
		if (page === "users" && escapeUsers.includes(id))
			pageName = `${page}/${id}`;
		else if (page === "products" && escapeProducts.includes(id))
			pageName = `${page}/${id}`;
		else if (page === "controls" && escapeControl.includes(id))
			pageName = `${page}/${id}`;
		else if (page === "administration" && escapeAdmin.includes(id))
			pageName = `${page}/${id}`;
		else if (page === "transactions" && escape.includes(id))
			pageName = `${page}/${id}`;
		else if (page === "wallets" && escapeWallet.includes(id))
			pageName = `${page}/${id}`;
		else pageName = `${page}/[id]`;
	} else {
		pageName = `${page}`;
	}

	return generatePage(
		pageName,
		auth?.user?.privilege === "user"
			? "Pages"
			: auth?.user?.privilege === "agent"
			? "Views"
			: "Screens"
	);
};

export default PageRender;
