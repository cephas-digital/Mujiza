import React, { useState, useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { Buttons } from "../../Utils";
import moment from "moment";
import { ModalComponents } from "..";
import { GlobalState } from "../../Data/Context";
import LoadMore, { BottomTab } from "../LoadMore";

const Airtime = () => {
	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};

	let { setStateName, general, airtimes, buyServices } =
		useContext(GlobalState);
	useEffect(() => {
		setStateName("airtime history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let init = {
			phone: "",
			amount: "",
			network: "",
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
			await buyServices("airtime", state);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (airtimes?.isAdded && submit) {
			setIsOpen(false);
			setSubmit(false);
		}
	}, [airtimes?.isAdded, submit]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<Buttons
					title={"buy airtime"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
					width={"w-25 w25"}
					onClick={toggle}
					style={{ borderRadius: "30px" }}
				/>
				<AirtimeHistory />
			</Container>
			<ModalComponents title="buy airtime" isOpen={isOpen} back={toggle}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="Newtwork">Network</label>
							<select
								className="form-control py-3 py-md-4 text-capitalize form-select"
								name="network"
								placeholder="Network"
								value={state?.network}
								onChange={textChange("network")}
								id="network">
								<option value="">select network</option>
								{general?.networks?.map((item, i) => (
									<option value={item} key={i}>
										{item}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label htmlFor="value">Amount</label>
							<input
								type={"number"}
								placeholder="500"
								className="form-control py-3"
								value={state?.amount}
								onChange={textChange("amount")}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="telephone">Phone number</label>
							<input
								type={"tel"}
								placeholder="08012345678"
								className="form-control py-3"
								value={state?.phone}
								onChange={textChange("phone")}
							/>
						</div>
						<Buttons
							title={"buy"}
							css="btn-primary1 text-capitalize py-3 w-50 my-4"
							width={"w-50"}
							style={{ borderRadius: "30px" }}
							loading={loading}
							onClick={handleSubmit}
						/>
					</form>
				</div>
			</ModalComponents>
		</div>
	);
};

export default Airtime;

const AirtimeHistory = () => {
	let { airtimes, numberWithCommas, getServicesHistory } =
		useContext(GlobalState);

	let [data, setData] = useState(null);

	useEffect(() => {
		setData(airtimes?.airtime);
	}, [airtimes?.airtime]);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getServicesHistory("airtime", {
			limit: Number(airtimes?.paginate?.nextPage * airtimes?.paginate?.limit),
		});
		setLoading(false);
	};

	if (!data) return;
	// console.log({ data });

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 p-3 text-capitalize">
				<div className="col">ID</div>
				<div className="col">network</div>
				<div className="col">date</div>
				<div className="col">discount</div>
				<div className="col">price</div>
				<div className="col">status</div>
			</div>
			<div className="bg-white row mx-0">
				{data?.length === 0 ? (
					<></>
				) : (
					data?.map((item, index) => (
						<div key={index} className="row mx-0 py-3">
							<div className="col my-auto">{item?.item_id}</div>
							<div className="col my-auto">{item?.properties?.network}</div>
							<div className="col my-auto">
								{moment(item?.createdAt).format("L")}
							</div>
							<div className="col my-auto">{item?.properties?.phone}</div>
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
					))
				)}
			</div>
			<BottomTab state={data} paginate={airtimes?.paginate} />
			<LoadMore
				next={airtimes?.paginate?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};
