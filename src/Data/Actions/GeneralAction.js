import axios from "axios";
import { toast } from "react-toastify";
import { returnErrors } from "../Reducer/ErrorReducer";
import {
	ADD_AIRTIME,
	ADD_AIRTIME_CONVERTER,
	ADD_AIRTIME_CONVERTER_FAIL,
	ADD_AIRTIME_FAIL,
	ADD_CABLE,
	ADD_CABLE_FAIL,
	ADD_CONVERTER_NUMBER,
	ADD_CONVERTER_NUMBER_FAIL,
	ADD_DATA,
	ADD_DATA_FAIL,
	ADD_EDUCATION,
	ADD_EDUCATION_FAIL,
	ADD_ELECTRICITY,
	ADD_ELECTRICITY_FAIL,
	ADD_FUND,
	ADD_FUND_FAIL,
	CREATE_DATA,
	CREATE_DATA_FAIL,
	FUND_WALLET,
	FUND_WALLET_FAIL,
	GENERATE_VIRTUAL,
	GENERATE_VIRTUAL_FAIL,
	GET_AIRTIME,
	GET_AIRTIME_CONVERTER,
	GET_AIRTIME_CONVERTER_FAIL,
	GET_AIRTIME_FAIL,
	GET_ALL_BONUS,
	GET_ALL_MANUAL,
	GET_ALL_TRANSACTIONS,
	GET_ALL_TRANSACTIONS_FAIL,
	GET_BANKS,
	GET_BANKS_FAIL,
	GET_BONUS,
	GET_CABLE,
	GET_CABLE_DIRECT_PACKAGE,
	GET_CABLE_DIRECT_PACKAGE_FAIL,
	GET_CABLE_DIRECT_TYPE,
	GET_CABLE_DIRECT_TYPE_FAIL,
	GET_CABLE_FAIL,
	GET_CARDS,
	GET_CARDS_FAIL,
	GET_COMMISSION,
	GET_CONVERTER_NUMBER,
	GET_CONVERTER_NUMBER_FAIL,
	GET_CREATE_DATA,
	GET_CREATE_DATA_FAIL,
	GET_DATA,
	GET_DATA_DIRECT,
	GET_DATA_DIRECT_FAIL,
	GET_DATA_FAIL,
	GET_DATA_TRANSACTIONS,
	GET_DATA_TRANSACTIONS_FAIL,
	GET_EDUCATION,
	GET_EDUCATION_FAIL,
	GET_ELECTRICITY,
	GET_ELECTRICITY_DIRECT,
	GET_ELECTRICITY_DIRECT_FAIL,
	GET_ELECTRICITY_FAIL,
	GET_MY_TRANSACTIONS,
	GET_MY_TRANSACTIONS_FAIL,
	GET_NETWORK,
	GET_NETWORK_FAIL,
	GET_WALLET,
	GET_WALLET_BALANCE,
	GET_WALLET_BALANCE_FAIL,
	GET_WALLET_FAIL,
	GIVE_BONUS,
	GIVE_BONUS_FAIL,
	MOVE_BONUS,
	MOVE_BONUS_FAIL,
	MOVE_COMMISSION,
	MOVE_COMMISSION_FAIL,
	SEARCH_MY_TRANSACTION,
	SEARCH_MY_TRANSACTION_FAIL,
	SEARCH_MY_TRANSACTION_LOADING,
	SEARCH_MY_TRANSACTION_RELOAD,
	SEARCH_TRANSACTION,
	SEARCH_TRANSACTION_FAIL,
	SEARCH_TRANSACTION_LOADING,
	SEARCH_TRANSACTION_RELOAD,
	SEARCH_WALLET,
	SEARCH_WALLET_FAIL,
	SEARCH_WALLET_LOADING,
	SEARCH_WALLET_RELOAD,
	SET_SUCCESS,
	TRANSFER_FUND,
	TRANSFER_FUND_FAIL,
	UPDATE_CONVERTER_DETAIL,
	UPDATE_CONVERTER_DETAIL_FAIL,
	UPDATE_CONVERTER_NUMBER,
	UPDATE_CONVERTER_NUMBER_FAIL,
	UPDATE_DATA,
	UPDATE_WALLET,
	UPDATE_WALLET_FAIL,
} from "./ActionTypes";
import { loadAllUser } from "./UserActions";

export const getDirectDatas = type => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/direct/${type}`);

		dispatch({
			type:
				type === "cables-packages"
					? GET_CABLE_DIRECT_PACKAGE
					: type === "cables-types"
					? GET_CABLE_DIRECT_TYPE
					: type === "data"
					? GET_DATA_DIRECT
					: type === "electricity"
					? GET_ELECTRICITY_DIRECT
					: type === "network"
					? GET_NETWORK
					: null,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({
			type:
				type === "cables-packages"
					? GET_CABLE_DIRECT_PACKAGE_FAIL
					: type === "cables-types"
					? GET_CABLE_DIRECT_TYPE_FAIL
					: type === "data"
					? GET_DATA_DIRECT_FAIL
					: type === "electricity"
					? GET_ELECTRICITY_DIRECT_FAIL
					: type === "network"
					? GET_NETWORK_FAIL
					: null,
		});
	}
};

export const getServicesHistory = (type, data) => async dispatch => {
	try {
		if (data?.search) dispatch({ type: SEARCH_TRANSACTION_LOADING });
		let res = await axios.get(
			`/api/v1/transactions?type=${type}${
				data?.limit ? `&limit=${data?.limit}` : ""
			}
			${data?.user ? `&user=${data?.user}` : ""}
			${data?.search ? `&search=${data?.search}` : ""}
			`
		);

		dispatch({
			type:
				type === "cables"
					? GET_CABLE
					: type === "airtime"
					? GET_AIRTIME
					: type === "data"
					? GET_DATA
					: type === "electricity"
					? GET_ELECTRICITY
					: type === "education"
					? GET_EDUCATION
					: type === "all"
					? data?.search
						? SEARCH_TRANSACTION
						: GET_ALL_TRANSACTIONS
					: null,
			payload: res.data,
			search: data?.search ? data?.search : "",
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({
			type:
				type === "cables"
					? GET_CABLE_FAIL
					: type === "airtime"
					? GET_AIRTIME_FAIL
					: type === "data"
					? GET_DATA_FAIL
					: type === "electricity"
					? GET_ELECTRICITY_FAIL
					: type === "education"
					? GET_EDUCATION_FAIL
					: type === "all"
					? data?.search
						? SEARCH_TRANSACTION_FAIL
						: GET_ALL_TRANSACTIONS_FAIL
					: null,
		});
	}
};

export const buyServices = (type, data) => async dispatch => {
	try {
		let res = await axios.post(`/api/v1/${type}/buy`, { ...data });

		dispatch({
			type:
				type === "data"
					? ADD_DATA
					: type === "cables"
					? ADD_CABLE
					: type === "airtime"
					? ADD_AIRTIME
					: type === "electricity"
					? ADD_ELECTRICITY
					: type === "education"
					? ADD_EDUCATION
					: null,
			payload: res.data,
		});
		dispatch(manageFundWallet());
		dispatch(getWalletHistory("wallet"));
		dispatch(getWalletHistory("commission"));
		// toast.success(res?.data?.msg);
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		// error.forEach(error =>
		// 	error?.param
		// 		? error?.param !== "suggestion" &&
		// 		  toast.error(error.msg, { autoClose: false })
		// 		: toast.error(error.msg, { autoClose: false })
		// );
		dispatch({
			type:
				type === "data"
					? ADD_DATA_FAIL
					: type === "cables"
					? ADD_CABLE_FAIL
					: type === "airtime"
					? ADD_AIRTIME_FAIL
					: type === "electricity"
					? ADD_ELECTRICITY_FAIL
					: type === "education"
					? ADD_EDUCATION_FAIL
					: null,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const converterServices = (method, type, data, id) => async dispatch => {
	try {
		let res;
		// console.log({ data });
		if (method === "put") {
			res = await axios.put(`/api/v1/airtime/${type}${id ? `/${id}` : ""}`, {
				...data,
			});

			dispatch({
				type:
					type === "converter"
						? id
							? UPDATE_CONVERTER_DETAIL
							: ADD_AIRTIME_CONVERTER
						: type === "converter-number"
						? id
							? UPDATE_CONVERTER_NUMBER
							: ADD_CONVERTER_NUMBER
						: null,
				payload: res.data,
			});
		} else if (method === "post") {
			res = await axios.post(`/api/v1/airtime/${type}${id ? `/${id}` : ""}`, {
				...data,
			});

			dispatch({
				type:
					type === "converter"
						? id
							? UPDATE_CONVERTER_DETAIL
							: ADD_AIRTIME_CONVERTER
						: type === "converter-number"
						? id
							? UPDATE_CONVERTER_NUMBER
							: ADD_CONVERTER_NUMBER
						: null,
				payload: res.data,
			});
		} else {
			res = await axios.get(
				`/api/v1/airtime/${type}${data?.limit ? `?limit=${data?.limit}` : ""}`
			);

			dispatch({
				type:
					type === "converter"
						? GET_AIRTIME_CONVERTER
						: type === "banks"
						? GET_BANKS
						: type === "converter-number"
						? GET_CONVERTER_NUMBER
						: null,
				payload: res.data,
			});
		}
		// console.log({ data: res?.data });
		if (method === "post" || method === "put") {
			// toast.success(res?.data?.msg);
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		}
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (method === "post" || method === "put") {
			if (error)
				dispatch(returnErrors({ error, status: err?.response?.status }));
			// error.forEach(error =>
			// 	error?.param
			// 		? error?.param !== "suggestion" &&
			// 		  toast.error(error.msg, { autoClose: false })
			// 		: toast.error(error.msg, { autoClose: false })
			// );
		}
		dispatch({
			type:
				method === "post" || method === "put"
					? type === "converter"
						? id
							? UPDATE_CONVERTER_DETAIL_FAIL
							: ADD_AIRTIME_CONVERTER_FAIL
						: type === "converter-number"
						? id
							? UPDATE_CONVERTER_NUMBER_FAIL
							: ADD_CONVERTER_NUMBER_FAIL
						: type === "converter"
						? GET_AIRTIME_CONVERTER_FAIL
						: type === "banks"
						? GET_BANKS_FAIL
						: type === "converter-number"
						? GET_CONVERTER_NUMBER_FAIL
						: null
					: null,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const dataServices = (method, data) => async dispatch => {
	try {
		let res;
		if (method === "post") {
			res = await axios.post(`/api/v1/data`, { ...data });
		} else if (method === "put") {
			res = await axios.put(`/api/v1/data/${data?._id}`, { ...data });
		} else {
			res = await axios.get(`/api/v1/data`);
		}

		dispatch({
			type:
				method === "post"
					? CREATE_DATA
					: method === "put"
					? UPDATE_DATA
					: GET_CREATE_DATA,
			payload: res.data,
		});

		if (method !== "get") {
			// toast.success(res?.data?.msg);
			dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		}
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (method === "post" || method === "put") {
			if (error)
				dispatch(returnErrors({ error, status: err?.response?.status }));
			// error.forEach(error =>
			// 	error?.param
			// 		? error?.param !== "suggestion" &&
			// 		  toast.error(error.msg, { autoClose: false })
			// 		: toast.error(error.msg, { autoClose: false })
			// );
		}
		dispatch({
			type:
				method === "post" || method === "put"
					? CREATE_DATA_FAIL
					: GET_CREATE_DATA_FAIL,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const getManualBonusHistory = (type, data) => async dispatch => {
	try {
		let res = await axios.get(
			`/api/v1/wallet/${type}
			${data?.limit ? `?limit=${data?.limit}` : ""}
				`
		);

		dispatch({
			type:
				type === "manual-funding"
					? GET_ALL_MANUAL
					: type === "manage-bonus"
					? GET_ALL_BONUS
					: null,
			payload: res.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({
			type: GET_WALLET_FAIL,
		});
	}
};

export const getWalletHistory = (type, data) => async dispatch => {
	try {
		if (data?.search) dispatch({ type: SEARCH_WALLET_LOADING });
		let res = await axios.get(
			`/api/v1/wallet?type=${type}
			${data?.limit ? `&limit=${data?.limit}` : ""}
			${data?.user ? `&user=${data?.user}` : ""}
			${data?.search ? `&search=${data?.search}` : ""}
				`
		);

		dispatch({
			type:
				type === "wallet"
					? data?.search
						? SEARCH_WALLET
						: GET_WALLET
					: type === "bonus"
					? GET_BONUS
					: type === "commission"
					? GET_COMMISSION
					: null,
			payload: res.data,
			search: data?.search ? data?.search : "",
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		dispatch({
			type: data?.search ? SEARCH_WALLET_FAIL : GET_WALLET_FAIL,
		});
	}
};

export const manageWallet = (type, data, add) => async dispatch => {
	try {
		let res;
		if (add)
			res = await axios.post(`/api/v1/wallet/manage-${type}`, { ...data });
		else res = await axios.put(`/api/v1/wallet/manage-${type}`, { ...data });
		let newType;
		if (add) {
			if (type === "bonus") newType = GIVE_BONUS;
			if (type === "wallet") newType = ADD_FUND;
		} else {
			if (type === "bonus") newType = MOVE_BONUS;
			if (type === "wallet") newType = TRANSFER_FUND;
			if (type === "commission") newType = MOVE_COMMISSION;
		}

		dispatch({
			type: newType,
			payload: res.data,
		});
		dispatch(getWalletHistory("wallet"));
		dispatch(getWalletHistory("bonus"));
		dispatch(getWalletHistory("commission"));
		dispatch(manageFundWallet());
		if (add) dispatch(loadAllUser());
		// toast?.success(res?.data?.msg, { autoClose: 5000 });
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		// error.forEach(error =>
		// 	error?.param
		// 		? error?.param !== "suggestion" &&
		// 		  toast.error(error.msg, { autoClose: false })
		// 		: toast.error(error.msg, { autoClose: false })
		// );

		let newType;
		if (add) {
			if (type === "bonus") newType = GIVE_BONUS_FAIL;
			if (type === "wallet") newType = ADD_FUND_FAIL;
		} else {
			if (type === "bonus") newType = MOVE_BONUS_FAIL;
			if (type === "wallet") newType = TRANSFER_FUND_FAIL;
			if (type === "commission") newType = MOVE_COMMISSION_FAIL;
		}
		dispatch({
			type: newType,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const manageFundWallet = (data, update) => async dispatch => {
	try {
		let res;
		if (data)
			if (update) res = await axios.put(`/api/v1/wallet`, { ...data });
			else res = await axios.post(`/api/v1/wallet`, { ...data });
		else res = await axios.get(`/api/v1/wallet/manage-wallet`);
		let newType;
		if (data) {
			dispatch(manageFundWallet());
			dispatch(getCards());
			if (update) newType = UPDATE_WALLET;
			else newType = FUND_WALLET;
		} else {
			newType = GET_WALLET_BALANCE;
			// console.log({balance:res.data});
		}

		dispatch({
			type: newType,
			payload: data ? res?.data : res?.data?.data ? res?.data?.data : res?.data,
		});
		if (data) {
			if (res?.data?.status === "success")
				dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
			else toast?.success(res?.data?.msg, { autoClose: 5000 });
		}
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let newType;
		let error = err.response?.data?.error;
		if (data) {
			if (error)
				dispatch(returnErrors({ error, status: err?.response?.status }));
			// error.forEach(error =>
			// 	error?.param
			// 		? error?.param !== "suggestion" &&
			// 		  toast.error(error.msg, { autoClose: false })
			// 		: toast.error(error.msg, { autoClose: false })
			// );
			if (update) newType = UPDATE_WALLET_FAIL;
			else newType = FUND_WALLET_FAIL;
		} else {
			newType = GET_WALLET_BALANCE_FAIL;
		}
		dispatch({
			type: newType,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const generateVirtual = () => async dispatch => {
	try {
		let res = await axios.post(`/api/v1/wallet/generate-virtual-account`);
		dispatch({
			type: GENERATE_VIRTUAL,
			payload: res?.data,
		});
		// toast?.success(res?.data?.msg, { autoClose: 5000 });
		dispatch({ type: SET_SUCCESS, payload: res?.data?.msg });
		dispatch(manageFundWallet());
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);
		let error = err.response?.data?.error;
		if (error) dispatch(returnErrors({ error, status: err?.response?.status }));
		// error.forEach(error =>
		// 	error?.param
		// 		? error?.param !== "suggestion" &&
		// 		  toast.error(error.msg, { autoClose: false })
		// 		: toast.error(error.msg, { autoClose: false })
		// );

		dispatch({
			type: GENERATE_VIRTUAL_FAIL,
		});
		if (err?.response?.status === 429 || err?.response?.status === 405)
			toast.error(err?.response?.data ? err?.response?.data : err?.message);
	}
};

export const getCards = () => async dispatch => {
	try {
		let res = await axios.get(`/api/v1/wallet/manage-card`);
		dispatch({
			type: GET_CARDS,
			payload: res?.data,
		});
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);

		dispatch({
			type: GET_CARDS_FAIL,
		});
	}
};

export const getDataHistory = (data, type) => async dispatch => {
	try {
		if (data?.search) dispatch({ type: SEARCH_MY_TRANSACTION_LOADING });
		let res = await axios.get(
			`/api/v1/transactions/data?type=${type ? type : "data"}
			${data?.limit ? `&limit=${data?.limit}` : ""}
			${data?.search ? `&search=${data?.search}` : ""}
			`
		);
		dispatch({
			type: type
				? data?.search
					? SEARCH_MY_TRANSACTION
					: GET_MY_TRANSACTIONS
				: GET_DATA_TRANSACTIONS,
			payload: res?.data,
			search: data?.search ? data?.search : "",
		});

		// console.log({ data: res?.data });
	} catch (err) {
		if (err) console.log({ err });
		if (err) console.log(err?.response ? err?.response?.data : err?.message);

		dispatch({
			type: type
				? data?.search
					? SEARCH_MY_TRANSACTION_FAIL
					: GET_MY_TRANSACTIONS_FAIL
				: GET_DATA_TRANSACTIONS_FAIL,
		});
	}
};

export const getReload = () => async dispatch => {
	dispatch({ type: SEARCH_WALLET_RELOAD });
	dispatch({ type: SEARCH_TRANSACTION_RELOAD });
	dispatch({ type: SEARCH_MY_TRANSACTION_RELOAD });
};
