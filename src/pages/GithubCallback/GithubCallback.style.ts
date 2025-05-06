// src/pages/GithubCallback/GithubCallback.style.ts

import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Title = styled.h1`
  color: ${colors.primary};
  margin-bottom: 1rem;
`;

export const Message = styled.p`
  color: ${colors.text};
  margin-bottom: 2rem;
`;
