import React, { useContext, useEffect, useState } from "react";
import user from "../../Assets/avatar3.png";
import moment from "moment";
import { BiCog } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalState } from "../../Data/Context";
import { ModalComponents } from "../DefaultHeader";
import { EmptyComponent } from "../../Utils";
import { AddNotification } from "../Notification";
import LoadMore, { BottomTab } from "../LoadMore";

const Users = () => {
	return <div>Users</div>;
};

export default Users;

export const ThreeBoxBar = ({ list }) => {
	let navigate = useNavigate();
	return (
		<>
			<div className="row mx-0 g-2 g-md-4 py-3 py-md-5">
				{list?.map((item, index) => (
					<div className="col-6 col-md-4 productCard" key={index}>
						<div
							className="row mx-0 p-3 eachProduct rounded20 text-white h-100"
							onClick={() => (item?.link ? navigate(item?.link) : {})}
							style={{
								background: item?.color,
							}}>
							<div className="col my-auto d-none d-md-flex">
								<img src={item?.icon} className="img-fluid" alt="Icon" />
							</div>
							<div className="col my-auto">
								<p className="text2 m-0">{item?.number}</p>
								<h6 className="text-capitalize fontReduce2">{item?.name}</h6>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export const UserListOne = () => {
	const { users, numberWithCommas, loadAllUser } = useContext(GlobalState);
	let [data, setData] = useState(null),
		[isOpen, setIsOpen] = useState(false),
		[loading, setLoading] = useState(false),
		[mainUser, setMainUser] = useState(null),
		toggle = () => {
			if (isOpen) {
				setMainUser(null);
			}
			setIsOpen(!isOpen);
		},
		navigate = useNavigate(),
		{ page } = useParams(),
		[isUser, setIsUser] = useState(null),
		toggleNotify = () => {
			setIsUser(null);
		};

	let handleLoadMore = async () => {
		setLoading(true);

		await loadAllUser({
			limit: Number(users?.paginate?.nextPage * users?.paginate?.limit),
		});
		setLoading(false);
	};

	useEffect(() => {
		setData(page === "dashboard" ? users?.users?.slice(0, 10) : users?.users);
	}, [users?.users, page]);

	if (!data) return;

	let actionArr = [
		{
			name: "Profile",
			type: "link",
			link: `/users/profile`,
		},
		{
			name: "wallet history",
			type: "link",
			link: `/users/wallet`,
		},
		{
			name: "purchase history",
			type: "link",
			link: `/users/purchase`,
		},
		{
			name: "notification",
			type: "button",
			link: `notification`,
		},
		{ name: "disable user", type: "button", link: `disable` },
	];

	return (
		<div className="pb-5 my-5">
			<div className="bland row mx-0 py-3 text-capitalize">
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					Name
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					number
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend d-none d-md-flex">
					date
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					balance
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend d-none d-md-flex">
					Email
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend d-none d-md-flex">
					Wallet ID
				</div>
				<div className="col textTrunc text-uppercase fontReduce fw-bold Lexend">
					Action
				</div>
			</div>
			<div className="bland2 row mx-0">
				{data?.length === 0 ? (
					<EmptyComponent subtitle={"Users' list is empty"} />
				) : (
					data?.map((item, index) => (
						<div key={index} className="row mx-0 p-3">
							<div className="col fontReduce2 textTrunc my-auto">
								<div className="d-flex align-items-center">
									<img
										src={item?.avatar ? item?.avatar?.url : user}
										alt="User"
										className="img-fluid rounded-circle d-none d-md-flex"
										style={{
											height: "3rem",
											width: "3rem",
										}}
									/>
									<span className="fontInherit my-0 ps-0 ps-md-1 textTrunc fontReduce2">
										{item?.lastName} {item?.firstName}
									</span>
								</div>
							</div>
							<div className="col fontReduce2 textTrunc my-auto">
								{item?.telephone}
							</div>
							<div className="col fontReduce2 textTrunc my-auto d-none d-md-flex">
								{moment(item?.createdAt).format("L")}
							</div>
							<div className="col fontReduce2 textTrunc my-auto">
								NGN {numberWithCommas(item?.wallet?.available)}
							</div>
							<div className="col fontReduce2 textTrunc my-auto d-none d-md-flex">
								{item?.email}
							</div>
							<div className="col fontReduce2 textTrunc my-auto d-none d-md-flex">
								{item?.wallet?.wallet_id}
							</div>
							<div
								className="col fontReduce2 textTrunc my-auto myCursor"
								onClick={() => {
									setMainUser(item);
									toggle();
								}}>
								<BiCog size={24} />
							</div>
							<ModalComponents
								title={"Manage User"}
								isOpen={isOpen}
								back={toggle}>
								<div className="row mx-0 g-4 g-md-5">
									{actionArr?.map((a, i) => (
										<div className="col-6 px-3" key={i}>
											<button
												onClick={
													a?.type === "button"
														? a?.link === "notification"
															? () => {
																	setIsUser(mainUser?._id);
															  }
															: null
														: () =>
																navigate(
																	`${a?.link}/${mainUser?._id}?name=${mainUser?.lastName}_${mainUser?.firstName}`
																)
												}
												className="btn btn-outline-primary1 text-capitalize w-100 py-3">
												{a?.name}
											</button>
										</div>
									))}
								</div>
							</ModalComponents>
						</div>
					))
				)}
			</div>
			{page !== "dashboard" && (
				<>
					<BottomTab state={data} paginate={users?.paginate} />
					<LoadMore
						next={users?.paginate?.next}
						handleLoadMore={handleLoadMore}
						loading={loading}
					/>
				</>
			)}
			<AddNotification isOpen={isUser} back={toggleNotify} />
		</div>
	);
};
