import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { updateUserProfile, getUserProfile, getDatabase, updateDatabase } from '../../utils/FirebaseAuthService';

export default class Projects extends React.Component {

	render() {
		return (
			<div>
				<h1 className="dashboard-title">Projects</h1>
			</div>
		);
	}

}