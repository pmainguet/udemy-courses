import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
//BrowserRouter: interacts with the History Library (called before the proper React Router) and decide
// what to do on on an URL change
// Route: React Component that is initiated in every other React Component of the Application => configuration
// of routes (which React Component on specific URL)
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import PostsIndex from "./containers/posts_index";
import PostsNew from "./containers/posts_new";
import PostsShow from "./containers/posts_show";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

//Switch: Render the first route that is catched

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={PostsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
