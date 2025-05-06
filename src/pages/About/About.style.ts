// src/pages/About/About.style.ts
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  color: ${colors.primary};
  margin-bottom: 1.5rem;
`;

export const Description = styled.p`
  color: ${colors.text};
  margin-bottom: 2rem;
  line-height: 1.6;
`;
