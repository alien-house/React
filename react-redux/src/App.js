import { createStore } from "redux";

const initialState = {
  result: 1,
  lastValues: [],
  username: "Mike"
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case "ADD":
      state = {
        ...state,
        result:state.result + action.payload,
        lastValues: [...state.lastValues, action.payload]
      };
      // state.lastValues.push(action.payload);
      // state.result += action.payload;
      break;
    case "SUBTRACT":
        state = {
          ...state,
          result:state.result - action.payload,
          lastValues: [...state.lastValues, action.payload]
        };
        // state.lastValues.push(action.payload);
      break;
  }
  return state;
};

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(reducer);

// You can use subscribe() to update the UI in response to state changes.
store.subscribe(() => {
  console.log("Store update!", store.getState());
});
//as action?
store.dispatch({
  type: "ADD",
  payload:10
});
store.dispatch({
  type: "ADD",
  payload:22
});
store.dispatch({
  type: "SUBTRACT",
  payload:80
});

// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
