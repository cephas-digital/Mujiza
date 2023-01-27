import React from "react";
import { Container } from "reactstrap";
import error from "../Assets/amico.png";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
	let navigate = useNavigate();
	return (
		<section className="aboutScreen bg-white">
			<Container className="py-3 py-md-5">
				<div className="row mx-0 g-4 g-md-5">
					<div className="col-md-6 order-2 order-md-1 my-auto">
						<h3 className="Lexend fw-bold text5 text-danger2">Oh No!</h3>
						<p className="text2 Lexend text-primary1">
							Something is gone missing.
						</p>
						<p className="fontReduce mb-3 mb-md-4">
							Nothing is found here! You can check your Internet connection or
							check back later.
						</p>
						<button
							onClick={() => navigate(-1)}
							className="btn btn-primary1 rounded20 px-3 px-md-5 py-2 py-md-3 text-uppercase">
							go back
						</button>
					</div>
					<div className="col-md-6 order-1 order-md-2 mb-4 md-md-0">
						<img
							src={error}
							alt="error"
							className="imgFluid img-fluid w-75 mx-auto d-block"
						/>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default ErrorPage;
