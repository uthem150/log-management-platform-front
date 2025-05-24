// src/pages/ProjectList/ProjectList.tsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useProjectStore from "../../store/useProjectStore";
import useAuthStore from "../../store/useAuthStore";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import Pagination from "../../components/common/Pagination";
import { useProjectPolling } from "../../hooks/useProjectPolling";
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
import { Project } from "../../types/project";

const ProjectList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const {
    projects,
    isLoading,
    error,
    fetchProjects,
    updateProjectStatus,
    // 페이징 정보
    totalItems,
    totalPages,
    currentPage,
    pageSize
  } = useProjectStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // 초기 로드 완료 상태 추가
  const [hasInitialLoad, setHasInitialLoad] = useState(false);

  // 폴링 관련 상태
  const handleProjectsUpdated = useCallback(
    (updatedProjects: Project[]) => {
      console.log("Updating projects from polling:", updatedProjects);
      updatedProjects.forEach(project => {
        updateProjectStatus(project.id, project.status);
      });
    },
    [updateProjectStatus]
  );

  const { isPolling, pollingProjects, startPolling, stopPolling } =
    useProjectPolling(handleProjectsUpdated);

  // 컴포넌트 마운트시 프로젝트 목록 조회 (한 번만)
  useEffect(() => {
    if (isAuthenticated && !hasInitialLoad) {
      const urlPage = searchParams.get("page");
      const pageNumber = urlPage ? parseInt(urlPage, 10) : 1;

      console.log("Initial load - fetching projects");
      fetchProjects(pageNumber, pageSize).then(() => {
        setHasInitialLoad(true);
      });
    }
  }, [isAuthenticated, hasInitialLoad]);

  // 프로젝트 목록이 변경될 때 폴링 관리 (초기 로드 완료 후에만)
  useEffect(() => {
    if (hasInitialLoad && projects.length > 0) {
      console.log("Projects updated, checking if polling needed:", projects.length);

      // 진행 중인 프로젝트 수 확인
      const inProgressCount = projects.filter(
        project => project.status !== "READY" && project.status !== "FAILED"
      ).length;

      console.log("Projects in progress:", inProgressCount);

      if (inProgressCount > 0) {
        startPolling(projects);
      } else {
        stopPolling();
      }
    }
  }, [projects, hasInitialLoad, startPolling, stopPolling]);

  // 컴포넌트 언마운트 시에만 폴링 정리
  useEffect(() => {
    return () => {
      console.log("Component unmounting, cleaning up polling");
      stopPolling();
    };
  }, [stopPolling]);

  // 페이지 변경 핸들러
  const handlePageChange = useCallback(
    (page: number) => {
      // URL 파라미터 업데이트
      const newSearchParams = new URLSearchParams(searchParams);
      if (page === 1) {
        newSearchParams.delete("page");
      } else {
        newSearchParams.set("page", page.toString());
      }
      setSearchParams(newSearchParams);

      // 프로젝트 목록 조회
      fetchProjects(page, pageSize);
    },
    [fetchProjects, pageSize, searchParams, setSearchParams]
  );

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
  const getToastMessage = () => {
    if (pollingProjects.length === 0) {
      return { title: "", description: "" };
    }

    if (pollingProjects.length === 1) {
      return {
        title: "프로젝트 설정 중",
        description: `${pollingProjects[0].name} 프로젝트를 설정하고 있습니다.`
      };
    }

    return {
      title: "프로젝트 설정 중",
      description: `${pollingProjects.length}개 프로젝트를 설정하고 있습니다.`
    };
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

  const toastMessage = getToastMessage();

  return (
    <>
      <Container>
        <Header>
          <div>
            <Title>{t("projects.title")}</Title>
            {/* 총 프로젝트 수 표시 */}
            {totalItems > 0 && (
              <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", color: "#666" }}>
                총 {totalItems}개의 프로젝트
                {isPolling && (
                  <span style={{ color: "#4361ee", marginLeft: "0.5rem" }}>
                    (설정 중: {pollingProjects.length}개)
                  </span>
                )}
              </p>
            )}
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
            <Button onClick={() => fetchProjects(currentPage, pageSize)}>
              {t("common.retry")}
            </Button>
          </EmptyState>
        ) : projects.length === 0 ? (
          <EmptyState>
            <h3>{t("projects.noProjects")}</h3>
            <p>{t("projects.createFirstProject")}</p>
            <Button onClick={handleCreateProject}>{t("projects.createNew")}</Button>
          </EmptyState>
        ) : (
          <>
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

            {/* 페이징 컴포넌트 */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          </>
        )}
      </Container>

      {/* 대시보드 생성 중 Toast */}
      <Toast
        visible={isPolling}
        title={toastMessage.title}
        description={toastMessage.description}
        onClose={stopPolling}
      />
    </>
  );
};

export default ProjectList;
