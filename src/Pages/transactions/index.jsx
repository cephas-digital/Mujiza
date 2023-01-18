import React from "react";
import { Container } from "reactstrap";
import TransactionsFolder, { TopFolder } from "../../Components/Transactions";

const MainTransactions = () => {
	return (
		<div className="bg-white">
			<Container>
				<TopFolder />
				<TransactionsFolder />
			</Container>
		</div>
	);
};

export default MainTransactions;
