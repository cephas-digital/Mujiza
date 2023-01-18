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
	TOKEN_TEMP_AUTH,
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
};

const AuthReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case TOKEN_TEMP_AUTH:
			return { ...state, temp_auth: payload };
		case LOGIN_USER:
			localStorage.setItem(TOKEN, payload.token);
			return {
				...state,
				isLoggedIn: true,
				token: payload.token,
				user: payload?.data,
			};
		case LOGIN_USER_FAIL:
			return { ...state, isLoggedIn: false, isThirdPartyLoading: false };
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
		case REGISTER_USER:
			return {
				...state,
				isRegistered: true,
			};
		case REGISTER_USER_FAIL:
			return { ...state, isRegistered: false };
		case UPDATE_USER:
			return {
				...state,
				isUpdated: true,
				user: payload?.data,
			};
		case UPDATE_USER_FAIL:
			return { ...state, isUpdated: false };
		case LOGOUT:
			localStorage.removeItem(TOKEN);
			return initialState;
		default:
			return state;
	}
};

export default AuthReducer;
