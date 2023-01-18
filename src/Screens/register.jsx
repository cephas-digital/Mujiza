import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../Data/Context";
import { useNavigate, Link } from "react-router-dom";
import { Container } from "reactstrap";
import { Buttons, EyeToggle } from "../Utils";
import logo from "../Assets/logo.png";
import { toast } from "react-toastify";

const Register = () => {
	const { registerUser, auth } = useContext(GlobalState);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let [typePass, setTypePass] = useState(false),
		[typePass2, setTypePass2] = useState(false),
		init = {
			firstName: "",
			lastName: "",
			telephone: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		[state, setState] = useState(init),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		navigate = useNavigate(),
		textChange =
			name =>
			({ target: { value } }) => {
				setState({ ...state, [name]: value });
			};

	let handleSubmit = async e => {
		e.preventDefault();
		if (
			!state?.password ||
			!state?.email ||
			!state?.firstName ||
			!state?.lastName ||
			!state?.telephone
		)
			return toast.info("Please fill out all fields");
		if (state?.password !== state?.confirmPassword)
			return toast.error("Password do not match");

		if (
			!/\d/.test(state?.password) ||
			// eslint-disable-next-line no-useless-escape
			!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(state?.password) ||
			state?.password?.length < 8
		)
			return toast.error(
				`Password must be at least 8 characters long, contains at least one number, one uppercase, one lowercase letter and one special character`
			);
		setLoading(true);
		await registerUser(state);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && auth?.isRegistered) {
			setSubmit(false);
			navigate("/activate");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, auth?.isRegistered]);
	return (
		<DefaultAuthComponent>
			<>
				<h3 className="text-capitalize text-center">Create account</h3>
				<small className="mb-4 d-block text-center">
					Enjoy the things that you love!
				</small>
				<form className="mt-4">
					<div className="mb-3">
						<label htmlFor="firstName">FirstName</label>
						<input
							type="text"
							required
							name="firstName"
							className="form-control py-3"
							value={state.firstName}
							onChange={textChange("firstName")}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="lastName">LastName</label>
						<input
							type="text"
							required
							name="lastName"
							className="form-control py-3"
							value={state.lastName}
							onChange={textChange("lastName")}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							required
							name="email"
							className="form-control py-3"
							value={state.email}
							onChange={textChange("email")}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="telephone">Phone number</label>
						<input
							type="tel"
							required
							name="telephone"
							className="form-control py-3"
							value={state.telephone}
							onChange={textChange("telephone")}
						/>
					</div>
					<div className="mb-3 show-hide2 show-hide position-relative">
						<label htmlFor="Password">Password</label>
						<input
							type={typePass ? "text" : "password"}
							required
							name="password"
							className="form-control py-3"
							value={state.password}
							onChange={textChange("password")}
						/>
						<EyeToggle typePass={typePass} setTypePass={setTypePass} />
					</div>
					<div className="mb-5 show-hide2 show-hide position-relative">
						<label htmlFor="ConfirmPassword">Confirm Password</label>
						<input
							type={typePass2 ? "text" : "password"}
							required
							name="confirmPassword"
							className="form-control py-3"
							value={state.confirmPassword}
							onChange={textChange("confirmPassword")}
						/>
						<EyeToggle typePass={typePass2} setTypePass={setTypePass2} />
					</div>
					<Buttons
						onClick={handleSubmit}
						loading={loading}
						title={"sign in"}
						css="btn-primary1 text-capitalize py-3 w-100 my-4"
					/>
					<p className="text-center">
						By continuing you accept our standard terms and conditions and our
						privacy policy.
					</p>
					<p className="text-center">
						Already have an account?
						<Link
							to={`/login`}
							className="textColor ps-1 text-decoration-none fw-600">
							Log in
						</Link>{" "}
					</p>
					<p className="my-4 justify-content-end d-flex">
						<Link
							to={`/activate`}
							className="text-decoration-none fw-600 text-dark">
							Activate account here
						</Link>{" "}
					</p>
				</form>
			</>
		</DefaultAuthComponent>
	);
};

export default Register;

export const DefaultAuthComponent = ({ children }) => {
	return (
		<div className="aboutScreen bg-select-blue d-flex justify-content-center align-items-center py-md-5">
			<div
				data-aos="zoom-in"
				className="m-auto shadow px-3 py-5 rounded20 shadow2 w-100 bg-white"
				style={{
					maxWidth: "500px",
				}}>
				<Container className="px-lg-5 px-3">
					<span
						to="/"
						className="text-decoration-none text-dark d-flex align-items-center mb-4">
						<img src={logo} alt="kemtech" className="logo kemtech-logo me-1" />
						{/* <div className="d-none d-md-block">
							<p className="text-capitalize site-primary-color m-0">Kemtech</p>
							<p className="text-capitalize site-secondary-color m-0">Enterprises</p>
						</div> */}
					</span>
					{children}
				</Container>
			</div>
		</div>
	);
};
