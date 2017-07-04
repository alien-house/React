// import React from 'react';
import * as firebase from "firebase";
// import { Redirect } from 'react-router-dom';

export const Auth = {
	isAuthenticated: false,
	authenticate(cb) {
		this.isAuthenticated = true
		cb()
	},
	signout(cb) {
		this.isAuthenticated = false
		cb()
	},
	authCheck(){
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				this.isAuthenticated = true
 				// this.setState.email = email;
			}else{
				this.isAuthenticated = false
			}
		});
	}
}

// Auth.prototype = {bar: 'baz'};