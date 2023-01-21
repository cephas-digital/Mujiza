import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { Buttons } from "../../Utils";
import moment from "moment";
import { ModalComponents } from "../../Components";
import { GlobalState } from "../../Data/Context";
import { useValidation } from "../../Data/useFetch";
import LoadMore, { BottomTab } from "../LoadMore";

const ElectricityBill = () => {
	let { setStateName, electricity, buyServices } = useContext(GlobalState);
	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		},
		[active, setActive] = useState(0),
		btnTab = ["bill history", "bill list"];

	useEffect(() => {
		setStateName("bills history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let init = {
			type: "PREPAID",
			disco: "",
			meterNo: "",
			phoneNumber: "",
			amount: "",
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
		{ handleFetch } = useValidation("meterNo", state, setNewState);

	useEffect(() => {
		if (state?.meterNo?.length >= 10 && state?.type) handleFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.meterNo, state?.type]);

	useEffect(() => {
		if (newState) {
			console.log({ newState });
			setState({
				...state,
				user: newState?.data?.user,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newState]);

	let handleSubmit = async e => {
		e?.preventDefault();
		if (!state?.meterNo) return;
		setLoading(true);
		await buyServices("electricity", state);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && electricity?.isAdded) {
			toggle();
			setState(init);
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, electricity?.isAdded]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<Buttons
					title={"pay bills"}
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
					<ElectricityBillHistory />
				) : (
					<>
						<div className="row mx-0 p-3 bland">
							<div className="col my-auto textTrunc fontReduce fw-bold Lexend">
								S/N
							</div>
							<div className="col my-auto textTrunc fontReduce fw-bold Lexend">
								Name
							</div>
						</div>
						{electricity?.electricity_direct?.map((item, i) => (
							<div className="row mx-0 p-3" key={i}>
								<div className="col my-auto textTrunc fontReduce2">{i + 1}</div>
								<div className="col my-auto textTrunc fontReduce2">{item}</div>
							</div>
						))}
					</>
				)}
			</Container>
			<ModalComponents title="pay bills" isOpen={isOpen} back={toggle}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="Type">Type</label>
							<select
								name="type"
								id="type"
								value={state?.type}
								onChange={textChange("type")}
								className="form-control form-select py-3 rounded20">
								<option value="">Select bill type</option>
								<option value="PREPAID">PREPAID</option>
								<option value="POSTPAID">POSTPAID</option>
							</select>
						</div>
						<div className="mb-4">
							<label htmlFor="Disco">Platform</label>
							<select
								name="disco"
								id="disco"
								value={state?.disco}
								onChange={textChange("disco")}
								className="form-control form-select py-3 rounded20">
								<option value="">Select bill platform</option>
								{electricity?.electricity_direct?.map((item, i) => (
									<option value={item} key={i}>
										{item}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label htmlFor="telephone">Meter number</label>
							<input
								type={"number"}
								placeholder="08012345678"
								value={state?.meterNo}
								onChange={textChange("meterNo")}
								className="form-control py-3"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Amount</label>
							<input
								type={"number"}
								placeholder="500"
								value={state?.amount}
								onChange={textChange("amount")}
								className="form-control py-3"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Phone number</label>
							<input
								type={"tel"}
								placeholder="080 000 0000"
								value={state?.phoneNumber}
								onChange={textChange("phoneNumber")}
								className="form-control py-3"
							/>
						</div>
						<Buttons
							title={"pay"}
							css="btn-primary1 text-capitalize py-3 px-4 px-lg-5 mx-auto"
							loading={loading}
							width={"w-50 w50"}
							onClick={handleSubmit}
							style={{ borderRadius: "30px" }}
						/>
					</form>
				</div>
			</ModalComponents>
		</div>
	);
};

export default ElectricityBill;

const ElectricityBillHistory = () => {
	const { electricity, numberWithCommas, getServicesHistory } =
		useContext(GlobalState);
	let [state, setState] = useState(null);

	useEffect(() => {
		setState(electricity?.electricity);
	}, [electricity?.electricity]);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getServicesHistory("electricity", {
			limit: Number(
				electricity?.paginate?.nextPage * electricity?.paginate?.limit
			),
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
				<div className="col textTrunc fontReduce fw-bold Lexend">Disco</div>
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
					date
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Meter no</div>
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
							{item?.properties?.disco}
						</div>
						<div className="col my-auto textTrunc fontReduce2">
							{moment(item?.createdAt).format("L")}
						</div>
						<div className="col my-auto textTrunc fontReduce2">
							{item?.properties?.meterNo}
						</div>
						<div className="col textTrunc my-auto textTrunc fontReduce2">
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
			<BottomTab state={state} paginate={electricity?.paginate} />
			<LoadMore
				next={electricity?.paginate?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};
