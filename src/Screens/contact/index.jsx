import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { Buttons, MiddleHeader } from "../../Utils";
import contactImg from "../../Assets/Contact-Us-(1).png";
import { socials } from "../../Components/Footer";
import contactImg2 from "../../Assets/Contact_Us.png";
import { toast } from "react-toastify";
import axios from "axios";

const ServicesManagement = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	let init = {
			fullname: "",
			email: "",
			telephone: "",
			subject: "",
			message: "",
			header: "Get A Quote",
		},
		[stateData, setStateData] = useState(init);

	let [loading, setLoading] = useState(false);

	let handleSubmit = async e => {
		e.preventDefault();
		if (!stateData.fullname || !stateData.email || !stateData.message) {
			return toast.warn("Please fill out your name, email and the message");
		}
		setLoading(true);
		try {
			let res = await axios.post("/api/v1/feedback", { ...stateData });
			toast.success(res.data.msg, { autoClose: 5000 });
			setLoading(false);
			setStateData(init);
		} catch (err) {
			let error = err.response?.data?.error;
			if (error) {
				error.forEach(error => toast.error(error.msg));
			}
			setLoading(false);
		}
	};

	let textChange =
		name =>
		({ target: { value } }) => {
			setStateData({ ...stateData, [name]: value });
		};
	return (
		<div className="aboutScreen">
			<Container>
				<MiddleHeader text={"contact us"} css2="j" />
				<div className="d-grid py-md-5 py-3 pt-0 blogGrid">
					<div
						className="py-md-5 py-3 pt-0 d-flex flex-column"
						data-aos="fade-right">
						<p data-aos="zoom-in" data-aos-delay="1000" className="fontReduce">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sit
							earum delectus omnis laboriosam quae ratione dolorem cumque
							pariatur neque dignissimos aut odit incidunt, placeat officia
							eaque quasi corporis et! Hic quo provident quaerat accusamus
							soluta veniam quasi repellat minus itaque ratione, optio ex magnam
							in dolores iure dicta. Ipsum inventore ducimus blanditiis quas
							expedita repellendus! Consequatur sapiente laudantium optio,
							expedita dolor obcaecati praesentium necessitatibus eos illo a
							facere suscipit quisquam alias dolorem, sunt doloremque
							dignissimos blanditiis iste, sit earum distinctio culpa architecto
							voluptas. Sunt aliquid voluptate eos itaque repudiandae, eum est.
							Repellendus molestias, est nemo dolorum iure dignissimos. Dolorum.
						</p>
						<ul className="list-group border-0 list-group-horizontal">
							{socials.map((item, index) => (
								<li
									key={index}
									className="list-group-item border-0 bg-transparent text-white d-flex align-items-center">
									<a
										className="textColor text-decoration-none fontReduceMaxhead"
										target={"_blank"}
										rel="noreferrer"
										href={item?.url}>
										{item?.icon}
									</a>
								</li>
							))}
						</ul>
					</div>
					<img
						src={contactImg}
						alt="Bg"
						className="img-fluild rounded aboutImg mx-auto h-100 w-100"
						data-aos="fade-left"
					/>
				</div>
				<div
					className="contactBg"
					style={{
						background: `url(${contactImg2})`,
					}}>
					<div className="row mx-0 col-md-8 g-5 pb-5">
						<div className="col-md-6">
							<label htmlFor="Name" className="textColor2">
								Name
							</label>
							<input
								type="text"
								className="form-control borderColor bg-transparent py-3"
								placeholder="Name"
								value={stateData?.fullname}
								onChange={textChange("fullname")}
							/>
						</div>
						<div className="col-md-6">
							<label htmlFor="Email" className="textColor2">
								Email
							</label>
							<input
								type="email"
								className="form-control borderColor bg-transparent py-3"
								placeholder="Email"
								value={stateData?.email}
								onChange={textChange("email")}
							/>
						</div>
						<div className="col-md-8">
							<label htmlFor="Message" className="textColor2">
								Message
							</label>
							<textarea
								style={{
									resize: "none",
									height: "12rem",
								}}
								className="form-control borderColor bg-transparent py-3"
								placeholder="Message"
								value={stateData?.message}
								onChange={textChange("message")}
							/>
						</div>
						<div className="col-md-6 col-8">
							<Buttons
								css={
									"text-decoration-none btn btn-primary1 text-capitalize px-5 py-4 hug w-100"
								}
								title={"Send"}
								loading={loading}
								onClick={handleSubmit}
							/>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default ServicesManagement;
