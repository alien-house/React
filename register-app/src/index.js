import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router,
  Route, 
  Link,
} from 'react-router-dom'
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"

import * as firebase from "firebase";
var config = {
  apiKey: "AIzaSyCz4_2OhpXg6TPdYWRXnt330dRyD5q1jFA",
  authDomain: "programming-473ea.firebaseapp.com",
  databaseURL: "https://programming-473ea.firebaseio.com",
  storageBucket: "programming-473ea.appspot.com",
};
firebase.initializeApp(config);



const app = document.getElementById('root');

ReactDOM.render(
     <Router>
		<div>
		  <ul>
		    <li><Link to="/register">Register</Link></li>
		    <li><Link to="/signin">SignIn</Link></li>
		  </ul>

		  <hr/>

		  <Route path="/register" name="register" component={Register}/>
		  <Route path="/signin" name="signin" component={SignIn}/>
		</div>

     </Router>, 
app);
