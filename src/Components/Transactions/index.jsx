import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import icon1 from "../../Assets/Fresh Folk Teamwork.png";
import icon2 from "../../Assets/Finance.png";
import icon3 from "../../Assets/Support.png";
import { ThreeBoxBar } from "../Users";
import { GlobalState } from "../../Data/Context";
import { EmptyComponent } from "../../Utils";
import LoadMore, { BottomTab } from "../LoadMore";
import { useParams } from "react-router-dom";

const TransactionsFolder = () => {
	const { general, getServicesHistory } = useContext(GlobalState);

	let [loading, setLoading] = useState(false),
		{ page } = useParams();

	let handleLoadMore = async () => {
		setLoading(true);

		await getServicesHistory("all", {
			limit: Number(general?.paginate?.nextPage * general?.paginate?.limit),
		});
		setLoading(false);
	};

	return (
		<>
			<TransactionsData
				state={
					page !== "dashboard"
						? general?.transactions
						: general?.transactions?.slice(0, 10)
				}
			/>
			;
			{page !== "dashboard" && (
				<>
					<BottomTab
						state={general?.transactions}
						paginate={general?.paginate}
					/>
					<LoadMore
						next={general?.paginate?.next}
						handleLoadMore={handleLoadMore}
						loading={loading}
					/>
				</>
			)}
		</>
	);
};

export const TransactionsData = ({ state }) => {
	const { data, numberWithCommas } = useContext(GlobalState);

	return (
		<div className="pb-5 my-5">
			<div className="row mx-0 my-2 py-3 bland">
				<div className="col my-auto text-uppercase fontReduce2 fw-bold Lexend d-none d-md-flex">
					ID
				</div>
				<div className="col my-auto text-uppercase fontReduce2 fw-bold Lexend">
					type
				</div>
				<div className="col my-auto text-uppercase fontReduce2 fw-bold Lexend">
					amount
				</div>
				<div className="col my-auto text-uppercase fontReduce2 fw-bold Lexend">
					usage
				</div>
				<div className="col my-auto text-uppercase fontReduce2 fw-bold Lexend">
					recipient
				</div>
				<div className="col my-auto text-uppercase fontReduce2 fw-bold Lexend d-none d-md-flex">
					date
				</div>
			</div>
			{state?.length === 0 ? (
				<EmptyComponent subtitle={"User purchase history is empty"} />
			) : (
				state?.map((it, i) => (
					<div key={i} className="row mx-0 my-2 py-2 bland2">
						<div className="col my-auto text-capitalize d-none d-md-flex fontReduce2 textTrunc">
							{it?.item_id}
						</div>
						<div className="col my-auto text-capitalize fontReduce2 textTrunc">
							{it?.type}
						</div>
						<div className="col my-auto fontReduce2 textTrunc">
							NGN{" "}
							{it?.properties?.amount
								? numberWithCommas(it?.properties?.amount)
								: 0}
						</div>
						<div className="col my-auto fontReduce2 textTrunc">
							{it?.type === "cables"
								? it?.properties?.packagename
								: it?.type === "airtime"
								? it?.properties?.network
								: it?.type === "electricity"
								? it?.properties?.disco
								: it?.type === "data"
								? `${
										data?.main_data?.find(
											list =>
												list?.network?.toLowerCase() ===
													it?.properties?.network?.toLowerCase() &&
												Number(list?.planId) === Number(it?.properties?.planId)
										)?.allowance
								  }, ${
										data?.main_data?.find(
											list =>
												list?.network?.toLowerCase() ===
													it?.properties?.network?.toLowerCase() &&
												Number(list?.planId) === Number(it?.properties?.planId)
										)?.validity
								  }`
								: ""}
						</div>
						<div className="col my-auto fontReduce2 textTrunc">
							{it?.type === "cables"
								? it?.properties?.smartCardNo
								: it?.type === "electricity"
								? it?.properties?.meterNo
								: it?.type === "airtime"
								? it?.properties?.phone
								: it?.type === "data"
								? it?.properties?.phone
								: ""}
						</div>
						<div className="col my-auto d-none d-md-flex textTrunc">
							{moment(it?.createdAt).format("L")}
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default TransactionsFolder;

export const TopFolder = () => {
	let { setStateName, wallet, numberWithCommas } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Transactions history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let usersArr = [
		{
			icon: icon1,
			name: "Total Transactions",
			number: wallet?.balance?.transactions?.total
				? numberWithCommas(wallet?.balance?.transactions?.total)
				: 0,
			color: "linear-gradient(90.18deg, #84C7DB -52.19%, #377FB6 81.92%)",
		},
		{
			icon: icon2,
			name: "Today's transactions",
			number: wallet?.balance?.transactions?.day
				? numberWithCommas(wallet?.balance?.transactions?.day)
				: 0,
			color:
				"linear-gradient(90deg, rgba(228, 51, 105, 0.7) 16.14%, rgba(194, 14, 25, 0.7) 101.45%)",
		},
		{
			icon: icon3,
			name: `${moment().format("MMMM")}'s transactions`,
			number: wallet?.balance?.transactions?.month
				? numberWithCommas(wallet?.balance?.transactions?.month)
				: 0,
			color:
				"linear-gradient(96.86deg, rgba(83, 242, 147, 0.8) 18.88%, rgba(158, 255, 0, 0.8) 125.77%)",
		},
	];

	return <ThreeBoxBar list={usersArr} />;
};
