import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Container from "components/Container";
import { Flex, Box } from "grid-styled";
import {
  IoLogoTwitter as TwitterIcon,
  IoLogoGithub as GithubIcon
} from "react-icons/io";

import ChaingeLogo from "../../img/logo.svg";
import NodeJsLogo from "../../img/logos/nodejs.svg";
import ReactLogo from "../../img/logos/react.svg";
import EthereumLogo from "../../img/logos/ethereum.svg";
import SolidityLogo from "../../img/logos/solidity.svg";
import WwfLogo from "../../img/logos/wwf.svg";
import { colors, media } from "../utilities/style";

const FooterWrapper = styled.footer`
  background-color: ${colors.primary};
  border-top: ${colors.backgroundContrast} 5px solid;

  color: #fff;
  padding: 1rem 0 2rem 0;
  margin-top: 2rem;
`;

const LogoRow = styled.div`
  display: flex;
  align-content: center;

  & > * {
    margin-right: 0.5rem;
  }
`;

const FooterTitle = styled.h4`
  ${media.maxMedium`
		border-top: #fff 1px solid;
	`};

  padding-top: 0.5rem;
  margin: 0.5rem 0 1rem 0;
`;

/**
 * The site footer
 * @returns {Component} The component
 */
class Footer extends React.PureComponent {
  render = () => {
    return (
      <FooterWrapper>
        <Container>
          <Flex wrap>
            <Box width={[1, 1, 1 / 3, 1 / 3]} pr={2}>
              <FooterTitle>Powered by</FooterTitle>
              <LogoRow>
                <img height="50" width="auto" src={EthereumLogo} />
                <img height="50" width="auto" src={SolidityLogo} />
                <img height="50" width="auto" src={ReactLogo} />
                <img height="50" width="auto" src={NodeJsLogo} />
              </LogoRow>
            </Box>
            <Box width={[1, 1, 1 / 3, 1 / 3]} pr={2}>
              <FooterTitle>Supported by</FooterTitle>
              <Flex>
                <Box width={[1 / 5, 1 / 5, 1 / 5, 1 / 5]} pr={2}>
                  <img width="50" height="auto" src={WwfLogo} />
                </Box>
              </Flex>
            </Box>
            <Box width={[1, 1, 1 / 3, 1 / 3]}>
              <FooterTitle>About</FooterTitle>
              This Campaign aims to sustain the Carpathians by supporting the
              whole ecosystem in many different ways.
            </Box>
          </Flex>
        </Container>
      </FooterWrapper>
    );
  };
}

export default Footer;
