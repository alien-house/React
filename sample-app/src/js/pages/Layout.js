import React from 'react';
import { Link } from "react-router";

export default class Layout extends React.Component {
	// constructor(){
	// 	super();
	// 	this.state = {
	// 		title: "Welcomm",
	// 	}
	// }

	// changeTitle(title){
	// 		this.setState({title});	
	// }
	navigate(){
		this.props.history.replaceState(null, "/");
				// {this.props.children}
	}

	render() {
		const { history } = this.props;
		console.log(history.isActive("archives"));
		return (
			<div>
				<h1>Sample.net</h1>
				<Link to="archives">archives</Link>
				<Link to="settings"><button>settings</button></Link>
			</div>
		);
	}
}
