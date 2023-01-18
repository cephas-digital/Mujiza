import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { ModalComponents } from "../DefaultHeader";
import { Buttons } from "../../Utils";
import moment from "moment";
import image from "../../Assets/logo.png";
import { GlobalState } from "../../Data/Context";

const Bundles = () => {
	let { setStateName, auth } = useContext(GlobalState);
	let [mainData, setMainData] = useState(false);
	let params = useParams();

	useEffect(() => {
		if (auth?.user?.privilege === "user") {
			setMainData([
				{
					name: "CG wallet",
					type: "link",
					link: `/${params?.page}`,
					block: "wallet",
				},
				{
					name: "transfer history",
					type: "link",
					link: `/${params?.page}/transfer`,
					block: "transfer",
				},
				{
					name: "purchase history",
					type: "link",
					link: `/${params?.page}/purchase`,
					block: "purchase",
				},
				{ name: "request", type: "button", link: "request" },
			]);
		} else if (auth?.user?.privilege === "agent") {
			setMainData([
				{
					name: "CG wallet",
					type: "link",
					link: `/${params?.page}`,
					block: "wallet",
				},
				{ name: "transfer", type: "button", link: "transfer" },
				{
					name: "transfer history",
					type: "link",
					link: `/${params?.page}/transfer`,
					block: "transfer",
				},
				{
					name: "purchase history",
					type: "link",
					link: `/${params?.page}/purchase`,
					block: "purchase",
				},
				{ name: "request", type: "button", link: "request" },
				{ name: "add new package", type: "button", link: "new" },
			]);
		}
	}, [auth?.user?.privilege, params?.page]);

	let [active, setActive] = useState(0);
	useEffect(() => {
		setStateName(
			mainData?.[active]?.block === "transfer"
				? "CG Transfer"
				: mainData?.[active]?.block === "purchase"
				? "CG purchase"
				: "CG wallet"
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active]);

	let [isNew, setIsNew] = useState(false),
		[isTransfer, setIsTransfer] = useState(false),
		[isRequest, setIsRequest] = useState(false),
		toggleNew = () => {
			setIsNew(!isNew);
		},
		toggleTransfer = () => {
			setIsTransfer(!isTransfer);
		},
		toggleRequest = () => {
			setIsRequest(!isRequest);
		};

	if (!mainData) return;

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<div className="row mx-0 g-2 g-md-3">
					{mainData?.map((it, i) => (
						<div className="col-6 col-md-4 p-1 p-md-3" key={i}>
							<button
								style={{ borderRadius: "30px" }}
								key={i}
								onClick={() => {
									if (it?.type === "link") {
										setActive(i);
									} else if (it?.type === "button") {
										if (it?.link === "new") toggleNew();
										if (it?.link === "transfer") toggleTransfer();
										if (it?.link === "request") toggleRequest();
									}
								}}
								className="btn btn-outline-primary1 py-2 py-md-3 text-capitalize w-100 textTrunc">
								<span className="textTrunc">{it?.name}</span>
							</button>
						</div>
					))}
				</div>
				<h4 className="text-capitalize my-3 Lexend">
					{mainData?.[active]?.name} bundles
				</h4>
				{mainData?.[active]?.block === "transfer" ||
				mainData?.[active]?.block === "purchase" ? (
					<TransferHistory active={active} />
				) : (
					<CGWallet />
				)}
			</Container>
			<MakeRequest isOpen={isRequest} back={toggleRequest} />
			<MakeTransfer isOpen={isTransfer} back={toggleTransfer} />
			<MakeNew isOpen={isNew} back={toggleNew} />
		</div>
	);
};

export default Bundles;

const MakeRequest = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="CG Request">
				<form>
					<div className="form mb-3">
						<label htmlFor="bundle">Choose bundle</label>
					</div>
					<div className="form mb-3">
						<label htmlFor="bundle">Pay</label>
					</div>
					<Buttons
						title={"submit"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeTransfer = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="Transfer CG">
				<form>
					<div className="form mb-3">
						<label htmlFor="bundle">Choose bundle</label>
					</div>
					<div className="form mb-3">
						<label htmlFor="bundle">Pay</label>
					</div>
					<Buttons
						title={"submit"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const MakeNew = ({ isOpen, back }) => {
	return (
		<>
			<ModalComponents isOpen={isOpen} back={back} title="New CG Plan">
				<form>
					<div className="form mb-3">
						<label htmlFor="bundle">Choose bundle</label>
					</div>
					<div className="form mb-3">
						<label htmlFor="bundle">Pay</label>
					</div>
					<Buttons
						title={"submit"}
						css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
						width={"w-50"}
						style={{ borderRadius: "30px" }}
					/>
				</form>
			</ModalComponents>
		</>
	);
};

const TransferHistory = ({ active }) => {
	let userList = [
		{
			type: "Coperate gifting",
			createdAt: Date.now(),
			value: "50000",
			id: "1234567890",
			network: "MTN",
		},
	];

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 py-3 px-0 text-capitalize">
				<div className="col textTrunc">type</div>
				<div className="col textTrunc">network</div>
				<div className="col textTrunc">
					<span className="d-none d-md-flex">
						{active !== 2 ? `sender's` : `receiver's`}
					</span>{" "}
					ID
				</div>
				<div className="col textTrunc">value</div>
				<div className="col textTrunc">date</div>
			</div>
			<div className="bland2 row mx-0">
				{userList?.map((item, index) => (
					<div key={index} className="row mx-0 py-3 px-0">
						<div className="col textTrunc my-auto fontReduceMini">
							{item?.type}
						</div>
						<div className="col textTrunc my-auto fontReduceMini">
							{item?.network}
						</div>
						<div className="col textTrunc my-auto fontReduceMini">
							{item?.id}
						</div>
						<div className="col textTrunc my-auto fontReduceMini">
							{item?.value}
						</div>
						<div className="col textTrunc my-auto fontReduceMini">
							{moment(item?.createdAt).format("L")}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const CGWallet = () => {
	let bgArr = [
		"#F1EEEA",
		"#E5DDF2",
		"#E9F5FA",
		"#DBC7DA",
		"#E6EDE8",
		"#C7DBCD",
		"#FAE9EA",
		"#C7DBDB",
		"#EDE6E6",
		"#C7DBDB",
		"#E9EBFA",
		"rgba(186, 255, 174, 0.8)",
	];
	let walletType = [
		{
			name: "MTN Corporate Gifting",
			image,
			balance: "10GB",
		},
		{
			name: "Glo  Gifting",
			image,
			balance: "10GB",
		},
		{
			name: "Airtel Giting",
			image,
			balance: "10GB",
		},
		{
			name: "Etisalat Giting",
			image,
			balance: "10GB",
		},
		{
			name: "MTN Corporate Gifting",
			image,
			balance: "10GB",
		},
		{
			name: "Glo  Gifting",
			image,
			balance: "10GB",
		},
		{
			name: "Airtel Giting",
			image,
			balance: "10GB",
		},
		{
			name: "Etisalat Giting",
			image,
			balance: "10GB",
		},
		{
			name: "MTN Corporate Gifting",
			image,
			balance: "10GB",
		},
		{
			name: "Glo  Gifting",
			image,
			balance: "10GB",
		},
		{
			name: "Airtel Giting",
			image,
			balance: "10GB",
		},
		{
			name: "Etisalat Giting",
			image,
			balance: "10GB",
		},
	];

	return (
		<>
			<div className="row mx-0 g-2 g-md-4">
				{walletType?.map((it, i) => (
					<div className="col-6 col-md-3 p-2 p-md-3" key={i}>
						<div
							className="shadow2 rounded20 p-3 myCursor eachProduct CgWallet"
							style={{
								background: bgArr?.[i % bgArr?.length],
							}}>
							<div className="d-md-flex align-items-center">
								<img
									src={it?.image}
									alt={it?.name}
									className="me-md-2 mb-1 mb-md-0"
								/>
								<h5 className="fontReduceBig Lexend">{it?.name}</h5>
							</div>
							<h4 className="fontReduceBig">
								Balance:{" "}
								<span className="fontInherit Lexend">{it?.balance}</span>
							</h4>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
