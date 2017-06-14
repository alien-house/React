import React from 'react';

export default class Board extends React.Component {
	// constructor(){
	// 	super();
	// }

	componentWillMount(){
		console.log("Hellooo");
	}
	count(props, propName){
		alert("r");
		if(typeof props[propName] !== "number"){
			return new Error("the count must be a number")
		}
		if(props[propName] > 100){
			return new Error('Creating ' + props[propName] + ' notes is ridiculous')
		}
	}
	render() {
		return (
			<div className='board'>
			{this.props.count}
			</div>
		);
	}
}
