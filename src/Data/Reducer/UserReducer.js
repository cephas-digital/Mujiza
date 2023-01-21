import {
	ADD_NOTIFICATONS,
	ADD_NOTIFICATONS_FAIL,
	GET_ALL_USERS,
	GET_ALL_USERS_FAIL,
	GET_MY_NOTIFICATONS,
	GET_MY_NOTIFICATONS_FAIL,
	GET_NOTIFICATONS,
	GET_NOTIFICATONS_FAIL,
	LOGOUT,
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
};

const UsersReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_ALL_USERS:
			return {
				...state,
				isLoading: false,
				users: payload?.data,
				paginate: payload?.paginate,
				wallet: payload?.wallet,
				transactions: payload?.transactions,
			};
		case GET_ALL_USERS_FAIL:
			return {
				...state,
				isLoading: false,
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
	switch (type) {
		case GET_NOTIFICATONS:
			return {
				...state,
				isLoading: false,
				incoming: payload?.data ? payload?.data : [],
				paginate: payload?.paginate,
			};
		case GET_MY_NOTIFICATONS:
			return {
				...state,
				isLoading: false,
				outgoing: payload?.data ? payload?.data : [],
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
				outgoing: [payload?.data ? payload?.data : payload, ...state?.outgoing],
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
				incoming: EditData(
					state?.incoming,
					payload?.data ? payload?.data : payload
				),
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};
