import styled from "styled-components";

import { colors, shadows } from "../utilities/style";

const Navbar = styled.div`
  position: relative;
  background-color: ${colors.background};
  border-top: ${colors.backgroundContrast} 5px solid;
  border-bottom: ${colors.backgroundContrast} 5px solid;

  color: ${colors.primary};
  font-size: 2rem;

  padding: 1rem 0;
  height: 2rem;
`;

export default Navbar;
