import {
	GET_USER,
	GET_USER_FAIL,
	GET_USER_LOADING,
	LOGIN_USER,
	LOGIN_USER_FAIL,
	LOGOUT,
	REGISTER_USER,
	REGISTER_USER_FAIL,
	TOKEN,
	UPDATE_PASSWORD,
	UPDATE_PASSWORD_FAIL,
	UPDATE_USER,
	UPDATE_USER_FAIL,
} from "../Actions/ActionTypes";

const initialState = {
	user: null,
	token: localStorage.getItem(TOKEN),
	isAuth: false,
	loading: false,
	isRegistered: false,
	isLoggedIn: false,
	isUpdated: false,
	isPassword: null,
};

const AuthReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN_USER:
		case REGISTER_USER:
			localStorage.setItem(TOKEN, payload.token);
			return {
				...state,
				isLoggedIn: true,
				token: payload.token,
				user: payload?.data,
				isRegistered: true,
			};
		case LOGIN_USER_FAIL:
		case REGISTER_USER_FAIL:
			return {
				...state,
				isLoggedIn: false,
				isThirdPartyLoading: false,
				isRegistered: false,
			};
		case GET_USER:
			if (payload?.token) {
				localStorage.setItem(TOKEN, payload?.token);
			}
			return {
				...state,
				user: payload?.data ? payload?.data : null,
				isAuth: payload?.data ? true : false,
				loading: false,
			};
		case GET_USER_FAIL:
			return {
				...state,
				loading: false,
				isAuth: false,
			};
		case GET_USER_LOADING:
			return {
				...state,
				loading: true,
			};
		case UPDATE_USER:
			return {
				...state,
				isUpdated: true,
				user: payload?.data,
			};
		case UPDATE_USER_FAIL:
			return { ...state, isUpdated: false };
		case UPDATE_PASSWORD:
			return { ...state, isPassword: true };
		case UPDATE_PASSWORD_FAIL:
			return { ...state, isPassword: false };
		case LOGOUT:
			localStorage.removeItem(TOKEN);
			return initialState;
		default:
			return state;
	}
};

export default AuthReducer;
