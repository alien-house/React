import React from 'react';
import Footer from './Footer'
import Header from './Header'

export default class Layout extends React.Component {
	constructor(){
		super();
		this.state = {
			title: "Welcomm",
		}
	}

	changeTitle(title){
			this.setState({title});	
	}

	render() {
		// setTimeout(() => {
		// 	this.setState({title: "Welcom WWWiilll!"});
		// }, 2000);
		return (
			<div>
				<Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
				<Footer />
			</div>
		);
	}
}
