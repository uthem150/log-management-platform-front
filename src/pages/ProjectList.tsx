// src/pages/ProjectList.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { colors } from "../styles/theme";
import useProjectStore from "../store/useProjectStore";
import useAuthStore from "../store/useAuthStore";
import Button from "../components/common/Button";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${colors.text};
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${colors.gray};
  margin-bottom: 2rem;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProjectCard = styled.div`
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

const ProjectName = styled.h3`
  color: ${colors.primary};
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: ${colors.text};
  font-size: 0.9rem;
  margin-bottom: 1rem;

  /* 3줄 이상이면 말줄임표 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProjectDate = styled.p`
  color: ${colors.gray};
  font-size: 0.8rem;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background-color: ${colors.accent};
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  margin-right: 0.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${colors.lightGray};
  border-radius: 8px;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
`;

const CreateProjectButton = styled(Button)`
  margin-left: 1rem;
`;

const ProjectList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { projects, isLoading, error, fetchProjects } = useProjectStore();

  // 컴포넌트 마운트시 프로젝트 목록 조회
  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [fetchProjects, isAuthenticated]);

  // 프로젝트 카드 클릭시 상세 페이지로 이동
  const handleProjectClick = (id: string) => {
    navigate(`/projects/${id}`);
  };

  // 프로젝트 생성 페이지로 이동
  const handleCreateProject = () => {
    navigate("/projects/create");
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (!isAuthenticated) {
    return (
      <Container>
        <EmptyState>
          <h2>{t("projects.needLogin")}</h2>
          <p>{t("projects.loginToView")}</p>
          <Button onClick={() => navigate("/login")}>{t("common.login")}</Button>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <div>
          <Title>{t("projects.title")}</Title>
        </div>
        <CreateProjectButton onClick={handleCreateProject}>
          {t("projects.createNew")}
        </CreateProjectButton>
      </Header>

      <Description>{t("projects.description")}</Description>

      {isLoading ? (
        <LoadingState>
          <p>{t("common.loading")}</p>
        </LoadingState>
      ) : error ? (
        <EmptyState>
          <h3>{t("common.error")}</h3>
          <p>{error}</p>
          <Button onClick={() => fetchProjects()}>{t("common.retry")}</Button>
        </EmptyState>
      ) : projects.length === 0 ? (
        <EmptyState>
          <h3>{t("projects.noProjects")}</h3>
          <p>{t("projects.createFirstProject")}</p>
          <Button onClick={handleCreateProject}>{t("projects.createNew")}</Button>
        </EmptyState>
      ) : (
        <ProjectGrid>
          {projects.map(project => (
            <ProjectCard key={project.id} onClick={() => handleProjectClick(project.id)}>
              <ProjectName>{project.name}</ProjectName>
              <Badge>{project.status}</Badge>
              {project.dashboardId && <Badge>Dashboard</Badge>}
              <ProjectDescription>
                {project.description || t("projects.noDescription")}
              </ProjectDescription>
              <ProjectDate>
                {t("projects.created")}: {formatDate(project.createdAt)}
              </ProjectDate>
            </ProjectCard>
          ))}
        </ProjectGrid>
      )}
    </Container>
  );
};

export default ProjectList;
