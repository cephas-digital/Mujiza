import {
	ADD_AIRTIME,
	ADD_CABLE,
	ADD_DATA,
	ADD_ELECTRICITY,
	GET_ALL_TRANSACTIONS,
	GET_DATA_TRANSACTIONS,
	GET_NETWORK,
	GET_NETWORK_FAIL,
	GET_NETWORK_LOADING,
	LOGOUT,
} from "../Actions/ActionTypes";

const initialState = {
	isLoading: false,
	networks: [],
	transactions: [],
	paginate: null,
	data: [],
	paginate_data: null,
};
const GeneralReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_NETWORK:
			return {
				...state,
				isLoading: false,
				networks: payload?.data,
			};
		case GET_DATA_TRANSACTIONS:
			return {
				...state,
				data: payload?.data ? payload?.data : payload,
				paginate_data: payload?.paginate,
			};
		case GET_ALL_TRANSACTIONS:
			return {
				...state,
				transactions: payload?.data ? payload?.data : payload,
				paginate: payload?.paginate,
			};
		case ADD_AIRTIME:
		case ADD_CABLE:
		case ADD_ELECTRICITY:
			return {
				...state,
				transactions: [
					payload?.data ? payload?.data : payload,
					...state.transactions,
				],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case ADD_DATA:
			return {
				...state,
				transactions: [
					payload?.data ? payload?.data : payload,
					...state.transactions,
				],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
				data: [payload?.data ? payload?.data : payload, ...state.data],
				paginate_data: {
					...state?.paginate_data,
					result: state?.paginate_data?.result + 1,
					total: state?.paginate_data?.total + 1,
				},
			};
		case GET_NETWORK_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case GET_NETWORK_FAIL:
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

export default GeneralReducer;
