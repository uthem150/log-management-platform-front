// src/pages/About/About.tsx
import { Container, Description, Title } from "./About.style";

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
