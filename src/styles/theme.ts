// src/styles/theme.ts
export const colors = {
  primary: "#4361EE",
  secondary: "#3F37C9",
  accent: "#4CC9F0",
  success: "#72B01D",
  warning: "#F7B801",
  error: "#F72585",
  background: "#FFFFFF",
  text: "#333333",
  lightGray: "#F8F9FA",
  gray: "#6C757D",
  darkGray: "#343A40",
  white: "#FFFFFF",
  black: "#000000",
  danger: "#dc3545",
  dangerDark: "#c82333",
  red: "#FF0000"
};

export const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem"
};

export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700
};

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem"
};

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
};

const theme = {
  colors,
  fontSizes,
  fontWeights,
  spacing,
  breakpoints
};

export default theme;
