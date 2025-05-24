// src/pages/ProjectDetail/ProjectDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../components/common/Button";
import useProjectStore from "../../store/useProjectStore";
import { projectApi } from "../../api/project";
import {
  ButtonGroup,
  Card,
  CardTitle,
  Container,
  DashboardEmbed,
  Description,
  ErrorState,
  Header,
  IframeContainer,
  InfoLabel,
  InfoRow,
  InfoValue,
  LoadingState,
  StatusBadge,
  Title
} from "./ProjectDetail.style";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentProject, isLoading, error, fetchProject, deleteProject } = useProjectStore();

  const [isGeneratingDashboard, setIsGeneratingDashboard] = useState(false);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  // 프로젝트 정보 조회
  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id, fetchProject]);

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

  // 프로젝트 삭제 처리
  const handleDeleteProject = async () => {
    if (!id || !currentProject) return;

    // 삭제 확인
    const confirmed = window.confirm(t("projects.confirmDelete"));
    if (!confirmed) return;

    try {
      await deleteProject(id);
      alert(t("projects.deleteSuccess"));
      navigate("/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(t("projects.deleteError"));
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

  // 프로젝트 편집 페이지로 이동
  const handleEditProject = () => {
    if (id) {
      navigate(`/projects/${id}/edit`);
    }
  };

  // 프로젝트 목록으로 돌아가기
  const handleBackToList = () => {
    navigate("/projects");
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingState>
          <p>{t("common.loading")}</p>
        </LoadingState>
      </Container>
    );
  }

  if (error || !currentProject) {
    return (
      <Container>
        <ErrorState>
          <h3>{t("common.error")}</h3>
          <p>{error || "프로젝트를 찾을 수 없습니다."}</p>
          <ButtonGroup>
            <Button onClick={() => id && fetchProject(id)}>{t("common.retry")}</Button>
            <Button variant="secondary" onClick={handleBackToList}>
              목록으로 돌아가기
            </Button>
          </ButtonGroup>
        </ErrorState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <div>
          <Title>
            {currentProject.name}
            <StatusBadge
              status={currentProject.status}
              style={{ backgroundColor: getStatusBadgeColor(currentProject.status) }}
            >
              {getStatusText(currentProject.status)}
            </StatusBadge>
          </Title>
          <Description>{currentProject.description || "설명이 없습니다."}</Description>
        </div>

        <ButtonGroup>
          <Button variant="secondary" onClick={handleBackToList}>
            목록으로
          </Button>
          <Button variant="secondary" onClick={handleEditProject}>
            {t("common.edit")}
          </Button>
          <Button variant="danger" onClick={handleDeleteProject}>
            {t("common.delete")}
          </Button>
        </ButtonGroup>
      </Header>

      <Card>
        <CardTitle>프로젝트 정보</CardTitle>

        <InfoRow>
          <InfoLabel>프로젝트 타입:</InfoLabel>
          <InfoValue>{currentProject.project_type}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>상태:</InfoLabel>
          <InfoValue>{getStatusText(currentProject.status)}</InfoValue>
        </InfoRow>
      </Card>

      <Card>
        <CardTitle>대시보드</CardTitle>

        {dashboardError && (
          <ErrorState>
            <h3>{t("common.error")}</h3>
            <p>{dashboardError}</p>
          </ErrorState>
        )}

        {currentProject.dashboard ? (
          <DashboardEmbed>
            <InfoRow>
              <InfoLabel>대시보드 제목:</InfoLabel>
              <InfoValue>{currentProject.dashboard.title}</InfoValue>
            </InfoRow>

            {currentProject.dashboard.tags && currentProject.dashboard.tags.length > 0 && (
              <InfoRow>
                <InfoLabel>태그:</InfoLabel>
                <InfoValue>{currentProject.dashboard.tags.join(", ")}</InfoValue>
              </InfoRow>
            )}

            {currentProject.dashboard.data_sources &&
              currentProject.dashboard.data_sources.length > 0 && (
                <InfoRow>
                  <InfoLabel>데이터 소스:</InfoLabel>
                  <InfoValue>{currentProject.dashboard.data_sources.join(", ")}</InfoValue>
                </InfoRow>
              )}

            {currentProject.dashboard.url ? (
              <>
                <Button
                  onClick={() =>
                    window.open(currentProject?.public_dashboard?.public_url, "_blank")
                  }
                  style={{ margin: "1rem 0" }}
                >
                  새 탭에서 대시보드 열기
                </Button>

                <IframeContainer>
                  <iframe
                    src={currentProject?.public_dashboard?.public_url}
                    width="100%"
                    height="100%"
                    title="Grafana Dashboard"
                    frameBorder="0"
                  />
                </IframeContainer>
              </>
            ) : (
              <div>
                <p>대시보드 URL이 준비되지 않았습니다.</p>
                {currentProject.status !== "READY" && (
                  <p>프로젝트가 완료되면 대시보드 URL이 생성됩니다.</p>
                )}
              </div>
            )}
          </DashboardEmbed>
        ) : (
          <div>
            <p>대시보드가 아직 생성되지 않았습니다.</p>

            <p>프로젝트 설정이 완료되면 대시보드를 생성할 수 있습니다.</p>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default ProjectDetail;
