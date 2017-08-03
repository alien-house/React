import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";


const mathReducer = (state = {
  result: 1,
  lastValues: []
}, action) => {
  switch (action.type){
    case "ADD":
      state = {
        ...state,
        result:state.result + action.payload,
        lastValues: [...state.lastValues, action.payload]
      };
      // state.lastValues.push(action.payload);
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


const userReducer = (state = {
  name: "Max",
  age: 27
}, action) => {
  switch (action.type){
    case "SET_NAME":
      state = {
        ...state,
        name: action.payload
      };
      // state.lastValues.push(action.payload);
      break;
    case "SET_AGE":
        state = {
          ...state,
          age: action.payload
        };
        // state.lastValues.push(action.payload);
      break;
  }
  return state;
};

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const myLogger = (store) => (next) => (action) => {
  console.log("Logged Actions: ", action);
  // next(action);
};
const store = createStore(
	combineReducers({ math: mathReducer, user: userReducer }), 
	{}, 
	applyMiddleware(createLogger())
);
//myLoggerはミドルウェアで使いたい関数

// You can use subscribe() to update the UI in response to state changes.
store.subscribe(() => {
  console.log("Store update!", store.getState());
});
//as action?
// store.dispatch({
//   type: "ADD",
//   payload:10
// });
// store.dispatch({
//   type: "ADD",
//   payload:22
// });
// store.dispatch({
//   type: "SUBTRACT",
//   payload:80
// });
// store.dispatch({
//   type: "SET_AGE",
//   payload:80
// });



ReactDOM.render(
	<Provider store={store}>
		<App />	
	</Provider>
	, document.getElementById('root'));
