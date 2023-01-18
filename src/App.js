import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import DataProvider from "./Data/Context";
import Store from "./Data/Store";
import Routers from "./Routes";
import { SetAuthToken, SetDefaultHeaders } from "./Data/Config";
import { TOKEN } from "./Data/Actions/ActionTypes";
import { loadUser } from "./Data/Actions/AuthActions";

// Preloader
$(window).on("load", function () {
	$(".lds-ellipsis").fadeOut(); // will first fade out the loading animation
	$(".preloader").delay(333).fadeOut("slow"); // will fade out the white DIV that covers the website.
	$("body").delay(333);
});
SetDefaultHeaders();

if (localStorage.getItem(TOKEN)) {
	SetAuthToken(localStorage.getItem(TOKEN));
}

const App = () => {
	useEffect(() => {
		Store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={Store}>
			<DataProvider>
				<Router>
					<Routers />
				</Router>
			</DataProvider>
		</Provider>
	);
};

export default App;
