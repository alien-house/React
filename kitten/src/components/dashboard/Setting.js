import React from 'react';
// import DBnav from './DBNav';
// import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { updateUserProfile, getUserProfile, getDatabase, updateDatabase } from '../../utils/FirebaseAuthService';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from 'react-router-dom'


export default class Setting extends React.Component {

	constructor(){
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		// this.getOptions = this.getOptions.bind(this);
		this.logChange = this.logChange.bind(this);
		this.state = {};
	}
	
	componentWillMount(){
     	var userData = getUserProfile();
     	// console.log(userData);
		this.state = userData;
		var options = [];
		getDatabase('devStatus',
			(objDate) => { 
				var obj = new Array();
				console.log("======================");
				var objArray = objDate.split(",");
				objArray.forEach(function(item, index){
					obj[index] = {value: item, label: item};
				});
				this.setState({ options: obj })
			}
		);
		getDatabase('users',
			(objDate) => { 
				console.log("==========^^============");
				console.log(objDate.devStatus);
				this.setState({
					devStatus: objDate.devStatus
				});
			}
		);
	}

	handleChange(event) {
    	const target = event.target;
    	const value = target.value;
    	const name = target.name;
		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		var name = this.state.name;
		var email = this.state.email;
		var userObj = {
		    displayName: name,
		    email: email
		};
		var devStatus = this.state.devStatus;
		updateUserProfile(userObj);

		var dataObj = {
		    devStatus: devStatus
		};
		updateDatabase(dataObj);
	}
	logChange(val) {
		this.setState({
			devStatus: val.value
		});
	}

	// getOptions(input, callback) {
	//   setTimeout(function() {
	//     callback(null, {
	//       options: [
	//         { value: 'one', label: 'One' },
	//         { value: 'two', label: 'Two' }
	//       ],
	//       // CAREFUL! Only set this to true when there are no more options,
	//       // or more specific queries will not be sent to the server.
	//       complete: true
	//     });
	//   }, 500);
	// }

	render() {
		// var options = [
		// 	{ value: 'one', label: 'One' },
		// 	{ value: 'two', label: 'Two' }
		// ];
		// console.log(options);
		// const { query } = this.props.location;
		// const { params } = this.props.match;
		// const { article } = params;
		// const { date, filter } = query;
		   // this.state.isAuthenticated? (
     //    <Route children={this.props.children} />
     //  ) : (
    	// 		<Redirect to={'/mypage'} />
     //  )
		return (
			<div>
				<h1 className="dashboard-title">Setting</h1>
				<dl>
					<dt>nick name</dt>
					<dd><input type="text" name="name" value={this.state.name} onChange={this.handleChange} /></dd>
					<dt>email</dt>
					<dd><input type="text" name="email" value={this.state.email} onChange={this.handleChange} /></dd>
					<dt>status</dt>
					<dd><Select name="devStatus" value={this.state.devStatus} options={this.state.options} onChange={this.logChange} /></dd>
				</dl>
				<button id="btn-signIn" onClick={this.handleSubmit}>update</button>
			</div>
		);
	}

}

// const mapStateToProps = state => ({
// 	sessionId: state.sessionId
// });