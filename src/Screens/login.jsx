import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../Data/Context";
import { useNavigate, Link } from "react-router-dom";
import { Buttons, EyeToggle } from "../Utils";
import { DefaultAuthComponent } from "./register";

const Login = () => {
	const { loginUser, auth } = useContext(GlobalState);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let [typePass, setTypePass] = useState(false),
		init = {
			email: "",
			password: "",
		},
		[stateData, setStateData] = useState(init),
		[loading, setLoading] = useState(false),
		[submit, setSubmit] = useState(false),
		navigate = useNavigate(),
		textChange =
			name =>
			({ target: { value } }) => {
				setStateData({ ...stateData, [name]: value });
			};

	let handleSubmit = async e => {
		e.preventDefault();
		// if (!stateData?.password || !stateData?.email) return;
		setLoading(true);
		await loginUser(stateData);
		setLoading(false);
		setSubmit(true);
	};

	useEffect(() => {
		if (submit && auth?.isLoggedIn) {
			setSubmit(false);
			navigate("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit, auth?.isLoggedIn]);

	return (
		<DefaultAuthComponent>
			<>
				<h3 className="text-capitalize text-center">Login</h3>
				<small className="mb-4 d-block text-center">
					Enjoy the things that you love!
				</small>
				<form className="mt-4">
					<div className="mb-3">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							required
							name="email"
							className="form-control py-3"
							value={stateData.email}
							onChange={textChange("email")}
						/>
					</div>
					<div className="mb-3 show-hide2 show-hide position-relative">
						<label htmlFor="Password">Password</label>
						<input
							type={typePass ? "text" : "password"}
							required
							name="password"
							className="form-control py-3"
							value={stateData.password}
							onChange={textChange("password")}
						/>
						<EyeToggle typePass={typePass} setTypePass={setTypePass} />
					</div>
					<p className="my-4 justify-content-end d-flex">
						<Link
							to={`/forget-password`}
							className="text-decoration-none fw-600 text-dark">
							Forgot Password?
						</Link>{" "}
					</p>
					<Buttons
						onClick={handleSubmit}
						loading={loading}
						title={"sign in"}
						css="btn-primary1 text-capitalize py-3 w-100 my-4"
					/>
					<div className="d-flex py-5 flex-column">
						<p className="text-center">Don't have an account?</p>
						<Link
							to={`/register`}
							className="btn btn-outline-primary1 px-5 py-3 text-decoration-none fw-600 text-dark mx-auto">
							Create Account
						</Link>{" "}
					</div>
					<p className="text-center">
						By continuing you accept our standard terms and conditions and our
						privacy policy.
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

export default Login;
