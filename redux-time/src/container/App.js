import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import './App.css';
import { syncDate } from  "../actions/clock";
import Clock from "../components/Clock"

class App extends Component {

  componentDidMount() {
    this.timer = setInterval(this.props.syncDate, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="warp">
        <h1>Redux Clock</h1>
        <Clock {...this.props.time} />
        <small className="copy">inspired by <a href="https://github.com/tsuyoshiwada/redux-samples/tree/gh-pages/clock" target="_blank">tsuyoshiwada/redux-samples</a></small>
      </div>
    );
  }
}

// for typechecking
App.propTypes = {
  syncDate: PropTypes.func.isRequired,
  time: PropTypes.shape({
    hour: PropTypes.number.isRequired,
    minutes: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired
  })
};

const mapStateToProps = (state) => {
  return {
    time: state.clock
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    syncDate: () => {
      dispatch(syncDate());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
    

    
