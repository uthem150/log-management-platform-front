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
  projectId: string;
  downloadUrl: string;
  projectName: string;
  platform: "windows" | "linux";
  onNext: () => void;
  onCancel: () => void;
}

const DownloadGuide: React.FC<DownloadGuideProps> = ({
  projectId,
  downloadUrl,
  projectName,
  platform,
  onNext,
  onCancel
}) => {
  const handleDownload = () => {
    if (!downloadUrl) {
      alert("다운로드 URL이 없습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 새 탭에서 다운로드 링크 열기
    window.open(downloadUrl, "_blank");
  };

  // props 검증 추가
  if (!projectId || !downloadUrl) {
    return (
      <Container>
        <IconContainer>⚠️</IconContainer>
        <Title>데이터 로딩 중...</Title>
        <Description>프로젝트 정보를 불러오고 있습니다. 잠시만 기다려주세요.</Description>
        <ButtonGroup>
          <Button variant="secondary" onClick={onCancel}>
            취소
          </Button>
        </ButtonGroup>
      </Container>
    );
  }

  const getInstallSteps = () => {
    if (platform === "windows") {
      return [
        "아래 '설정 스크립트 다운로드' 버튼을 클릭하여 Windows용 설정 스크립트를 다운로드합니다.",
        "다운로드한 .bat 또는 .ps1 파일을 Windows 서버에 업로드합니다.",
        "관리자 권한으로 PowerShell 또는 명령 프롬프트를 실행합니다.",
        "다운로드한 스크립트 파일을 실행하여 로그 수집을 시작합니다.",
        "스크립트 실행이 완료되면 '다음' 버튼을 클릭하여 대시보드를 생성합니다."
      ];
    } else {
      return [
        "아래 '설정 스크립트 다운로드' 버튼을 클릭하여 Linux용 설정 스크립트를 다운로드합니다.",
        "다운로드한 스크립트 파일을 Linux 서버에 업로드합니다.",
        "터미널에서 'chmod +x script_name.sh' 명령으로 실행 권한을 부여합니다.",
        "스크립트를 실행하여 로그 수집을 시작합니다: './script_name.sh'",
        "스크립트 실행이 완료되면 '다음' 버튼을 클릭하여 대시보드를 생성합니다."
      ];
    }
  };

  const copyProjectId = () => {
    if (!projectId) {
      alert("프로젝트 ID가 없습니다.");
      return;
    }

    navigator.clipboard.writeText(projectId).then(() => {
      alert("프로젝트 ID가 클립보드에 복사되었습니다.");
    });
  };
  return (
    <Container>
      <IconContainer>📥</IconContainer>

      <Title>설정 파일 다운로드</Title>

      <Description>
        '{projectName}' 프로젝트의 {platform === "windows" ? "Windows" : "Linux"}용 설정 파일이
        생성되었습니다.
        <br />
        아래 단계에 따라 파일을 다운로드하고 서버에 설치해주세요.
      </Description>

      <DownloadSection>
        <DownloadTitle>📋 설치 가이드</DownloadTitle>

        <div
          style={{
            marginBottom: "1rem",
            padding: "0.75rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "4px"
          }}
        >
          <strong>프로젝트 ID:</strong> {projectId}
          <Button
            variant="secondary"
            onClick={copyProjectId}
            style={{ marginLeft: "0.5rem", padding: "0.25rem 0.5rem", fontSize: "0.8rem" }}
          >
            복사
          </Button>
        </div>

        <StepList>
          {getInstallSteps().map((step, index) => (
            <li key={index}>{step}</li>
          ))}
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
          다음 단계 (대시보드 생성)
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default DownloadGuide;
