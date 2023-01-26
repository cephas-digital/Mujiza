import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { Buttons } from "../Utils";
import img1 from "../Assets/Group 42924.png";
import moment from "moment";
import { GlobalState } from "../Data/Context";
import { toast } from "react-toastify";
import { useValidation } from "../Data/useFetch";
import LoadMore, { BottomTab } from "./LoadMore";
import { ModalComponents } from "./DefaultHeader";
import { BiCheck, BiDotsHorizontalRounded } from "react-icons/bi";
import { HiThumbDown } from "react-icons/hi";

const MainConvert = () => {
	let { setStateName, auth } = useContext(GlobalState);
	useEffect(() => {
		setStateName("airtime converter");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="bg-white aboutScreen">
			<Container>
				{auth?.user?.privilege !== "agent" ? (
					<ConvertTop />
				) : (
					<ConvertAgentTop />
				)}
				<ConverterHistory />
			</Container>
		</div>
	);
};

export default MainConvert;

const ConvertTop = () => {
	const { converterServices, general, converter, settings } =
		useContext(GlobalState);
	let init = {
			account_number: "",
			account_name: "",
			bank_name: "",
			bank_code: "",
			reference: "",
			amount: "",
			network: "",
			send_to: "",
		},
		[returnValue, setReturnValue] = useState(""),
		[loading, setLoading] = useState(false),
		[newState, setNewState] = useState(false),
		[submit, setSubmit] = useState(false),
		[state, setState] = useState(init),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		handleSubmitCard = async e => {
			if (e) e.preventDefault();
			if (
				!state?.bank_code &&
				!state?.bank_name &&
				!state?.account_name &&
				!state?.account_number &&
				!state?.reference
			)
				return toast.info("Please provide bank name and account number", {
					autoClose: 10000,
				});
			setLoading(true);
			await converterServices("post", "converter", state);
			setLoading(false);
			setSubmit(true);
		},
		{ validateLoading, handleFetch } = useValidation(
			"banks",
			state,
			setNewState
		);

	useEffect(() => {
		if (state?.account_number?.length === 10 && state?.bank_code) handleFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.account_number, state?.bank_code]);

	useEffect(() => {
		if (state?.bank_code) {
			converter?.banks?.map(
				item =>
					item?.code === state?.bank_code &&
					setState({ ...state, bank_name: item?.name })
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.bank_code, converter]);

	useEffect(() => {
		if (newState) {
			setState({
				...state,
				account_name: newState?.data?.account_name,
				account_number: newState?.data?.account_number,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newState]);
	// console.log({newState});
	useEffect(() => {
		if (submit && converter?.isAdded) {
			setSubmit(false);
			setState(init);
			setReturnValue("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [converter, submit]);

	useEffect(() => {
		if (state?.amount) {
			let commission = 80;
			if (settings?.settings?.airtimeToCashCommission)
				commission = settings?.settings?.airtimeToCashCommission;

			setReturnValue(
				Number(Number(state?.amount) * (commission / 100)).toFixed(2)
			);
		}
	}, [state?.amount, settings?.settings]);

	useEffect(() => {
		if (state?.network) {
			converter?.numbers?.map(
				item =>
					item?.network?.toLowerCase() === state?.network?.toLowerCase() &&
					setState({ ...state, send_to: item?.telephone })
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state?.network, converter?.numbers]);
	// console.log({ state, numbers: converter?.numbers });
	return (
		<>
			<section className="row mx-0">
				<form className="mt-4 col-md-7 row mx-0 g-3 g-md-5">
					<div className="mb-3 col-md-6">
						<label className="text-capitalize" htmlFor="network">
							Network
						</label>
						<select
							className="form-control py-3 py-md-4 bg-transparent text-capitalize rounded20 form-select"
							name="network"
							placeholder="Network"
							value={state?.network}
							onChange={textChange("network")}
							readOnly={validateLoading}
							id="network">
							<option value="">select network</option>
							{general?.networks?.map((item, i) => (
								<option value={item} key={i}>
									{item}
								</option>
							))}
						</select>
					</div>
					{state?.network && (
						<div className="mb-3 col-md-6">
							<label className="text-capitalize" htmlFor="name">
								Number to send to
							</label>
							<input
								type="text"
								name="reference"
								className="form-control py-3 py-md-4 bg-transparent rounded20"
								value={state?.send_to}
								readOnly
							/>
						</div>
					)}
					<div className="mb-3 col-md-6">
						<label className="text-capitalize" htmlFor="name">
							Phone number
						</label>
						<input
							type="text"
							required
							name="reference"
							className="form-control py-3 py-md-4 bg-transparent rounded20"
							value={state?.reference}
							onChange={textChange("reference")}
						/>
					</div>
					<div className="mb-3 col-md-6">
						<label className="text-capitalize" htmlFor="bank_code">
							Account Bank
						</label>
						<select
							className="form-control py-3 py-md-4 bg-transparent text-capitalize form-select"
							name="bank_code rounded20"
							placeholder="Account Bank"
							value={state?.bank_code}
							onChange={textChange("bank_code")}
							readOnly={validateLoading}
							id="bank_code">
							<option value="">select bank</option>
							{converter?.banks?.map((item, i) => (
								<option value={item?.code} key={i}>
									{item?.name}
								</option>
							))}
						</select>
					</div>
					<div className="mb-3 col-md-6">
						<label className="text-capitalize" htmlFor="name">
							Bank account
						</label>
						<input
							type="number"
							className="form-control py-3 py-md-4 bg-transparent rounded20"
							required
							name="account_number"
							readOnly={validateLoading}
							value={state?.account_number}
							onChange={textChange("account_number")}
						/>
					</div>
					{state?.account_name && state?.account_number?.length === 10 && (
						<div className="mb-3 col-md-6">
							<label className="text-capitalize" htmlFor="name">
								Account name
							</label>
							<input
								type="text"
								required
								name="account_name"
								readOnly
								className="form-control py-3 py-md-4 bg-transparent rounded20"
								value={state?.account_name}
								onChange={textChange("account_name")}
							/>
						</div>
					)}
					<div className="mb-3 col-md-6">
						<label className="text-capitalize" htmlFor="name">
							Amount
						</label>
						<input
							type="number"
							required
							name="amount"
							className="form-control py-3 py-md-4 bg-transparent rounded20"
							value={state?.amount}
							onChange={textChange("amount")}
						/>
					</div>
					{state?.amount && (
						<div className="mb-3 col-md-6">
							<label className="text-capitalize" htmlFor="name">
								Return Amount
							</label>
							<input
								type="number"
								name="amount"
								readOnly
								className="form-control py-3 py-md-4 bg-transparent rounded20"
								value={returnValue}
								onChange={textChange("returnValue")}
							/>
						</div>
					)}
					<div>
						<Buttons
							title={"convert"}
							css="btn-primary1 text-capitalize py-3 w-50 my-4"
							width={"w-50"}
							style={{ borderRadius: "30px" }}
							loading={loading}
							onClick={handleSubmitCard}
						/>
					</div>
				</form>
				<div className="col-lg-5 h-100 my-auto d-none d-md-flex">
					<img src={img1} alt="Banner" className="img-fluid mx-auto" />
				</div>
			</section>
		</>
	);
};

const ConvertAgentTop = () => {
	let { converterServices, converter, general } = useContext(GlobalState);
	let [isNumber, setIsNumber] = useState(false),
		[isUpdateNumber, setIsUpdateNumber] = useState(false),
		init = { network: "", telephone: "" },
		[state, setState] = useState(init),
		[submit, setSubmit] = useState(false),
		[loading, setLoading] = useState(false);
	let clearAll = () => {
		setIsNumber(false);
		setIsUpdateNumber(false);
		setSubmit(false);
		setState(init);
	};
	useEffect(() => {
		if (submit && converter?.isNumberAdded) {
			clearAll();
		}
		if (submit && converter?.isNumberUpdated) {
			clearAll();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, converter?.isAddedNumber]);

	let handleSubmit = (type, method) => async e => {
		e?.preventDefault();
		setLoading(true);
		await converterServices(
			method,
			type,
			isUpdateNumber ? isUpdateNumber : state,
			isUpdateNumber ? isUpdateNumber?._id : ""
		);
		setLoading(false);
		setSubmit(true);
	};

	return (
		<>
			<div className="py-3 py-md-5">
				<h3 className="Lexend text-capitalize fontReduceBig">
					Phone Number convert
				</h3>
				<div className="d-flex w-100 justify-content-end py-3">
					<button
						onClick={() => setIsNumber(true)}
						className="btn-primary1 btn p-3 px-md-5 text-capitalize">
						add new number
					</button>
				</div>
				<div className="py-3">
					<div className="row mx-0 bland p-3 text-capitalize">
						<div className="col textTrunc fontReduce fw-bold Lexend">S/N</div>
						<div className="col textTrunc fontReduce fw-bold Lexend">
							Network
						</div>
						<div className="col textTrunc fontReduce fw-bold Lexend">
							Telephone
						</div>
						<div className="col textTrunc fontReduce fw-bold Lexend">
							Update
						</div>
					</div>
					{converter?.numbers?.map((item, i) => (
						<div className="row bland2 p-3 mx-0 text-uppercase" key={i}>
							<div className="col textTrunc fontReduce2">{i + 1}</div>
							<div className="col textTrunc fontReduce2">{item?.network}</div>
							<div className="col textTrunc fontReduce2">{item?.telephone}</div>
							<div
								className="col textTrunc fontReduce2 myCursor text-info"
								onClick={() => setIsUpdateNumber(item)}>
								{" "}
								edit{" "}
							</div>
						</div>
					))}
				</div>
			</div>

			<ModalComponents
				title={"Add new number"}
				isOpen={isNumber}
				back={() => {
					setIsNumber(false);
					setState(init);
				}}>
				<div>
					<div className=" mb-3">
						<label className="text-capitalize" htmlFor="network">
							Network
						</label>
						<select
							className="form-control py-3 py-md-4 bg-transparent text-capitalize form-select"
							name="network"
							placeholder="Network"
							value={state?.network}
							onChange={e => setState({ ...state, network: e.target.value })}
							id="network">
							<option value="">select network</option>
							{general?.networks?.map((item, i) => (
								<option value={item} key={i}>
									{item}
								</option>
							))}
						</select>
					</div>
					<div className="mb-3">
						<label className="text-capitalize" htmlFor="name">
							telephone
						</label>
						<input
							type="tel"
							className="form-control py-3 py-md-4 text-capitalize"
							name="telephone"
							id="telephone"
							value={state?.telephone}
							onChange={e => setState({ ...state, telephone: e.target.value })}
							placeholder="0800 000 0000"
						/>
					</div>
					<Buttons
						loading={loading}
						title="send"
						onClick={handleSubmit("converter-number", "post")}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
					/>
				</div>
			</ModalComponents>
			<ModalComponents
				title={"Update number"}
				isOpen={isUpdateNumber}
				back={() => {
					setIsUpdateNumber(false);
					setState(init);
				}}>
				<div className="mb-3">
					<label className="text-capitalize" htmlFor="name">
						telephone
					</label>
					<input
						type="tel"
						className="form-control py-3 py-md-4 text-capitalize"
						name="telephone"
						id="telephone"
						value={isUpdateNumber?.telephone}
						onChange={e =>
							setIsUpdateNumber({
								...isUpdateNumber,
								telephone: e.target.value,
							})
						}
						placeholder="0800 000 0000"
					/>
				</div>
				<Buttons
					loading={loading}
					title="update"
					onClick={handleSubmit("converter-number", "put")}
					css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
					width={"w-50"}
				/>
			</ModalComponents>
		</>
	);
};

const ConverterHistory = () => {
	const { converter, numberWithCommas, converterServices, auth } =
		useContext(GlobalState);
	let [state, setState] = useState(null),
		[loading, setLoading] = useState(false),
		[isUpdate, setIsUpdate] = useState(false),
		[isView, setIsView] = useState(false),
		[isDecline, setIsDecline] = useState(false),
		init = { reason: "" },
		[data, setData] = useState(init),
		[submit, setSubmit] = useState(false),
		[loading2, setLoading2] = useState(false);

	useEffect(() => {
		setState(converter?.airtime);
	}, [converter?.airtime]);

	let handleLoadMore = async () => {
		setLoading(true);

		await converterServices("get", "converter", {
			limit: Number(converter?.paginate?.nextPage * converter?.paginate?.limit),
		});
		setLoading(false);
	};

	let clearAll = () => {
		setIsDecline(false);
		setIsUpdate(false);
		setSubmit(false);
		setData(init);
	};
	useEffect(() => {
		if (submit && converter?.isUpdated) {
			clearAll();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, converter?.isAddedNumber]);

	let handleSubmit = (type, method) => async e => {
		e?.preventDefault();
		setLoading2(true);
		await converterServices(
			method,
			type,
			data,
			isUpdate ? isUpdate?._id : isDecline ? isDecline?._id : ""
		);
		setLoading2(false);
		setSubmit(true);
	};

	if (!state) return;
	// console.log({ state, converter });

	return (
		<>
			<div className="pb-5 mt-5">
				<h3 className="Lexend text-capitalize mb-2 fontReduceBig">
					{" "}
					conversion history
				</h3>
				<div className="bland row mx-0 p-3 text-capitalize">
					<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
						ID
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						Reference
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
						date
					</div>
					{/* <div className="col textTrunc">number</div> */}
					<div className="col textTrunc fontReduce fw-bold Lexend">amount</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">
						network{" "}
					</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">status</div>
					<div className="col textTrunc fontReduce fw-bold Lexend">action</div>
				</div>
				<div className="bg-white row mx-0">
					{state?.map((item, index) => (
						<div key={index} className="row mx-0 p-3">
							<div className="col d-none d-md-flex textTrunc my-auto fontReduce2">
								{item?.item_id}
							</div>
							<div className="col textTrunc my-auto fontReduce2">
								{item?.reference}
							</div>
							<div className="col d-none d-md-flex textTrunc my-auto fontReduce2">
								{moment(item?.createdAt).format("L")}
							</div>
							{/* <div className="col textTrunc my-auto">{item?.telephone}</div> */}
							<div className="col textTrunc my-auto fontReduce2">
								{numberWithCommas(item?.amount)}
							</div>
							<div className="col textTrunc my-auto fontReduce2">
								{item?.network}
							</div>
							<div
								className={`col textTrunc my-auto text-capitalize fontReduce2 ${
									item?.status
										? "text-success"
										: item?.statusText === "declined"
										? "text-danger"
										: ""
								}`}>
								{item?.statusText}
							</div>
							<div className="col textTrunc my-auto btn-group fontReduce2 w-100">
								<button
									onClick={() => setIsView(item)}
									className="btn  btn-primary1 text-capitalize p-1 p-md-2 w-100 fontReduce2">
									<BiDotsHorizontalRounded />
								</button>
								{auth?.user?.privilege === "agent" && (
									<>
										<button
											onClick={() => setIsUpdate(item)}
											className="btn  btn-success2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
											<BiCheck />
										</button>
										<button
											onClick={() => setIsDecline(item)}
											className="btn  btn-danger2 text-capitalize p-1 p-md-2 w-100 fontReduce2">
											<HiThumbDown />
										</button>
									</>
								)}
							</div>
						</div>
					))}
				</div>
				<BottomTab state={state} paginate={converter?.paginate} />
				<LoadMore
					next={converter?.paginate?.next}
					handleLoadMore={handleLoadMore}
					loading={loading}
				/>
			</div>
			<ModalComponents
				title={"Decline conversion"}
				isOpen={isDecline}
				back={() => {
					setIsDecline(false);
				}}>
				<div className="mb-3">
					<label className="text-capitalize" htmlFor="name">
						Reason
					</label>
					<textarea
						className="form-control py-3 py-md-4 text-capitalize"
						name="reason"
						id="reason"
						style={{
							resize: "none",
							height: "10rem",
						}}
						value={data?.reason}
						onChange={e =>
							setData({
								...data,
								reason: e.target.value,
							})
						}
						placeholder="Reason for decline"
					/>
				</div>
				<Buttons
					loading={loading2}
					title="decline"
					onClick={handleSubmit("converter", "post")}
					css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
					width={"w-50"}
				/>
			</ModalComponents>
			<ModalComponents
				title={"Mark as done"}
				isOpen={isUpdate}
				back={() => {
					setIsUpdate(false);
				}}>
				<div className="downH2 d-flex">
					<div className="my-auto w-100">
						<p className="text-center">Has the transaction been completed?</p>
						<div className="d-flex w-100">
							<Buttons
								loading={loading2}
								title="confirm"
								onClick={handleSubmit("converter", "put")}
								css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
								width={"w-50"}
							/>
						</div>
					</div>
				</div>
			</ModalComponents>
			<ModalComponents
				title={"View full details"}
				isOpen={isView}
				back={() => {
					setIsView(false);
				}}>
				<div className="downH2 d-flex">
					<div className="w-100">
						<h4 className="Lexend">Conversion details</h4>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>Id: </span>
							<span className="fontInherit Lexend">{isView?.item_id}</span>{" "}
						</p>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>Bank name: </span>
							<span className="fontInherit Lexend">
								{isView?.bank_name}
							</span>{" "}
						</p>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>Account name: </span>
							<span className="fontInherit Lexend">
								{isView?.account_name}
							</span>{" "}
						</p>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>Account number: </span>
							<span className="fontInherit Lexend">
								{isView?.account_number}
							</span>{" "}
						</p>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>Reference: </span>
							<span className="fontInherit Lexend">
								{isView?.reference}
							</span>{" "}
						</p>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>Network: </span>
							<span className="fontInherit Lexend">{isView?.network}</span>{" "}
						</p>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>Amount: </span>
							<span className="fontInherit Lexend">
								NGN {isView?.amount ? numberWithCommas(isView?.amount) : 0}
							</span>{" "}
						</p>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>Number sent to: </span>
							<span className="fontInherit Lexend">
								{isView?.number_sent_to}
							</span>{" "}
						</p>
						<p className="text-capitalize border-bottom d-flex justify-content-between">
							<span>Status: </span>
							<span
								className={`fontInherit Lexend ${
									isView?.status
										? "text-success"
										: isView?.statusText === "declined"
										? "text-danger"
										: ""
								}`}>
								{isView?.statusText}
							</span>
						</p>
						{isView?.statusText === "declined" && (
							<p className="text-capitalize border-bottom d-flex justify-content-between">
								<span>Reason: </span>
								<span className="fontInherit Lexend">
									{isView?.reason}
								</span>{" "}
							</p>
						)}
					</div>
				</div>
			</ModalComponents>
		</>
	);
};
