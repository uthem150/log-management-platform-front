// src/pages/ProjectList/ProjectList.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useProjectStore from "../../store/useProjectStore";
import useAuthStore from "../../store/useAuthStore";
import Button from "../../components/common/Button";
import {
  Badge,
  Container,
  CreateProjectButton,
  Description,
  EmptyState,
  Header,
  LoadingState,
  ProjectCard,
  ProjectDate,
  ProjectDescription,
  ProjectGrid,
  ProjectName,
  Title
} from "./ProjectList.style";

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
