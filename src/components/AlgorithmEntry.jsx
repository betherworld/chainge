import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";

import Link from "../components/Link";
import Container from "../components/Container";
import { colors } from "../utilities/style";

const AlgorithmWrapper = styled.div`
  padding: 1rem;
  color: ${colors.primary};

  h2 {
    margin: 1rem 0 0 0;
    font-size: 3.5rem;

    hyphens: auto;
    line-height: 1;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    margin-top: 0.35rem;
  }
`;

/**
 * An algorithm entry
 * @returns {Component} The component
 */
class AlgorithmEntry extends React.PureComponent {
  render = () => {
    const { title, slug, description } = this.props;

    return (
      <AlgorithmWrapper>
        <Container>
          <Flex wrap>
            <Box width={[1, 1, 3 / 6, 3 / 6]} pr={2}>
              <h2>
                <Link to={"/algorithm/" + slug}>{title}</Link>
              </h2>
              <p>{description}</p>
            </Box>
          </Flex>
        </Container>
      </AlgorithmWrapper>
    );
  };
}

AlgorithmEntry.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};

export default AlgorithmEntry;
