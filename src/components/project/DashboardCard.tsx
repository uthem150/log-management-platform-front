// src/components/project/DashboardCard.tsx
import React, { useState } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { colors } from "../../styles/theme";
import Button from "../common/Button";

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  margin: 0 0 1rem 0;
  color: ${colors.primary};
  display: flex;
  align-items: center;
`;

const CardIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 1.25rem;
`;

const PreviewContainer = styled.div`
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  height: 300px;
  margin: 1rem 0;
  overflow: hidden;
  position: relative;
`;

const FullscreenButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  font-size: 0.75rem;

  &:hover {
    background-color: white;
  }
`;

const NoDataMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${colors.gray};
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 0.75rem;
`;

const ErrorMessage = styled.div`
  background-color: rgba(247, 37, 133, 0.1);
  color: ${colors.error};
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

interface DashboardCardProps {
  dashboardUrl?: string;
  onGenerate?: () => void;
  isGenerating?: boolean;
  error?: string | null;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  dashboardUrl,
  onGenerate,
  isGenerating = false,
  error = null
}) => {
  const { t } = useTranslation();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 전체화면 토글
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 새 탭에서 대시보드 열기
  const openInNewTab = () => {
    if (dashboardUrl) {
      window.open(dashboardUrl, "_blank");
    }
  };

  return (
    <Card>
      <CardTitle>
        <CardIcon>📊</CardIcon>
        {t("projects.dashboard")}
      </CardTitle>

      {error && (
        <ErrorMessage>
          <strong>{t("common.error")}:</strong> {error}
        </ErrorMessage>
      )}

      {dashboardUrl ? (
        <>
          <p>{t("projects.dashboardReady")}</p>

          <PreviewContainer style={{ height: isFullscreen ? "600px" : "300px" }}>
            <FullscreenButton onClick={toggleFullscreen}>
              {isFullscreen ? t("common.minimize") : t("common.maximize")}
            </FullscreenButton>

            <iframe
              src={dashboardUrl}
              width="100%"
              height="100%"
              title="Grafana Dashboard"
              frameBorder="0"
            />
          </PreviewContainer>

          <ButtonContainer>
            <Button variant="primary" onClick={openInNewTab}>
              {t("projects.openInNewTab")}
            </Button>

            <Button
              variant="secondary"
              onClick={onGenerate}
              isLoading={isGenerating}
              loadingText={t("projects.regenerating")}
              disabled={isGenerating}
            >
              {t("projects.regenerateDashboard")}
            </Button>
          </ButtonContainer>
        </>
      ) : (
        <NoDataMessage>
          <p>{t("projects.noDashboard")}</p>

          <Button
            onClick={onGenerate}
            isLoading={isGenerating}
            loadingText={t("projects.generatingDashboard")}
            disabled={isGenerating}
            style={{ marginTop: "1rem" }}
          >
            {t("projects.generateDashboard")}
          </Button>
        </NoDataMessage>
      )}
    </Card>
  );
};

export default DashboardCard;
