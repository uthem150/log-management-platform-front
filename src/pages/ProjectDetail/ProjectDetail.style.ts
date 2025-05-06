// src/pages/ProjectDetail/ProjectDetail.style.ts

import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  color: ${colors.text};
  margin-bottom: 0.5rem;
`;

export const Description = styled.p`
  color: ${colors.gray};
  margin-bottom: 2rem;
  max-width: 70%;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const CardTitle = styled.h2`
  color: ${colors.primary};
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: 1rem;
  background-color: ${props => {
    switch (props.status) {
      case "active":
        return colors.success;
      case "inactive":
        return colors.gray;
      case "configuring":
        return colors.warning;
      default:
        return colors.accent;
    }
  }};
  color: white;
`;

export const InfoRow = styled.div`
  display: flex;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoLabel = styled.div`
  width: 150px;
  color: ${colors.gray};
  font-weight: 500;
`;

export const InfoValue = styled.div`
  flex: 1;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const DashboardEmbed = styled.div`
  margin-top: 2rem;
`;

export const IframeContainer = styled.div`
  width: 100%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${colors.lightGray};
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const ErrorState = styled.div`
  padding: 2rem;
  background-color: rgba(247, 37, 133, 0.05);
  border-radius: 8px;
  margin-bottom: 2rem;

  h3 {
    color: ${colors.error};
    margin-bottom: 1rem;
  }
`;
