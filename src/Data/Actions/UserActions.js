import { clearErrors } from "../Reducer/ErrorReducer";
import axios from "axios";
import { toast } from "react-toastify";
import {
	ACTIVATE_USER,
	ACTIVATE_USER_FAIL,
	ADD_NOTIFICATONS,
	ADD_NOTIFICATONS_FAIL,
	GET_ALL_USERS,
	GET_ALL_USERS_FAIL,
	GET_HONOUR_BALANCE,
	GET_HONOUR_BALANCE_FAIL,
	GET_MY_NOTIFICATONS,
	GET_MY_NOTIFICATONS_FAIL,
	GET_NOTIFICATONS,
	GET_NOTIFICATONS_FAIL,
	UPDATE_NOTIFICATONS,
} from "./ActionTypes";

export const loadAllUser = data => async dispatch => {
	dispatch(clearErrors());
	try {
		let res = await axios.get(
			`/api/v1/user/manage-users?type=user${
				data?.limit ? `&limit=${data?.limit}` : ""
			}`
		);
		dispatch({
			type: GET_ALL_USERS,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: GET_ALL_USERS_FAIL });
	}
};

export const getHonourBalance = () => async dispatch => {
	dispatch(clearErrors());
	try {
		let res = await axios.get(`/api/v1/wallet/get-honourworld-balance`);
		dispatch({
			type: GET_HONOUR_BALANCE,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({ type: GET_HONOUR_BALANCE_FAIL });
	}
};

export const getNotify = (type, data) => async dispatch => {
	dispatch(clearErrors());
	try {
		let res = await axios.get(
			`/api/v1/notification?type=${type}${
				data?.limit ? `&limit=${data?.limit}` : ""
			}`
		);
		dispatch({
			type: type !== "incoming" ? GET_MY_NOTIFICATONS : GET_NOTIFICATONS,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		dispatch({
			type:
				type !== "incoming" ? GET_MY_NOTIFICATONS_FAIL : GET_NOTIFICATONS_FAIL,
		});
	}
};

export const manageNotify = (data, id) => async dispatch => {
	try {
		let res;
		if (!id) res = await axios.post(`/api/v1/notification`, { ...data });
		else res = await axios.post(`/api/v1/notification/${id}`);
		dispatch({
			type: id ? UPDATE_NOTIFICATONS : ADD_NOTIFICATONS,
			payload: res.data,
		});
		toast.success(res?.data?.msg);
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		let error = err.response?.data?.error;
		error.forEach(error =>
			error?.param
				? error?.param !== "suggestion" &&
				  toast.error(error.msg, { autoClose: false })
				: toast.error(error.msg, { autoClose: false })
		);
		dispatch({ type: ADD_NOTIFICATONS_FAIL });
	}
};

export const manageUserActiveness = (id, action) => async dispatch => {
	try {
		let res = await axios.post(`/api/v1/user/manage-users/${id}?type=${action}`);
		dispatch({
			type: ACTIVATE_USER,
			payload: res.data,
		});
		toast.success(res?.data?.msg);
	} catch (err) {
		if (err) console.log(err.response?.data?.error, { err });
		if (err?.response?.status === 429) toast.error(err?.response?.data);
		let error = err.response?.data?.error;
		error.forEach(error =>
			error?.param
				? error?.param !== "suggestion" &&
				  toast.error(error.msg, { autoClose: false })
				: toast.error(error.msg, { autoClose: false })
		);
		dispatch({ type: ACTIVATE_USER_FAIL });
	}
};
