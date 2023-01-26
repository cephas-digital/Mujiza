import {
	ADD_AIRTIME,
	ADD_CABLE,
	ADD_DATA,
	ADD_ELECTRICITY,
	GET_ALL_TRANSACTIONS,
	GET_DATA_TRANSACTIONS,
	GET_MY_TRANSACTIONS,
	GET_NETWORK,
	GET_NETWORK_FAIL,
	GET_NETWORK_LOADING,
	LOGOUT,
	SEARCH_MY_TRANSACTION,
	SEARCH_MY_TRANSACTION_FAIL,
	SEARCH_MY_TRANSACTION_LOADING,
	SEARCH_MY_TRANSACTION_RELOAD,
	SEARCH_TRANSACTION,
	SEARCH_TRANSACTION_FAIL,
	SEARCH_TRANSACTION_LOADING,
	SEARCH_TRANSACTION_RELOAD,
} from "../Actions/ActionTypes";

const initialState = {
	isLoading: false,
	networks: [],
	transactions: [],
	paginate: null,
	my_transactions: [],
	my_paginate: null,
	data: [],
	paginate_data: null,
	isFound: null,
	searchLoading: null,
	mainSearch: [],
	search: "",
	search_paginate: null,
	my_isFound: null,
	my_searchLoading: null,
	my_mainSearch: [],
	my_search: "",
	my_search_paginate: null,
};
const GeneralReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SEARCH_MY_TRANSACTION:
			return {
				...state,
				my_isFound: true,
				my_searchLoading: false,
				my_mainSearch: payload?.data,
				my_search: action.search,
				my_search_paginate: payload?.paginate,
			};
		case SEARCH_MY_TRANSACTION_FAIL:
			return {
				...state,
				my_isFound: false,
				my_searchLoading: false,
				my_mainSearch: null,
				my_search: "",
				my_search_paginate: null,
			};
		case SEARCH_MY_TRANSACTION_LOADING:
			return {
				...state,
				my_searchLoading: true,
			};
		case SEARCH_MY_TRANSACTION_RELOAD:
			return {
				...state,
				my_isFound: false,
			};
		case SEARCH_TRANSACTION:
			return {
				...state,
				isFound: true,
				searchLoading: false,
				mainSearch: payload?.data,
				search: action.search,
				search_paginate: payload?.paginate,
			};
		case SEARCH_TRANSACTION_FAIL:
			return {
				...state,
				isFound: false,
				searchLoading: false,
				mainSearch: null,
				search: "",
				search_paginate: null,
			};
		case SEARCH_TRANSACTION_LOADING:
			return {
				...state,
				searchLoading: true,
			};
		case SEARCH_TRANSACTION_RELOAD:
			return {
				...state,
				isFound: false,
			};
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
		case GET_MY_TRANSACTIONS:
			return {
				...state,
				my_transactions: payload?.data ? payload?.data : payload,
				my_paginate: payload?.paginate,
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
				my_transactions: [
					payload?.data ? payload?.data : payload,
					...state.my_transactions,
				],
				my_paginate: {
					...state?.my_paginate,
					result: state?.my_paginate?.result + 1,
					total: state?.my_paginate?.total + 1,
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
				my_transactions: [
					payload?.data ? payload?.data : payload,
					...state.my_transactions,
				],
				my_paginate: {
					...state?.my_paginate,
					result: state?.my_paginate?.result + 1,
					total: state?.my_paginate?.total + 1,
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
