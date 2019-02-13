import { Helmet } from "react-helmet";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";

import Wrapper from "../components/Wrapper";
import Page from "../components/Page";
import Container from "../components/Container";
import Placeholder from "../components/Placeholder";
import Map from "../components/Map";
import { fetchAccount } from "../actions/account";
import { getAccount } from "../reducers";
import { borders, colors } from "../utilities/style";
import web3 from "../web3/web3";

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
  border-radius: ${borders.radius};
  border: ${colors.primary} 2px solid;
  font-size: 2rem;
`;

const LastTransaction = styled.div`
  background-color: ${colors.success};
  padding: 0.5rem 1rem;
`;

const StyledButton = styled.button`
  background-color: ${colors.primary};
  color: #fff;
  padding: 0.5rem 0.5rem;
  border-radius: ${borders.radius};
  border: none;
  cursor: pointer;

  margin: 1rem auto;
  display: block;

  font-size: 1.5rem;
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
    this.props.fetchAccount();
  };

  fund = () => {
    const { money } = this.state;
    const { account } = this.props;

    if (isNaN(money) || money <= 0) {
      return;
    }

    web3.eth.sendTransaction(
      { from: account, to: account, value: window.web3.toWei(money) },
      (error, lastTransaction) => {
        this.setState({ lastTransaction: money });
      }
    );
  };

  render = () => {
    const { money, lastTransaction } = this.state;

    return (
      <div>
        <Helmet>
          <title>Chainge</title>
        </Helmet>
        <Wrapper slider header footer>
          <Page>
            <Container>
              <Map />
              <StyledInput
                placeholder=""
                value={money}
                onChange={event =>
                  this.setState({ money: event.currentTarget.value })
                }
              />
              <Description>
                Enter the amount of ether with which you want to support this
                project.
              </Description>
              <StyledButton onClick={() => this.fund()}>
                Send Money
              </StyledButton>

              {lastTransaction && (
                <LastTransaction>
                  <h2>Thank you for supporting us!</h2>
                  You just supported this campaign with {lastTransaction} ETH.
                </LastTransaction>
              )}
            </Container>
          </Page>
        </Wrapper>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  account: getAccount(state)
});
const mapDispatchToProps = dispatch => ({
  /**
   * Fetches the current account
   * @returns {void}
   */
  fetchAccount() {
    return dispatch(fetchAccount());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Frontpage);
