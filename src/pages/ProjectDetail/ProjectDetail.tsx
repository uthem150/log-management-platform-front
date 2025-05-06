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
  const { currentProject, isLoading, error, fetchProject, updateProject, deleteProject } =
    useProjectStore();

  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);
  const [isGeneratingDashboard, setIsGeneratingDashboard] = useState(false);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  // 프로젝트 정보 조회
  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id, fetchProject]);

  // 프로젝트에 연결된 대시보드 URL 설정
  useEffect(() => {
    if (currentProject?.dashboardUrl) {
      setDashboardUrl(currentProject.dashboardUrl);
    }
  }, [currentProject]);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // 대시보드 생성 요청
  const handleGenerateDashboard = async () => {
    if (!id) return;

    setIsGeneratingDashboard(true);
    setDashboardError(null);

    try {
      const response = await projectApi.generateDashboard(id);
      setDashboardUrl(response.data.dashboardUrl);

      // 프로젝트 정보 갱신
      fetchProject(id);

      alert(t("projects.dashboardSuccess"));
    } catch (error) {
      console.error("Error generating dashboard:", error);
      setDashboardError(t("projects.dashboardError"));
    } finally {
      setIsGeneratingDashboard(false);
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

  // 프로젝트 편집 페이지로 이동
  const handleEditProject = () => {
    if (id) {
      navigate(`/projects/${id}/edit`);
    }
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
          <p>{error}</p>
          <Button onClick={() => id && fetchProject(id)}>{t("common.retry")}</Button>
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
            <StatusBadge status={currentProject.status}>
              {currentProject.status.toUpperCase()}
            </StatusBadge>
          </Title>
          <Description>{currentProject.description || t("projects.noDescription")}</Description>
        </div>

        <ButtonGroup>
          <Button variant="secondary" onClick={handleEditProject}>
            {t("common.edit")}
          </Button>
          <Button variant="danger" onClick={handleDeleteProject}>
            {t("common.delete")}
          </Button>
        </ButtonGroup>
      </Header>

      <Card>
        <CardTitle>{t("projects.details")}</CardTitle>

        <InfoRow>
          <InfoLabel>{t("projects.id")}:</InfoLabel>
          <InfoValue>{currentProject.id}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>{t("projects.created")}:</InfoLabel>
          <InfoValue>{formatDate(currentProject.createdAt)}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>{t("projects.updated")}:</InfoLabel>
          <InfoValue>{formatDate(currentProject.updatedAt)}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>{t("projects.owner")}:</InfoLabel>
          <InfoValue>{currentProject.owner}</InfoValue>
        </InfoRow>

        <InfoRow>
          <InfoLabel>{t("projects.status")}:</InfoLabel>
          <InfoValue>{currentProject.status}</InfoValue>
        </InfoRow>
      </Card>

      <Card>
        <CardTitle>{t("projects.dashboard")}</CardTitle>

        {dashboardError && (
          <ErrorState>
            <h3>{t("common.error")}</h3>
            <p>{dashboardError}</p>
          </ErrorState>
        )}

        {!dashboardUrl ? (
          <div>
            <p>{t("projects.noDashboard")}</p>
            <Button
              onClick={handleGenerateDashboard}
              isLoading={isGeneratingDashboard}
              loadingText={t("projects.generatingDashboard")}
              style={{ marginTop: "1rem" }}
            >
              {t("projects.generateDashboard")}
            </Button>
          </div>
        ) : (
          <DashboardEmbed>
            <p>{t("projects.dashboardReady")}</p>
            <Button
              onClick={() => window.open(dashboardUrl, "_blank")}
              style={{ margin: "1rem 0" }}
            >
              {t("projects.openDashboard")}
            </Button>

            <IframeContainer>
              <iframe
                src={dashboardUrl}
                width="100%"
                height="100%"
                title="Grafana Dashboard"
                frameBorder="0"
              />
            </IframeContainer>
          </DashboardEmbed>
        )}
      </Card>
    </Container>
  );
};

export default ProjectDetail;
