import {
	ADD_DATA,
	ADD_DATA_FAIL,
	CREATE_DATA,
	CREATE_DATA_FAIL,
	GET_CREATE_DATA,
	GET_CREATE_DATA_FAIL,
	GET_DATA,
	GET_DATA_DIRECT,
	GET_DATA_FAIL,
	GET_DATA_LOADING,
	LOGOUT,
	UPDATE_DATA,
} from "../Actions/ActionTypes";

const initialState = {
	isLoading: false,
	data: [],
	data_direct: [],
	main_data: [],
	isAdded: false,
	isUpdated: false,
	isDeleted: false,
	paginate: null,
	isAddedMain: false,
	isUpdatedMain: false,
};
const DataReducer = (state = initialState, action) => {
	const { type, payload } = action;
	let data = payload?.data ? payload?.data : payload;

	switch (type) {
		case ADD_DATA:
			return {
				...state,
				isAdded: true,
				data: [data, ...state.data],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case ADD_DATA_FAIL:
			return {
				...state,
				isAdded: false,
				isUpdated: false,
				isDeleted: false,
			};
		case CREATE_DATA:
			return {
				...state,
				isAddedMain: true,
				main_data: [
					data,
					...state.main_data,
				],
			};
		case CREATE_DATA_FAIL:
			return {
				...state,
				isAddedMain: false,
				isUpdatedMain: false,
			};
		case UPDATE_DATA:
			return {
				...state,
				isUpdatedMain: true,
				main_data: EditData(
					state.main_data,
					data
				),
			};
		case GET_DATA:
			return {
				...state,
				isLoading: false,
				data,
				paginate: payload?.paginate,
			};
		case GET_DATA_DIRECT:
			return {
				...state,
				data_direct: data,
			};
		case GET_CREATE_DATA:
			return {
				...state,
				main_data: data,
			};
		case GET_CREATE_DATA_FAIL:
			return {
				...state,
				main_data: state.main_data,
			};
		case GET_DATA_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case GET_DATA_LOADING:
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

export default DataReducer;

export const EditData = (data, payload) => {
	let updatateData = data.map(item =>
		item._id !== payload._id ? item : payload
	);
	return updatateData;
};

export const DeleteData = (data, payload) => {
	let filterItem =
		data?.length > 0 ? [...data.filter(item => item._id !== payload._id)] : [];
	return filterItem;
};
