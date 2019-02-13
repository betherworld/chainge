import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Helmet } from "react-helmet";
import SyntaxHighlighter from "react-syntax-highlighter";
import { githubGist as syntaxStyle } from "react-syntax-highlighter/dist/styles/hljs";

import Wrapper from "../components/Wrapper";
import Page from "../components/Page";
import { fetchAlgorithm } from "../actions/algorithm";
import { getAlgorithmBySlug } from "../reducers";
import { colors } from "../utilities/style";
import Container from "../components/Container";
import Example from "../components/Example";

/**
 * An algorithm page
 * @returns {Component} The component
 */
class Algorithm extends React.PureComponent {
  componentDidMount = () => {
    const { fetchAlgorithm } = this.props;

    fetchAlgorithm();
  };
  render = () => {
    const {
      slug,
      algorithm: { title = "", content = "", algorithm = {} }
    } = this.props;

    const { functionName = "", examples = [], code = "" } = algorithm;

    return (
      <Wrapper slider header footer>
        <Helmet>
          <title>Nico Hauser | {title}</title>
        </Helmet>
        <Page>
          <Container>
            <h1>{title}</h1>
            {examples.map((example, index) => (
              <Example key={index} {...example} {...algorithm} />
            ))}
            <SyntaxHighlighter language="javascript" style={syntaxStyle}>
              {code}
            </SyntaxHighlighter>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Container>
        </Page>
      </Wrapper>
    );
  };
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { algorithmSlug }
    }
  }
) => ({
  slug: algorithmSlug,
  algorithm: getAlgorithmBySlug(state, algorithmSlug) || {}
});

const mapDispatchToProps = (
  dispatch,
  {
    match: {
      params: { algorithmSlug }
    }
  }
) => ({
  /**
   * Fetches an algorithm
   * @returns {Promise} The fetch promise
   */
  fetchAlgorithm() {
    return dispatch(fetchAlgorithm(algorithmSlug));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Algorithm)
);
