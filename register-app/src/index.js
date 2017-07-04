import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router,
  Route, 
  Link,
  Redirect,
} from 'react-router-dom'
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import Dashboard from "./mypage/Dashboard"
// import Mypage from "./mypage/AuthExample"
import { Auth } from './pages/Authenticated';

import {firebaseConfig} from "./config";
import * as firebase from "firebase";
firebase.initializeApp(firebaseConfig);

const app = document.getElementById('root');


const PrivateRoute = ({ component: Component, ...rest }) => {
	Auth.authCheck();
console.log("@-----"+Auth.isAuthenticated);
	return(
  <Route {...rest} render={props => (
    Auth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)}

ReactDOM.render(
	    			
     <Router>
		<div>
		  <ul>
		    <li><Link to="/register">Register</Link></li>
		    <li><Link to="/signin">SignIn</Link></li>
		    {/*<li><Link to="/mypage">MyPage</Link></li>*/}
		  </ul>

		  <hr/>

		  <Route path="/register" name="register" component={Register}/>
		  <Route path="/signin" name="signin" component={SignIn}/>
		  <PrivateRoute path="/dashboard" name="dashboard" component={Dashboard}/>
		  {/*<Route path="/mypage" name="mypage" component={Mypage}/>*/}
		</div>

     </Router>, 
app);
