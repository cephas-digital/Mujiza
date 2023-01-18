import React, { createContext, useState } from "react";
import { connect, useSelector } from "react-redux";
import { BiHomeAlt } from "react-icons/bi";
import { TbUsers } from "react-icons/tb";
import {
	VscBellDot,
	// VscArrowSwap
} from "react-icons/vsc";
import {
	GiChart,
	GiWallet,
	//  GiHumanPyramid
} from "react-icons/gi";
import { IoCardOutline } from "react-icons/io5";
// import { CiTimer } from "react-icons/ci";
import { CgController } from "react-icons/cg";
// import { BsBoxSeam } from "react-icons/bs";

import {
	getSetTempUser,
	registerUser,
	loginUser,
	updateUser,
	logoutUser,
} from "./Actions/AuthActions";

import {
	getServicesHistory,
	buyServices,
	converterServices,
	dataServices,
	manageWallet,
	manageFundWallet,
	generateVirtual,
} from "./Actions/GeneralAction";
import { clearErrors } from "./Reducer/ErrorReducer";
import { getSettings } from "./Reducer/SettingsReducer";

import { getNotify, manageNotify, loadAllUser } from "./Actions/UserActions";

export const GlobalState = createContext();

const DataProvider = ({
	children,
	getSetTempUser,
	getServicesHistory,
	buyServices,
	converterServices,
	dataServices,
	manageWallet,
	manageFundWallet,
	registerUser,
	loginUser,
	updateUser,
	clearErrors,
	logoutUser,
	getSettings,
	getNotify,
	manageNotify,
	loadAllUser,
	generateVirtual,
}) => {
	const {
		auth,
		cables,
		general,
		electricity,
		airtimes,
		data,
		errors,
		wallet,
		bonus,
		commission,
		converter,
		users,
		settings,
		notifications,
	} = useSelector(state => state);
	let [stateName, setStateName] = useState("");

	let numberWithCommas = (x, a) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a ? a : ",");
	};

	let headerList = [
		{
			name: "Home",
			url: "/",
		},
		{
			name: "About us",
			url: "/about",
		},
		{
			name: "Services",
			url: "/services",
		},
		{
			name: "Contact us",
			url: "/contact",
		},
		{
			name: "Our blog",
			url: "/blogs",
		},
	];

	let sidebarList = [
		{
			name: "Dashboard",
			url: "/dashboard",
			icon: <BiHomeAlt className="icon" size={24} />,
		},
		{
			name: "Users",
			url: "/users",
			icon: <TbUsers className="icon" size={24} />,
		},
		{
			name: "Transactions",
			url: "/transactions",
			icon: <GiChart className="icon" size={24} />,
		},
		{
			name: "Products",
			url: "/products",
			icon: <IoCardOutline className="icon" size={24} />,
		},
		// {
		// 	name: "Converter",
		// 	url: "/converter",
		// 	icon: <VscArrowSwap className="icon" size={24} />,
		// },
		{
			name: "Notification",
			url: "/notifications",
			icon: <VscBellDot className="icon" size={24} />,
		},
		{
			name: "Walllet",
			url: "/wallets",
			icon: <GiWallet className="icon" size={24} />,
		},
		// {
		// 	name: "Employee",
		// 	url: "/administration",
		// 	icon: <GiHumanPyramid className="icon" size={24} />,
		// },
		// {
		// 	name: "Reports",
		// 	url: "/reports",
		// 	icon: <CiTimer className="icon" size={24} />,
		// },
		// {
		// 	name: "Bundles",
		// 	url: "/bundles",
		// 	icon: <BsBoxSeam className="icon" size={24} />,
		// },
		{
			name: "Control",
			url: "/controls",
			icon: <CgController className="icon" size={24} />,
		},
	];
	let sidebarListUser = [
		{
			name: "Dashboard",
			url: "/dashboard",
			icon: <BiHomeAlt className="icon" size={24} />,
		},
		{
			name: "Transactions",
			url: "/transactions",
			icon: <GiChart className="icon" size={24} />,
		},
		{
			name: "Products",
			url: "/products",
			icon: <IoCardOutline className="icon" size={24} />,
		},
		// {
		// 	name: "Converter",
		// 	url: "/converter",
		// 	icon: <VscArrowSwap className="icon" size={24} />,
		// },
		{
			name: "Notification",
			url: "/notifications",
			icon: <VscBellDot className="icon" size={24} />,
		},
		{
			name: "Walllet",
			url: "/wallets",
			icon: <GiWallet className="icon" size={24} />,
		},
		// {
		// 	name: "Bundles",
		// 	url: "/bundles",
		// 	icon: <BsBoxSeam className="icon" size={24} />,
		// },
	];

	const state = {
		numberWithCommas,
		headerList,
		sidebarList,
		sidebarListUser,
		stateName,
		setStateName,

		auth,
		getSetTempUser,
		registerUser,
		loginUser,
		logoutUser,
		updateUser,

		cables,
		general,
		electricity,
		airtimes,
		data,
		converter,

		errors,
		clearErrors,

		getServicesHistory,
		buyServices,
		converterServices,
		dataServices,

		wallet,
		manageWallet,
		manageFundWallet,

		bonus,
		commission,

		users,
		settings,
		getSettings,

		getNotify,
		manageNotify,
		loadAllUser,

		notifications,
		generateVirtual,
	};

	return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default connect(null, {
	getSetTempUser,
	getServicesHistory,
	buyServices,
	converterServices,
	dataServices,
	manageWallet,
	manageFundWallet,
	registerUser,
	loginUser,
	updateUser,
	clearErrors,
	logoutUser,
	getSettings,
	getNotify,
	manageNotify,
	loadAllUser,
	generateVirtual,
})(DataProvider);
