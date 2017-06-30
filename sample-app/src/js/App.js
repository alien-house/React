import React from 'react';

export default class Standard extends React.Component {
	// constructor(){
	// 	super();
	// }
    static willTransitionTo(transition) {
		console.log(transition);
        if (this.state.someState) {
            transition.redirect("/");
        }
    }
    
	componentWillMount(transition){
	}
	render() {
		const txt = "mou";
		console.log(this.props);
		return (
			<div>
			<h1>Standard</h1>
			<p>hello woooorldk {this.props.text}</p>
			<p>{txt}</p>
			<p>{this.props.children}</p>
			</div>
		);
	}
}
