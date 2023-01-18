import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { GlobalState } from "../../../Data/Context";

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
						<div className="col">
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
						<div className="col">
							<p className="text-capitalize">
								Type: <strong>{state?.privilege}</strong>{" "}
							</p>
							<p>
								Wallet ID: <strong>{state?.wallet?.wallet_id}</strong>{" "}
							</p>
							<p>
								DOB:{" "}
								<strong>
									{moment(state?.date_of_birth).format("Do, MMMM YYYY")}
								</strong>{" "}
							</p>
						</div>
						<div className="col"></div>
					</div>
					<div className="bg-select rounded20 text-white p-4">
						<h4 className="text-uppercase mb-3">About me</h4>
						<p>{state?.bio}</p>
					</div>
					<div className="row mx-0 g-3 g-md-5">
						<div className="col p-2">
							<button className="btn btn-outline-primary1 w-100 h-100 text-capitalize py-3 py-md-5 rounded20">
								<span className="d-block">Commissions</span>
								<span>NGN {numberWithCommas(state?.wallet?.commission)}</span>
							</button>
						</div>
						<div className="col p-2">
							<button className="btn btn-outline-primary1 w-100 h-100 text-capitalize py-3 py-md-5 rounded20">
								<span className="d-block">Wallet</span>
								<span>NGN {numberWithCommas(state?.wallet?.available)}</span>
							</button>
						</div>
						<div className="col p-2">
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
