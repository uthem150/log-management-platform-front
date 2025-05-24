// src/pages/ProjectList/ProjectList.tsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useProjectStore from "../../store/useProjectStore";
import useAuthStore from "../../store/useAuthStore";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import { useDashboardPolling } from "../../hooks/useDashboardPolling";
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

  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  // 대시보드 생성 완료 시 프로젝트 목록 새로고침
  const handleDashboardCompleted = useCallback(() => {
    fetchProjects();
  }, [fetchProjects]);

  // 대시보드 폴링 훅 사용
  const { dashboardStatus, toastVisible, startPolling, hideToast } =
    useDashboardPolling(handleDashboardCompleted);

  // 컴포넌트 마운트시 프로젝트 목록 조회 (한 번만 실행)
  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  // 프로젝트 카드 클릭시 상세 페이지로 이동
  const handleProjectClick = useCallback(
    (id: string) => {
      navigate(`/projects/${id}`);
    },
    [navigate]
  );

  // 프로젝트 생성 페이지로 이동
  const handleCreateProject = useCallback(() => {
    navigate("/projects/create");
  }, [navigate]);

  // 상태에 따른 뱃지 색상 반환
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "READY":
        return "#72b01d"; // green
      case "IN_PROGRESS":
        return "#4361ee"; // blue
      case "INITIATED":
        return "#f77f00"; // orange
      case "FAILED":
        return "#f72585"; // red
      default:
        return "#6c757d"; // gray
    }
  };

  // 상태 한글 변환
  const getStatusText = (status: string) => {
    switch (status) {
      case "READY":
        return "사용 가능";
      case "IN_PROGRESS":
        return "설정 중";
      case "INITIATED":
        return "초기화 중";
      case "FAILED":
        return "실패";
      default:
        return status;
    }
  };

  // Toast 메시지 생성
  const getToastMessage = useCallback(() => {
    const inProgressProjects = dashboardStatus.projectsInProgress;
    if (inProgressProjects.length === 0) {
      return { title: "", description: "" };
    }

    if (inProgressProjects.length === 1) {
      return {
        title: "대시보드 생성 중",
        description: `${inProgressProjects[0].projectName} 프로젝트의 대시보드를 생성하고 있습니다.`
      };
    }

    return {
      title: "대시보드 생성 중",
      description: `${inProgressProjects.length}개 프로젝트의 대시보드를 생성하고 있습니다.`
    };
  }, [dashboardStatus.projectsInProgress]);

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

  const toastMessage = getToastMessage();

  return (
    <>
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
                <Badge style={{ backgroundColor: getStatusBadgeColor(project.status) }}>
                  {getStatusText(project.status)}
                </Badge>
                {project.dashboard && <Badge>Dashboard</Badge>}
                <ProjectDescription>
                  {project.description || t("projects.noDescription")}
                </ProjectDescription>
                <ProjectDate>프로젝트 타입: {project.project_type}</ProjectDate>
              </ProjectCard>
            ))}
          </ProjectGrid>
        )}
      </Container>

      {/* 대시보드 생성 중 Toast */}
      <Toast
        visible={toastVisible && dashboardStatus.inProgress}
        title={toastMessage.title}
        description={toastMessage.description}
        onClose={hideToast}
      />
    </>
  );
};

export default ProjectList;
