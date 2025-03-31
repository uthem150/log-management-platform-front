// src/components/project/ProjectSummary.tsx
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { colors } from "../../styles/theme";
import { Project } from "../../types/project";

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: ${colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  font-size: 24px;
  font-weight: bold;
`;

const ProjectInfo = styled.div`
  flex: 1;
`;

const ProjectName = styled.h3`
  margin: 0 0 0.25rem 0;
  color: ${colors.text};
`;

const ProjectDescription = styled.p`
  margin: 0;
  color: ${colors.gray};
  font-size: 0.875rem;
`;

const ProjectStatus = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 0.5rem;
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

interface ProjectSummaryProps {
  project: Project;
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({ project }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 첫 글자 대문자로 전환
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const handleClick = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <Card onClick={handleClick}>
      <IconContainer>{getInitial(project.name)}</IconContainer>

      <ProjectInfo>
        <ProjectName>
          {project.name}
          <ProjectStatus status={project.status}>{project.status.toUpperCase()}</ProjectStatus>
        </ProjectName>

        <ProjectDescription>
          {project.description || t("projects.noDescription")}
        </ProjectDescription>
      </ProjectInfo>
    </Card>
  );
};

export default ProjectSummary;
