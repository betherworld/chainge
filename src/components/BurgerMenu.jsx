import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { elastic as Menu } from "react-burger-menu";
import { decorator as reduxBurgerMenu } from "redux-burger-menu";
import { FaHome } from "react-icons/fa";
import { IoLogoRss as BlogIcon } from "react-icons/io";
import { FaComment as ContactIcon, FaInfoCircle } from "react-icons/fa";

import Link from "../components/Link";
import { colors } from "../utilities/style";

const BurgerList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;
const BurgerItem = styled.li`
  margin: 0 0 0.5rem 0;
  padding: 0 0 0.5rem 0;
  ${({ seperator }) =>
    seperator ? `border-bottom: ${colors.primaryContrast} 1px solid;` : ""};

  svg {
    margin-right: 0.5rem;
  }
`;

const ReduxBurgerMenu = reduxBurgerMenu(Menu);

/**
 * A burger menu
 * @returns {Component} The component
 */
class BurgerMenu extends React.PureComponent {
  render = () => {

    return (
      <ReduxBurgerMenu right>
        <BurgerList>
          <BurgerItem>
            <Link to="/" negative flex>
              <FaHome />
              Projects
            </Link>
          </BurgerItem>
          <BurgerItem>
            <Link to="/about" negative flex>
              <FaInfoCircle />
              About
            </Link>
          </BurgerItem>
          <BurgerItem>
            <Link
              onClick={() => {
                window.location =
                  "mailto:" +
                  "em"
                    .split("")
                    .reverse()
                    .join("") +
                  "@tyratox.ch";
              }}
              negative
              flex
            >
              <ContactIcon />
              Contact
            </Link>
          </BurgerItem>
        </BurgerList>
      </ReduxBurgerMenu>
    );
  };
}

const mapStateToProps = state => ({
 
});

export default connect(mapStateToProps)(BurgerMenu);
