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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

interface GrafanaSuccessProps {
  projectName: string;
  onGoToProjects: () => void;
}

const GrafanaSuccess: React.FC<GrafanaSuccessProps> = ({ projectName, onGoToProjects }) => {
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
          생성이 완료되면 프로젝트 목록에서 로그 대시보드가 추가됩니다
        </p>
      </DashboardSection>

      <ButtonGroup>
        <Button variant="secondary" onClick={onGoToProjects}>
          프로젝트 목록으로
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default GrafanaSuccess;
