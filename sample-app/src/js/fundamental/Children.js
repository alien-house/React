import React from 'react';

export default class Children extends React.Component {
	render(){
		return(
			<Parent>
				<div className="childA">a</div>
				<div className="childB">b</div>
			</Parent>
		)
	}
}
// <div className="childB">b</div>
class Parent extends React.Component{
	render(){
		
		/* if child is only one, it's gonna error */
		let items = this.props.children.map(child=>child)
		console.log(items)


		/* using toArray, will solve it */
		// let items = React.Children.toArray(this.props.children)
		// console.log(items)


		/* other method */
		// let items = React.Children.forEach(this.props.children, child => child)
		// console.log(items)


		

		return null
	}
}





