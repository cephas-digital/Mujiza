import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../Data/Context";
import { Container } from "reactstrap";
import { BonusCommission } from "../../Components/Wallets";

const Bonus = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Transactions");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3 py-md-5">
				<h5 className="Lexend">Bonus History</h5>
				<BonusCommission type="bonus" />{" "}
			</Container>{" "}
		</div>
	);
};

export default Bonus;
