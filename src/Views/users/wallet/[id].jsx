import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../Data/Context";
import { Container } from "reactstrap";
import { EmptyComponent } from "../../../Utils";
import moment from "moment";

const UserWallet = () => {
	const { users, setStateName } = useContext(GlobalState),
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
				<WalletHistoryList state={state?.walletHistory} />
			</Container>
		</div>
	);
};

export default UserWallet;

export const WalletHistoryList = ({ state }) => {
	const { numberWithCommas } = useContext(GlobalState);
	return (
		<>
			<div className="row mx-0 my-2 py-3 bland">
				<div className="col my-auto text-uppercase fw-bold Lexend d-none d-md-flex fontReduce textTrunc">
					ID
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend fontReduce textTrunc">
					description
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend fontReduce textTrunc">
					amount
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend fontReduce textTrunc">
					balance
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend fontReduce textTrunc">
					previous amount
				</div>
				<div className="col my-auto text-uppercase fw-bold Lexend d-none d-md-flex fontReduce textTrunc">
					date
				</div>
			</div>
			{state?.length === 0 ? (
				<EmptyComponent subtitle={"User wallet history is empty"} />
			) : (
				state?.map((it, i) => (
					<div key={i} className="row mx-0 my-2 py-2 bland2">
						<div className="col my-auto text-capitalize d-none d-md-flex fontReduce2 textTrunc">
							{it?.item_id}
						</div>
						<div className="col my-auto text-capitalize textTrunc textTrunc2 fontReduce2">
							{it?.description}
						</div>
						<div className="col my-auto fontReduce2 textTrunc">
							NGN {it?.amount ? numberWithCommas(it?.amount) : 0}
						</div>
						<div className="col my-auto fontReduce2 textTrunc">
							NGN {it?.balance ? numberWithCommas(it?.balance) : 0}
						</div>
						<div className="col my-auto fontReduce2 textTrunc">
							NGN {it?.prevBalance ? numberWithCommas(it?.prevBalance) : 0}
						</div>
						<div className="col my-auto d-none d-md-flex fontReduce2 textTrunc">
							{moment(it?.createdAt).format("L")}
						</div>
					</div>
				))
			)}
		</>
	);
};
