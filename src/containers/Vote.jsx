import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";
import { FaSortUp } from "react-icons/fa";

import Wrapper from "../components/Wrapper";
import Page from "../components/Page";
import Container from "../components/Container";
import { getProjects } from "../reducers";
import { fetchProjects } from "../actions/project";
import { colors, borders } from "../utilities/style";

const Project = styled(Box)`
  h2 {
    margin-top: 0;
  }

  & > div {
    position: relative;
    padding: 0.5rem;
    padding-right: 1.5rem;

    color: #fff;
    background-color: ${colors.primary};
    border-radius: ${borders.radius};
  }
`;

const Votes = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 0rem;
  font-size: 1.5rem;
`;

/**
 * The vote page
 * @returns {Component} The component
 */
class Vote extends React.PureComponent {
  componentDidMount = () => {
    //this.props.fetchProjects();
  };

  render = () => {
    const { projects } = this.props;

    return (
      <Wrapper slider header footer>
        <Helmet>
          <title>Chainge | Vote</title>
        </Helmet>
        <Page>
          <Container>
            <Flex wrap>
              {projects.map((project, index) => (
                <Project key={index} width={[1, 1, 1 / 2, 1 / 2]} pr={2}>
                  <div>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <Votes>{project.voteCount}</Votes>
                  </div>
                </Project>
              ))}
            </Flex>
          </Container>
        </Page>
      </Wrapper>
    );
  };
}

const mapStateToProps = state => ({
  projects: getProjects(state)
});

const mapDispatchToProps = dispatch => ({
  /**
   * Fetches the project
   * @returns {Promise} The fetch promise
   */
  fetchProjects() {
    return dispatch(fetchProjects());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vote);
