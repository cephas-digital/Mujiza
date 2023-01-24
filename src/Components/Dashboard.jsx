import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../Data/Context";
import Calendar from "react-calendar";
import { Container } from "reactstrap";
import "react-calendar/dist/Calendar.css";
import { UserListOne } from "./Users";
// import Charts, { LineMixedCharts } from "./Charts";
import { useNavigate } from "react-router-dom";
import TransactionsFolder from "./Transactions";
import { productArr } from "./Products";

const Dashboard = ({ usersArr }) => {
	let { setStateName, auth } = useContext(GlobalState);
	useEffect(() => {
		setStateName("dashboard analysis");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<div className="row mx-0 w-100">
					<div className="col-md-8">
						<FourBoxBar list={usersArr} />
						<ProductList />
						{/* <div className="row mx-0 w-100">
							<div className="h25 col-md-6">
								<Charts
									state={[
										{ month: "Jan", sales: "2000", expenses: "4000" },
										{ month: "Feb", sales: "5000", expenses: "3000" },
										{ month: "Mar", sales: "5000", expenses: "3000" },
										{ month: "Apr", sales: "6000", expenses: "7000" },
										{ month: "May", sales: "9000", expenses: "2000" },
										{ month: "Jun", sales: "1000", expenses: "9000" },
										{ month: "Jul", sales: "8000", expenses: "2000" },
										{ month: "Aug", sales: "4000", expenses: "7000" },
										{ month: "Sep", sales: "2000", expenses: "6000" },
										{ month: "Oct", sales: "8000", expenses: "9000" },
										{ month: "Nov", sales: "5000", expenses: "3000" },
										{ month: "Dec", sales: "10000", expenses: "9500" },
									]}
									dKey={"sales"}
									dKey2={"expenses"}
									dColor="#53f293"
									dColor2="#20afe5"
									xaxis={"month"}
								/>
							</div>
							<div className="h25 col-md-6">
								<LineMixedCharts
									state={[
										{ month: "Jan", sales: "2000", expenses: "4000" },
										{ month: "Feb", sales: "5000", expenses: "3000" },
										{ month: "Mar", sales: "5000", expenses: "3000" },
										{ month: "Apr", sales: "6000", expenses: "7000" },
										{ month: "May", sales: "9000", expenses: "2000" },
										{ month: "Jun", sales: "1000", expenses: "9000" },
										{ month: "Jul", sales: "8000", expenses: "2000" },
										{ month: "Aug", sales: "4000", expenses: "7000" },
										{ month: "Sep", sales: "2000", expenses: "6000" },
										{ month: "Oct", sales: "8000", expenses: "9000" },
										{ month: "Nov", sales: "5000", expenses: "3000" },
										{ month: "Dec", sales: "10000", expenses: "9500" },
									]}
									dKey={"sales"}
									dKey2={"expenses"}
									dColor="#FEC430"
									dColor2="#009688"
									xaxis={"month"}
								/>
							</div>
						</div> */}
					</div>
					<div className="col-md-4 d-none d-md-flex flex-column">
						<CalenderComponent css="darkPurple rounded20 border-0 p-3 text-white w-100" />
					</div>
				</div>
				{auth?.user?.privilege === "agent" ? (
					<UserListOne />
				) : (
					<TransactionsFolder />
				)}
			</Container>
		</div>
	);
};

export default Dashboard;

export const CalenderComponent = ({ css }) => {
	return (
		<>
			<div className="d-flex w-100">
				<Calendar className={css} showWeekNumbers={true} calendarType="US" />
			</div>
		</>
	);
};

export const FourBoxBar = ({ list }) => {
	let navigate = useNavigate();
	return (
		<>
			<div className="row mx-0 g-2 g-md-4 mb-4 mb-md-5">
				{list?.map((item, index) => (
					<div className="col-6 dashHeight dashHeight2" key={index}>
						<div
							className="row mx-0 p-2 p-md-3 eachProduct rounded20 text-white h-100"
							onClick={() => (item?.link ? navigate(item?.link) : {})}
							style={{
								background: item?.color,
							}}>
							<div className="col-md my-auto d-flex">
								<img
									src={item?.icon}
									className="img-fluid mx-auto"
									alt="Icon"
								/>
							</div>
							<div className="col-md my-auto text-center">
								<p className="text2 text2Big m-0">{item?.number}</p>
								<h6 className="text-capitalize fontReduceBig">{item?.name}</h6>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export const ProductList = () => {
	let { auth } = useContext(GlobalState);
	let [state, setState] = useState([]),
		navigate = useNavigate();

	useEffect(() => {
		setState(productArr);
	}, [auth?.user]);
	return (
		<div className="py-3 py-md-4">
			<div className="row g-4 mx-0">
				{state?.map((item, i) => (
					<div className="col-4 px-2 p-md-3 text-center" key={i}>
						<div
							onClick={() =>
								navigate(
									item?.link?.includes("converter")
										? item?.link
										: `/products${item?.link}`
								)
							}
							className="shadow2 p-3 py-md-5 eachProduct rounded20 h-100 d-flex align-items-center justify-content-center">
							<div className="">
								<div className="mb-3">{item?.icon}</div>
								<h6 className="Lexend textTrunc textTrunc2 fontReduce2">
									{item?.name}
								</h6>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
