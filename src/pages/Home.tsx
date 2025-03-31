// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { colors } from "../styles/theme";
import { useTranslation } from "react-i18next";
import Button from "../components/common/Button";
import useAuthStore from "../store/useAuthStore";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  padding-right: 2rem;

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.2;

  span {
    color: ${colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${colors.gray};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeaturesSection = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: ${colors.primary};
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: ${colors.text};
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: ${colors.gray};
  line-height: 1.6;
`;

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/projects");
    } else {
      navigate("/signup");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <Title>
            로그 관리를 <span>간편하게</span>
            <br />
            통합 대시보드로 <span>효율적으로</span>
          </Title>

          <Subtitle>
            여러 클라우드 플랫폼의 로그를 한 곳에서 모니터링하고 분석하세요. Grafana 기반의 강력한
            시각화와 직관적인 인터페이스로 로그 관리가 쉬워집니다.
          </Subtitle>

          <ButtonGroup>
            <Button size="lg" onClick={handleGetStarted}>
              시작하기
            </Button>

            {!isAuthenticated && (
              <Button size="lg" variant="secondary" onClick={handleLogin}>
                로그인
              </Button>
            )}
          </ButtonGroup>
        </HeroContent>

        <HeroImage>
          {/* 대시보드 이미지는 */}
          <img src="/dashboard.jpg" alt="Dashboard Preview" />
        </HeroImage>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>주요 기능</SectionTitle>

        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>통합 대시보드</FeatureTitle>
            <FeatureDescription>
              여러 플랫폼의 로그를 한 곳에서 관리하고 시각화합니다. 각 프로젝트마다 자동으로 Grafana
              대시보드가 생성됩니다.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureTitle>실시간 모니터링</FeatureTitle>
            <FeatureDescription>
              로그를 실시간으로 모니터링하고 이상 징후를 빠르게 감지하세요. 중요 이벤트 발생 시 즉시
              알림을 받을 수 있습니다.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🔐</FeatureIcon>
            <FeatureTitle>보안 접근 관리</FeatureTitle>
            <FeatureDescription>
              각 프로젝트마다 접근 권한을 별도로 관리할 수 있습니다. 사용자별 권한 설정으로 데이터
              보안을 강화하세요.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🚀</FeatureIcon>
            <FeatureTitle>손쉬운 설정</FeatureTitle>
            <FeatureDescription>
              복잡한 설정 없이 클릭 몇 번으로 대시보드를 생성하고 로그를 연결하세요. 기술적 지식
              없이도 쉽게 사용할 수 있습니다.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureTitle>반응형 디자인</FeatureTitle>
            <FeatureDescription>
              모든 기기에서 최적화된 경험을 제공합니다. 데스크톱, 태블릿, 모바일 어디서나 접근
              가능합니다.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>📈</FeatureIcon>
            <FeatureTitle>성능 분석</FeatureTitle>
            <FeatureDescription>
              시스템 성능을 분석하고 병목 구간을 파악하세요. 성능 추이를 시각적으로 확인하고 최적화
              포인트를 찾을 수 있습니다.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>
    </Container>
  );
};

export default Home;
