import { useContext, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { GlobalState } from "../Data/Context";
import user from "../Assets/avatar3.png";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const DefaultHeader = () => {
	const { auth, stateName } = useContext(GlobalState);
	let navigate = useNavigate(),
		param = useLocation();
	return (
		<section className="border-bottom bg-white">
			<div className="pe-md-5 px-2 ps-md-3 d-flex align-items-center barFont justify-content-between defaultHead">
				<div className="w-100 d-flex align-items-center ps-md-auto ps-4">
					{param.pathname === "/dashboard" ? (
						<></>
					) : (
						<BiArrowBack
							className="ms-2 ms-md-5 myCursor"
							onClick={() => navigate(-1)}
						/>
					)}
					<h3 className="ms-2 text-capitalize my-0 fontReduceBig Lexend">
						{stateName ? stateName : param.pathname.split("/")[1]}
					</h3>
				</div>
				<header className="d-flex align-items-center my-auto justify-content-end container">
					<Link
						className="text-dark text-decoration-none d-flex align-items-center"
						to="/settings">
						<img
							src={auth?.user?.avatar?.url ? auth?.user?.avatar?.url : user}
							alt={`${auth?.user?.fullname} `}
							style={{
								height: "3.5rem",
								width: "3.5rem",
								objectFit: "cover",
								objectPosition: "center 15%",
							}}
							className="rounded-circle img-fluid mx-md-3"
						/>
						<h6 className="d-none d-md-flex">
							{auth?.user?.firstName} {auth?.user?.lastName}
						</h6>
					</Link>
				</header>
			</div>
		</section>
	);
};

export default DefaultHeader;

export const TabHeader = ({ title, subtitle }) => {
	let { page } = useParams();
	return (
		<>
			<h3 className="text-capitalize lexendFont">{title ? title : page}</h3>
			<p className="text-capitalize">
				{subtitle
					? subtitle
					: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta,
				impedit.`}
			</p>
		</>
	);
};

export const ModalComponents = ({
	isOpen,
	toggle,
	title,
	children,
	back,
	size,
	notHeader,
}) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);
	return (
		<Modal
			isOpen={isOpen}
			centered
			scrollable
			size={size}
			className={notHeader ? "p-0 overflow-hidden" : ""}>
			{!notHeader && (
				<ModalHeader
					toggle={toggle}
					className="borderNone text-capitalize genSansFont textColor2">
					{back && <BiArrowBack className="me-3 myCursor" onClick={back} />}
					{title}
				</ModalHeader>
			)}
			<ModalBody className={notHeader ? "p-0 overflow-hidden" : ""}>
				{children}
			</ModalBody>
		</Modal>
	);
};
