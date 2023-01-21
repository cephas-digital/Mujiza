import React, { useState, useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { Buttons } from "../../Utils";
import moment from "moment";
import { ModalComponents } from "..";
import { GlobalState } from "../../Data/Context";
import LoadMore, { BottomTab } from "../LoadMore";

const Education = () => {
	let [isOpen, setIsOpen] = useState(false),
		toggle = () => {
			setIsOpen(!isOpen);
		};

	let { setStateName, educations, buyServices } = useContext(GlobalState);
	useEffect(() => {
		setStateName("education history");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let init = {
			numberOfPin: "",
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
			await buyServices("education", state);
			setLoading(false);
			setSubmit(true);
		};

	useEffect(() => {
		if (educations?.isAdded && submit) {
			setIsOpen(false);
			setSubmit(false);
			setState(init);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [educations?.isAdded, submit]);

	return (
		<div className="bg-white aboutScreen">
			<Container className="py-5">
				<Buttons
					title={"buy education"}
					css="btn-primary1 text-capitalize py-3 px-4 px-lg-5"
					width={"w-25 w25"}
					onClick={toggle}
					style={{ borderRadius: "30px" }}
				/>
				<EducationHistory />
			</Container>
			<ModalComponents title="buy education" isOpen={isOpen} back={toggle}>
				<div className="downH2 d-flex">
					<form className="w-100">
						<div className="mb-4">
							<label htmlFor="Education">Education type</label>
							<select
								className="form-control py-3 py-md-4 text-capitalize form-select"
								name="type"
								placeholder="Education"
								value={state?.type}
								onChange={textChange("type")}
								id="type">
								<option value="">select type</option>
								<option value="WAEC">WAEC</option>
								<option value="NECO">NECO</option>
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
							<label htmlFor="numberOfPin">Number of pins</label>
							<input
								type={"number"}
								placeholder="2"
								className="form-control py-3"
								value={state?.numberOfPin}
								onChange={textChange("numberOfPin")}
							/>
						</div>
						<Buttons
							title={"buy"}
							css="btn-primary1 text-capitalize py-3 w-50 my-4 mx-auto"
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

export default Education;

const EducationHistory = () => {
	let { educations, numberWithCommas, getServicesHistory } =
		useContext(GlobalState);

	let [data, setData] = useState(null);

	useEffect(() => {
		setData(educations?.education);
	}, [educations?.education]);

	let [loading, setLoading] = useState(false);
	let handleLoadMore = async () => {
		setLoading(true);

		await getServicesHistory("education", {
			limit: Number(
				educations?.paginate?.nextPage * educations?.paginate?.limit
			),
		});
		setLoading(false);
	};

	if (!data) return;
	// console.log({ data });

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 p-3 text-capitalize">
				<div className="col textTrunc fontReduce fw-bold Lexend">ID</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">type</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">date</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">amount</div>
				<div className="col textTrunc fontReduce fw-bold Lexend">status</div>
			</div>
			<div className="bg-white row mx-0">
				{data?.length === 0 ? (
					<></>
				) : (
					data?.map((item, index) => (
						<div key={index} className="row mx-0 py-3">
							<div className="col my-auto textTrunc fontReduce2">
								{item?.item_id}
							</div>
							<div className="col my-auto textTrunc fontReduce2">
								{item?.properties?.type}
							</div>
							<div className="col my-auto textTrunc fontReduce2">
								{moment(item?.createdAt).format("L")}
							</div>
							<div className="col my-auto textTrunc fontReduce2">
								{item?.properties?.numberOfPin}
							</div>
							<div className="col my-auto textTrunc fontReduce2">
								{numberWithCommas(item?.properties?.amount)}
							</div>
							<div
								className={`col textTrunc fontReduce2 my-auto text-capitalize ${
									item?.status ? "text-success" : "text-danger"
								}`}>
								{item?.statusText}
							</div>
						</div>
					))
				)}
			</div>
			<BottomTab state={data} paginate={educations?.paginate} />
			<LoadMore
				next={educations?.paginate?.next}
				handleLoadMore={handleLoadMore}
				loading={loading}
			/>
		</div>
	);
};
