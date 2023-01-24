import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../Data/Context";
import { Container } from "reactstrap";
import { BonusCommission } from "../../Components/Wallets";
import moment from "moment";
import LoadMore, { BottomTab } from "../../Components/LoadMore";

const Commissions = () => {
	let { setStateName, auth } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Transactions");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [active, setActive] = useState(0);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-3 py-md-5">
				<h5 className="Lexend">Commission History</h5>
				{auth?.user?.privilege === "agent" && (
					<div className="btn-group w-100 py-3">
						<button
							className={`btn py-3 text-capitalize fw-bold ${
								active === 0 ? "border-bottom textColor" : ""
							} rounded-0`}
							onClick={() => setActive(0)}>
							wallet commission
						</button>
						<button
							className={`btn py-3 text-capitalize fw-bold ${
								active === 1 ? "border-bottom textColor" : ""
							} rounded-0`}
							onClick={() => setActive(1)}>
							data commission
						</button>
					</div>
				)}
				{active === 1 ? <DataCommission /> : <BonusCommission />}{" "}
			</Container>{" "}
		</div>
	);
};

export default Commissions;

export const DataCommission = () => {
	const { general, numberWithCommas, getWalletHistory } =
		useContext(GlobalState);

	let [state, setState] = useState(null);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getWalletHistory({
			limit: Number(
				general?.paginate_data?.nextPage * general?.paginate_data?.limit
			),
		});
		setLoading(false);
	};

	useEffect(() => {
		setState(general?.data);
	}, [general?.data]);

	if (!state) return;

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc fontReduce fw-bold Lexend">S/N</div>
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
					date
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
					Description
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Amount</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Sold at</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Profit</div>
			</div>
			<div className="bland2 row mx-0">
				{state?.map((item, index) => (
					<div key={index} className="row mx-0 py-3 px-0">
						<div className="col textTrunc fontReduce2 my-auto">{index + 1}</div>
						<div className="col textTrunc fontReduce2 my-auto d-none d-md-flex">
							{moment(item?.createdAt).format("L")}
						</div>
						<div className="col textTrunc fontReduce2 my-auto textTrunc textTrunc3 d-none d-md-flex">
							{item?.description}
						</div>
						<div className="col textTrunc fontReduce2 my-auto">
							NGN {numberWithCommas(item?.amount - item?.profit)}
						</div>
						<div className="col textTrunc fontReduce2 my-auto">
							NGN {numberWithCommas(item?.amount)}
						</div>
						<div className="col textTrunc fontReduce2 my-auto">
							NGN {numberWithCommas(item?.profit)}
						</div>
					</div>
				))}
			</div>
			<BottomTab state={state} paginate={general?.paginate_data} />
			<LoadMore
				next={general?.paginate_data?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};
