import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Wrapper from "../components/Wrapper";
import Page from "../components/Page";
import Container from "../components/Container";
import AlgorithmEntry from "../components/AlgorithmEntry";
import { fetchLatestAlgorithms } from "../actions/algorithm";
import { getAlgorithms } from "../reducers";

/**
 * An algorithm overview page
 * @returns {Component} The component
 */
class Algorithms extends React.PureComponent {
  componentDidMount = () => {
    const { fetchLatest, algorithms } = this.props;

    fetchLatest();
  };

  render = () => {
    const { algorithms } = this.props;

    return (
      <div>
        <Wrapper slider header footer>
          <Page>
            {algorithms.map(algorithm => (
              <AlgorithmEntry key={algorithm.slug} {...algorithm} />
            ))}
          </Page>
        </Wrapper>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  algorithms: getAlgorithms(state)
});
const mapDispatchToProps = dispatch => ({
  /**
   * Fetches the latest algorithms
   * @returns {Promise} the fetch promise
   */
  fetchLatest() {
    return dispatch(fetchLatestAlgorithms());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Algorithms);
