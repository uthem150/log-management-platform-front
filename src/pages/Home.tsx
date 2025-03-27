// src/pages/Home.tsx
import styled from "@emotion/styled";
import { colors } from "../styles/theme";
import Counter from "../components/Counter";
import { useTranslation } from "react-i18next";

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

const Home = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t("home.welcome")}</Title>
      <Description>{t("home.description")}</Description>
      <Counter />
    </Container>
  );
};

export default Home;
