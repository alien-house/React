import React from 'react';
import { register } from '../../utils/FirebaseAuthService';
import { CSSTransitionGroup } from 'react-transition-group';
import {
	Redirect
} from 'react-router-dom'

// const styles = {}
// styles.fill = {
//   position: 'absolute',
//   left: 0,
//   right: 0,
//   top: 0,
//   bottom: 0
// }
export default class Register extends React.Component {
	constructor(){
		super();
		// this.state = {value: 'haiteru'};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			redirectToReferrer: false
		};
	}
	// only once
	componentDidMount(){

		// const rootRef = firebase.database().ref().child('user');
		// const userRef = rootRef.child('speed');
		// userRef.on('value', snap => {
		// // console.log(snap);
		// 	this.setState({
		// 		speed: snap.val()
		// 	});
		// });
	}

	// show immediately for each input
	handleChange(event) {
    	const target = event.target;
    	const value = target.value;
    	const name = target.name;
		this.setState({
			[name]: value
		});
		// console.log(this.state);
		// console.log(this.state.email);
		// this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		// console.log('An essay was submitted: ' + this.state.value);
		var email = this.state.email;
		var password = this.state.password;
		if (email === undefined || password === undefined){
			alert('.');
			return;
		}
		if (email.length < 4) {
			alert('Please enter an email addressed.');
			return;
		}
		if (password.length < 4) {
			alert('Please enter a password.');
			return;
		}
		let registerPromise = register(email,password);
		registerPromise.then( value => {
			console.log("Success");
			this.setState({ redirectToReferrer: true })
			
		}, reason => {
			console.log("Error"); // Error!
		});


		event.preventDefault();

	}

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } }
		const { redirectToReferrer } = this.state
		if (redirectToReferrer) {
			return (
			  <Redirect to={from}/>
			)
		}
		return (
          <CSSTransitionGroup
          	component="div"
            transitionName="route"
            transitionEnterTimeout={300}
            transitionAppearTimeout={600}
            transitionLeaveTimeout={300}
            transitionAppear={true}
          >
			<form onSubmit={this.handleSubmit}>
				<div className="form-input-box">
				<input type="text" name="email" className="form-input" placeholder="E-Mail" value={this.state.value} onChange={this.handleChange} />
				</div>
				<div className="form-input-box">
				<input type="password" name="password" className="form-input" placeholder="Password" value={this.state.value} onChange={this.handleChange} />
				</div>
			<button className="btn-submit">Register</button>
			</form>
			</CSSTransitionGroup>
		);
	}
}
