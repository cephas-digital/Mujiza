import React, { useContext, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { Buttons } from "../Utils";
import img1 from "../Assets/Group 42924.png";
import moment from "moment";
import { GlobalState } from "../Data/Context";
import { toast } from "react-toastify";
import { useValidation } from "../Data/useFetch";
import LoadMore, { BottomTab } from "./LoadMore";

const MainConvert = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("airtime converter");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="bg-white aboutScreen">
			<Container>
				<ConvertTop />
				<ConverterHistory />
			</Container>
		</div>
	);
};

export default MainConvert;

const ConvertTop = () => {
	const { converterServices, general, converter } = useContext(GlobalState);
	let init = {
			account_number: "",
			account_name: "",
			bank_name: "",
			bank_code: "",
			reference: "",
			amount: "",
			network: "",
		},
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
				return toast.info("Please provide bank name and account number");
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [converter, submit]);

	return (
		<>
			{/* {validateLoading && <Loaded />} */}
			<section className="row mx-0">
				<form className="mt-4 col-md-4">
					<div className="mb-md-5 mb-3">
						<label className="text-capitalize" htmlFor="network">
							Network
						</label>
						<select
							className="form-control py-3 py-md-4 bg-transparent text-capitalize form-select"
							name="network"
							placeholder="Network"
							value={state?.network}
							onChange={textChange("network")}
							readOnly={validateLoading}
							style={{ borderRadius: "30px" }}
							id="network">
							<option value="">select network</option>
							{general?.networks?.map((item, i) => (
								<option value={item} key={i}>
									{item}
								</option>
							))}
						</select>
					</div>
					<div className="mb-md-5 mb-3">
						<label className="text-capitalize" htmlFor="name">
							Airtime reference
						</label>
						<input
							type="text"
							required
							name="reference"
							className="form-control py-3 py-md-4 bg-transparent"
							value={state?.reference}
							onChange={textChange("reference")}
							style={{ borderRadius: "30px" }}
						/>
					</div>
					<div className="mb-md-5 mb-3">
						<label className="text-capitalize" htmlFor="bank_code">
							Account Bank
						</label>
						<select
							className="form-control py-3 py-md-4 bg-transparent text-capitalize form-select"
							name="bank_code"
							placeholder="Account Bank"
							value={state?.bank_code}
							onChange={textChange("bank_code")}
							readOnly={validateLoading}
							style={{ borderRadius: "30px" }}
							id="bank_code">
							<option value="">select bank</option>
							{converter?.banks?.map((item, i) => (
								<option value={item?.code} key={i}>
									{item?.name}
								</option>
							))}
						</select>
					</div>
					<div className="mb-md-5 mb-3">
						<label className="text-capitalize" htmlFor="name">
							Bank account
						</label>
						<input
							type="number"
							className="form-control py-3 py-md-4 bg-transparent"
							required
							name="account_number"
							readOnly={validateLoading}
							value={state?.account_number}
							style={{ borderRadius: "30px" }}
							onChange={textChange("account_number")}
						/>
					</div>
					{state?.account_name && state?.account_number?.length === 10 && (
						<div className="mb-md-5 mb-3">
							<label className="text-capitalize" htmlFor="name">
								Account name
							</label>
							<input
								type="text"
								required
								name="account_name"
								readOnly
								className="form-control py-3 py-md-4 bg-transparent"
								value={state?.account_name}
								onChange={textChange("account_name")}
								style={{ borderRadius: "30px" }}
							/>
						</div>
					)}
					<div className="mb-md-5 mb-3">
						<label className="text-capitalize" htmlFor="name">
							Amount
						</label>
						<input
							type="number"
							required
							name="amount"
							className="form-control py-3 py-md-4 bg-transparent"
							value={state?.amount}
							onChange={textChange("amount")}
							style={{ borderRadius: "30px" }}
						/>
					</div>
					<Buttons
						title={"convert"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						loading={loading}
						onClick={handleSubmitCard}
					/>
				</form>
				<div className="col-lg-8 h-100 my-auto d-none d-md-flex">
					<img src={img1} alt="Banner" className="img-fluid mx-auto" />
				</div>
			</section>
		</>
	);
};

const ConverterHistory = () => {
	const { converter, numberWithCommas, converterServices } =
		useContext(GlobalState);
	let [state, setState] = useState(null),
		[loading, setLoading] = useState(false);

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

	if (!state) return;

	return (
		<div className="pb-5 mt-5">
			<div className="bland row mx-0 p-3 text-capitalize">
				<div className="col textTrunc d-none d-md-flex">ID</div>
				<div className="col textTrunc">Reference</div>
				<div className="col textTrunc d-none d-md-flex">date</div>
				{/* <div className="col textTrunc">number</div> */}
				<div className="col textTrunc">amount</div>
				<div className="col textTrunc">network </div>
				<div className="col textTrunc">status</div>
			</div>
			<div className="bg-white row mx-0">
				{state?.map((item, index) => (
					<div key={index} className="row mx-0 p-3">
						<div className="col d-none d-md-flex textTrunc my-auto">
							{item?.item_id}
						</div>
						<div className="col textTrunc my-auto">{item?.reference}</div>
						<div className="col d-none d-md-flex textTrunc my-auto">
							{moment(item?.createdAt).format("L")}
						</div>
						{/* <div className="col textTrunc my-auto">{item?.telephone}</div> */}
						<div className="col textTrunc my-auto">
							{numberWithCommas(item?.amount)}
						</div>
						<div className="col textTrunc my-auto">{item?.network}</div>
						<div className="col textTrunc my-auto">{item?.statusText}</div>
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
	);
};
