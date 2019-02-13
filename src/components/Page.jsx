import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Container from "./Container";

const PageWrapper = styled.div`
  margin-top: 2rem;
`;

/**
 * The page component
 * @returns {Component} The component
 */
class Page extends React.PureComponent {
  render = () => {
    const { children } = this.props;

    return <PageWrapper>{children}</PageWrapper>;
  };
}

Page.propTypes = {
  children: PropTypes.node
};

export default Page;
