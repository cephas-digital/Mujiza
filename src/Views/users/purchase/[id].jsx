import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { GlobalState } from "../../../Data/Context";
import { TransactionsData } from "../../../Components/Transactions";

const UserPurchase = () => {
	const { users, setStateName } = useContext(GlobalState),
		[state, setState] = useState(null),
		params = useParams();

	useEffect(() => {
		setStateName("user purchase history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		users?.users?.map(item => item?._id === params?.step && setState(item));
	}, [users?.users, params?.step]);

	if (!state) return;
	return (
		<div className="py-4 bg-white aboutScreen">
			<Container className="py-5">
				<TransactionsData state={state?.purchaseHistory} />
			</Container>
		</div>
	);
};

export default UserPurchase;
