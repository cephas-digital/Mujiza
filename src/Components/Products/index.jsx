import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../Data/Context";
import { BsPhone, BsTelephoneFill, BsPlugFill } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { IoTvSharp } from "react-icons/io5";
import { AiOutlineSwap } from "react-icons/ai";

export let productArr = [
	{
		name: "Data",
		link: "/data",
		color: "linear-gradient(90.18deg, #3199B7 -52.19%, #144468 81.92%)",
		textColor: "white",
		icon: <BsPhone className="iconDash" />,
	},
	{
		name: "Airtime",
		link: "/airtime",
		color: "linear-gradient(90deg, #DE0DE2 16.14%, #880EC2 101.45%)",
		textColor: "white",
		icon: <BsTelephoneFill className="iconDash" />,
	},
	{
		name: "Airtime to Cash",
		link: "/converter",
		color: "linear-gradient(90deg, #DE0DE2 16.14%, #0E102D 101.45%)",
		textColor: "white",
		icon: <AiOutlineSwap className="iconDash" />,
	},
	{
		name: "Education",
		link: "/education",
		color: "linear-gradient(96.86deg, #F2E553 18.88%, #FF9900 125.77%)",
		icon: <FaGraduationCap className="iconDash" />,
	},
	// {
	// 	name: "TV subscription",
	// 	link: "/tv-subscriptions",
	// 	color: "linear-gradient(90deg, #DE0DE2 16.14%, #0E102D 101.45%)",
	// 	textColor: "white",
	// icon: <BsPhone className="iconDash" />,
	// },
	// {
	// 	name: "Generate data pins",
	// 	link: "/data-pin",
	// 	color: "linear-gradient(96.86deg, #53F293 18.88%, #9EFF00 125.77%)",
	// 	textColor: "black",
	// icon: <BsPhone className="iconDash" />,
	// },
	{
		name: "Electricity bills",
		link: "/electricity-bills",
		color: "linear-gradient(90deg, #E43369 16.14%, #C20E19 101.45%)",
		textColor: "white",
		icon: <BsPlugFill className="iconDash" />,
	},
	{
		name: "Cable Subscriptions",
		link: "/tv-subscriptions",
		color: "linear-gradient(90.18deg, #6CB731 -52.19%, #0F5A16 81.92%)",
		textColor: "white",
		icon: <IoTvSharp className="iconDash" />,
	},
];

const Products = () => {
	let { setStateName, auth } = useContext(GlobalState);
	useEffect(() => {
		setStateName("all products");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [state, setState] = useState([]);

	useEffect(() => {
		setState(productArr);
	}, [auth?.user]);

	let params = useParams();

	return (
		<div className="bg-white aboutScreen">
			<Container>
				<div className="row mx-0 g-2 g-md-4 py-4 py-md-5">
					{state?.map((item, i) => (
						<div className="col-6 col-md-4 productCard" key={i}>
							<Link
								to={
									item?.link?.includes("converter")
										? item?.link
										: `/${params?.page}${item?.link}`
								}
								className="d-flex align-items-center justify-content-center text2 myCursor text-decoration-none h-100 eachProduct fontReduceBig textTrunc p-2 p-md-0 py-3 py-md-0 h-100"
								style={{
									background: item?.color,
									borderRadius: "30px",
									color: item?.textColor ? item?.textColor : "#000",
								}}>
								<span className="textTrunc fontInherit">{item?.name}</span>
							</Link>
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default Products;
