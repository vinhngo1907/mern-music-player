import React from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Nav, Analyzer } from "../components";
import * as Containers from "./";


class App extends React.Component {
	render() {
		const {
			showPlayer, showAnalyzer: show, showQueue, slideInRight
		} = this.props;
		const className = `container animated ${slideInRight && "slideInRight"}`;
		return (
			<div>
				<Nav />
			</div>
		)
	}
}

export default App
