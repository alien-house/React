import React, { Component } from 'react';
import Gnav from './components/Gnav';
import Register from "./components/Register"
import SignIn from "./components/SignIn"
import Dashboard from "./components/dashboard/Dashboard"
import { requireAuth, isAuthenticated } from './utils/FirebaseAuthService';
import { 
  BrowserRouter as Router,
  Route, 
  Redirect,
  browserHistory,
} from 'react-router-dom'

class App extends Component {
  constructor(){
    super();
    this.state = {
      uid: null
    };
    const getIsLogin = (uid) => {
      this.setState({uid:uid});
    }
    requireAuth(getIsLogin);
    // console.log("only one time <3");
  }

  render() {
    return (
      <div className="App">
        <Router history={browserHistory}>
          <div>
            <Gnav />
            <Route path="/register" name="register" component={Register}/>
            <Route path="/signin" name="signin" component={SignIn}/>
            <PrivateRoute path="/dashboard" name="dashboard" component={Dashboard} />
          </div>
        </Router>
      </div>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
)}

export default App;