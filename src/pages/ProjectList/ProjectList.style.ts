// src/pages/ProjectList/ProjectList.style.ts

import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

import Button from "../../components/common/Button";

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  color: ${colors.text};
  margin-bottom: 0.5rem;
`;

export const Description = styled.p`
  color: ${colors.gray};
  margin-bottom: 2rem;
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const ProjectCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const ProjectName = styled.h3`
  color: ${colors.primary};
  margin-bottom: 0.5rem;
`;

export const ProjectDescription = styled.p`
  color: ${colors.text};
  font-size: 0.9rem;
  margin-top: 1rem;

  margin-bottom: 1rem;

  /* 3줄 이상이면 말줄임표 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProjectDate = styled.p`
  color: ${colors.gray};
  font-size: 0.8rem;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: ${colors.accent};
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  margin-right: 0.5rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${colors.lightGray};
  border-radius: 8px;
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
`;

export const CreateProjectButton = styled(Button)`
  margin-left: 1rem;
`;
