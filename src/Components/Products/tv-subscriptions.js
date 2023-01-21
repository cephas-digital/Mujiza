import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { Buttons } from "../../Utils";
import moment from "moment";
import { ModalComponents } from "..";
import { GlobalState } from "../../Data/Context";
import { useValidation } from "../../Data/useFetch";
import LoadMore, { BottomTab } from "../LoadMore";

const TVSub = () => {
	let { setStateName, cables, numberWithCommas, buyServices } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("cable history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		init = {
			type: "",
			productsCode: "",
			packagename: "",
			amount: "",
			user: "",
			smartCardNo: "",
		},
		[state, setState] = useState(init),
		[newState, setNewState] = useState(null),
		[loading, setLoading] = useState(null),
		[submit, setSubmit] = useState(null),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		[type, setType] = useState([]),
		{ handleFetch } = useValidation("smartCardNo", state, setNewState),
		[active, setActive] = useState(0),
		btnTab = ["cable history", "cable list"];

	useEffect(() => {
		if (state?.smartCardNo?.length >= 10 && state?.type) handleFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.smartCardNo, state?.type]);

	useEffect(() => {
		if (state?.type) {
			if (state?.type?.toUpperCase() === "DSTV") {
				setType(cables?.cable_package?.dstv ? cables?.cable_package?.dstv : "");
			}
			if (state?.type?.toUpperCase() === "GOTV") {
				setType(cables?.cable_package?.gotv ? cables?.cable_package?.gotv : []);
			}
			if (state?.type?.toUpperCase() === "STARTIMES") {
				setType(
					cables?.cable_package?.startimes
						? cables?.cable_package?.startimes
						: []
				);
			}
		}
	}, [state?.type, cables?.cable_package]);

	useEffect(() => {
		if (newState) {
			console.log({ newState });
			setState({
				...state,
				user: newState?.data?.customerName,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newState]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.smartCardNo) return;
		let send = state;

		let find = type?.find(item => item?.code === state?.productsCode);
		if (!find) return;
		send = { ...send, packagename: find?.name };
		console.log({ send, state });
		setLoading(true);
		await buyServices("cables", send);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && cables?.isAdded) {
			toggle();
			setState(init);
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, cables?.isAdded]);
	// console.log({ state });
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<Buttons
					title={"subscribe"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
					width={"w-25 w25"}
					onClick={toggle}
					style={{ borderRadius: "30px" }}
				/>
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
				</div>
				{active === 0 ? (
					<TVSubHistory />
				) : (
					<>
						<h5 className="Lexend mb-3 fontReduceBig">Cable List</h5>
						<div className="row mx-0 p-3 bland">
							<div className="col my-auto textTrunc fontReduce fw-bold Lexend">
								S/N
							</div>
							<div className="col my-auto textTrunc fontReduce fw-bold Lexend">
								Name
							</div>
						</div>
						{cables?.cable_direct?.map((item, i) => (
							<div className="row mx-0 p-3" key={i}>
								<div className="col my-auto textTrunc fontReduce2">{i + 1}</div>
								<div className="col my-auto textTrunc fontReduce2">{item}</div>
							</div>
						))}
						<h5 className="Lexend my-3 fontReduceBig">DStv List</h5>
						<div className="row mx-0 p-3 bland">
							<div className="col my-auto textTrunc fontReduce fw-bold Lexend">
								S/N
							</div>
							<div className="col my-auto textTrunc fontReduce fw-bold Lexend">
								Name
							</div>
							<div className="col my-auto textTrunc fontReduce fw-bold Lexend">
								Price
							</div>
						</div>
						{cables?.cable_package?.dstv?.map((item, i) => (
							<div className="row mx-0 p-3" key={i}>
								<div className="col my-auto textTrunc fontReduce2">{i + 1}</div>
								<div className="col my-auto textTrunc fontReduce2">
									{item?.name}
								</div>
								<div className="col my-auto textTrunc fontReduce2">
									NGN{" "}
									{item?.price &&
										numberWithCommas(Number(item?.price).toFixed(2))}
								</div>
							</div>
						))}
						<h5 className="Lexend my-3 fontReduceBig">GOtv List</h5>
						<div className="row mx-0 p-3 bland">
							<div className="col my-auto textTrunc fontReduce fw-bold Lexend">
								S/N
							</div>
							<div className="col my-auto textTrunc fontReduce fw-bold Lexend">
								Name
							</div>
							<div className="col my-auto textTrunc fontReduce fw-bold Lexend">
								Price
							</div>
						</div>
						{cables?.cable_package?.gotv?.map((item, i) => (
							<div className="row mx-0 p-3" key={i}>
								<div className="col my-auto textTrunc fontReduce2">{i + 1}</div>
								<div className="col my-auto textTrunc fontReduce2">
									{item?.name}
								</div>
								<div className="col my-auto textTrunc fontReduce2">
									NGN{" "}
									{item?.price &&
										numberWithCommas(Number(item?.price).toFixed(2))}
								</div>
							</div>
						))}
						<h5 className="Lexend my-3 fontReduceBig">Startimes List</h5>
						<div className="row mx-0 p-3 bland">
							<div className="col my-auto textTrunc fontReduce fw-bold Lexend">
								S/N
							</div>
							<div className="col my-auto textTrunc fontReduce fw-bold Lexend">
								Name
							</div>
							<div className="col my-auto textTrunc fontReduce fw-bold Lexend">
								Price
							</div>
						</div>
						{cables?.cable_package?.startimes?.map((item, i) => (
							<div className="row mx-0 p-3" key={i}>
								<div className="col my-auto textTrunc fontReduce2">{i + 1}</div>
								<div className="col my-auto textTrunc fontReduce2">
									{item?.name}
								</div>
								<div className="col my-auto textTrunc fontReduce2">
									NGN{" "}
									{item?.price &&
										numberWithCommas(Number(item?.price).toFixed(2))}
								</div>
							</div>
						))}
					</>
				)}
			</Container>
			<ModalComponents title="cable subscription" isOpen={isOpen} back={toggle}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="Type">Select cable</label>
							<select
								name="type"
								id="type"
								value={state?.type}
								onChange={textChange("type")}
								className="form-control form-select py-3 rounded20">
								<option value="">Select Type</option>
								{cables?.cable_direct?.map((item, i) => (
									<option value={item} key={i}>
										{item}
									</option>
								))}
							</select>
						</div>
						{state?.type && (
							<div className="mb-4">
								<label htmlFor="Package">Package</label>
								<select
									name="productsCode"
									id="productsCode"
									onChange={textChange("productsCode")}
									className="form-control form-select py-3 rounded20">
									<option value="">Select package</option>
									{type?.map((item, i) => (
										<option value={item?.code} key={i}>
											{item?.name} NGN{numberWithCommas(item?.price)}
										</option>
									))}
								</select>
							</div>
						)}
						<div className="mb-4">
							<label htmlFor="telephone">Smart card number</label>
							<input
								type={"number"}
								value={state?.smartCardNo}
								onChange={textChange("smartCardNo")}
								placeholder="08012345678"
								className="form-control py-3"
							/>
						</div>
						{state?.user && (
							<div className="mb-4">
								<label htmlFor="telephone">Smart Card User</label>
								<input
									type={"text"}
									value={state?.user}
									onChange={textChange("user")}
									readOnly
									placeholder="User"
									className="form-control py-3"
								/>
							</div>
						)}
						<Buttons
							title={"pay"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto"
							width={"w-50 w50"}
							onClick={handleSubmit}
							loading={loading}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</div>
	);
};

export default TVSub;

const TVSubHistory = () => {
	const { cables, numberWithCommas, getServicesHistory } =
		useContext(GlobalState);
	let [state, setState] = useState(null);

	useEffect(() => {
		setState(cables?.cable);
	}, [cables?.cable]);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getServicesHistory("cables", {
			limit: Number(cables?.paginate?.nextPage * cables?.paginate?.limit),
		});
		setLoading(false);
	};

	if (!state) return;

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 p-3 text-capitalize">
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
					ID
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
					date
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Type</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">
					Package name
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">price</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">status</div>
			</div>
			<div className="bg-white row mx-0">
				{state?.map((item, index) => (
					<div key={index} className="row mx-0 py-3">
						<div className="col my-auto textTrunc fontReduce2">
							{item?.item_id}
						</div>
						<div className="col my-auto textTrunc fontReduce2">
							{moment(item?.createdAt).format("L")}
						</div>
						<div className="col my-auto textTrunc fontReduce2">
							{item?.properties?.type}
						</div>
						<div className="col my-auto textTrunc fontReduce2">
							{item?.properties?.packagename}
						</div>
						<div className="col my-auto textTrunc fontReduce2">
							{numberWithCommas(item?.properties?.amount)}
						</div>
						<div
							className={`col my-auto textTrunc fontReduce2 ${
								item?.status ? "text-success" : "text-danger"
							}`}>
							{item?.statusText}
						</div>
					</div>
				))}
			</div>
			<BottomTab state={state} paginate={cables?.paginate} />
			<LoadMore
				next={cables?.paginate?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};
