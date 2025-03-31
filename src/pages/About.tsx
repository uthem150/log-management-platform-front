// src/pages/About.tsx
import styled from "@emotion/styled";
import { colors } from "../styles/theme";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${colors.primary};
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  color: ${colors.text};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const About = () => {
  return (
    <Container>
      <Title>소개 페이지</Title>
      <Description>
        여러 클라우드 플랫폼의 로그를 한 곳에서 모니터링하고 분석하세요. Grafana 기반의 강력한
        시각화와 직관적인 인터페이스로 로그 관리가 쉬워집니다.
      </Description>
    </Container>
  );
};

export default About;
