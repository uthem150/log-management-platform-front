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
        이 앱에 대한 정보를 제공합니다. 여기에서는 앱의 목적, 사용법, 기능 등을 설명할 수 있습니다.
      </Description>
    </Container>
  );
};

export default About;
