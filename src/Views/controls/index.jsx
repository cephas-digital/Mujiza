import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { ModalComponents } from "../../Components";
import { GlobalState } from "../../Data/Context";
import { Buttons } from "../../Utils";

const Controls = () => {
	let { setStateName } = useContext(GlobalState);
	useEffect(() => {
		setStateName("Controls");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	let navigate = useNavigate(),
		params = useParams(),
		controlsTab = [
			{ name: "manual top up", type: "link", link: `/${params?.page}/manual` },
			// {
			// 	name: "TV subscription",
			// 	type: "link",
			// 	link: `/${params?.page}/tv-subscriptions`,
			// },
			// {
			// 	name: "bills plans",
			// 	type: "link",
			// 	link: `/${params?.page}/bills`,
			// },
			// {
			// 	name: "broadcast",
			// 	type: "link",
			// 	link: `/${params?.page}/broadcasts`,
			// },
			{ name: "give bonus", type: "link", link: `/${params?.page}/bonus` },
		];

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5 d-flex justify-content-center align-items-center aboutScreen">
				<div
					className="m-auto shadow2 p-3 py-5 p-md-5 rounded20"
					style={{ maxWidth: "600px", width: "100%" }}>
					<div className="row mx-0 g-2 g-md-4">
						{controlsTab?.map((it, i) => (
							<div className="col-6 p-1 p-md-3" key={i}>
								<button
									style={{ borderRadius: "30px" }}
									onClick={() => {
										if (it?.type === "link") {
											navigate(it?.link);
										} else if (it?.type === "button") {
										}
									}}
									className="btn btn-outline-primary1 py-2 py-md-3 text-capitalize w-100 textTrunc">
									<span className="textTrunc">{it?.name}</span>
								</button>
							</div>
						))}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Controls;

export const MakeBonus = ({ isOpen, back, user }) => {
	let { manageWallet, bonus } = useContext(GlobalState);

	let init = {
			title: "",
			description: "",
			user: user ? user : "",
			amount: "",
		},
		[state, setState] = useState(init),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			await manageWallet("bonus", state, "give");
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (bonus?.isAdded && submit) {
			back();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bonus?.isAdded, submit]);

	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Bonus">
				<form>
					<div className="form mb-3">
						<label htmlFor="wallet">Title</label>
						<input
							type="text"
							className="form-control rounded10 py-3"
							placeholder="Enter title"
							value={state?.title}
							onChange={textChange("title")}
						/>
					</div>
					<div className="form mb-3">
						<label htmlFor="wallet">Description</label>
						<textarea
							value={state?.description}
							onChange={textChange("description")}
							className="form-control rounded10 py-3"
							placeholder="Enter description"
							style={{
								resize: "none",
								height: "7rem",
							}}
						/>
					</div>
					<div className="form mb-3">
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							className="form-control rounded10 py-3"
							placeholder="5000"
							value={state?.amount}
							onChange={textChange("amount")}
						/>
					</div>
					{/* <div className="form mb-3">
						<label htmlFor="wallet">Select target</label>
						<select className="form-control rounded10 py-3 form-select">
							<option value="ringo">Agent</option>
						</select>
					</div>
					<div className="form mb-3">
						<label htmlFor="wallet">Select wallet_id</label>
						<input
							type="text"
							className="form-control rounded10 py-3"
							placeholder="123456789"
						/>
					</div> */}
					<Buttons
						title={"send"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						loading={loading}
						onClick={handleSubmit}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

export const MakeWallet = ({ isOpen, back, user }) => {
	let { manageWallet, wallet } = useContext(GlobalState);

	let init = {
			type: "wallet",
			user: user ? user : "",
			amount: "",
		},
		[state, setState] = useState(init),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			},
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			await manageWallet("wallet", state, "add");
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (wallet?.isAdded && submit) {
			back();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wallet?.isAdded, submit]);

	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="top up Wallet">
				<WalletForm state={state} textChange={textChange} />
				<Buttons
					title={"top up"}
					css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
					width={"w-50"}
					style={{ borderRadius: "30px" }}
					loading={loading}
					onClick={handleSubmit}
				/>
			</ModalComponents>
		</>
	);
};
// const MakeBundle = ({ isOpen, back }) => {
// 	return (
// 		<>
// 			<ModalComponents isOpen={isOpen} back={back} title="new Wallet">
// 				<form className="row mx-0">
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Title</label>
// 						<input
// 							type="text"
// 							className="form-control rounded10 py-3"
// 							placeholder="Enter title"
// 						/>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Choose biller</label>
// 						<select className="form-control rounded10 py-3 form-select">
// 							<option value="ringo">Ringo</option>
// 						</select>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Choose network</label>
// 						<select className="form-control rounded10 py-3 form-select">
// 							<option value="mtn">MTN</option>
// 						</select>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Price</label>
// 						<input
// 							type="number"
// 							className="form-control rounded10 py-3"
// 							placeholder="200"
// 						/>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Network ID</label>
// 						<input
// 							type="text"
// 							className="form-control rounded10 py-3"
// 							placeholder="1234567"
// 						/>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Plan ID</label>
// 						<input
// 							type="text"
// 							className="form-control rounded10 py-3"
// 							placeholder="1234567"
// 						/>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Validity</label>
// 						<input
// 							type="text"
// 							className="form-control rounded10 py-3"
// 							placeholder="1"
// 						/>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">HW Code</label>
// 						<input
// 							type="text"
// 							className="form-control rounded10 py-3"
// 							placeholder="1234"
// 						/>
// 					</div>
// 					<div className="form mb-3 col-6">
// 						<label htmlFor="wallet">Allowance</label>
// 						<input
// 							type="text"
// 							className="form-control rounded10 py-3"
// 							placeholder=""
// 						/>
// 					</div>
// 				</form>
// 				<Buttons
// 					title={"create wallet"}
// 					css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
// 					width={"w-50"}
// 					style={{ borderRadius: "30px" }}
// 				/>
// 			</ModalComponents>
// 		</>
// 	);
// };

export const WalletForm = ({ state, textChange }) => {
	return (
		<form className="row mx-0">
			<div className="form mb-3">
				<label htmlFor="type">Type</label>
				<select
					value={state?.type}
					onChange={textChange("type")}
					className="form-control rounded10 py-3 form-select">
					<option value="">Choose type</option>
					<option value="wallet">Wallet ID</option>
					<option value="user">User ID</option>
				</select>
			</div>
			<div className="form mb-3">
				<label htmlFor="id">ID</label>
				<input
					type="text"
					value={state?.user}
					onChange={textChange("user")}
					className="form-control rounded10 py-3"
					placeholder="1234567890"
				/>
			</div>
			<div className="form mb-3">
				<label htmlFor="wallet">Amount</label>
				<input
					type="number"
					value={state?.amount}
					onChange={textChange("amount")}
					className="form-control rounded10 py-3"
					placeholder="2000"
				/>
			</div>
		</form>
	);
};
