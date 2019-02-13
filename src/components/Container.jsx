import React from "react";
import styled from "styled-components";

import { media } from "../utilities/style";

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0 1rem;

  height: 100%;

  ${media.minSmall`
		max-width: 576px;
	`};
  ${media.minMedium`
		max-width: 720px;
	`};
  ${media.minLarge`
		max-width: 940px;
	`};
  ${media.minXLarge`
		max-width: 1140px;
	`};
`;

export default Container;
