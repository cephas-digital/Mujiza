import {
	ADD_EDUCATION,
	ADD_EDUCATION_FAIL,
	GET_EDUCATION,
	GET_EDUCATION_FAIL,
	GET_EDUCATION_LOADING,
	LOGOUT,
} from "../Actions/ActionTypes";

const initialState = {
	isLoading: false,
	education: [],
	isAdded: false,
	isDeleted: false,
	paginate: null,
};

const EducationReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_EDUCATION:
			return {
				...state,
				isAdded: true,
				education: [
					payload?.data ? payload?.data : payload,
					...state.education,
				],
				paginate: {
					...state?.paginate,
					result: state?.paginate?.result + 1,
					total: state?.paginate?.total + 1,
				},
			};
		case ADD_EDUCATION_FAIL:
			return {
				...state,
				isAdded: false,
				isDeleted: false,
			};
		case GET_EDUCATION:
			return {
				...state,
				isLoading: false,
				education: payload?.data,
				paginate: payload?.paginate,
			};
		case GET_EDUCATION_FAIL:
			return {
				...state,
				isLoading: false,
			};
		case GET_EDUCATION_LOADING:
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

export default EducationReducer;
