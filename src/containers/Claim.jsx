import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";

import Wrapper from "../components/Wrapper";
import Page from "../components/Page";
import Container from "../components/Container";
import { borders, colors } from "../utilities/style";

const Form = styled.form`
  input,
  textarea {
    width: 100%;
    border-radius: ${borders.radius};
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
`;

const CenteredFlex = styled(Flex)`
  justify-content: center;
`;

const Hr = styled.hr`
  border: none;
  border-top: #999 1px solid;
  margin: 1rem 0;
`;

/**
 * The claim page
 * @returns {Component} The component
 */
class Claim extends React.PureComponent {
  render = () => {
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
              </Box>
              <Box width={[1, 1, 1 / 2, 1 / 2]} pr={2}>
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
            </Flex>
            <Hr />
            <CenteredFlex>
              <Box width={[1, 1, 1 / 2, 2 / 3]}>
                <Form>
                  <p>
                    <label>Short summary of your accomplishment</label>
                    <br />
                    <input
                      placeholder="A title for your accomplishment"
                      maxLength="50"
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
                    />
                  </p>
                  <p>
                    <label>
                      If possible, undermine your claim with a few pictures or
                      datasets
                    </label>
                    <input type="file" />
                  </p>
                  <p>
                    <input type="submit" value="Submit" onClick={() => {}} />
                  </p>
                </Form>
              </Box>
            </CenteredFlex>
          </Container>
        </Page>
      </Wrapper>
    );
  };
}

export default Claim;
