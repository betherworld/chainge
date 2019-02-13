import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Push = styled.div`
  margin-left: ${props => (props.left ? "auto" : "0")};
  margin-right: ${props => (props.right ? "auto;" : "0")};
  display: inline-block;
`;

Push.propTypes = {
  children: PropTypes.node,
  left: PropTypes.bool,
  right: PropTypes.bool
};

export default Push;
