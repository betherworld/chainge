import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

import { colors, borders } from "../utilities/style";

const pulse = keyframes`
	0%{
		opacity: 0.3;
	}
	50%{
		opacity: 0.2
	};
	100%{
		opacity: 0.3;
	}
`;

const Placeholder = styled.div`
  background-color: ${({ error }) => (error ? colors.danger : colors.font)};
  border-radius: ${borders.radius};

  padding-top: ${({ block }) => (block ? "100%" : "0")};
  height: ${({ height, text }) =>
    height ? height + "rem" : text ? "1rem" : ""};

  margin-bottom: ${({ mb }) => (mb ? mb + "rem" : "")};
  margin-right: ${({ mr }) => (mr ? mr + "rem" : "")};

  display: ${({ inline }) => (inline ? "inline-block" : "block")};

  min-width: ${({ minWidth }) => (minWidth ? minWidth + "rem" : "0")};

  opacity: 0.3;

  animation: ${pulse} 1s ease-in-out infinite;
`;

Placeholder.propTypes = {
  error: PropTypes.bool,
  inline: PropTypes.bool,
  block: PropTypes.bool,
  text: PropTypes.bool,
  minWidth: PropTypes.number,
  height: PropTypes.number,
  mb: PropTypes.number,
  mr: PropTypes.number
};

export default Placeholder;
