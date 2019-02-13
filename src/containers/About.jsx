import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Wrapper from "../components/Wrapper";
import Page from "../components/Page";
import Container from "../components/Container";

const At = styled.span`
  &:after {
    content: "@";
  }
`;
/**
 * The blog feed
 * @returns {Component} The component
 */
class About extends React.PureComponent {
  render = () => {
    const { posts } = this.props;

    return (
      <Wrapper slider header footer>
        <Helmet>
          <title>Nico Hauser | About</title>
        </Helmet>
        <Page>
          <Container>
            <p>
              My name is Nico Hauser. I've been working on various software
              development projects in the last few years, a selection of which
              can be found on the first page. Currently I'm studying computer
              science at the ETH Zurich. If you would like to contact me, you
              can do so by sending an email to "me" <At /> tyratox.ch, yes
              literally ;)
            </p>
            <p>Last Update: 17.01.2019</p>
          </Container>
        </Page>
      </Wrapper>
    );
  };
}

export default About;
