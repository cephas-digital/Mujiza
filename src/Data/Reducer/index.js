// Root reducer to combine all reducers in the app

import AuthReducer from "./AuthReducer";

import { combineReducers } from "redux";
import CableReducer from "./CableReducer";
import DataReducer from "./DataReducer";
import GeneralReducer from "./GeneralReducer";
import ElectricityReducer from "./ElectricityReducer";
import AirtimeReducer, { AirtimeConverterReducer } from "./AirtimeReducer";
import ErrorReducer from "./ErrorReducer";
import WalletReducer, {
	BonusReducer,
	CommissionReducer,
} from "./WalletReducer";
import UsersReducer, { NotificationReducer } from "./UserReducer";
import SettingsReducer from "./SettingsReducer";
import EducationReducer from "./EducationReducer";

export default combineReducers({
	auth: AuthReducer,
	cables: CableReducer,
	data: DataReducer,
	general: GeneralReducer,
	electricity: ElectricityReducer,
	airtimes: AirtimeReducer,
	errors: ErrorReducer,
	converter: AirtimeConverterReducer,
	wallet: WalletReducer,
	bonus: BonusReducer,
	commission: CommissionReducer,
	users: UsersReducer,
	settings: SettingsReducer,
	notifications: NotificationReducer,
	educations: EducationReducer,
});
