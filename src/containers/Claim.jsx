import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";
import { FaUpload, FaEthereum } from "react-icons/fa";

import Wrapper from "../components/Wrapper";
import Page from "../components/Page";
import Container from "../components/Container";
import { borders, colors } from "../utilities/style";
import Button from "../components/Button";
import { COLOR_HOVER } from "../components/Button";
import { COLOR_DISABLED } from "../components/Button";
import { getActions } from "../reducers";
import { fetchActions, submitAction } from "../actions/action";
import { getCampaign } from "../reducers";
import { fetchCampaign } from "../actions/campaign";

const Form = styled.form`
  input,
  textarea {
    width: 100%;
    border-radius: ${borders.inputRadius};
    border: ${colors.primary} 1px solid;
    padding: 0.25rem 0.5rem;

    box-sizing: border-box;

    &:focus {
      outline: none;
    }
  }

  input[type="submit"] {
    background-color: ${colors.primary};
    color: #fff;
    cursor: pointer;
    padding: 0.5rem 1rem;
  }

  input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;

    &:disabled + label {
      pointer-events: none;
      background-color: ${COLOR_DISABLED};
    }

    & + label {
      color: #fff;
      background-color: ${colors.primary};
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: ${borders.radius};

      transition: 0.3s ease-in-out;
      cursor: pointer;
    }

    &:focus + label,
    & + label:hover {
      background-color: ${COLOR_HOVER};
    }
  }
`;

const Warning = styled.div`
  margin-top: 1rem;
  background-color: ${colors.warning};
  padding: 1rem;
  border-radius: ${borders.radius};
  color: #fff;
`;

const Action = styled(Box)`
  position: relative;
  margin: 1rem 0;
  cursor: pointer;

  h3 {
    margin: 0;
  }

  & > div {
    background-color: ${({ selected }) =>
      selected ? colors.primary : colors.accent};
    color: #fff;
    padding: 1rem;
    border-radius: ${borders.radius};

    height: 100%;
    box-sizing: border-box;
  }
`;

const Hr = styled.hr`
  border-style: solid;
  border-color: #fff;
  border-width: 1px;
  border-bottom: none;
`;

/**
 * The claim page
 * @returns {Component} The component
 */
class Claim extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      submitting: false,
      selectedAction: -1,
      title: ""
    };
  }

  componentDidMount = () => {
    this.props.fetchCampaign();
    this.props.fetchActions();
  };

  render = () => {
    const { submitting, selectedAction } = this.state;
    const { campaign = {}, actions = [] } = this.props;

    const inputsDisabled = submitting || selectedAction < 0;

    return (
      <Wrapper slider header footer>
        <Helmet>
          <title>Chainge | Claim</title>
        </Helmet>
        <Page>
          <Container>
            {campaign.campaignInProgress ? (
              <Flex wrap>
                <Box width={[1, 1, 1 / 2, 1 / 2]} pr={2}>
                  <Flex wrap>
                    {actions
                      .filter(action => !action.done)
                      .map(action => (
                        <Action
                          key={action.index}
                          selected={selectedAction == action.index}
                          onClick={() =>
                            this.setState({ selectedAction: action.index })
                          }
                          width={[1, 1, 1 / 2, 1 / 2]}
                          pr={2}
                        >
                          <div>
                            <h3>{action.title}</h3>
                            <div>{action.description}</div>
                            <Hr />
                            Reward: {action.reward} Gatherers token
                          </div>
                        </Action>
                      ))}
                  </Flex>
                  If the community decides your proof is sufficient, you will be
                  awarded the corresponding amount of ETH immediately and you
                  will also obtain gatherers token in order to vote on community
                  projects. The claim will cost you a few ETH but the immediate
                  reward will more than compensate for this. However if you try
                  to cheat the system by complotting with other community
                  memebers, the whole community will be sanctioned by receiving
                  less money in the next campaign. This means it is in your
                  interest to honestly verify claims.
                </Box>
                <Box width={[1, 1, 1 / 2, 1 / 2]} pr={2}>
                  {selectedAction < 0 && (
                    <Warning>
                      You first have to select an action by clicking on it!
                    </Warning>
                  )}
                  <Form>
                    <p>
                      <label>Short summary of your accomplishment</label>
                      <br />
                      <input
                        placeholder="A title for your accomplishment"
                        maxLength="50"
                        disabled={inputsDisabled}
                        onChange={e =>
                          this.setState({ title: e.currentTarget.value })
                        }
                        value={this.state.title}
                      />
                    </p>
                    <p>
                      <label>
                        Describe what you did in a way that will convince the
                        community.
                      </label>
                      <br />
                      <textarea
                        placeholder="In order to increase the amount of carbon dioxid filtered out of the air, I planted a total of ten new trees right next to..."
                        rows="10"
                        disabled={inputsDisabled}
                      />
                    </p>
                    <p>
                      <label>
                        If possible, undermine your claim with a few pictures or
                        datasets
                      </label>
                      <br />
                      <input id="file" type="file" disabled={inputsDisabled} />
                      <label htmlFor="file">
                        <FaUpload /> Choose a file
                      </label>
                    </p>
                    <Button
                      state={inputsDisabled ? "disabled" : undefined}
                      onClick={e => {
                        e.preventDefault();
                        this.setState({ selectedAction: -1 });
                        this.props.submitAction(
                          selectedAction,
                          this.state.title
                        );
                      }}
                    >
                      Submit
                    </Button>
                    {submitting && <p>Waiting for the next block..</p>}
                  </Form>
                </Box>
              </Flex>
            ) : (
              <Warning>
                <h3>
                  The campaign isn't in progress so you cannot submit any claims
                  to the chain!
                </h3>
              </Warning>
            )}
          </Container>
        </Page>
      </Wrapper>
    );
  };
}

const mapStateToProps = state => ({
  campaign: getCampaign(state),
  actions: getActions(state)
});
const mapDispatchToProps = dispatch => ({
  /**
   * Fetches actions
   * @returns {Promise} The fetch promise
   */
  fetchActions() {
    return dispatch(fetchActions());
  },
  /**
   * Fetches the campaign
   * @returns {Promise} The fetch promise
   */
  fetchCampaign() {
    return dispatch(fetchCampaign());
  },
  /**
   * Submits an action
   * @param {number} actionIndex The action index
   * @param {string} data The action data
   * @returns {Promise} The fetch promise
   */
  submitAction(actionIndex, data) {
    return dispatch(submitAction(actionIndex, data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Claim);
