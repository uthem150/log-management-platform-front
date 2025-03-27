// src/types/emotion.d.ts
import "@emotion/react";
import { colors, fontSizes, fontWeights, spacing, breakpoints } from "../styles/theme";

declare module "@emotion/react" {
  export interface Theme {
    colors: typeof colors;
    fontSizes: typeof fontSizes;
    fontWeights: typeof fontWeights;
    spacing: typeof spacing;
    breakpoints: typeof breakpoints;
  }
}
