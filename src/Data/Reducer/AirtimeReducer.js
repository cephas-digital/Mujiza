import {
	ADD_AIRTIME,
	ADD_AIRTIME_CONVERTER,
	ADD_AIRTIME_CONVERTER_FAIL,
	ADD_AIRTIME_FAIL,
	GET_AIRTIME,
	GET_AIRTIME_CONVERTER,
	GET_AIRTIME_CONVERTER_FAIL,
	GET_AIRTIME_FAIL,
	GET_AIRTIME_LOADING,
	GET_BANKS,
} from "../Actions/ActionTypes";

const initialState = {
	isLoading: false,
	airtime: [],
	isAdded: false,
	isDeleted: false,
	paginate: null,
};

const AirtimeReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_AIRTIME:
			return {
				...state,
				isAdded: true,
				airtime: [payload?.data ? payload?.data : payload, ...state.airtime],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case ADD_AIRTIME_FAIL:
			return {
				...state,
				isAdded: false,
				isDeleted: false,
			};
		case GET_AIRTIME:
			return {
				...state,
				isLoading: false,
				airtime: payload?.data,
				paginate: payload?.paginate,
			};
		case GET_AIRTIME_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case GET_AIRTIME_LOADING:
			return {
				...state,
				isLoading: true,
			};
		default:
			return state;
	}
};

export default AirtimeReducer;

const initialState2 = {
	isLoading: false,
	airtime: [],
	isAdded: false,
	isDeleted: false,
	paginate: null,
	banks: null,
};

export const AirtimeConverterReducer = (state = initialState2, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_AIRTIME_CONVERTER:
			return {
				...state,
				isAdded: true,
				airtime: [payload?.data ? payload?.data : payload, ...state.airtime],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case ADD_AIRTIME_CONVERTER_FAIL:
			return {
				...state,
				isAdded: false,
				isDeleted: false,
			};
		case GET_AIRTIME_CONVERTER:
			return {
				...state,
				isLoading: false,
				airtime: payload?.data,
				paginate: payload?.paginate,
			};
		case GET_AIRTIME_CONVERTER_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case GET_BANKS:
			return {
				...state,
				banks: payload?.data,
			};
		default:
			return state;
	}
};
