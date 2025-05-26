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
  red: "#FF0000",

  // 경고 관련 추가 컬러
  warningLight: "#FFF8E1", // 경고 배경색 (연한 노란색)
  warningBorder: "#FFD54F", // 경고 테두리색 (중간 노란색)
  warningText: "#E65100", // 경고 텍스트색 (진한 오렌지)
  infoLight: "#E3F2FD", // 정보 배경색 (연한 파란색)
  infoBorder: "#64B5F6", // 정보 테두리색 (중간 파란색)
  successLight: "#E8F5E8", // 성공 배경색 (연한 초록색)
  successBorder: "#81C784", // 성공 테두리색 (중간 초록색)
  successText: "#2E7D32", // 성공 텍스트색 (진한 초록색)
  errorLight: "#FFEBEE", // 에러 배경색 (연한 빨간색)
  errorBorder: "#EF5350", // 에러 테두리색 (중간 빨간색)
  errorText: "#C62828" // 에러 텍스트색 (진한 빨간색)
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
