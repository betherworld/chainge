import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";
import { FaUpload } from "react-icons/fa";

import Wrapper from "../components/Wrapper";
import Page from "../components/Page";
import Container from "../components/Container";
import { borders, colors } from "../utilities/style";
import Button from "../components/Button";
import { COLOR_HOVER } from "../components/Button";
import { COLOR_DISABLED } from "../components/Button";

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
/**
 * The claim page
 * @returns {Component} The component
 */
class Claim extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      submitting: false
    };
  }

  /**
   * Handles the submit event
   * @param {Event} event the click event
   * @returns {void}
   */
  submit = event => {
    event.preventDefault();

    return new Promise((resolve, reject) => {
      this.setState({ submitting: true });
      setTimeout(() => resolve(this.setState({ submitting: false })), 3000);
    });
  };

  render = () => {
    const { submitting } = this.state;

    return (
      <Wrapper slider header footer>
        <Helmet>
          <title>Chainge | Claim</title>
        </Helmet>
        <Page>
          <Container>
            <Flex wrap>
              <Box width={[1, 1, 1 / 2, 1 / 2]} pr={2}>
                The following actions are eligible for the community pot:
                <ul>
                  <li>Data validation</li>
                  <li>Camera-trap and sensor maintenance</li>
                  <li>Trail maintenance</li>
                  <li>Reforestation</li>
                  <li>Recycling trash</li>
                </ul>
                If the community decides your proof is sufficient, you will be
                awarded the corresponding amount of ETH immediately and you will
                also obtain gatherers token in order to vote on community
                projects. The claim will cost you a few ETH but the immediate
                reward will more than compensate for this. However if you try to
                cheat the system by complotting with other community memebers,
                the whole community will be sanctioned by receiving less money
                in the next campaign. This means it is in your interest to
                honestly verify claims.
              </Box>
              <Box width={[1, 1, 1 / 2, 1 / 2]} pr={2}>
                <Form>
                  <p>
                    <label>Short summary of your accomplishment</label>
                    <br />
                    <input
                      placeholder="A title for your accomplishment"
                      maxLength="50"
                      disabled={submitting}
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
                      disabled={submitting}
                    />
                  </p>
                  <p>
                    <label>
                      If possible, undermine your claim with a few pictures or
                      datasets
                    </label>
                    <br />
                    <input type="file" disabled={submitting} />
                    <label for="file">
                      <FaUpload /> Choose a file
                    </label>
                  </p>
                  <p>
                    <Button onClick={this.submit}>Submit</Button>
                    {submitting && <div>Waiting for the next block..</div>}
                  </p>
                </Form>
              </Box>
            </Flex>
          </Container>
        </Page>
      </Wrapper>
    );
  };
}

export default Claim;
