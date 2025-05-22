// src/components/project/DownloadGuide.tsx
import React from "react";
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";
import Button from "../common/Button";

const Container = styled.div`
  max-width: 700px;
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

const DownloadSection = styled.div`
  background-color: rgba(67, 97, 238, 0.05);
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const DownloadTitle = styled.h3`
  color: ${colors.primary};
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const StepList = styled.ol`
  text-align: left;
  margin: 1rem 0;
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.5rem;
    color: ${colors.text};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

interface DownloadGuideProps {
  downloadUrl: string;
  projectName: string;
  onNext: () => void;
  onCancel: () => void;
}

const DownloadGuide: React.FC<DownloadGuideProps> = ({
  downloadUrl,
  projectName,
  onNext,
  onCancel
}) => {
  const handleDownload = () => {
    // 새 탭에서 다운로드 링크 열기
    window.open(downloadUrl, "_blank");
  };

  return (
    <Container>
      <IconContainer>📥</IconContainer>

      <Title>설정 파일 다운로드</Title>

      <Description>
        '{projectName}' 프로젝트의 설정 파일이 생성되었습니다.
        <br />
        아래 단계에 따라 파일을 다운로드하고 서버에 설치해주세요.
      </Description>

      <DownloadSection>
        <DownloadTitle>📋 설치 가이드</DownloadTitle>

        <StepList>
          <li>아래 "파일 다운로드" 버튼을 클릭하여 설정 파일을 다운로드합니다.</li>
          <li>다운로드한 파일을 로그 수집 서버에 업로드합니다.</li>
          <li>서버에서 해당 설정 파일을 실행하여 Elasticsearch로 로그 전송을 시작합니다.</li>
          <li>로그 전송이 시작되면 "다음" 버튼을 클릭하여 Grafana 대시보드를 생성합니다.</li>
        </StepList>

        <Button variant="primary" onClick={handleDownload} style={{ marginTop: "1rem" }}>
          📥 파일 다운로드
        </Button>
      </DownloadSection>

      <ButtonGroup>
        <Button variant="secondary" onClick={onCancel}>
          취소
        </Button>
        <Button variant="primary" onClick={onNext}>
          다음 단계
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default DownloadGuide;
