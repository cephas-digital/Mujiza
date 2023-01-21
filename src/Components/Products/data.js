import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { ModalComponents } from "../../Components";
import { Buttons } from "../../Utils";
import moment from "moment";
import { GlobalState } from "../../Data/Context";
import LoadMore, { BottomTab } from "../LoadMore";

const Data = () => {
	// let dataSortTab = [
	// 	{
	// 		name: "data history",
	// 		type: "button",
	// 		link: `detail`,
	// 	},
	// 	{ name: "mtn" },
	// 	{ name: "glo" },
	// 	{ name: "airtel" },
	// 	{ name: "9mobile" },
	// 	// { name: "vodafone" },
	// 	// { name: "multilinks" },
	// ];
	// let dataTab = [
	// 	{ name: "buy data", type: "button", link: "transfer" },
	// 	// { name: "data pin", type: "button", link: "pin" },
	// 	dataSortTab[0],
	// ];

	let { setStateName, auth } = useContext(GlobalState),
		[active, setActive] = useState(0),
		btnTab = ["data history", "data list"];
	useEffect(() => {
		setStateName(btnTab[active]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let [isNew, setIsNew] = useState(false),
		[isPin, setIsPin] = useState(false),
		[isEdit, setIsEdit] = useState(false),
		[isTransfer, setIsTransfer] = useState(false),
		toggleNew = () => {
			setIsNew(!isNew);
		},
		togglePin = () => {
			setIsPin(!isPin);
		},
		toggleTransfer = () => {
			setIsTransfer(!isTransfer);
		};

	useEffect(() => {
		if (isEdit) {
			setIsNew(true);
		}
	}, [isEdit]);
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				{/* <div className="row mx-0 g-2 g-md-3">
					{dataTab?.map((it, i) => (
						<div className="col-6 col-md-4 p-1 p-md-3" key={i}>
							<button
								style={{ borderRadius: "30px" }}
								key={i}
								onClick={() => {
									if (it?.type === "button") {
										if (it?.link === "pin") togglePin();
										if (it?.link === "transfer") toggleTransfer();
										if (it?.link === "detail") setActive(1);
									}
								}}
								className="btn btn-outline-primary1 py-2 py-md-3 text-capitalize w-100 textTrunc">
								<span className="textTrunc">{it?.name}</span>
							</button>
						</div>
					))}
				</div> */}
				<div className="row mx-0">
					<div className="col d-flex">
						<Buttons
							title={"buy data"}
							css="btn-primary1 text-capitalize p-3 px-md-5"
							width={"w-50 w50"}
							onClick={toggleTransfer}
							style={{ borderRadius: "30px" }}
						/>
					</div>
					{auth?.user?.privilege === "agent" && (
						<div className="col d-flex justify-content-end">
							<Buttons
								title={"add new data"}
								css="btn-outline-primary1 text-capitalize p-3 px-md-5"
								width={"w-50 w50"}
								onClick={toggleNew}
								style={{ borderRadius: "30px" }}
							/>
						</div>
					)}
				</div>
				<div className="btn-group w-100 py-3">
					{btnTab?.map((item, i) => (
						<button
							key={i}
							className={`btn py-3 text-capitalize fw-bold ${
								i === active ? "border-bottom textColor" : ""
							} rounded-0`}
							onClick={() => setActive(i)}>
							{item}
						</button>
					))}
					{auth?.user?.privilege === "agent" && (
						<button
							className={`btn py-3 text-capitalize fw-bold ${
								active === 2 ? "border-bottom textColor" : ""
							} rounded-0`}
							onClick={() => setActive(2)}>
							Main Data List
						</button>
					)}
				</div>
				<h4 className="text-capitalize my-3 Lexend">
					{active === 0 ? `data history` : "Data list"}
				</h4>
				{active === 2 ? (
					<MainDataList />
				) : active === 1 ? (
					<DataList setIsEdit={setIsEdit} />
				) : (
					<TransferHistory active={active} />
				)}
			</Container>
			<MakePin isOpen={isPin} back={togglePin} />
			<MakeNew
				isOpen={isNew}
				back={toggleNew}
				datum={isEdit}
				setIsEdit={setIsEdit}
			/>
			<MakeTransfer isOpen={isTransfer} back={toggleTransfer} />
		</div>
	);
};

export default Data;

const MakeTransfer = ({ isOpen, back }) => {
	const { data, general, buyServices } = useContext(GlobalState);
	let [state, setState] = useState(null),
		init = { network: "", planId: "", phone: "" },
		[buy, setBuy] = useState(init),
		[loading, setLoading] = useState(false),
		[type, setType] = useState([]),
		[submit, setSubmit] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setBuy({ ...buy, [name]: value });
			};
	useEffect(() => {
		if (buy?.network) {
			let newOne = data?.main_data?.filter(
				item => item?.network?.toLowerCase() === buy?.network?.toLowerCase()
			);
			setType(newOne);
		}
	}, [buy?.network, data?.main_data]);

	useEffect(() => {
		setState(data?.main_data);
	}, [data?.main_data]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!buy?.phone) return;
		setLoading(true);
		await buyServices("data", buy);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && data?.isAdded) {
			back();
			setState(init);
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, data?.isAdded]);

	if (!state) return <></>;
	return (
		<>
			<ModalComponents title="buy data" isOpen={isOpen} back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="Network">Network</label>
							<select
								name="network"
								id="network"
								value={buy?.network}
								onChange={textChange("network")}
								className="form-control form-select py-3 rounded20">
								<option value="">Select type</option>
								{general?.networks?.map((item, i) => (
									<option value={item} key={i}>
										{item}
									</option>
								))}
							</select>
						</div>
						{buy?.network && (
							<div className="mb-4">
								<label htmlFor="value">Value</label>
								<select
									name="value"
									id="value"
									value={buy?.planId}
									onChange={textChange("planId")}
									className="form-control form-select py-3 rounded20">
									<option value="">Select value</option>
									{type?.map((item, i) => (
										<option value={item?.planId} key={i}>
											{
												data?.data_direct?.find(
													list =>
														list?.network?.toLowerCase() ===
															item?.network?.toLowerCase() &&
														Number(list?.planId) === Number(item?.planId)
												)?.allowance
											}{" "}
											{
												data?.data_direct?.find(
													list =>
														list?.network?.toLowerCase() ===
															item?.network?.toLowerCase() &&
														Number(list?.planId) === Number(item?.planId)
												)?.validity
											}
										</option>
									))}
								</select>
							</div>
						)}
						<div className="mb-4">
							<label htmlFor="telephone">Phone number</label>
							<input
								type={"tel"}
								placeholder="08012345678"
								className="form-control py-3"
								value={buy?.phone}
								onChange={textChange("phone")}
							/>
						</div>
						<Buttons
							title={"buy"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto"
							width={"w-50 w50"}
							onClick={handleSubmit}
							loading={loading}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

const MakePin = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents title="data pin" isOpen={isOpen} back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="Newtwork">Network</label>
							<select
								name="network"
								id="network"
								className="form-control form-select py-3 rounded20">
								<option value="mtn">MTN</option>
							</select>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Value</label>
							<input
								type={"number"}
								placeholder="500"
								className="form-control py-3"
							/>
						</div>
						<Buttons
							title={"get pin"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
							width={"w-50 w50"}
							onClick={back}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

const MakeNew = ({ isOpen, back, datum, setIsEdit }) => {
	const { general, data, dataServices } = useContext(GlobalState);
	let [type, setType] = useState([]),
		init = { network: "", planId: "", price: "", provider_price: "" },
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[state, setState] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			};
	useEffect(() => {
		if (datum) setState(datum);
	}, [datum]);

	useEffect(() => {
		if (state?.network) {
			let newOne = data?.data_direct?.filter(
				item => item?.network?.toLowerCase() === state?.network?.toLowerCase()
			);
			setType(newOne);
		}
	}, [state?.network, data?.data_direct]);
	useEffect(() => {
		if (state?.planId) {
			let newOne = type?.find(
				item => Number(item?.planId) === Number(state?.planId)
			);
			// console.log({newOne, type});
			setState({ ...state, provider_price: newOne?.price });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.planId, type]);
	// console.log({ state });

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.price) return;
		setLoading(true);
		await dataServices(datum ? "put" : "post", state);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && data?.isAddedMain) {
			setIsEdit(false);
			back();
			setState(init);
			setSubmit(false);
		}
		if (submit && data?.isUpdatedMain) {
			setIsEdit(false);
			back();
			setState(init);
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, data?.isAddedMain, data?.isUpdatedMain]);

	return (
		<>
			<ModalComponents
				title={`${datum ? "edit" : "new"} data type`}
				isOpen={isOpen}
				back={back}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="Network">Network</label>
							<select
								name="network"
								id="network"
								value={state?.network}
								readOnly={datum}
								onChange={textChange("network")}
								className="form-control form-select py-3 rounded20">
								<option value="">Select type</option>
								{general?.networks?.map((item, i) => (
									<option value={item} key={i}>
										{item}
									</option>
								))}
							</select>
						</div>
						{state?.network && (
							<div className="mb-4">
								<label htmlFor="Type">Type</label>
								<select
									name="network"
									id="network"
									readOnly={datum}
									value={state?.planId}
									onChange={textChange("planId")}
									className="form-control form-select py-3 rounded20">
									<option value="">Select type</option>
									{type?.map((item, i) => (
										<option value={item?.planId} key={i}>
											{
												data?.data_direct?.find(
													list =>
														list?.network?.toLowerCase() ===
															item?.network?.toLowerCase() &&
														Number(list?.planId) === Number(item?.planId)
												)?.allowance
											}{" "}
											{item?.validity}
										</option>
									))}
								</select>
							</div>
						)}
						{state?.planId && (
							<div className="mb-4">
								<label htmlFor="value">Provider price</label>
								<input
									type={"number"}
									readOnly
									value={state?.provider_price}
									onChange={textChange("provider_price")}
									placeholder="500"
									className="form-control py-3"
								/>
							</div>
						)}
						<div className="mb-4">
							<label htmlFor="value">Price</label>
							<input
								type={"number"}
								placeholder="500"
								value={state?.price}
								onChange={textChange("price")}
								className="form-control py-3"
							/>
						</div>
						<Buttons
							title={datum ? "update" : "add"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto"
							width={"w-50 w50"}
							onClick={handleSubmit}
							loading={loading}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</>
	);
};

const TransferHistory = () => {
	const { data, numberWithCommas, getServicesHistory } =
		useContext(GlobalState);
	let [state, setState] = useState(null);

	useEffect(() => {
		setState(data?.data);
	}, [data?.data]);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getServicesHistory("data", {
			limit: Number(data?.paginate?.nextPage * data?.paginate?.limit),
		});
		setLoading(false);
	};

	if (!state) return;

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc fontReduce fw-bold Lexend">ID</div>
				<div className="col textTrunc d-none d-md-flex fontReduce fw-bold Lexend">
					Date
				</div>
				<div className="col textTrunc d-none d-md-flex fontReduce fw-bold Lexend">
					reference
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Phone</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Network</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Amount</div>
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
					Validity
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Allowance</div>
			</div>
			<div className="bland2 row mx-0">
				{state?.map((item, index) => (
					<div key={index} className="row mx-0 py-3 px-0">
						<div className="col textTrunc my-auto">{item?.item_id}</div>
						<div className="col textTrunc my-auto  d-none d-md-flex">
							{moment(item?.createdAt).format("L")}
						</div>
						<div className="col textTrunc my-auto  d-none d-md-flex">
							{item?.reference}
						</div>
						<div className="col textTrunc my-auto">
							{item?.properties?.phone}
						</div>
						<div className="col textTrunc my-auto">
							{item?.properties?.network}
						</div>
						<div className="col textTrunc my-auto">
							{numberWithCommas(item?.properties?.amount)}
						</div>
						<div className="col textTrunc my-auto fontReduce2 d-none d-md-flex">
							{
								data?.data_direct?.find(
									list =>
										list?.network?.toLowerCase() ===
											item?.properties?.network?.toLowerCase() &&
										Number(list?.planId) === Number(item?.properties?.planId)
								)?.validity
							}
						</div>
						<div className="col textTrunc my-auto fontReduce2 textTrunc2">
							{
								data?.data_direct?.find(
									list =>
										list?.network?.toLowerCase() ===
											item?.properties?.network?.toLowerCase() &&
										Number(list?.planId) === Number(item?.properties?.planId)
								)?.allowance
							}
						</div>
					</div>
				))}
			</div>
			<BottomTab state={state} paginate={data?.paginate} />
			<LoadMore
				next={data?.paginate?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};

const DataList = ({ setIsEdit }) => {
	const { data, numberWithCommas, auth } = useContext(GlobalState);
	let [state, setState] = useState(null);

	useEffect(() => {
		setState(data?.main_data);
	}, [data?.main_data]);

	if (!state) return;

	return (
		<div className="pb-3 pb-md-5 my-3 py-md-5">
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc  d-none d-md-flex fontReduce fw-bold Lexend">
					s/n
				</div>
				{auth?.user?.privilege === "agent" && (
					<div className="col textTrunc d-none d-md-flex fontReduce fw-bold Lexend">
						Date
					</div>
				)}
				<div className="col textTrunc fontReduce fw-bold Lexend">Network</div>
				{auth?.user?.privilege === "agent" && (
					<div className="col textTrunc fontReduce fw-bold Lexend">Amount</div>
				)}
				<div className="col textTrunc fontReduce fw-bold Lexend">Price</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Validity</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Allowance</div>
				{auth?.user?.privilege === "agent" && (
					<div className="col textTrunc fontReduce fw-bold Lexend">Actions</div>
				)}
			</div>
			<div className="bland2 row mx-0">
				{state?.map((item, index) => (
					<div key={index} className="row mx-0 py-3 px-0">
						<div className="col textTrunc my-auto   d-none d-md-flex fontReduce2">
							{index + 1}
						</div>
						{auth?.user?.privilege === "agent" && (
							<div className="col textTrunc my-auto  d-none d-md-flex fontReduce2">
								{moment(item?.createdAt).format("L")}
							</div>
						)}
						<div className="col textTrunc my-auto fontReduce2">
							{item?.network}
						</div>
						{auth?.user?.privilege === "agent" && (
							<div className="col textTrunc my-auto fontReduce2">
								{data?.data_direct?.length > 0
									? numberWithCommas(
											data?.data_direct?.find(
												list =>
													list?.network?.toLowerCase() ===
														item?.network?.toLowerCase() &&
													Number(list?.planId) === Number(item?.planId)
											)?.price
									  )
									: null}
							</div>
						)}
						<div className="col textTrunc my-auto fontReduce2">
							{numberWithCommas(Number(item?.price).toFixed(2))}
						</div>
						<div className="col textTrunc my-auto fontReduce2">
							{
								data?.data_direct?.find(
									list =>
										list?.network?.toLowerCase() ===
											item?.network?.toLowerCase() &&
										Number(list?.planId) === Number(item?.planId)
								)?.validity
							}
						</div>
						<div className="col textTrunc my-auto fontReduce2 textTrunc2">
							{
								data?.data_direct?.find(
									list =>
										list?.network?.toLowerCase() ===
											item?.network?.toLowerCase() &&
										Number(list?.planId) === Number(item?.planId)
								)?.allowance
							}
						</div>
						{auth?.user?.privilege === "agent" && (
							<div
								onClick={() => setIsEdit(item)}
								className="col textTrunc my-auto myCursor fontReduce2">
								edit
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

const MainDataList = () => {
	const { data, numberWithCommas } = useContext(GlobalState);
	let [state, setState] = useState(null);

	useEffect(() => {
		setState(data?.data_direct);
	}, [data?.data_direct]);

	if (!state) return;

	return (
		<div className="pb-3 pb-md-5 my-3 py-md-5">
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc  d-none d-md-flex fontReduce fw-bold Lexend">
					s/n
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Network</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Price</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Validity</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Allowance</div>
			</div>
			<div className="bland2 row mx-0">
				{state?.map((item, index) => (
					<div key={index} className="row mx-0 py-3 px-0">
						<div className="col textTrunc my-auto   d-none d-md-flex fontReduce2">
							{index + 1}
						</div>
						<div className="col textTrunc my-auto fontReduce2">
							{item?.network}
						</div>
						<div className="col textTrunc my-auto fontReduce2">
							{numberWithCommas(Number(item?.price).toFixed(2))}
						</div>
						<div className="col textTrunc my-auto fontReduce2">
							{item?.validity}
						</div>
						<div className="col textTrunc my-auto fontReduce2 textTrunc2">
							{item?.allowance}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
