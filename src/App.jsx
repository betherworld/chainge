import React from "react";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import Frontpage from "./containers/Frontpage";
import Vote from "./containers/Vote";
import Claim from "./containers/Claim";
import ScrollToTop from "./components/ScrollToTop";

/**
 * Renders the app
 * @param {Object} props The passed props
 * @returns {Component} The app component
 */
const App = ({ history, store }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollToTop>
          <Route exact path="/" component={Frontpage} />
          <Route exact path="/claim" component={Claim} />
          <Route exact path="/vote" component={Vote} />
        </ScrollToTop>
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(module)(App);
