import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Wrapper from "../components/Wrapper";
import Page from "../components/Page";
import Container from "../components/Container";

/**
 * The vote page
 * @returns {Component} The component
 */
class Vote extends React.PureComponent {
  render = () => {
    const { posts } = this.props;

    return (
      <Wrapper slider header footer>
        <Helmet>
          <title>Chainge | Vote</title>
        </Helmet>
        <Page>
          <Container>
            <p>Lorem ipsum</p>
          </Container>
        </Page>
      </Wrapper>
    );
  };
}

export default Vote;
