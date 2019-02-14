import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";
import { FaSortUp } from "react-icons/fa";

import Wrapper from "../components/Wrapper";
import Page from "../components/Page";
import Container from "../components/Container";
import { getProjects, getVoteTokens, getCampaign } from "../reducers";
import { fetchProjects, voteForProject } from "../actions/project";
import { colors, borders } from "../utilities/style";
import Button from "../components/Button";
import NegativeButton from "../components/NegativeButton";
import { fetchAccount } from "../actions/account";
import { fetchCampaign } from "../actions/campaign";

const Project = styled(Box)`
  h2 {
    margin: 0;
  }

  & > div {
    position: relative;
    padding: 0.5rem;
    padding-right: 3rem;

    color: #fff;
    background-color: ${colors.primary};
    border-radius: ${borders.radius};
  }
`;

const Votes = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  & > div:first-child {
    margin-bottom: -2.5rem;
    color: ${colors.primary};

    span > svg path {
      opacity: 1 !important;
      fill: currentColor !important;
    }
  }
`;

/**
 * The vote page
 * @returns {Component} The component
 */
class Vote extends React.PureComponent {
  componentDidMount = () => {
    this.props.fetchCampaign();
    this.props.fetchAccount();
    this.props.fetchProjects();
  };

  render = () => {
    const { campaign, projects, voteTokens } = this.props;

    return (
      <Wrapper slider header footer>
        <Helmet>
          <title>Chainge | Vote</title>
        </Helmet>
        <Page>
          <Container>
            Gatherers Token count: {voteTokens}
            <br />
            {JSON.stringify(campaign)}
            <Flex wrap>
              {projects.map((project, index) => (
                <Project key={index} width={[1, 1, 1 / 2, 1 / 2]} pr={2}>
                  <div>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <Votes>
                      <NegativeButton
                        onClick={() => this.props.voteForProject(project.index)}
                      >
                        <FaSortUp />
                      </NegativeButton>
                      <br />
                      {project.voteCount}
                    </Votes>
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
  campaign: getCampaign(state),
  projects: getProjects(state),
  voteTokens: getVoteTokens(state)
});

const mapDispatchToProps = dispatch => ({
  /**
   * Fetches the project
   * @returns {Promise} The fetch promise
   */
  fetchProjects() {
    return dispatch(fetchProjects());
  },
  /**
   * Fetches the account
   * @returns {Promise} The fetch promise
   */
  fetchAccount() {
    return dispatch(fetchAccount());
  },
  /**
   * Votes for a project
   * @param {number} projectIndex The project index
   * @returns {Promise} the fetch promise
   */
  voteForProject(projectIndex) {
    return dispatch(voteForProject(projectIndex));
  },
  /**
   * Fetches the campaign
   * @returns {Promise} The fetch promise
   */
  fetchCampaign() {
    return dispatch(fetchCampaign());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vote);
