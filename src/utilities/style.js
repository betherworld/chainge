import { css } from "styled-components";

export const colors = {
  primary: "#F79F1F",
  primaryContrast: "#ffffff",
  background: "#ffffff",
  backgroundContrast: "#F79F1F",
  accent: "#BF262E",
  accentLight: "#FFC674",
  accentDark: "#821F25",
  accent2: "#104146",
  font: "#000000",
  fontLight: "#444444",
  borderLight: "#888888",
  success: "#A3CB38",
  info: "#3498db",
  warning: "#FCBF37",
  danger: "#e74c3c"
};

export const borders = {
  radius: "5px",
  inputRadius: "3px"
};

export const shadows = {
  y: "0px 2px 2px 0px rgba(0, 0, 0, 0.2)"
};

export const media = {
  minSmall: (...args) => css`
    @media (min-width: 576px) {
      ${css(...args)};
    }
  `,
  maxSmall: (...args) => css`
    @media (max-width: 575px) {
      ${css(...args)};
    }
  `,
  minMedium: (...args) => css`
    @media (min-width: 768px) {
      ${css(...args)};
    }
  `,
  maxMedium: (...args) => css`
    @media (max-width: 767px) {
      ${css(...args)};
    }
  `,
  minLarge: (...args) => css`
    @media (min-width: 992px) {
      ${css(...args)};
    }
  `,
  maxLarge: (...args) => css`
    @media (max-width: 991px) {
      ${css(...args)};
    }
  `,
  minXLarge: (...args) => css`
    @media (min-width: 1200px) {
      ${css(...args)};
    }
  `,
  maxXLarge: (...args) => css`
    @media (max-width: 1199px) {
      ${css(...args)};
    }
  `
};
