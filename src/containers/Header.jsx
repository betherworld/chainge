import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Helmet } from "react-helmet";
import { action as toggleBurgerMenuAction } from "redux-burger-menu";
import { MdMenu as MenuIcon } from "react-icons/md";

import { colors } from "../utilities/style";
import { getBurgerMenuOpen } from "../reducers";
import Link from "../components/Link";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import Flexbar from "../components/Flexbar";
import Push from "../components/Push";
import MediaQuery from "../components/MediaQuery";
import NavItem from "../components/NavItem";

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;

  z-index: 100;

  background-color: ${colors.background};
  color: ${colors.primary};
`;

/**
 * The page header
 * @returns {Component} The component
 */
class Header extends React.PureComponent {
  render = () => {
    const { isBurgerMenuOpen, toggleBurgerMenu } = this.props;

    return (
      <HeaderWrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="author" content="Nico Hauser" />
          <meta name="format-detection" content="telephone=no" />

          <title>Chainge</title>
        </Helmet>
        <Navbar>
          <Container>
            <Flexbar>
              <NavItem>Chainge</NavItem>
              <Push left>
                <MediaQuery md up>
                  <NavItem>
                    <Link to="/">Home</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/claim">Claim</Link>
                  </NavItem>
                  <NavItem>
                    <Link to="/vote">Vote</Link>
                  </NavItem>
                </MediaQuery>
                <MediaQuery md down>
                  <NavItem onClick={toggleBurgerMenu}>
                    <MenuIcon size="25" />
                  </NavItem>
                </MediaQuery>
              </Push>
            </Flexbar>
          </Container>
        </Navbar>
      </HeaderWrapper>
    );
  };
}

Header.propTypes = {};

const mapStateToProps = state => ({
  isBurgerMenuOpen: getBurgerMenuOpen(state)
});

const mapDispatchToProps = dispatch => ({
  /**
   * Toggles the burger menu
   * @param {boolean} open Whether the menu should be open afterwards
   * @returns {void}
   */
  toggleBurgerMenu(open) {
    return dispatch(toggleBurgerMenuAction(open));
  }
});

const mergeProps = (mapStateToProps, mapDispatchToProps, ownProps) => ({
  ...mapStateToProps,
  ...mapDispatchToProps,
  ...ownProps,
  /**
   * Toggles the buger menu
   * @returns {void}
   */
  toggleBurgerMenu() {
    return mapDispatchToProps.toggleBurgerMenu(
      !mapStateToProps.isBurgerMenuOpen
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Header);
