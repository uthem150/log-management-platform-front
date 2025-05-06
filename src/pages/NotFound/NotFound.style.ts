// src/pages/NotFound.tsx
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { colors } from "../../styles/theme";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 4rem 1rem;
`;

export const Title = styled.h1`
  color: ${colors.error};
  font-size: 5rem;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  color: ${colors.text};
  margin-bottom: 2rem;
  font-size: 1.25rem;
`;

export const BackLink = styled(Link)`
  display: inline-block;
  background-color: ${colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.secondary};
    text-decoration: none;
  }
`;
