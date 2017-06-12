import React from 'react';
import ReactDOM from 'react-dom';
// import { Link } from "react-router";
import { 
  BrowserRouter as Router,
  Route, 
  Link,
} from 'react-router-dom'

import Archives from "./js/pages/Archives"
// import Featured from "./js/pages/Featured"
import Settings from "./js/pages/Settings"
import Standard from "./js/Standard"
// import Layout from "./js/pages/Layout"

const app = document.getElementById('app');

ReactDOM.render(
     <Router>
		<div>
     	<Standard text="nikoniko">goog byge</Standard>
     	<Standard text="maruhisa" />
		  <ul>
		    <li><Link to="/archives">Archives</Link></li>
		    <li><Link to="/settings">Settings</Link></li>
		  </ul>

		  <hr/>

		  <Route path="/archives/:article" name="archives" component={Archives}/>
		  <Route path="/settings" name="settings" component={Settings}/>
		</div>

     </Router>,
app);

