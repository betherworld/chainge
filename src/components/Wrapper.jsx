import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import BurgerMenu from "../components/BurgerMenu";
import Slider from "../containers/Slider";
import Header from "../containers/Header";
import Footer from "../components/Footer";
import { colors } from "../utilities/style";

const StyledWrapper = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};

  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  flex: 1;
`;

/**
 * The wrapper component
 * @returns {Component} The component
 */
class Wrapper extends React.Component {
  render = () => {
    const {
      background,
      children,
      slider = false,
      header = false,
      footer = false,
      preUser
    } = this.props;
    return (
      <ThemeProvider
        theme={{
          breakpoints: [36, 48, 62, 75]
        }}
      >
        <StyledWrapper id="outer-container" background={background}>
          <BurgerMenu />
          {slider && <Slider />}
          {header && <Header preUser={preUser} />}
          <Main id="page-wrap">{children}</Main>
          {footer && <Footer />}
        </StyledWrapper>
      </ThemeProvider>
    );
  };
}

Wrapper.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node,
  slider: PropTypes.bool,
  header: PropTypes.bool,
  footer: PropTypes.bool,
  preUser: PropTypes.node
};

export default Wrapper;
