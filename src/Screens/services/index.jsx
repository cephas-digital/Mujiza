import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { GainHeader, ProductServices, StandToGain } from "../home";
import aboutImg from "../../Assets/Saly-21.png";
import { Container } from "reactstrap";

const Services = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
		AOS.init({ duration: 1000 });
	}, []);
	return (
		<>
			<Container className="pb-5">
				<div className="d-grid py-5 blogGrid">
					<div className="py-5 d-flex flex-column" data-aos="fade-right">
						<h2 className="textColor mb-3">
							What we can do{" "}
							<span className="textColor2 fontInherit">for you</span>
						</h2>
						<p
							data-aos="zoom-in"
							data-aos-delay="1000"
							className="fontReduce  ">
							Yes, we got you covered, With Mu'ujiza Enjoy a easy and fast data
							delivery with Optimal security and also enjoy the best offers and
							discount sales on all our products periodically.
						</p>
					</div>
					<img
						src={aboutImg}
						alt="Bg"
						className="img-fluild rounded aboutImg mx-auto"
						data-aos="fade-left"
					/>
				</div>
			</Container>
			<ProductServices />
			<GainHeader />
			<StandToGain />
		</>
	);
};

export default Services;
