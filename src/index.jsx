import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import createHistory from "history/createBrowserHistory";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import throttle from "lodash/throttle";
import App from "App";

import reducers from "./reducers";
import { loadState, saveState } from "./local-storage";

//components

//styles
import "scss/global.scss";

//polyfills
require("es6-promise").polyfill();
require("isomorphic-fetch");

//Load state from local storage and create history object
const persistedState = loadState();
const history = createHistory();

//and the redux store
const store = createStore(
  reducers,
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, routerMiddleware(history))
  )
);

//storing some keys of the application state in the localstorage
store.subscribe(
  throttle(() => {
    const { authentication } = store.getState();

    saveState({
      authentication
    });
  }, 1000)
);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <App history={history} store={store} />
    </AppContainer>,
    document.getElementById("root")
  );
};

//do the initial render
render(App);
