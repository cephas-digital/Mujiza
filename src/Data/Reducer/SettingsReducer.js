import axios from "axios";
import { toast } from "react-toastify";
import {
	GET_SETTINGS,
	LOGOUT,
	UPDATE_SETTINGS,
	UPDATE_SETTINGS_FAIL,
} from "../Actions/ActionTypes";
import { returnErrors } from "./ErrorReducer";

let initialState = {
	settings: null,
	isUpdated: null,
};

const SettingsReducer = (state = initialState, action) => {
	let { type, payload } = action;
	switch (type) {
		case GET_SETTINGS:
			// console.log({ payload });
			return { ...state, settings: payload };
		case UPDATE_SETTINGS:
			return { ...state, settings: payload, isUpdated: true };
		case UPDATE_SETTINGS_FAIL:
			return { ...state, isUpdated: false };
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default SettingsReducer;

export const getSettings = data => async dispatch => {
	try {
		let res;
		if (!data) res = await axios.get(`api/v1/settings`);
		else res = await axios.post(`api/v1/settings`, { ...data });
		// console.log({ data: res?.data });
		dispatch({
			type: !data ? GET_SETTINGS : UPDATE_SETTINGS,
			payload: res.data.data,
		});
		if (data) toast.success(res.data.msg, { autoClose: 6000 });
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		dispatch({ type: UPDATE_SETTINGS_FAIL });
	}
};
