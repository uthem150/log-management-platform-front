// src/components/project/GrafanaSuccess.tsx
import React from "react";
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";
import Button from "../common/Button";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const IconContainer = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: ${colors.success};
`;

const Title = styled.h2`
  color: ${colors.text};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Description = styled.p`
  color: ${colors.gray};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const DashboardSection = styled.div`
  background-color: rgba(114, 176, 29, 0.05);
  border: 1px solid ${colors.success};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const DashboardTitle = styled.h3`
  color: ${colors.success};
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const DashboardUrl = styled.div`
  background-color: #f8f9fa;
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
  font-family: monospace;
  word-break: break-all;
  color: ${colors.text};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

interface GrafanaSuccessProps {
  projectName: string;
  dashboardUrl: string;
  onViewDashboard: () => void;
  onGoToProjects: () => void;
}

const GrafanaSuccess: React.FC<GrafanaSuccessProps> = ({
  projectName,
  dashboardUrl,
  onViewDashboard,
  onGoToProjects
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(dashboardUrl);
    alert("대시보드 URL이 클립보드에 복사되었습니다.");
  };

  return (
    <Container>
      <IconContainer>🎉</IconContainer>

      <Title>프로젝트 생성 완료!</Title>

      <Description>
        '{projectName}' 프로젝트가 성공적으로 생성되었습니다.
        <br />
        Grafana 대시보드가 준비되었으며, 이제 로그 모니터링을 시작할 수 있습니다.
      </Description>

      <DashboardSection>
        <DashboardTitle>📊 Grafana 대시보드</DashboardTitle>

        <p style={{ marginBottom: "1rem", color: colors.text }}>
          아래 URL에서 프로젝트의 로그 대시보드에 접근할 수 있습니다:
        </p>

        <DashboardUrl>{dashboardUrl}</DashboardUrl>

        <Button variant="secondary" onClick={copyToClipboard} style={{ marginTop: "0.5rem" }}>
          📋 URL 복사
        </Button>
      </DashboardSection>

      <ButtonGroup>
        <Button variant="secondary" onClick={onGoToProjects}>
          프로젝트 목록으로
        </Button>
        <Button variant="primary" onClick={onViewDashboard}>
          대시보드 보기
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default GrafanaSuccess;
