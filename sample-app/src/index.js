import React from 'react';
import ReactDOM from 'react-dom';
import ComponentUpdates from "./js/fundamental/ComponentUpdates"
const app = document.getElementById('app');
// var Note = React.createClass({
// 	edit(){
// 		alert("Edit!");
// 	},
// 	remove(){
// 		alert("Remove!");
// 	},
// 	render(){
// 		return(
// 			<div className="note">
// 				<p>{this.props.children}</p>
// 				<span>
// 				<button onClick={this.edit}>EDIT</button>
// 				<button onClick={this.remove}>X</button>
// 				</span>
// 			</div>
// 		)
// 	}
// })

ReactDOM.render(
     <ComponentUpdates/>,
app);

