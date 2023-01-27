import {
	ADD_ELECTRICITY,
	ADD_ELECTRICITY_FAIL,
	GET_ELECTRICITY,
	GET_ELECTRICITY_DIRECT,
	GET_ELECTRICITY_FAIL,
	GET_ELECTRICITY_LOADING,
	LOGOUT,
} from "../Actions/ActionTypes";

const initialState = {
	isLoading: false,
	electricity: [],
	electricity_direct: [],
	isAdded: false,
	isDeleted: false,
};
const ElectricityReducer = (state = initialState, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case ADD_ELECTRICITY:
			return {
				...state,
				isAdded: true,
				electricity: [
					data,
					...state.electricity,
				],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case ADD_ELECTRICITY_FAIL:
			return {
				...state,
				isAdded: false,
				isDeleted: false,
			};
		case GET_ELECTRICITY:
			return {
				...state,
				isLoading: false,
				electricity: data,
				paginate: payload?.paginate,
			};
		case GET_ELECTRICITY_DIRECT:
			return {
				...state,
				electricity_direct: data,
			};
		case GET_ELECTRICITY_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case GET_ELECTRICITY_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export default ElectricityReducer;
