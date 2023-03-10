import {
	ACTIVATE_USER,
	ACTIVATE_USER_FAIL,
	ADD_NOTIFICATONS,
	ADD_NOTIFICATONS_FAIL,
	GET_ALL_USERS,
	GET_ALL_USERS_FAIL,
	GET_MY_NOTIFICATONS,
	GET_MY_NOTIFICATONS_FAIL,
	GET_NOTIFICATONS,
	GET_NOTIFICATONS_FAIL,
	LOGOUT,
	SEARCH_ALL_USERS,
	SEARCH_ALL_USERS_FAIL,
	SEARCH_ALL_USERS_LOADING,
	SEARCH_ALL_USERS_RELOAD,
	UPDATE_NOTIFICATONS,
} from "../Actions/ActionTypes";
import { EditData } from "./DataReducer";

const initialState = {
	isLoading: false,
	users: [],
	isAdded: false,
	isDeleted: false,
	paginate: null,
	wallet: 0,
	transactions: 0,
	isUpdated: false,
	isFound: null,
	searchLoading: null,
	mainSearch: [],
	search: "",
	search_paginate: null,
};

const UsersReducer = (state = initialState, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case SEARCH_ALL_USERS:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: data,
				search: action.search,
				search_paginate: payload?.paginate,
			};
		case SEARCH_ALL_USERS_FAIL:
			return {
				...state,
				isFound: false,
				searchLoading: false,
				mainSearch: null,
				search: "",
				search_paginate: null,
			};
		case SEARCH_ALL_USERS_LOADING:
			return {
				...state,
				searchLoading: true,
			};
		case SEARCH_ALL_USERS_RELOAD:
			return {
				...state,
				isFound: false,
				searchLoading: false,
			};
		case GET_ALL_USERS:
			return {
				...state,
				isLoading: false,
				users: data,
				paginate: payload?.paginate,
				wallet: payload?.wallet,
				transactions: payload?.transactions,
			};
		case ACTIVATE_USER:
			return {
				...state,
				users: EditData(state?.users, data),
				isUpdated: true,
			};
		case ACTIVATE_USER_FAIL:
		case GET_ALL_USERS_FAIL:
			return {
				...state,
				isLoading: false,
				isUpdated: false,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default UsersReducer;

const initialState2 = {
	isLoading: false,
	outgoing: [],
	incoming: [],
	isAdded: false,
	isUpdated: false,
	paginate: null,
	paginate2: null,
};

export const NotificationReducer = (state = initialState2, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case GET_NOTIFICATONS:
			return {
				...state,
				isLoading: false,
				incoming: data ? data : [],
				paginate: payload?.paginate,
			};
		case GET_MY_NOTIFICATONS:
			return {
				...state,
				isLoading: false,
				outgoing: data ? data : [],
				paginate2: payload?.paginate,
			};
		case GET_NOTIFICATONS_FAIL:
		case GET_MY_NOTIFICATONS_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case ADD_NOTIFICATONS:
			return {
				...state,
				isAdded: true,
				outgoing: [data, ...state?.outgoing],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case ADD_NOTIFICATONS_FAIL:
			return {
				...state,
				isLoading: false,
				isUpdated: false,
				isAdded: false,
			};
		case UPDATE_NOTIFICATONS:
			return {
				...state,
				isUpdated: true,
				incoming: EditData(state?.incoming, data),
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};
