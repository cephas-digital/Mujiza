import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../Data/Context";
import { Container } from "reactstrap";
import { EmptyComponent } from "../../../Utils";
import moment from "moment";

const UserWallet = () => {
	const { users, setStateName, numberWithCommas } = useContext(GlobalState),
		[state, setState] = useState(null),
		params = useParams();

	useEffect(() => {
		setStateName("user wallet history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		users?.users?.map(item => item?._id === params?.step && setState(item));
	}, [users?.users, params?.step]);

	if (!state) return;
	return (
		<div className="py-4 bg-white aboutScreen">
			<Container className="py-5">
				<div className="row mx-0 my-2 py-3 bland">
					<div className="col my-auto text-uppercase fw-bold Lexend d-none d-md-flex">
						ID
					</div>
					<div className="col my-auto text-uppercase fw-bold Lexend">
						description
					</div>
					<div className="col my-auto text-uppercase fw-bold Lexend">
						amount
					</div>
					<div className="col my-auto text-uppercase fw-bold Lexend">
						balance
					</div>
					<div className="col my-auto text-uppercase fw-bold Lexend">
						previous amount
					</div>
					<div className="col my-auto text-uppercase fw-bold Lexend d-none d-md-flex">
						date
					</div>
				</div>
				{state?.walletHistory?.length === 0 ? (
					<EmptyComponent subtitle={"User wallet history is empty"} />
				) : (
					state?.walletHistory?.map((it, i) => (
						<div key={i} className="row mx-0 my-2 py-2 bland2">
							<div className="col my-auto text-capitalize d-none d-md-flex">
								{it?.item_id}
							</div>
							<div className="col my-auto text-capitalize textTrunc textTrunc2">
								{it?.description}
							</div>
							<div className="col my-auto">
								NGN {it?.amount ? numberWithCommas(it?.amount) : 0}
							</div>
							<div className="col my-auto">
								NGN {it?.balance ? numberWithCommas(it?.balance) : 0}
							</div>
							<div className="col my-auto">
								NGN {it?.prevBalance ? numberWithCommas(it?.prevBalance) : 0}
							</div>
							<div className="col my-auto d-none d-md-flex">
								{moment(it?.createdAt).format("L")}
							</div>
						</div>
					))
				)}
			</Container>
		</div>
	);
};

export default UserWallet;
