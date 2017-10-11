import React from 'react';
import { getDatabase, getIdToken } from '../../utils/FirebaseAuthService';
import * as firebase from "firebase";
import fetchJsonp from 'fetch-jsonp'
import {Creatable} from 'react-select';
import 'react-select/dist/react-select.css';
import '../Main.css';
import ReactPaginate from 'react-paginate';


export default class Events extends React.Component {
	constructor(){
		console.log("Jobs.constructor()");
		super();
	}

	render(selectProps) {
		
		return (
			<div className="contents-wrap">
				<h1 className="contents-title">Events</h1>
			</div>
		);
	}
}
