import React, { useContext } from "react";
import Dashboard from "../Components/Dashboard";
import { GlobalState } from "../Data/Context";
import icon1 from "../Assets/Group (4).png";
import icon2 from "../Assets/Hands Give.png";
import icon3 from "../Assets/Group (3).png";
import icon4 from "../Assets/Group (5).png";

const MainDashboard = () => {
	const { wallet, users, numberWithCommas } = useContext(GlobalState);
	let usersArr = [
		{
			name: "total users",
			number: users?.paginate?.total
				? numberWithCommas(Number(users?.paginate?.total).toFixed())
				: 0,
			color: "linear-gradient(90deg, #DE0DE2 16.14%, #0E102D 101.45%)",
			link: "/users",
			icon: icon1,
		},
		{
			name: "wallet balance",
			number: wallet?.balance?.available
				? numberWithCommas(Number(wallet?.balance?.available).toFixed(2))
				: 0,
			color: "linear-gradient(90deg, #F45F83 16.14%, #9E1A2A 101.45%)",
			link: "/wallets",
			type: "amount",
			icon: icon2,
		},
		{
			name: "total sales",
			number: wallet?.balance?.commissonTotal
				? numberWithCommas(Number(wallet?.balance?.commissonTotal).toFixed(2))
				: 0,
			color: "linear-gradient(90.18deg, #3199B7 -52.19%, #144468 81.92%)",
			link: "/transactions",
			icon: icon3,
		},
		{
			name: "total expenses",
			number: wallet?.balance?.purchase
				? numberWithCommas(Number(wallet?.balance?.purchase).toFixed(2))
				: 0,
			color: "linear-gradient(90.18deg, #84C7DB -52.19%, #377FB6 81.92%)",
			link: "/transactions",
			icon: icon4,
		},
	];

	return <Dashboard usersArr={usersArr} />;
};

export default MainDashboard;
