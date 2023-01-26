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

const TransactionsFolder = ({ active = 0 }) => {
	const { general, getServicesHistory, getReload, auth, getDataHistory } =
		useContext(GlobalState);

	let [loading, setLoading] = useState(false),
		[loading2, setLoading2] = useState(false),
		{ page } = useParams(),
		[search, setSearch] = useState(""),
		[search2, setSearch2] = useState(""),
		[state, setState] = useState(null),
		[state2, setState2] = useState(null);

	useEffect(() => {
		if (search2) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search2) return;

				await getDataHistory(
					{
						search: search2,
					},
					"all"
				);
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search2]);

	useEffect(() => {
		if (search) {
			document.getElementById("Search").addEventListener("search", () => {
				getReload();
			});
			let handleSubmit = async () => {
				if (!search) return;

				await getServicesHistory("all", {
					search,
				});
			};
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	useEffect(() => {
		if (general.isFound) {
			setState(general.mainSearch);
		} else setState(general.transactions);
		if (general?.my_isFound) setState2(general?.my_mainSearch);
		else setState2(general?.my_transactions);
	}, [
		general.transactions,
		general.isFound,
		general.mainSearch,
		general?.my_transactions,
		general.my_isFound,
		general.my_mainSearch,
	]);

	useEffect(() => {
		getReload();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let handleLoadMore = async () => {
		setLoading(true);

		if (search) {
			await getServicesHistory("all", {
				limit: Number(general?.paginate?.nextPage * general?.paginate?.limit),
				search,
			});
		} else {
			await getServicesHistory("all", {
				limit: Number(general?.paginate?.nextPage * general?.paginate?.limit),
			});
		}
		setLoading(false);
	};

	let handleLoadMore2 = async () => {
		setLoading2(true);
		if (search2) {
			await getDataHistory(
				{
					limit: Number(
						general?.my_search_paginate?.nextPage *
							general?.my_search_paginate?.limit
					),
					search: search2,
				},
				"all"
			);
		} else
			await getDataHistory(
				{
					limit: Number(general?.paginate?.nextPage * general?.paginate?.limit),
				},
				"all"
			);

		setLoading2(false);
	};
	if (!state) return <></>;

	if (auth?.user?.privilege === "agent") {
		if (!state2) return <></>;
	}

	return (
		<>
			{page !== "dashboard" && (
				<>
					<div className="w-50">
						<input
							type="search"
							name="search"
							id="Search"
							className="form-control w-100 py-3 borderColor2"
							placeholder="Type here to search"
							value={active === 1 ? search2 : search}
							onChange={e =>
								active === 1
									? setSearch2(e.target.value)
									: setSearch(e.target.value)
							}
						/>
					</div>
				</>
			)}
			<TransactionsData
				state={
					active === 1
						? page !== "dashboard"
							? state2
							: state2?.slice(0, 10)
						: active === 0
						? page !== "dashboard"
							? state
							: state?.slice(0, 10)
						: null
				}
			/>

			<>
				{page !== "dashboard" && (
					<>
						<BottomTab
							state={active === 1 ? state2 : state}
							paginate={
								active === 1
									? search
										? general?.my_search_paginate
										: general?.my_paginate
									: active === 0
									? search
										? general?.search_paginate
										: general?.paginate
									: null
							}
						/>
						<LoadMore
							next={
								active === 1
									? search
										? general?.my_search_paginate?.next
										: general?.my_paginate?.next
									: active === 0
									? search
										? general?.search_paginate?.next
										: general?.paginate?.next
									: null
							}
							handleLoadMore={active === 1 ? handleLoadMore2 : handleLoadMore}
							loading={active === 1 ? loading2 : loading}
						/>
					</>
				)}
			</>
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
										data?.main_data?.length > 0
											? data?.main_data?.find(
													list =>
														list?.network?.toLowerCase() ===
															it?.properties?.network?.toLowerCase() &&
														Number(list?.planId) ===
															Number(it?.properties?.planId)
											  )?.allowance
											: ""
								  }, ${
										data?.main_data?.length > 0
											? data?.main_data?.find(
													list =>
														list?.network?.toLowerCase() ===
															it?.properties?.network?.toLowerCase() &&
														Number(list?.planId) ===
															Number(it?.properties?.planId)
											  )?.validity
											: ""
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

export const TopFolder = ({ active = 0 }) => {
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
	let usersArr2 = [
		{
			icon: icon1,
			name: "Total Transactions",
			number: wallet?.balance?.transactions?.agent?.total
				? numberWithCommas(wallet?.balance?.transactions?.agent?.total)
				: 0,
			color: "linear-gradient(90.18deg, #84C7DB -52.19%, #377FB6 81.92%)",
		},
		{
			icon: icon2,
			name: "Today's transactions",
			number: wallet?.balance?.transactions?.agent?.day
				? numberWithCommas(wallet?.balance?.transactions?.agent?.day)
				: 0,
			color:
				"linear-gradient(90deg, rgba(228, 51, 105, 0.7) 16.14%, rgba(194, 14, 25, 0.7) 101.45%)",
		},
		{
			icon: icon3,
			name: `${moment().format("MMMM")}'s transactions`,
			number: wallet?.balance?.transactions?.agent?.month
				? numberWithCommas(wallet?.balance?.transactions?.agent?.month)
				: 0,
			color:
				"linear-gradient(96.86deg, rgba(83, 242, 147, 0.8) 18.88%, rgba(158, 255, 0, 0.8) 125.77%)",
		},
	];

	return <ThreeBoxBar list={active === 1 ? usersArr2 : usersArr} />;
};
