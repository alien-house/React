import React from 'react';

import { getDatabaseTest } from '../../utils/FirebaseAuthService';
export default class Resume extends React.Component {

	componentWillMount(){
		var test = getDatabaseTest();
		// var testVal = test();
			console.log(test);
		test.then( value => {
			console.log(value); // Success!
		}, reason => {
			console.log(reason); // Error!
		});
	}

	render() {
		return (
			<div>
				<h1 className="dashboard-title">Resume</h1>
			</div>
		);
	}

}