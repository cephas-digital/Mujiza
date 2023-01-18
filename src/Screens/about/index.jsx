import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { GainHeader, StandToGain } from "../home";
import aboutImg from "../../Assets/Saly-21.png";
import aboutImg2 from "../../Assets/Saly-13@2x.png";
import { Container } from "reactstrap";

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
		AOS.init({ duration: 1000 });
	}, []);
	return (
		<>
			<Container className="pb-5">
				<div className="d-grid  py-5 blogGrid">
					<div
						data-aos="fade-right"
						className="d-flex align-items-center flex-column justify-content-center">
						<img
							src={aboutImg}
							alt="Bg"
							className="img-fluild rounded w-100 h-100 aboutImg"
							data-aos="fade-right"
						/>
					</div>

					<div className="py-5 d-flex flex-column">
						<h2 className="textColor mb-3">About us</h2>
						<p data-aos="zoom-in" data-aos-delay="1000" className="fontReduce">
							Mu'ujiza is a convenient platform for purchasing data and airtime,
							as well as obtaining cable and Waec/Neco subscriptions. We offer
							easy and rapid airtime top-up services at competitive rates, and
							we are committed to delivering prompt and timely service for all
							transactions. Our well-trained customer support team is available
							24/7 to assist you with any issues or questions you may have. We
							strive to provide the best value for every transaction and make it
							easy for you to access the services you need.
						</p>
					</div>
				</div>
				<div className="d-none py-5 blogGrid">
					<img
						src={aboutImg2}
						alt="Bg"
						className="img-fluild rounded w-100 h-100 aboutImg"
						data-aos="fade-right"
					/>
					<div className="py-5 d-flex flex-column">
						<h2 className="textColor mb-3">Our Mission</h2>
						<p data-aos="zoom-in" data-aos-delay="1000" className="fontReduce">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum sit
							earum delectus omnis laboriosam quae ratione dolorem cumque
							pariatur neque dignissimos aut odit incidunt, placeat officia
							eaque quasi corporis et! Hic quo provident quaerat accusamus
							soluta veniam quasi repellat minus itaque ratione, optio ex magnam
						</p>
						<div className="py-5 d-flex flex-column">
							<h2 className="textColor mb-3">Our Vision</h2>
							<p
								data-aos="zoom-in"
								data-aos-delay="1000"
								className="fontReduce">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
								sit earum delectus omnis laboriosam quae ratione dolorem cumque
								pariatur neque dignissimos aut odit incidunt, placeat officia
								eaque quasi corporis et! Hic quo provident quaerat accusamus
								soluta veniam quasi repellat minus itaque ratione, optio ex
								magnam
							</p>
						</div>
					</div>
				</div>
			</Container>
			<GainHeader />
			<StandToGain />
		</>
	);
};

export default About;
