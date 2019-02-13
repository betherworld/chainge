import React from "react";
import styled from "styled-components";

import { media } from "../utilities/style";

const b = "display: block";

export default styled.div`
  height: 100%;
  display: none;
  ${({ sm, md, lg, xlg, up, down }) =>
    up
      ? sm
        ? media.minSmall`${b}`
        : md
          ? media.minMedium`${b}`
          : lg
            ? media.minLarge`${b}`
            : xlg
              ? media.minXLarge`${b}`
              : ""
      : down
        ? sm
          ? media.maxSmall`${b}`
          : md
            ? media.maxMedium`${b}`
            : lg
              ? media.maxLarge`${b}`
              : xlg
                ? media.maxXLarge`${b}`
                : ""
        : ""};
`;
