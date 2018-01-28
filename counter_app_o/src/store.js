import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import counter from "./reducers/counterReducer";

export default createStore(
  combineReducers({ 
    counter
  }), 
  {}, 
  applyMiddleware(createLogger())
);