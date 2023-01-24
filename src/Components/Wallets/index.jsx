import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../Data/Context";
import { Container } from "reactstrap";
import moment from "moment";
import { BiCopy, BiDotsHorizontalRounded } from "react-icons/bi";
import { RiShieldStarFill } from "react-icons/ri";
import { Buttons, EmptyComponent } from "../../Utils";
import { Link } from "react-router-dom";
import { RoundCharts } from "../Charts";
import { toast } from "react-toastify";
import { ModalComponents } from "../DefaultHeader";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { usePaymentInputs } from "react-payment-inputs";
import { WalletForm } from "../../Views/controls";
import LoadMore, { BottomTab } from "../LoadMore";

let colorArr = ["#E9F9F9", "#C0938E", "#000000", "#B3CEDE"];

const Wallets = () => {
	let { setStateName, wallet, numberWithCommas, auth } =
		useContext(GlobalState);
	let [isTransfer, setIsTransfer] = useState(false);
	let [isWithdraw, setIsWithdraw] = useState(false);
	let toggleTransfer = () => {
		setIsTransfer(!isTransfer);
	};
	let toggleWithdraw = () => {
		setIsWithdraw(!isWithdraw);
	};
	let [isVirtual, setIsVirtual] = useState(false);
	let [isCard, setIsCard] = useState(false);
	let toggleVirtual = () => {
		setIsVirtual(!isVirtual);
	};
	let toggleCard = () => {
		setIsCard(!isCard);
	};
	let [moveType, setMoveType] = useState(false);

	useEffect(() => {
		setStateName("my account");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<div className="rounded20 walletDiv p-3 px-md-5">
					<div className="d-md-flex align-items-center h-100">
						<div className="px-3 text-dark h-100 py-3 py-md-5 mx-auto">
							<h3 className="fontReduceBig">Wallet balance</h3>
							<h1
								className={`fw-bold text5 textMini ${
									auth?.user?.privilege === "user" ? "mb-5" : ""
								}`}>
								NGN{" "}
								{numberWithCommas(
									Number(wallet?.balance?.available).toFixed(2)
								)}
							</h1>
							{auth?.user?.privilege === "agent" && (
								<div>
									<h6 className="fw-bold mb-5">
										Honourworld balance: NGN{" "}
										{wallet?.honour_balance?.balance
											? numberWithCommas(
													Number(wallet?.honour_balance?.balance).toFixed(2)
											  )
											: 0}
									</h6>
								</div>
							)}
							<div className="row mx-0 w-100 mb-5">
								<div
									className="col text-center myCursor"
									onClick={() => setMoveType("commission")}>
									<h5 className="fw-bold">
										{numberWithCommas(
											Number(wallet?.balance?.commission).toFixed(2)
										)}
									</h5>
									<small>Commission</small>
								</div>
								<div
									className="col text-center myCursor"
									onClick={() => setMoveType("bonus")}>
									<h5 className="fw-bold">
										{numberWithCommas(
											Number(wallet?.balance?.bonus).toFixed(2)
										)}
									</h5>
									<small>Bonus</small>
								</div>
								<div className="col text-center">
									<h5 className="fw-bold">
										{numberWithCommas(
											Number(wallet?.balance?.purchase).toFixed(2)
										)}
									</h5>
									<small>Purchase</small>
								</div>
							</div>
							<div className="d-flex align-items-center justify-content-between">
								<button
									onClick={toggleTransfer}
									className="btn text-capitalize fw-bold btn-primary1">
									wallet transfer
								</button>
								{/* <button
									onClick={toggleWithdraw}
									className="btn text-capitalize fw-bold btn-primary1">
									withdraw
								</button> */}
							</div>
						</div>
						<div className="ms-md-auto row mx-0 h-100">
							<div className="col darkBg h-100 rounded10 p-3 py-md-5 genWalletWidth d-flex flex-column">
								<p className="text2 text-center fw-bold">Wallet ID</p>
								<p className="text-center">{wallet?.balance?.wallet_id}</p>
								<p
									className="mt-auto myCursor"
									onClick={() => {
										navigator.clipboard
											.writeText(wallet?.balance?.wallet_id)
											.then(
												() => {
													toast.info("Copied");
												},
												err => {
													toast.warn(`Could not copy: ${err}`);
												}
											);
									}}>
									Copy <BiCopy />{" "}
								</p>
							</div>
							<div className="col lilacBg h-100 rounded10 p-3 py-md-5 genWalletWidth mx-md-4 mx-md-3 my-3 my-md-0">
								<p className="text2 mb-5 text-dark fw-bold">Fund Wallet</p>
								<Buttons
									onClick={toggleVirtual}
									css={"btn-dark rounded10 text-capitalize my-3 py-3"}
									title="virtual account"
								/>
								<Buttons
									onClick={toggleCard}
									css={"btn-dark rounded10 text-capitalize my-3 py-3"}
									title="debit card"
								/>
							</div>
							<div className="col greyBg h-100 rounded10 p-3 py-md-5 genWalletWidth">
								<p className="text2 text-dark fw-bold">Cards</p>
								<CardList bg />
							</div>
						</div>
					</div>
				</div>{" "}
				<div className="d-flex my-4">
					<Link
						to={`/wallets/commissions`}
						className="rounded20 shadow2 p-md-5 p-4 mx-2 mx-md-3 eachProduct myCursor text-dark text-decoration-none text-center">
						<div>
							<h6>Commission</h6>
							<h5 className="textMini2">
								NGN{" "}
								{numberWithCommas(
									Number(wallet?.balance?.commission).toFixed(2)
								)}
							</h5>
						</div>
					</Link>
					<Link
						to={`/wallets/bonus`}
						className="rounded20 shadow2 p-md-5 p-4 mx-2 mx-md-3 eachProduct myCursor text-dark text-decoration-none text-center">
						<div>
							<h6>Bonus</h6>
							<h5 className="textMini2">
								NGN{" "}
								{numberWithCommas(Number(wallet?.balance?.bonus).toFixed(2))}
							</h5>
						</div>
					</Link>
				</div>
				<div className="row mx-0 g-4">
					<div className="col-md-10">
						{/* <div className="btn-group d-none d-md-block">
							<button className="btn text-dark text-capitalize border-bottom fw-bold">
								transfer
							</button>
							<button className="btn text-dark text-capitalize fw-bold text-muted">
								cards
							</button>
						</div> */}
						<div className="Lexend fw-bold mb-2">Wallet History</div>
						<div>
							<TransferList />
						</div>
					</div>
					<div
						className="col-md-2 rounded10 p-3 d-none d-block"
						style={{ background: "#FCFCF9" }}>
						<h5 className="fw-bold">Your activity</h5>
						<RoundCharts
							state={[
								{
									name: "expenses",
									value: wallet?.balance?.purchase,
									color: "#FEC430",
								},
								{
									name: "commission",
									value: wallet?.balance?.commissionTotal,
									color: "#AD9BB1",
								},
								{
									name: "fund",
									value: wallet?.balance?.walletTotal,
									color: "#63B0C4",
								},
								{
									name: "bonus",
									value: wallet?.balance?.bonusTotal,
									color: "#B9BBBC",
								},
							]}
							type="pie"
							css="h-100 w-100"
							noLegend
						/>
					</div>
				</div>
			</Container>{" "}
			<MakeTransfer isOpen={isTransfer} back={toggleTransfer} />
			<MakeWithdraw isOpen={isWithdraw} back={toggleWithdraw} />
			<MakeCards
				isOpen={isCard}
				back={toggleCard}
				back2={() => setIsCard(false)}
			/>
			<MakeVirtual isOpen={isVirtual} back={toggleVirtual} />
			<MoveFund isOpen={moveType} back={() => setMoveType(false)} />
		</div>
	);
};

export default Wallets;

const MoveFund = ({ isOpen, back }) => {
	const { bonus, commission, manageWallet } = useContext(GlobalState);

	let [loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false);
	let handleMove = async e => {
		e?.preventDefault();
		setLoading(true);
		await manageWallet(isOpen);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (isOpen === "bonus" && submit && bonus?.isMoved) {
			setSubmit(false);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, submit, bonus?.isMoved]);

	useEffect(() => {
		if (isOpen === "commission" && submit && commission?.isMoved) {
			setSubmit(false);
			back();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, submit, commission?.isMoved]);

	return (
		<>
			<ModalComponents
				isOpen={isOpen}
				back={back}
				title={`Move ${isOpen} wallet`}>
				<form>
					<div className="downH2 d-flex align-items-center justify-content-center">
						<form className="">
							<p>Do you want to move {isOpen} to main wallet?</p>
							<div className="btn-group mx-auto w-100">
								<Buttons
									loading={loading}
									onClick={handleMove}
									width="w-50"
									css="btn-primary1 text-capitalize py-3 w-50"
									title={"yes"}
								/>
								<Buttons
									onClick={back}
									width="w-50"
									css="btn-secondary text-capitalize py-3 w-50"
									title={"no"}
								/>
							</div>
						</form>
					</div>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeWithdraw = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Choose card">
				<form>
					<CardList />
					<Buttons
						title={"withdraw"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeCards = ({ isOpen, back, back2 }) => {
	const { manageFundWallet, wallet } = useContext(GlobalState);
	let init = {
			card_number: "",
			card_cvv: "",
			card_expiry: "",
		},
		[payment_data, setPaymentData] = useState(init),
		[isAdd, setIsAdd] = useState(false),
		[amount, setAmount] = useState(""),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		[loading2, setLoading2] = useState(false),
		[submit2, setSubmit2] = useState(false),
		[updateType, setUpdateType] = useState(""),
		[updateValue, setUpdateValue] = useState({
			status: "",
			reference: "",
		}),
		toggle = () => {
			setIsAdd(!isAdd);
		},
		textChange =
			name =>
			({ target: { value } }) => {
				setPaymentData({ ...payment_data, [name]: value });
			},
		handleSubmit = async e => {
			e?.preventDefault();
			setLoading(true);
			console.log({ payment_data });
			await manageFundWallet({ payment_data, amount });
			setLoading(false);
			setSubmit(true);
		},
		handleSubmitUpdate = async e => {
			e?.preventDefault();
			setLoading2(true);
			let data = { ...updateValue };

			if (updateValue?.status === "send_pin")
				data = { ...data, pin: updateType };
			else if (updateValue?.status === "send_otp")
				data = { ...data, otp: updateType };
			else if (updateValue?.status === "send_phone")
				data = { ...data, phone: updateType };
			else if (updateValue?.status === "send_birthday")
				data = { ...data, birthday: updateType };

			console.log({ data, updateValue });
			await manageFundWallet(data, "update");
			setLoading2(false);
			setSubmit2(true);
		},
		setDetails = data => {
			setPaymentData({ ...payment_data, ...data });
		};

	useEffect(() => {
		if (
			submit &&
			wallet?.isFunded &&
			wallet?.data?.status?.toLowerCase() === "success"
		) {
			back2();
			setSubmit(false);
			setPaymentData(init);
		}
		if (
			submit &&
			wallet?.isFunded &&
			wallet?.data?.status?.toLowerCase() !== "success"
		) {
			setUpdateValue(wallet?.data);
			back2();
			setSubmit(false);
			setPaymentData(init);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, wallet?.isFunded, submit2]);

	useEffect(() => {
		if (wallet?.data) {
			setUpdateValue(wallet?.data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wallet?.data]);

	useEffect(() => {
		if (submit2 && wallet?.isUpdated) {
			back2();
			setSubmit(false);
			setPaymentData(init);
			setUpdateValue({ status: "" });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit2, wallet?.isUpdated]);

	const { getCardNumberProps, getExpiryDateProps, getCVCProps, meta } =
			usePaymentInputs(),
		{ erroredInputs, touchedInputs } = meta;
	// console.log({ wallet, updateValue });
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Choose card">
				<form>
					{!isAdd && (
						<CardList
							details={setDetails}
							selectBg={payment_data?.card_number}
						/>
					)}
					<Buttons
						title={"new card"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						onClick={toggle}
					/>
					{isAdd && (
						<>
							<div className="mb-3">
								<label htmlFor="value">Card Number</label>
								<input
									{...getCardNumberProps({
										onChange: textChange("card_number"),
									})}
									value={payment_data?.card_number}
									placeholder="5394 2345 3456 5677"
									className="form-control py-3 rounded10"
									isInvalid={
										touchedInputs.cardNumber && erroredInputs.cardNumber
									}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="value">Card Expiry</label>
								<input
									{...getExpiryDateProps({
										onChange: textChange("card_expiry"),
									})}
									value={payment_data?.card_expiry}
									placeholder="12 / 24"
									className="form-control py-3 rounded10"
									isInvalid={
										touchedInputs.expiryDate && erroredInputs.expiryDate
									}
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="value">Card CVV</label>
								<input
									value={payment_data?.card_cvv}
									{...getCVCProps({ onChange: textChange("card_cvv") })}
									placeholder="345"
									className="form-control py-3 rounded10"
									isInvalid={touchedInputs.cvc && erroredInputs.cvc}
								/>
							</div>
						</>
					)}
					<div className="mb-3">
						<label htmlFor="value">Amount</label>
						<input
							type={"number"}
							placeholder="50000"
							className="form-control py-3 rounded10"
							value={amount}
							onChange={e => setAmount(e.target.value)}
						/>
					</div>
					<Buttons
						title={"fund"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						loading={loading}
						onClick={handleSubmit}
					/>
				</form>
			</ModalComponents>
			<ModalComponents
				isOpen={updateValue?.status}
				back={() => setUpdateValue({ ...updateValue, status: "" })}
				title="Finalize transaction">
				<form>
					<div className="mb-3">
						<label htmlFor="value" className="text-capitalize">
							{updateValue?.status?.split("_")?.join(" ")}
						</label>
						<input
							type={
								updateValue?.status === "send_pin" ||
								updateValue?.status === "send_otp"
									? "number"
									: updateValue?.status === "send_phone"
									? "tel"
									: updateValue?.status === "send_birthday"
									? "datetime-local"
									: "text"
							}
							placeholder="1234"
							className="form-control py-3 rounded10"
							value={updateType}
							onChange={e => setUpdateType(e.target.value)}
						/>
					</div>
					<Buttons
						title={"finalize"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
						loading={loading2}
						onClick={handleSubmitUpdate}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeVirtual = ({ isOpen, back }) => {
	const { wallet, generateVirtual } = useContext(GlobalState);
	let [loading, setLoading] = useState(false);
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="virtual accounts">
				<form>
					{wallet?.balance?.virtual ? (
						<div>
							{wallet?.balance?.virtual?.accounts?.map((it, i) => (
								<div
									key={i}
									className="my-3 d-flex align-items-center rounded10 bg-light p-3">
									<div className="d-flex me-2">
										<div
											className="p-3 d-flex rounded10 align-items-center justify-content-center"
											style={{
												background: `${colorArr[i % colorArr.length]}`,
											}}>
											<RiShieldStarFill
												size={24}
												color={`${
													colorArr[i % colorArr.length] === "#000000"
														? "#fff"
														: "#000"
												}`}
											/>
										</div>
									</div>
									<div>
										<h6 className="fw-bold text-muted">{it?.bankName}</h6>
										<h6 className="fw-bold">
											{it?.accountNumber}{" "}
											<BiCopy
												size={20}
												className="ms-3 myCursor"
												onClick={() => {
													navigator.clipboard.writeText(it?.accountNumber).then(
														() => {
															toast.info("Copied");
														},
														err => {
															toast.warn(`Could not copy: ${err}`);
														}
													);
												}}
											/>{" "}
										</h6>
									</div>
								</div>
							))}
						</div>
					) : (
						<Buttons
							title={"generate account"}
							css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
							width={"w-50"}
							onClick={async () => {
								setLoading(true);
								await generateVirtual();
								setLoading(false);
							}}
							style={{ borderRadius: "30px" }}
							loading={loading}
						/>
					)}
				</form>
			</ModalComponents>
		</>
	);
};

const MakeTransfer = ({ isOpen, back }) => {
	let { manageWallet, wallet } = useContext(GlobalState);

	let init = {
			type: "wallet",
			user: "",
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
			await manageWallet("wallet", state);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (wallet?.isTransfer && submit) {
			back();
			setSubmit(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [wallet?.isTransfer, submit]);

	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Transfer">
				<WalletForm state={state} textChange={textChange} />
				<Buttons
					title={"transfer"}
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

export const BonusCommission = ({ type }) => {
	const { bonus, commission, numberWithCommas, getWalletHistory } =
		useContext(GlobalState);

	let [state, setState] = useState(null);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getWalletHistory(type === "bonus" ? "bonus" : "commission", {
			limit: Number(
				type === "bonus"
					? bonus?.paginate?.nextPage * bonus?.paginate?.limit
					: commission?.paginate?.nextPage * commission?.paginate?.limit
			),
		});
		setLoading(false);
	};

	useEffect(() => {
		if (type === "bonus") {
			setState(bonus?.bonus);
		} else {
			setState(commission?.commission);
		}
	}, [type, bonus, commission]);

	if (!state) return;

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
					date
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
					Description
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Amount</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Balance</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">
					Previous balance
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Type</div>
			</div>
			<div className="bland2 row mx-0">
				{state?.map((item, index) => (
					<div key={index} className="row mx-0 py-3 px-0">
						<div className="col textTrunc fontReduce2 my-auto d-none d-md-flex">
							{moment(item?.createdAt).format("L")}
						</div>
						<div className="col textTrunc fontReduce2 my-auto textTrunc textTrunc3 d-none d-md-flex">
							{item?.description}
						</div>
						<div className="col textTrunc fontReduce2 my-auto">
							{numberWithCommas(item?.amount)}
						</div>
						<div className="col textTrunc fontReduce2 my-auto">
							{numberWithCommas(item?.balance)}
						</div>
						<div className="col textTrunc fontReduce2 my-auto">
							{numberWithCommas(item?.prevBalance)}
						</div>
						<div
							className={`col textTrunc fontReduce2 my-auto text-capitalize ${
								item?.type === "credit" ? "text-success" : "text-danger"
							}`}>
							{item?.type}
						</div>
					</div>
				))}
			</div>
			<BottomTab
				state={state}
				paginate={type === "bonus" ? bonus?.paginate : commission?.paginate}
			/>
			<LoadMore
				next={
					type === "bonus" ? bonus?.paginate?.next : commission?.paginate?.next
				}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};

const TransferList = () => {
	const { wallet, getWalletHistory, numberWithCommas } =
		useContext(GlobalState);
	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getWalletHistory("wallet", {
			limit: Number(wallet?.paginate?.nextPage * wallet?.paginate?.limit),
		});
		setLoading(false);
	};
	return (
		<>
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex"></div>
				<div className="col textTrunc fontReduce fw-bold Lexend d-none d-md-flex">
					type
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">
					Description
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Amount</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">
					Previous balance
				</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">Balance</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">date</div>
				<div className="col d-none d-md-flex"></div>
			</div>
			{wallet?.wallet?.length === 0 ? (
				<EmptyComponent subtitle={"Wallet is empty"} />
			) : (
				wallet?.wallet?.map((it, i) => (
					<div key={i} className="row mx-0 my-2">
						<div className="col d-none d-md-flex fontReduce2">
							<div className="d-flex">
								<div
									className="p-3 d-flex rounded10 align-items-center justify-content-center"
									style={{ background: `${colorArr[i % colorArr?.length]}` }}>
									<RiShieldStarFill
										size={24}
										color={`${
											colorArr[i % colorArr?.length] === "#000000"
												? "#fff"
												: "#000"
										}`}
									/>
								</div>
							</div>
						</div>
						<div className="col my-auto text-capitalize d-none d-md-flex fw-md-bold fontReduce2">
							{it?.title}
						</div>
						<div className="col my-auto text-capitalize textTrunc textTrunc2 fw-md-bold fontReduce2">
							{it?.description}
						</div>
						<div className="col my-auto fontReduce2">
							NGN{" "}
							{it?.amount ? numberWithCommas(Number(it?.amount).toFixed(2)) : 0}
						</div>
						<div className="col my-auto fontReduce2">
							NGN{" "}
							{it?.prevBalance
								? numberWithCommas(Number(it?.prevBalance).toFixed(2))
								: 0}
						</div>
						<div className="col my-auto fontReduce2">
							NGN{" "}
							{it?.balance
								? numberWithCommas(Number(it?.balance).toFixed(2))
								: 0}
						</div>
						<div className="col my-auto fontReduce2">
							{moment(it?.createdAt).format("DD/MM")}
						</div>
						<div className="col my-auto d-none d-md-flex fontReduce2">
							<div className="d-flex">
								<div
									className={`p-3 d-flex rounded10 align-items-center justify-content-center shadow2 myCursor horizHover ${
										it?.type === "credit"
											? "list-group-item-success"
											: "list-group-item-danger"
									}`}>
									<BiDotsHorizontalRounded size={24} />
								</div>
							</div>
						</div>
					</div>
				))
			)}
			<BottomTab state={wallet?.wallet} paginate={wallet?.paginate} />
			<LoadMore
				next={wallet?.paginate?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</>
	);
};

let CardList = ({ bg, details, selectBg }) => {
	const { wallet } = useContext(GlobalState);

	let [state, setState] = useState(null);

	useEffect(() => {
		setState(bg ? wallet?.cards?.slice(0, 2) : wallet?.cards);
	}, [bg, wallet?.cards]);

	if (!state) return;

	return (
		<>
			<div>
				{state?.map((it, i) => (
					<div
						key={i}
						onClick={details ? () => details(it) : () => {}}
						className={`my-3 d-flex align-items-center rounded10 myCursor ${
							bg ? "" : "bg-light"
						}p-3 ${
							selectBg === it?.card_number ? "list-group-item-info" : ""
						}`}>
						<div className="d-flex me-2">
							<div
								className="p-3 d-flex rounded10 align-items-center justify-content-center"
								style={{ background: i % 2 === 0 ? "#EFEFEF" : "#34302F" }}>
								{it?.brand?.toLowerCase() === "visa" ? (
									<FaCcVisa
										size={30}
										color={i % 2 !== 0 ? "#EFEFEF" : "#34302F"}
									/>
								) : (
									<FaCcMastercard
										size={30}
										color={i % 2 !== 0 ? "#EFEFEF" : "#34302F"}
									/>
								)}
							</div>
						</div>
						<div>
							<h6 className="fw-bold text-dark">
								*
								{
									it?.card_number?.split(" ")[
										it?.card_number?.split(" ")?.length - 1
									]
								}
							</h6>
							<small className="fw-bold text-dark text-capitalize">
								{it?.brand}
							</small>
							{/* <h6 className="fw-bold">
								{it?.number}{" "}
								<BiCopy
									size={20}
									className="ms-3 myCursor"
									onClick={() => {
										navigator.clipboard.writeText(it?.number).then(
											() => {
												toast.info("Copied");
											},
											err => {
												toast.warn(`Could not copy: ${err}`);
											}
										);
									}}
								/>{" "}
							</h6> */}
						</div>
					</div>
				))}
			</div>
		</>
	);
};
