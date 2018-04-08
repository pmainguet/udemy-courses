import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

//Middleware: function that catch all actions before they are sent to reducers
//in this case, ReduxPromise check payload property of actions passing through
//if payload is promise, it halts action until success of failure of ajax request
// create a new action with payload as Request and send it to reducers (unwraps the promise)
import ReduxPromise from "redux-promise";

import App from "./components/app";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.querySelector(".container")
);
