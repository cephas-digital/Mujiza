import {
	ADD_AIRTIME,
	ADD_CABLE,
	ADD_DATA,
	ADD_ELECTRICITY,
	GET_ALL_TRANSACTIONS,
	GET_NETWORK,
	GET_NETWORK_FAIL,
	GET_NETWORK_LOADING,
} from "../Actions/ActionTypes";

const initialState = {
	isLoading: false,
	networks: [],
	transactions: [],
	paginate: null,
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
		case GET_ALL_TRANSACTIONS:
			return {
				...state,
				transactions: payload?.data ? payload?.data : payload,
				paginate: payload?.paginate,
			};
		case ADD_AIRTIME:
		case ADD_CABLE:
		case ADD_ELECTRICITY:
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
		default:
			return state;
	}
};

export default GeneralReducer;
