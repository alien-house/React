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
import { CSSTransitionGroup } from 'react-transition-group'
import './App.css'

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
    console.log(this.props);
    return (
      <div className="App">
        <Router history={browserHistory}>
          <div style={styles.fill}>
            <Gnav />
            <div style={styles.content}>
              <CSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
              <Route path="/register" name="register" component={Register}/>
              <Route path="/signin" name="signin" component={SignIn}/>
              <PrivateRoute path="/dashboard" name="dashboard" component={Dashboard} />
            </CSSTransitionGroup>
            </div>
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

const styles = {}
styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}

styles.content = {
  ...styles.fill,
  top: '140px',
  textAlign: 'center',
  background:'#AAAAAA'
}

styles.nav = {
  padding: 0,
  margin: 0,
  position: 'absolute',
  top: 0,
  height: '40px',
  width: '100%',
  display: 'flex'
}

styles.navItem = {
  textAlign: 'center',
  flex: 1,
  listStyleType: 'none',
  padding: '10px'
}

styles.hsl  = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px'
}

export default App;