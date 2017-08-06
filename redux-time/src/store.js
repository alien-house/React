import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import clock from "./reducers/clockReducer";

export default createStore(
  combineReducers({ 
    clock
  }), 
  {}, 
  applyMiddleware(createLogger())
);