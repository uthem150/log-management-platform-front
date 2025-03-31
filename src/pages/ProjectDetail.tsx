// src/pages/ProjectDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { colors } from "../styles/theme";
import Button from "../components/common/Button";
import useProjectStore from "../store/useProjectStore";
import { projectApi } from "../api/project";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${colors.text};
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: ${colors.gray};
  margin-bottom: 2rem;
  max-width: 70%;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const CardTitle = styled.h2`
  color: ${colors.primary};
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const StatusBadge = styled.span<{ status: string }>`
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

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.div`
  width: 150px;
  color: ${colors.gray};
  font-weight: 500;
`;

const InfoValue = styled.div`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const DashboardEmbed = styled.div`
  margin-top: 2rem;
`;

const IframeContainer = styled.div`
  width: 100%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${colors.lightGray};
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 2rem;
`;

const ErrorState = styled.div`
  padding: 2rem;
  background-color: rgba(247, 37, 133, 0.05);
  border-radius: 8px;
  margin-bottom: 2rem;

  h3 {
    color: ${colors.error};
    margin-bottom: 1rem;
  }
`;

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
