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

export default class AuthPage extends React.Component {
	render() {
		return (
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
			  {/*<Route path="/mypage" name="mypage" component={Mypage}/>*/}
			</div>

	     </Router>
			
		);
	}
}