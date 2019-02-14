import { Helmet } from "react-helmet";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";
import { FaEthereum } from "react-icons/fa";
import TimeAgo from "react-timeago";

import ChaingeLogo from "../../img/logo.svg";
import Wrapper from "../components/Wrapper";
import Page from "../components/Page";
import Container from "../components/Container";
import Map from "../components/Map";
import { fetchAccount } from "../actions/account";
import { getAccount } from "../reducers";
import { borders, colors } from "../utilities/style";
import web3 from "../web3";
import Button from "../components/Button";
import { fetchCampaign } from "../actions/campaign";
import { getCampaign } from "../reducers";

const FrontWrapper = styled.div`
  h1,
  h2,
  p {
    text-align: center;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

const Description = styled.div`
  display: block;
  margin: 0 auto;
  color: #999;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 50%;
  padding: 0.25rem 0.5rem;
  margin: 1rem auto;
  display: block;
  border-radius: ${borders.inputRadius};
  border: ${colors.primary} 2px solid;
  font-size: 2rem;
`;

const LastTransaction = styled.div`
  background-color: ${colors.success};
  padding: 0.5rem 1rem;
`;

const StyledButton = styled.div`
  text-align: center;
  font-size: 1.25rem;
`;

const Table = styled.table`
  width: 100%;
  margin: 0 auto;

  td:first-child {
    padding-right: 1rem;
  }
`;

const CenteredFlex = styled(Flex)`
  justify-content: center;
`;

const Warning = styled.div`
  background-color: ${colors.warning};
  color: #fff;
  border-radius: ${borders.radius};
  padding: 1rem;

  margin: 1rem 0;
`;

/**
 * An algorithm overview page
 * @returns {Component} The component
 */
class Frontpage extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      money: 1,
      lastTransaction: null
    };
  }

  componentDidMount = () => {
    //Load projects from blockchain
    this.props.fetchCampaign();
    this.props.fetchAccount();
  };

  fund = () => {
    const { money } = this.state;
    const { account } = this.props;

    if (isNaN(money) || money <= 0) {
      return;
    }

    return new Promise((resolve, reject) => {
      web3.eth.sendTransaction(
        { from: account, to: account, value: window.web3.toWei(money) },
        (error, lastTransaction) => {
          if (error) {
            return reject(error);
          }
          resolve(this.setState({ lastTransaction: money }));
        }
      );
    });
  };

  render = () => {
    const { money, lastTransaction } = this.state;
    const { campaign = {} } = this.props;

    return (
      <div>
        <Helmet>
          <title>Chainge</title>
        </Helmet>
        <Wrapper slider header footer>
          <Page>
            <Container>
              <FrontWrapper>
                <CenteredFlex>
                  <Box width={[1, 1, 1 / 2, 1 / 2]} pr={2}>
                    <h1>What is "Chainge"?</h1>
                    <Flex>
                      <Box width={[1, 1, 1 / 2, 1 / 2]} pr={3}>
                        <img src={ChaingeLogo} />
                      </Box>
                      <Box width={[1, 1, 1 / 2, 1 / 2]}>Lorem ipsum dolor</Box>
                    </Flex>
                    <h1>What are the Carpathians?</h1>
                    <h1>About the project</h1>
                    <h2>{campaign.title}</h2>
                    <p>Description of the project: {campaign.description}</p>
                    <Table>
                      <thead>
                        <tr />
                      </thead>
                      <tbody>
                        <tr>
                          <td>Score Goal</td>
                          <td>{campaign.goalScore}</td>
                        </tr>
                        <tr>
                          <td>Pot Distribution WWF / Community Ratio</td>
                          <td>
                            {campaign.ratioProject}% /{" "}
                            {100 - campaign.ratioProject}%
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <h1>How can I help?</h1>
                    <Map />
                    {campaign && campaign.donationInProgress ? (
                      <div>
                        {" "}
                        <StyledInput
                          placeholder=""
                          value={money}
                          onChange={event =>
                            this.setState({ money: event.currentTarget.value })
                          }
                        />
                        <Description>
                          Enter the amount of ether with which you want to
                          support this project.
                        </Description>
                        <StyledButton>
                          <Button onClick={() => this.fund()}>
                            <FaEthereum />
                            Confirm
                          </Button>
                        </StyledButton>
                      </div>
                    ) : (
                      campaign && (
                        <Warning>
                          <h2>The donation phase is over!</h2>
                          <p>
                            We really appreciate your thought to support this
                            campaign but the donations were closed{" "}
                            <TimeAgo date={campaign.startTimeCampaign * 1000} />
                          </p>
                        </Warning>
                      )
                    )}

                    {lastTransaction && (
                      <LastTransaction>
                        <h2>Thank you for supporting us!</h2>
                        You just supported this campaign with {
                          lastTransaction
                        }{" "}
                        ETH.
                      </LastTransaction>
                    )}
                  </Box>
                </CenteredFlex>
              </FrontWrapper>
            </Container>
          </Page>
        </Wrapper>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  account: getAccount(state),
  campaign: getCampaign(state)
});
const mapDispatchToProps = dispatch => ({
  /**
   * Fetches the current account
   * @returns {void}
   */
  fetchAccount() {
    return dispatch(fetchAccount());
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
)(Frontpage);
