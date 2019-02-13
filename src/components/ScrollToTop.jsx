import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { action as toggleBurgerMenuAction } from "redux-burger-menu";

import { getBurgerMenuOpen } from "../reducers";

/**
 * Scrolls to top on route change
 * @returns {Component} The component
 */
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      if (this.props.burgerMenuOpen) {
        this.props.dispatch(toggleBurgerMenuAction(!this.props.burgerMenuOpen));
      }
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = state => ({ burgerMenuOpen: getBurgerMenuOpen(state) });
const ConnectedScrollToTop = connect(mapStateToProps)(ScrollToTop);

export default withRouter(ConnectedScrollToTop);
