import React from 'react';
import ReactDOM from 'react-dom';
// import { Link } from "react-router";
import { 
  BrowserRouter as Router,
  Route, 
  Link,
} from 'react-router-dom'

import Archives from "./js/pages/Archives"
// import Featured from "./js/pages/Featured"
import Settings from "./js/pages/Settings"
import Standard from "./js/Standard"
// import Layout from "./js/pages/Layout"

const app = document.getElementById('app');

var Note = React.createClass({
	edit(){
		alert("Edit!");
	},
	remove(){
		alert("Remove!");
	},
	render(){
		return(
			<div className="note">
				<p>{this.props.children}</p>
				<span>
				<button onClick={this.edit}>EDIT</button>
				<button onClick={this.remove}>X</button>
				</span>
			</div>
		)
	}
})


var Board = React.createClass({
	propTypes:{
		count(props, propName){
			if(typeof props[propName] !== "number"){
				return new Error("the count must be a number")
			}
			if(props[propName] > 100){
				return new Error('Creating ' + props[propName] + ' notes is ridiculous')
			}
		}
	},
	getInitialState(){
		return{
			notes:[
				'call bob',
				'Email no',
				'eat luhcnh'
			]
		}
	},
	render() {
		return (
			<div className='board'>
			{this.state.notes.map((note, i) =>{
				return <Note key={i}>{note}</Note>
			})}
			</div>
		);
	}
})


ReactDOM.render(
     <Router>
		<div>
		<Board count={5000} />
		<Note>Hellow worlkd</Note>
     	<Standard text="nikoniko">goog byge</Standard>
     	<Standard text="maruhisa" />
		  <ul>
		    <li><Link to="/archives">Archives</Link></li>
		    <li><Link to="/settings">Settings</Link></li>
		  </ul>

		  <hr/>

		  <Route path="/archives/:article" name="archives" component={Archives}/>
		  <Route path="/settings" name="settings" component={Settings}/>
		</div>

     </Router>,
app);

