import React from 'react';
// import DBnav from './DBNav';
// import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { updateUserProfile, getUserdata, getUserProfile, getDatabase, updateDatabase, updateStorage } from '../../utils/FirebaseAuthService';
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
     	// getUserdata();
     	var userData = getUserProfile();
     	// console.log(userData);
		this.state = userData;
		getDatabase('devStatus',
			(objDate) => {
				var obj = [];
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
	// componentDidMount(){
	// 	getUserProfile();
 //    	let userDate = {
	// 	      photoURL : "httpp::::tetestest.jpg"
	// 	    };
	// 	updateUserProfile(userDate);
	// }

	handleChange(event) {
    	const target = event.target;
    	const value = target.value;
    	const name = target.name;
		this.setState({
			[name]: value
		});
	}

	handleImgChange(event){
		var files = event.target.files;
    	const target = event.target;
    	const value = target.value;
    	const name = target.name;
    	let userDate = {};
		console.log("event.target:::::"+name);
		console.log("event.target:::::"+files);
		updateStorage(files[0], 'profile', function(metadata){
			updateUserProfile(
			    userDate = {
			      photoURL : metadata.fullPath
			    });
		});
		getUserProfile();
		// var mountainImagesRef = storageRef.child('images/mountains.jpg');
		// mountainImagesRef.put(files[0]).then(function(snapshot) {
		//   console.log('Uploaded a blob or file!');
		// });
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
				<h1 className="contents-title">Setting</h1>
				<div className="unit-card">
					<article>
						<h2>Profile</h2>
						<div className="setting-box">

							<div className="input-area">
								<dl className="dl">
									<dt>Name</dt>
									<dd><input type="text" name="name" value={this.state.name} onChange={this.handleChange} /></dd>
									<dt>Your Role</dt>
									<dd><Select name="devStatus" value={this.state.devStatus} options={this.state.options} onChange={this.logChange} /></dd>
									<dt>E-mail</dt>
									<dd><input type="text" name="email" value={this.state.email} onChange={this.handleChange} /></dd>
									<dt>Bio</dt>
									<dd><textarea rows="4" cols="50" onChange={this.handleChange}>{this.state.bio}</textarea></dd>
									<dt>Location</dt>
									<dd><input type="text" name="location" value={this.state.location} onChange={this.handleChange} /></dd>
									<dt>URL</dt>
									<dd><input type="text" name="url" value={this.state.url} onChange={this.handleChange} /></dd>
									<dt>Company</dt>
									<dd><input type="text" name="company" value={this.state.company} onChange={this.handleChange} /></dd>
									<dt>Linkedin</dt>
									<dd><input type="text" name="linkedin" value={this.state.linkedin} onChange={this.handleChange} /></dd>
									<dt>Twitter</dt>
									<dd><input type="text" name="twitter" value={this.state.twitter} onChange={this.handleChange} /></dd>
									<dt>GitHub</dt>
									<dd><input type="text" name="github" value={this.state.github} onChange={this.handleChange} /></dd>
									<dt>Facebook</dt>
									<dd><input type="text" name="facebook" value={this.state.facebook} onChange={this.handleChange} /></dd>
									<dt>Dribbble</dt>
									<dd><input type="text" name="dribbble" value={this.state.dribbble} onChange={this.handleChange} /></dd>
								</dl>
								<button id="btn-signIn" onClick={this.handleSubmit}>update</button>
							</div>

							<div className="pic-area">
								<div className="pic-area">
									<img src="" id="myimg" />
								</div>
								<input name="images" type="file" onChange={this.handleImgChange} />
							</div>
							
						</div>
					</article>
				</div>
			</div>
		);
	}

}
/*

								<button id="btn-signIn" onClick={this.handleImgSubmit}>update</button>
*/
//https://stackoverflow.com/questions/41214447/firebase-user-uploads-and-profile-pictures

// const mapStateToProps = state => ({
// 	sessionId: state.sessionId
// });