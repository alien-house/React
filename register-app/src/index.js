import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router,
  Route, 
  Link,
} from 'react-router-dom'
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"



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
