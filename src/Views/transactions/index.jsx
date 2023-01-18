import React from "react";
import { Container } from "reactstrap";
import TransactionsFolder, { TopFolder } from "../../Components/Transactions";
// import { Link } from "react-router-dom";

const MainTransactions = () => {
	return (
		<div className="bg-white">
			<Container>
				<TopFolder />
				{/* <Link
				to={`/transactions/add`}
				style={{ borderRadius: "30px" }}
				className="btn-primary1 text-capitalize py-3 px-4 px-lg-5 my-4 btn">
				Add new transaction
			</Link> */}
				<TransactionsFolder />
			</Container>
		</div>
	);
};

export default MainTransactions;
