import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../Data/Context";
import { useNavigate, Link } from "react-router-dom";
import { Container } from "reactstrap";
import { Buttons, EyeToggle } from "../Utils";
// import logo from "../Assets/Mu'ujiza1 (2).png";

const Register = () => {
  const { loginUser, auth } = useContext(GlobalState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let [typePass, setTypePass] = useState(false),
    [typePass2, setTypePass2] = useState(false),
    init = {
      email: "",
      password: "",
    },
    [stateData, setStateData] = useState(init),
    [loading, setLoading] = useState(false),
    [submit, setSubmit] = useState(false),
    navigate = useNavigate(),
    textChange =
      (name) =>
      ({ target: { value } }) => {
        setStateData({ ...stateData, [name]: value });
      };

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (!stateData?.password || !stateData?.email) return;
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
              value={stateData.firstName}
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
              value={stateData.lastName}
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
              value={stateData.email}
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
              value={stateData.telephone}
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
              value={stateData.password}
              onChange={textChange("password")}
            />
            <EyeToggle typePass={typePass} setTypePass={setTypePass} />
          </div>
          <div className="mb-5 show-hide2 show-hide position-relative">
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input
              type={typePass ? "text" : "password"}
              required
              name="confirmPassword"
              className="form-control py-3"
              value={stateData.confirmPassword}
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
              className="textColor ps-1 text-decoration-none fw-600"
            >
              Log in
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
        }}
      >
        <Container className="px-lg-5 px-3">
          <span
            to="/"
            className="text-decoration-none text-dark d-flex align-items-center mb-4"
          >
            {/* <img
              src={logo}
              alt="Honourworld"
              className="logo me-1 logo-img-size"
            /> */}
            <div className="d-none d-md-block">
              <p className="text-capitalize site-primary-color m-0">Mu'ujiza</p>
              <p className="text-capitalize site-secondary-color m-0">
                Enterprises
              </p>
            </div>
          </span>
          {children}
        </Container>
      </div>
    </div>
  );
};
