import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { colors } from "../utilities/style";
import Flexbar from "../components/Flexbar";

const UnstyledLink = styled.a`
  height: 100%;
  cursor: pointer;
  text-decoration: none;

  color: ${({ negative, color }) =>
    negative ? colors.primaryContrast : color || colors.primary};

  &:hover {
    text-decoration: underline;
  }
`;

const StyledLink = styled(UnstyledLink)`
  text-decoration: underline;
  color: ${({ color }) => color || "inherit"};
`;

/**
 * A link
 * @returns {Component} The component
 */
class Link extends React.PureComponent {
  render = () => {
    const {
      active,
      dispatch,
      to,
      onClick,
      children,
      negative,
      flex,
      target,
      href,
      rel,
      title,
      location: { pathname },
      color
    } = this.props;

    const LinkComponent = (typeof active !== "undefined"
    ? active
    : (href || to) === pathname)
      ? StyledLink
      : UnstyledLink;

    let props = { negative, color };

    if (to) {
      props.onClick = () => {
        dispatch(push(to));
      };
    } else if (onClick) {
      props.onClick = onClick;
    }

    if (href) {
      props.href = href;
    }

    if (target) {
      props.target = target;
    }

    if (rel) {
      props.rel = rel;
    }

    if (title) {
      props.title = title;
    }

    return (
      <LinkComponent {...props}>
        {flex ? <Flexbar>{children}</Flexbar> : children}
      </LinkComponent>
    );
  };
}

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  onClick: PropTypes.func,
  styled: PropTypes.bool,
  block: PropTypes.bool,
  negative: PropTypes.bool,
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string
};

const ConnectedLink = connect()(Link);
export default withRouter(ConnectedLink);
