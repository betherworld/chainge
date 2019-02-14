import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Color from "color";
import ProgressButton from "react-progress-button";

import { colors, borders } from "../utilities/style";

const Clearfix = styled.div`
  &:before,
  &:after {
    content: " ";
    display: table;
  }

  &:after {
    clear: both;
  }
`;

const ButtonWrapper = styled.div`
  float: ${({ float }) => float || "none"};

  .pb-container {
    display: inline-block;
    width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  }
  .pb-container .pb-button {
    position: relative;
    border: none;

    outline: none;

    width: 100%;
    height: ${({ height }) => height};
    padding: 0.375rem 1rem;
    border-radius: ${borders.radius};

    color: ${({ disabled }) => (disabled ? "#333" : "#fff")};
    background-color: ${colors.primary};

    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

    transition: all 0.3s ease-in-out;
    transition: background-color 0.15s ease-in-out;

    &:hover {
    }
  }
  .pb-container .pb-button span {
    display: inherit;
    transition: opacity 0.3s 0.1s;
  }
  .pb-container .pb-button svg {
    height: ${({ height }) => height};
    width: ${({ height }) => height};
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .pb-container .pb-button svg path {
    opacity: 0;
    fill: none;
  }
  .pb-container .pb-button svg.pb-progress-circle {
    animation: spin 0.9s infinite cubic-bezier(0.085, 0.26, 0.935, 0.71);
  }
  .pb-container .pb-button svg.pb-progress-circle path {
    stroke: #fff;
    stroke-width: 5;
  }
  .pb-container .pb-button svg.pb-checkmark path,
  .pb-container .pb-button svg.pb-cross path {
    stroke: #fff;
    stroke-linecap: round;
    stroke-width: 4;
  }
  .pb-container.disabled .pb-button {
    cursor: not-allowed;
  }
  .pb-container.loading .pb-button {
    width: ${({ height }) => height};
    border-width: 6.5px;
    border-color: #ddd;
    cursor: wait;
    background-color: transparent;
    padding: 0;
  }
  .pb-container.loading .pb-button span {
    transition: all 0.15s;
    opacity: 0;
    display: none;
  }
  .pb-container.loading .pb-button .pb-progress-circle > path {
    transition: opacity 0.15s 0.3s;
    opacity: 1;
  }
  .pb-container.success .pb-button {
    background-color: ${colors.success};
  }
  .pb-container.success .pb-button span {
    transition: all 0.15s;
    opacity: 0;
    display: none;
  }
  .pb-container.success .pb-button .pb-checkmark > path {
    opacity: 1;
  }
  .pb-container.error .pb-button {
    background-color: ${colors.danger};
  }
  .pb-container.error .pb-button span {
    transition: all 0.15s;
    opacity: 0;
    display: none;
  }
  .pb-container.error .pb-button .pb-cross > path {
    opacity: 1;
  }
  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
      transform-origin: center center;
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
      transform-origin: center center;
    }
  }
`;

/**
 * A extended version of a progress button
 * @returns {Component} The button component
 */
class NegativeButton extends React.PureComponent {
  render = () => {
    const { state = "" } = this.props;
    return (
      <div>
        <ButtonWrapper
          height={this.props.height || "2rem"}
          fullWidth={this.props.fullWidth}
          float={this.props.float}
          disabled={state === "disabled"}
        >
          <ProgressButton
            controlled={this.props.controlled}
            classNamespace={this.props.classNamespace}
            durationError={this.props.durationError}
            durationSuccess={this.props.durationSuccess}
            onClick={this.props.onClick}
            onError={this.props.onError}
            onSuccess={this.props.onSuccess}
            state={state}
            type={this.props.type}
            form={this.props.form}
            shouldAllowClickOnLoading={this.props.shouldAllowClickOnLoading}
          >
            {this.props.children}
          </ProgressButton>
        </ButtonWrapper>
        {this.props.float && <Clearfix />}
      </div>
    );
  };
}

NegativeButton.propTypes = {
  children: PropTypes.node,
  controlled: PropTypes.bool,
  classNamespace: PropTypes.string,
  durationError: PropTypes.number,
  durationSuccess: PropTypes.number,
  onClick: PropTypes.func,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  state: PropTypes.string,
  type: PropTypes.string,
  form: PropTypes.string,
  shouldAllowClickOnLoading: PropTypes.bool,
  /* custom */
  height: PropTypes.string,
  fullWidth: PropTypes.bool,
  float: PropTypes.string
};

export default NegativeButton;
