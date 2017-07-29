import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { updateUserProfile, getUserProfile, getDatabase, updateDatabase } from '../../utils/FirebaseAuthService';

export default class Messages extends React.Component {

	render() {
		return (
			<div>
				<h1 className="dashboard-title">Messages</h1>
			</div>
		);
	}

}