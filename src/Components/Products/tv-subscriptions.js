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
		{ handleFetch } = useValidation("smartCardNo", state, setNewState);

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
				<TVSubHistory />
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
				<div className="col">ID</div>
				<div className="col">date</div>
				<div className="col">Type</div>
				<div className="col">Package name</div>
				<div className="col">price</div>
				<div className="col">status</div>
			</div>
			<div className="bg-white row mx-0">
				{state?.map((item, index) => (
					<div key={index} className="row mx-0 py-3">
						<div className="col my-auto">{item?.item_id}</div>
						<div className="col my-auto">
							{moment(item?.createdAt).format("L")}
						</div>
						<div className="col my-auto">{item?.properties?.type}</div>
						<div className="col my-auto">{item?.properties?.packagename}</div>
						<div className="col my-auto">
							{numberWithCommas(item?.properties?.amount)}
						</div>
						<div
							className={`col my-auto ${
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
