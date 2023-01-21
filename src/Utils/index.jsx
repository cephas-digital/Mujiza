import React from "react";
import { toast } from "react-toastify";
import { DotLoader, ClipLoader } from "react-spinners";
import { FaTimes } from "react-icons/fa";
import OtpInput from "react18-otp-input";
import empty from "../Assets/empty.png";
import $ from "jquery";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const ImageView = ({
	loading,
	images,
	setImages,
	file,
	setLoading,
	css,
}) => {
	let styleUpload = {
		display: images ? "block" : "none",
	};

	const handleUploadImage = async e => {
		setLoading(true);
		let file = e.target.files[0];
		if (!file) {
			setLoading(false);
			return toast.error("No Image file included...");
		}

		if (file.type.match(/image/i) && file.size > 1024 * 1024 * 20) {
			setLoading(false);
			return toast.error("File size too large, ~= 20mb...");
		}
		if (
			file.type !== "image/jpeg" &&
			file.type !== "image/jpg" &&
			file.type !== "image/png"
		) {
			setLoading(false);
			return toast.error("Image format not supported");
		}

		setImages(file);
		setLoading(false);
	};

	return (
		<div className={`upload mx-auto position-relative p-2 ${css ? css : ""} `}>
			<input
				className="upload-file"
				type="file"
				id="file_up"
				name={file}
				onChange={handleUploadImage}
			/>
			{loading ? (
				<div className="file_img d-flex align-items-center justify-content-center">
					<DotLoader color="#006f8d" />
				</div>
			) : (
				<div className="file_img" style={styleUpload}>
					{images && (
						<img
							src={
								images
									? typeof images === "string"
										? images
										: URL.createObjectURL(images)
									: ""
							}
							alt="product-img"
						/>
					)}
					<div className="faTimes2 faTimes" onClick={() => setImages("")}>
						<FaTimes color="red" size={20} />
					</div>
				</div>
			)}
		</div>
	);
};

export const Buttons = ({
	type,
	loading,
	width,
	css,
	title,
	children,
	onClick,
	loadCss,
	style,
	disabled,
}) => {
	return (
		<button
			disabled={loading || disabled}
			type={type ? type : "button"}
			style={style ? style : {}}
			onClick={onClick ? onClick : () => {}}
			className={`btn ${
				css ? css : "btn-primary1 text-capitalize"
			} d-flex align-items-center justify-content-center ${
				width ? width : "w-100"
			}`}>
			{children}
			<span className={loading ? "me-2" : ""}>{title ? title : "log in"}</span>
			{loading && <ClipLoader color={loadCss ? loadCss : "white"} size={16} />}
		</button>
	);
};

// export const ImageUpload = async images => {
// 	let imgArr = [];
// 	for (const item of images) {
// 		let post = new FormData();
// 		post.append(`photo`, item);

// 		let res = await axios.post(`/v1.1/files/generic-picture`, post, {
// 			headers: {
// 				"Content-Type": "multipart/form-data",
// 			},
// 		});
// 		const data = await res.data.response.url;
// 		imgArr.push(data);
// 	}
// 	return imgArr;
// };

$(document).on("load", function () {
	$(".innerLoader").fadeOut(); // will first fade out the loading animation
	$(".mainLoader").delay(333).fadeOut("slow"); // will fade out the white DIV that covers the website.
	$("body").delay(333);
});

export const Loader = () => {
	return (
		<div className="d-flex my-3 justify-content-center mainLoader aboutScreen">
			<div className="innerLoader">
				<ClipLoader color="#006f8d" />
			</div>
		</div>
	);
};

export const OtpComponent = ({
	stateData,
	textChange,
	numInputs,
	separator,
	css,
	loading,
}) => {
	return (
		<>
			<OtpInput
				value={stateData}
				onChange={otp => textChange(otp)}
				numInputs={numInputs ? numInputs : 6}
				separator={separator ? separator : <span>-</span>}
				inputStyle={`${css} otp-code__input`}
				isDisabled={loading}
				shouldAutoFocus={true}
				isInputNumber={true}
			/>
		</>
	);
};

export const EmptyComponent = ({ subtitle }) => {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<img src={empty} alt="EmptyComponent" className="emptyData img-fluid" />
			<h1 className="text-center text-uppercase Lexend fw-bold">Nothing</h1>
			<p className="Lexend fontReduce">
				{subtitle ? subtitle : `Your collection list is empty`}
			</p>
		</div>
	);
};

export const EyeToggle = ({ typePass, setTypePass }) => {
	return (
		<span onClick={() => setTypePass(!typePass)}>
			{typePass ? <BsEye color="#006f8d" /> : <BsEyeSlash color="#006f8d" />}
		</span>
	);
};

export const MiddleHeader = ({ text, css, css2, subtext }) => {
	return (
		<div
			className={`d-flex align-items-center mb-3 ${
				css2 ? css2 : "justify-content-center"
			}`}>
			<h1
				className={`text-capitalize textColor text-center textDefault ${
					css ? css : ""
				}`}>
				{text} <span className="textColor2 fontInherit">{subtext}</span>
			</h1>
		</div>
	);
};
