import styled from "styled-components";
import PropTypes from "prop-types";

import { colors } from "../utilities/style";

const NavItem = styled.div`
  position: relative;

  width: auto;
  margin-right: 0.75rem;
  padding-right: 0.8rem;

  display: inline-block;

  &:after {
    position: absolute;
    top: 50%;
    right: 0;
    height: 2.5rem;

    transform: translateY(-50%);

    content: "";
    display: block;
    ${({ seperator }) =>
      seperator ? `border-right: ${colors.primaryContrast} 1px solid;` : ""};
  }

  img {
    height: 100%;
    width: auto;
  }
`;

NavItem.propTypes = {
  seperator: PropTypes.bool
};

export default NavItem;
