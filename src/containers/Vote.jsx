import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";
import { FaSortUp, FaCoins } from "react-icons/fa";
import TimeAgo from "react-timeago";

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
  margin: 0.5rem 0;

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

const Warning = styled.div`
  background-color: ${colors.warning};
  color: #fff;
  border-radius: ${borders.radius};
  padding: 1rem;

  margin-bottom: 1rem;
`;

const Tokens = styled.div`
  background-color: ${colors.primary};
  color: #fff;
  border-radius: ${borders.radius};
  position: relative;
  padding: 0.25rem 0.5rem;

  margin-bottom: 1rem;

  display: inline-block;

  display: inline-flex;
  align-items: center;

  font-size: 1.5rem;

  & > *:last-child {
    margin-left: 0.5rem;
  }
`;
const Title = styled.h1`
  span {
    margin-right: 1rem;
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

    const votingEnabled =
      campaign && campaign.votingInProgress && voteTokens > 0;
    let date = 0;

    if (campaign) {
      date += campaign.startTimeVoting;

      if (date == 0) {
        date += campaign.startTimeCampaign;

        if (date > 0) {
          date += campaign.runTimeCampaign;
        } else {
          date +=
            campaign.startTimeDonations +
            campaign.runTimeDonations +
            campaign.runTimeCampaign;
        }
      }
    }

    date *= 1000;

    return (
      <Wrapper slider header footer>
        <Helmet>
          <title>Chainge | Vote</title>
        </Helmet>
        <Page>
          <Container>
            <Title>
              <span>Community Projects Voting</span>
              <Tokens>
                {voteTokens} <FaCoins />
              </Tokens>
            </Title>

            <br />
            {(!campaign || !campaign.votingInProgress) && date && (
              <Warning>
                <h2>Warning</h2>
                <p>
                  {Date.now() >= date ? (
                    <span>
                      Voting is currently not enabled, it will start shortly
                    </span>
                  ) : (
                    <span>
                      Voting is currently not enabled, it will start in about{" "}
                      <TimeAgo date={date} />
                    </span>
                  )}
                </p>
              </Warning>
            )}
            <Flex wrap>
              {projects.map((project, index) => (
                <Project key={index} width={[1, 1, 1 / 2, 1 / 2]} pr={2}>
                  <div>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>

                    <Votes>
                      {votingEnabled && (
                        <NegativeButton
                          onClick={() =>
                            this.props.voteForProject(project.index)
                          }
                        >
                          <FaSortUp />
                        </NegativeButton>
                      )}
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
