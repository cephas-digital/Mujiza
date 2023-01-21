import {
	ADD_AIRTIME,
	ADD_AIRTIME_CONVERTER,
	ADD_AIRTIME_CONVERTER_FAIL,
	ADD_AIRTIME_FAIL,
	ADD_CONVERTER_NUMBER,
	ADD_CONVERTER_NUMBER_FAIL,
	GET_AIRTIME,
	GET_AIRTIME_CONVERTER,
	GET_AIRTIME_CONVERTER_FAIL,
	GET_AIRTIME_FAIL,
	GET_AIRTIME_LOADING,
	GET_BANKS,
	GET_CONVERTER_NUMBER,
	LOGOUT,
	UPDATE_CONVERTER_DETAIL,
	UPDATE_CONVERTER_DETAIL_FAIL,
	UPDATE_CONVERTER_NUMBER,
	UPDATE_CONVERTER_NUMBER_FAIL,
} from "../Actions/ActionTypes";
import { EditData } from "./DataReducer";

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
		case LOGOUT:
			return initialState;
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
	isNumberAdded: null,
	isNumberUpdated: null,
	isUpdated: null,
	numbers: [],
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
		case UPDATE_CONVERTER_DETAIL_FAIL:
			return {
				...state,
				isAdded: false,
				isDeleted: false,
				isUpdated: false,
			};
		case UPDATE_CONVERTER_DETAIL:
			return {
				...state,
				isUpdated: true,
				airtime: EditData(
					state?.airtime,
					payload?.data ? payload?.data : payload
				),
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
		case GET_CONVERTER_NUMBER:
			return {
				...state,
				isLoading: false,
				numbers: payload?.data ? payload?.data : payload,
			};
		case ADD_CONVERTER_NUMBER:
			return {
				...state,
				isNumberAdded: true,
				numbers: [payload?.data ? payload?.data : payload, ...state.numbers],
			};
		case ADD_CONVERTER_NUMBER_FAIL:
		case UPDATE_CONVERTER_NUMBER_FAIL:
			return { ...state, isNumberAdded: false, isNumberUpdated: false };
		case UPDATE_CONVERTER_NUMBER:
			return {
				...state,
				isNumberUpdated: true,
				numbers: EditData(
					state?.numbers,
					payload?.data ? payload?.data : payload
				),
			};
		case LOGOUT:
			return initialState2;
		default:
			return state;
	}
};
