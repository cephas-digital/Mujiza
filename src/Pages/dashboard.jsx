import React, { useContext } from "react";
import Dashboard from "../Components/Dashboard";
import { GlobalState } from "../Data/Context";
import icon1 from "../Assets/Hands Give.png";
import icon2 from "../Assets/Stuck at Home Mailing List.png";
import icon3 from "../Assets/Olá Playing Video Games.png";
import icon4 from "../Assets/Group (5).png";

const MainDashboard = () => {
	const { wallet, numberWithCommas, data, notifications } =
		useContext(GlobalState);
	let usersArr = [
		{
			name: "wallet balance",
			number: wallet?.balance?.available
				? numberWithCommas(wallet?.balance?.available)
				: 0,
			color: "linear-gradient(90deg, #DE0DE2 16.14%, #0E102D 101.45%)",
			link: "/wallets",
			type: "amount",
			icon: icon1,
		},
		{
			name: "total Notification",
			number: notifications?.paginate?.total
				? numberWithCommas(notifications?.paginate?.total)
				: 0,
			color: "linear-gradient(90deg, #F45F83 16.14%, #9E1A2A 101.45%)",
			link: "/notifications",
			icon: icon2,
		},
		{
			name: "total products",
			number: data?.main_data?.length,
			color: "linear-gradient(90.18deg, #3199B7 -52.19%, #144468 81.92%)",
			link: "/products",
			icon: icon3,
		},
		{
			name: "total expenses",
			number: wallet?.balance?.purchase
				? numberWithCommas(wallet?.balance?.purchase)
				: 0,
			color: "linear-gradient(90.18deg, #84C7DB -52.19%, #377FB6 81.92%)",
			link: "/transactions",
			icon: icon4,
		},
	];
	return <Dashboard usersArr={usersArr} />;
};

export default MainDashboard;
