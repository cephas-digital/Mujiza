import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const useValidation = (type, data, setNewData) => {
	let [validateLoading, setValidateLoading] = useState(false);

	let handleFetch = async e => {
		e?.preventDefault();
		let errArr = [];
		if (type === "banks") {
			if (!data?.bank_code) errArr?.push("Bank required required");
			if (!data?.account_number) errArr?.push("Account number required");
		}
		if (type === "smartCardNo") {
			if (!data?.type) errArr?.push("Smart card type required");
			if (!data?.smartCardNo) errArr?.push("Smart card number required");
		}
		if (type === "meterNo") {
			if (!data?.type) errArr?.push("Smart card type required");
			if (!data?.disco) errArr?.push("Disco type required");
			if (!data?.meterNo) errArr?.push("Meter number required");
		}

		if (errArr?.length > 0) return errArr?.forEach(item => toast?.info(item));
		try {
			setValidateLoading(true);
			let res;
			if (type === "banks") {
				res = await axios.post(`/api/v1/airtime/banks`, { ...data });
			}
			if (type === "smartCardNo" || type === "meterNo") {
				res = await axios.post(
					`/api/v1/${
						type === "smartCardNo" ? "cables" : "electricity"
					}/validate`,
					{ ...data }
				);
			}
			setNewData(res?.data);
			setValidateLoading(false);
		} catch (err) {
			setValidateLoading(false);
			if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		error.forEach(error =>
			error?.param
				? error?.param !== "suggestion" &&
				  toast.error(error.msg, { autoClose: false })
				: toast.error(error.msg, { autoClose: false })
		);
		}
		setValidateLoading(false);
	};
	return { validateLoading, handleFetch };
};
