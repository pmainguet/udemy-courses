import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
//BrowserRouter: interacts with the History Library (called before the proper React Router) and decide
// what to do on on an URL change
// Route: React Component that is initiated in every other React Component of the Application => configuration
// of routes (which React Component on specific URL)
import { BrowserRouter, Route } from "react-router-dom";

import App from "./components/app";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware()(createStore);

class Hello extends React.Component {
  render() {
    return <div>Hello!</div>;
  }
}

class Goodbye extends React.Component {
  render() {
    return <div>Goodbye!</div>;
  }
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        Header
        <Route path="/hello" component={Hello} />
        <Route path="/goodbye" component={Goodbye} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
