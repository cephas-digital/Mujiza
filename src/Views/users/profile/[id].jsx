import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { GlobalState } from "../../../Data/Context";
import user from "../../../Assets/avatar3.png";

const UserProfile = () => {
	const { users, numberWithCommas, setStateName } = useContext(GlobalState),
		[state, setState] = useState(null),
		params = useParams();

	useEffect(() => {
		setStateName("user profile");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		users?.users?.map(item => item?._id === params?.step && setState(item));
	}, [users?.users, params?.step]);

	if (!state) return;

	return (
		<div className="py-4 bg-white aboutScreen">
			<Container className="py-5">
				<div className="px-md-4 px-2 mb-5 col-lg-10">
					<div className="row mx-0 g-3 g-md-4">
						<div className="col-md order-2 order-md-1">
							<p>
								Contact:{" "}
								<strong>
									<a
										className="text-dark text-decoration-none"
										href={`tel:${state?.telephone}`}>
										{state?.telephone}
									</a>
								</strong>{" "}
							</p>
							<p>
								Email:{" "}
								<strong>
									<a
										className="text-dark text-decoration-none"
										href={`mailto:${state?.email}`}>
										{state?.email}
									</a>
								</strong>{" "}
							</p>
							<p>
								Joined since{" "}
								<strong>
									{moment(state?.createdAt).format("Do, MMMM YYYY")}
								</strong>{" "}
							</p>
						</div>
						<div className="col-md order-3 order-md-2">
							<p className="text-capitalize">
								Type: <strong>{state?.privilege}</strong>{" "}
							</p>
							<p>
								Wallet ID: <strong>{state?.wallet?.wallet_id}</strong>{" "}
							</p>
							<p>
								DOB:{" "}
								<strong>
									{state?.date_of_birth
										? moment(state?.date_of_birth).format("Do, MMMM YYYY")
										: ""}
								</strong>{" "}
							</p>
						</div>
						<div className="col-md order-1 order-md-3">
							<img
								src={state?.avatar?.url ? state?.avatar?.url : user}
								alt={`img`}
								style={{
									height: "10rem",
									width: "10rem",
									objectFit: "cover",
									objectPosition: "center 15%",
								}}
								className="rounded-circle img-fluid mx-auto d-block"
							/>
							<div className="my-1">
								<h5 className="Lexend text-center">
									{state?.firstName} {state?.lastName}
								</h5>
							</div>
						</div>
					</div>
					<div
						className="rounded20 text-white p-4 my-3"
						style={{
							background: `linear-gradient(90.18deg, #3199B7 -52.19%, #144468 81.92%)`,
							minHeight: "179px",
						}}>
						<h4 className="text-uppercase mb-3 Lexend">About me</h4>
						<p>{state?.bio}</p>
					</div>
					<div className="row mx-0 g-3 g-md-5">
						<div className="col-6 col-md p-2 order-1">
							<button className="btn btn-outline-primary1 w-100 h-100 text-capitalize py-3 py-md-5 rounded20">
								<span className="d-block">Commissions</span>
								<span>NGN {numberWithCommas(state?.wallet?.commission)}</span>
							</button>
						</div>
						<div className="col-6 col-md p-2 order-3 order-md-2">
							<button className="btn btn-outline-primary1 w-100 h-100 text-capitalize py-3 py-md-5 rounded20">
								<span className="d-block">Wallet</span>
								<span>NGN {numberWithCommas(state?.wallet?.available)}</span>
							</button>
						</div>
						<div className="col-6 col-md p-2 order-2 order-md-3">
							<button className="btn btn-outline-primary1 w-100 h-100 text-capitalize py-3 py-md-5 rounded20">
								<span className="d-block">Bonus</span>
								<span>NGN {numberWithCommas(state?.wallet?.bonus)}</span>
							</button>
						</div>
					</div>
				</div>
			</Container>{" "}
		</div>
	);
};

export default UserProfile;
