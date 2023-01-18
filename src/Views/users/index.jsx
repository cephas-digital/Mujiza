import React, { useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { ThreeBoxBar, UserListOne } from "../../Components/Users";
import icon1 from "../../Assets/Analythics.png";
import icon2 from "../../Assets/Сoding.png";
import icon3 from "../../Assets/Money.png";
import { GlobalState } from "../../Data/Context";

const UsersMain = () => {
	let { setStateName, users, numberWithCommas } = useContext(GlobalState);
	useEffect(() => {
		setStateName("users");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let usersArr = [
		{
			icon: icon1,
			name: "total users",
			number: users?.paginate?.total
				? numberWithCommas(users?.paginate?.total)
				: 0,
			color: "linear-gradient(90.18deg, #84C7DB -52.19%, #377FB6 81.92%)",
		},
		{
			icon: icon2,
			name: "total referrals",
			number: 0,
			color: "linear-gradient(90deg, #D88ADA 16.14%, #CA64FB 101.45%)",
		},
		{
			icon: icon3,
			name: "wallet balance",
			number: users?.wallet ? numberWithCommas(users?.wallet) : 0,
			color: "linear-gradient(96.86deg, #F4EA75 18.88%, #F7BA5E 125.77%)",
			link: "/users/agents",
		},
	];
	return (
		<div className="bg-white">
			<Container>
				<ThreeBoxBar list={usersArr} />
				<UserListOne />
			</Container>
		</div>
	);
};

export default UsersMain;
